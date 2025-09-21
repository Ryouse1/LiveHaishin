const functions = require('firebase-functions')
const stripe = require('stripe')(functions.config().stripe?.secret || process.env.STRIPE_SECRET)
const admin = require('firebase-admin')
admin.initializeApp()
const db = admin.firestore()

// Create Checkout Session for gifts (client calls this endpoint)
exports.createCheckoutSession = async (req, res) => {
  const { streamId, amount, currency='jpy' } = req.body
  try {
    const session = await stripe.checkout.sessions.create({
      success_url: req.headers.origin || 'https://example.com' + '?session_id={CHECKOUT_SESSION_ID}',
      cancel_url: req.headers.origin || 'https://example.com',
      payment_method_types: ['card'],
      mode: 'payment',
      line_items: [
        { price_data: { currency, product_data: { name: 'Gift' }, unit_amount: amount }, quantity: 1 }
      ],
      client_reference_id: streamId
    })
    res.json({ url: session.url })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: err.message })
  }
}

// Stripe webhook
exports.handleStripeWebhook = async (req, res) => {
  const sig = req.headers['stripe-signature']
  let event
  const endpointSecret = functions.config().stripe?.webhook || process.env.STRIPE_WEBHOOK_SECRET
  try {
    event = stripe.webhooks.constructEvent(req.rawBody, sig, endpointSecret)
  } catch (err) {
    console.error('Webhook signature verification failed.', err.message)
    return res.status(400).send(`Webhook Error: ${err.message}`)
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object
    const streamId = session.client_reference_id
    await db.collection('streams').doc(streamId).collection('gifts').add({
      amount: session.amount_total,
      currency: session.currency,
      customer_email: session.customer_email,
      createdAt: admin.firestore.FieldValue.serverTimestamp()
    })
  }

  res.json({ received: true })
}

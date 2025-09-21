// entry for cloud functions - mounts daily and stripe endpoints
const functions = require('firebase-functions')
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const daily = require('./daily')
const stripe = require('./stripe')

const app = express()
app.use(cors({ origin: true }))
app.use(bodyParser.raw({ type: 'application/json' }))
app.use(bodyParser.json())

app.post('/createDailyRoom', daily.createDailyRoom)
app.post('/createDailyToken', daily.createDailyToken)

// stripe endpoints
app.post('/stripeWebhook', stripe.handleStripeWebhook)
app.post('/createCheckoutSession', stripe.createCheckoutSession)

// export
exports.api = functions.https.onRequest(app)

import React from 'react'

// Simple UI — server-side Stripe checkout integration needed for real gifts.
// Here we show placeholder buttons that call backend to create checkout session.
export default function GiftsPanel({ streamId }) {
  async function sendGift(amount) {
    try {
      const res = await fetch(`/createCheckoutSession`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ streamId, amount })
      })
      const data = await res.json()
      if (data.url) window.location.href = data.url
    } catch (err) {
      alert('ギフト送付に失敗: ' + err.message)
    }
  }

  return (
    <div className="card">
      <h4>ギフト</h4>
      <button onClick={()=>sendGift(100)}>¥100 ギフト</button>
      <button onClick={()=>sendGift(500)}>¥500 ギフト</button>
    </div>
  )
}

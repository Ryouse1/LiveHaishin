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
    <div className="card gifts-card">
      <div className="card-header">
        <h4>ギフト</h4>
        <span className="muted">クリエイター応援</span>
      </div>
      <p className="muted">配信を選択するとギフトを送れます。</p>
      <div className="gift-grid">
        <button onClick={()=>sendGift(100)} disabled={!streamId}>¥100</button>
        <button onClick={()=>sendGift(500)} disabled={!streamId}>¥500</button>
        <button onClick={()=>sendGift(1200)} disabled={!streamId}>¥1,200</button>
        <button onClick={()=>sendGift(2500)} disabled={!streamId}>¥2,500</button>
      </div>
    </div>
  )
}

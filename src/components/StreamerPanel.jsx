// src/components/StreamerPanel.jsx
import React from 'react';

export default function StreamerPanel({ user }) {
  if (!user) return null;

  return (
    <div className="card">
      <h3>ようこそ {user.email} さん</h3>
      <button>ライブ配信を開始</button>
    </div>
  );
}

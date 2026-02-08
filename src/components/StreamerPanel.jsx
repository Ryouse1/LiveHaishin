// src/components/StreamerPanel.jsx
import React from 'react';

export default function StreamerPanel({
  user,
  streamTitle,
  setStreamTitle,
  category,
  setCategory,
  schedule,
  setSchedule,
  isLive,
  onStart,
  onStop,
  streamKey
}) {
  if (!user) return null;

  return (
    <div className="card panel-card">
      <div className="panel-header">
        <div>
          <h3>配信者ダッシュボード</h3>
          <p className="muted">ようこそ {user.email} さん</p>
        </div>
        <span className={`status-dot ${isLive ? 'live' : 'offline'}`}>
          {isLive ? 'LIVE' : 'OFFLINE'}
        </span>
      </div>
      <div className="panel-grid">
        <label>
          配信タイトル
          <input
            value={streamTitle}
            onChange={e => setStreamTitle(e.target.value)}
            placeholder="例: 深夜のゲーム実況"
          />
        </label>
        <label>
          カテゴリー
          <input
            value={category}
            onChange={e => setCategory(e.target.value)}
            placeholder="例: Gaming / Music / Talk"
          />
        </label>
        <label>
          次回配信予定
          <input
            value={schedule}
            onChange={e => setSchedule(e.target.value)}
            placeholder="例: 2024/08/15 20:00"
          />
        </label>
        <label>
          ストリームキー
          <input value={streamKey} readOnly />
        </label>
      </div>
      <div className="panel-actions">
        <button onClick={onStart} disabled={isLive}>ライブ配信を開始</button>
        <button className="secondary" onClick={onStop} disabled={!isLive}>配信を終了</button>
      </div>
    </div>
  );
}

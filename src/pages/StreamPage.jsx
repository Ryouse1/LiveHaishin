// src/pages/StreamPage.jsx
import React, { useMemo, useState } from 'react';
import StreamerPanel from '../components/StreamerPanel';
import StreamPlayer from '../components/StreamPlayer';
import ChatBox from '../components/ChatBox';
import GiftsPanel from '../components/GiftsPanel';

export default function StreamPage({ user }) {
  const [roomName, setRoomName] = useState('');
  const [streamTitle, setStreamTitle] = useState('深夜のゲーム実況');
  const [category, setCategory] = useState('Gaming');
  const [schedule, setSchedule] = useState('2024/08/15 20:00');
  const [isLive, setIsLive] = useState(false);

  const streamKey = useMemo(
    () => `live_${user?.uid?.slice(0, 6) || 'guest'}_${Math.floor(Math.random() * 9999)}`,
    [user]
  );

  const highlights = [
    { title: '配信の品質', value: '1080p / 60fps' },
    { title: '遅延', value: '2.1秒' },
    { title: '同時視聴', value: isLive ? '1,284' : '—' },
    { title: '新規フォロワー', value: isLive ? '+142' : '—' }
  ];

  return (
    <div className="stream-layout">
      <section className="main-column">
        <StreamerPanel
          user={user}
          streamTitle={streamTitle}
          setStreamTitle={setStreamTitle}
          category={category}
          setCategory={setCategory}
          schedule={schedule}
          setSchedule={setSchedule}
          isLive={isLive}
          onStart={() => setIsLive(true)}
          onStop={() => setIsLive(false)}
          streamKey={streamKey}
        />
        <div className="card search-card">
          <div className="card-header">
            <h4>視聴する配信を開く</h4>
            <span className="muted">お気に入りの配信を検索</span>
          </div>
          <div className="search-row">
            <input
              placeholder="room name"
              value={roomName}
              onChange={e=>setRoomName(e.target.value)}
            />
            <button className="secondary">検索</button>
          </div>
          {roomName && <StreamPlayer roomName={roomName} user={user} />}
        </div>
        <div className="card highlights-card">
          <h4>配信ハイライト</h4>
          <div className="highlight-grid">
            {highlights.map(item => (
              <div key={item.title} className="highlight-item">
                <span className="muted">{item.title}</span>
                <strong>{item.value}</strong>
              </div>
            ))}
          </div>
        </div>
        <div className="card">
          <h4>おすすめのライブ配信</h4>
          <div className="recommendations">
            {['Lo-fi Session', 'Cooking Live', 'Indie Dev Log'].map(name => (
              <div key={name} className="recommendation-item">
                <div className="thumb" />
                <div>
                  <strong>{name}</strong>
                  <p className="muted">カテゴリ: {category}</p>
                </div>
                <button className="secondary">視聴</button>
              </div>
            ))}
          </div>
        </div>
      </section>
      <aside className="side-column">
        <div className="card quick-stats">
          <h4>配信ステータス</h4>
          <div className="stat-list">
            <div>
              <span className="muted">ステータス</span>
              <strong>{isLive ? '配信中' : '準備中'}</strong>
            </div>
            <div>
              <span className="muted">タイトル</span>
              <strong>{streamTitle}</strong>
            </div>
            <div>
              <span className="muted">カテゴリー</span>
              <strong>{category}</strong>
            </div>
            <div>
              <span className="muted">次回配信</span>
              <strong>{schedule}</strong>
            </div>
          </div>
        </div>
        <ChatBox streamId={roomName} />
        <GiftsPanel streamId={roomName} />
      </aside>
    </div>
  );
}

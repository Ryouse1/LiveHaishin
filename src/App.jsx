// src/App.jsx
import React, { useState } from 'react';
import Login from './auth/Login';
import StreamPage from './pages/StreamPage';

export default function App() {
  const [user, setUser] = useState(null);
  const [view, setView] = useState('login');

  return (
    <div className="app-shell">
      <header className="top-nav">
        <div className="logo">
          <span className="logo-mark">LiveHaishin</span>
          <span className="logo-subtitle">Creator Studio</span>
        </div>
        <nav className="top-nav-links">
          <span>ホーム</span>
          <span>探す</span>
          <span>イベント</span>
        </nav>
        <div className="top-nav-actions">
          <span className="status-pill">配信品質: 1080p</span>
          <span className="status-pill">低遅延</span>
        </div>
      </header>
      <main className="app-content">
        {user && view === 'stream' ? (
          <StreamPage user={user} />
        ) : (
          <Login setUser={setUser} onSuccess={() => setView('stream')} />
        )}
      </main>
    </div>
  );
}

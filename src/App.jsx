// src/App.jsx
import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './auth/Login';
import StreamPage from './pages/StreamPage';

export default function App() {
  const [user, setUser] = useState(null);

  return (
    <BrowserRouter>
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
          <Routes>
            <Route path="/" element={<Login setUser={setUser} />} />
            <Route
              path="/stream"
              element={user ? <StreamPage user={user} /> : <Navigate to="/" />}
            />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

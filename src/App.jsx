// src/App.jsx
import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './auth/Login';
import StreamPage from './pages/StreamPage';

export default function App() {
  const [user, setUser] = useState(null);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login setUser={setUser} />} />
        <Route 
          path="/stream" 
          element={user ? <StreamPage user={user} /> : <Navigate to="/" />} 
        />
      </Routes>
    </BrowserRouter>
  );
}

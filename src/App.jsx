import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Login from './auth/Login'
import StreamPage from './pages/StreamPage'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import './firebase' // Firebase初期化ファイル

export default function App() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const auth = getAuth()
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser)
      setLoading(false)
    })
    return () => unsubscribe()
  }, [])

  if (loading) return <div>読み込み中…</div>

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/stream" element={user ? <StreamPage user={user} /> : <Navigate to="/login" />} />
        <Route path="*" element={<Navigate to={user ? "/stream" : "/login"} />} />
      </Routes>
    </Router>
  )
}

import React, { useState, useEffect } from 'react'
import { auth } from './firebase'
import { onAuthStateChanged } from 'firebase/auth'
import Home from './pages/Home'
import StreamPage from './pages/StreamPage'
import AdminPanel from './pages/AdminPanel'

export default function App(){
  const [user, setUser] = useState(null)
  const [page, setPage] = useState('home') // 'home' | 'stream' | 'admin'

  useEffect(()=>{
    return onAuthStateChanged(auth, u => setUser(u))
  },[])

  return (
    <div className="app">
      <div className="header">
        <h2>Live App</h2>
        <div>
          <button onClick={()=>setPage('home')}>Home</button>
          <button onClick={()=>setPage('stream')}>配信/視聴</button>
          <button onClick={()=>setPage('admin')}>管理</button>
        </div>
      </div>
      <div>
        {page==='home' && <Home user={user} />}
        {page==='stream' && <StreamPage user={user} />}
        {page==='admin' && <AdminPanel user={user} />}
      </div>
    </div>
  )
}

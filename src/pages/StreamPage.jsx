// LiveHaishin/src/pages/StreamPage.jsx
import React, { useState } from 'react'
import StreamerPanel from '../components/StreamerPanel'
import StreamPlayer from '../components/StreamPlayer'
import ChatBox from '../components/ChatBox'
import GiftsPanel from '../components/GiftsPanel'
import { signOut } from 'firebase/auth'
import { auth } from '../firebase'

export default function StreamPage({ user }) {
  const [roomName, setRoomName] = useState('')

  const handleLogout = async () => {
    try {
      await signOut(auth)
      // ユーザーは App.jsx で自動的に Login に戻る
    } catch (err) {
      console.error('ログアウトに失敗しました:', err)
    }
  }

  return (
    <div>
      {/* 上部バー */}
      <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', padding:'10px 20px', borderBottom:'1px solid #ccc'}}>
        <h2>ライブ配信</h2>
        <button onClick={handleLogout} style={{padding:'6px 12px', cursor:'pointer'}}>
          ログアウト
        </button>
      </div>

      {/* メインコンテンツ */}
      <div style={{display:'grid', gridTemplateColumns:'1fr 420px', gap:12, padding:12}}>
        <div>
          <StreamerPanel user={user} />
          <div className="card">
            <h4>視聴する配信を開く</h4>
            <input 
              placeholder="room name" 
              value={roomName} 
              onChange={e=>setRoomName(e.target.value)} 
            />
            {roomName && <StreamPlayer roomName={roomName} user={user} />}
          </div>
        </div>

        <aside>
          <ChatBox streamId={roomName} />
          <GiftsPanel streamId={roomName} />
        </aside>
      </div>
    </div>
  )
}

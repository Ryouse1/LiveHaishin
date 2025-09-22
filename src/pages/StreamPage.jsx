import React, { useState } from 'react'
import StreamerPanel from '../components/StreamerPanel'
import StreamPlayer from '../components/StreamPlayer'
import ChatBox from '../components/ChatBox'
import GiftsPanel from '../components/GiftsPanel'

export default function StreamPage({ user }) {
  const [roomName, setRoomName] = useState('')

  return (
    <div style={{display:'grid', gridTemplateColumns:'1fr 420px', gap:12}}>
      <div>
        <StreamerPanel user={user} />
        <div className="card">
          <h4>視聴する配信を開く</h4>
          <input placeholder="room name" value={roomName} onChange={e=>setRoomName(e.target.value)} />
          {roomName && <StreamPlayer roomName={roomName} user={user} />}
        </div>
      </div>

      <aside>
        <ChatBox streamId={roomName} />
        <GiftsPanel streamId={roomName} />
      </aside>
    </div>
  )
}

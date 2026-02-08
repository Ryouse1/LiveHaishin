import React, { useEffect, useState, useRef } from 'react'
import { db, auth } from '../firebase'
import { collection, addDoc, orderBy, query, onSnapshot, serverTimestamp } from 'firebase/firestore'

export default function ChatBox({ streamId }) {
  const [text, setText] = useState('')
  const [list, setList] = useState([])
  const scrollRef = useRef(null)

  useEffect(()=>{
    if(!streamId) return
    const q = query(collection(db, `streams/${streamId}/chat`), orderBy('createdAt'))
    return onSnapshot(q, snap => {
      setList(snap.docs.map(d => ({ id: d.id, ...d.data() })))
      setTimeout(()=> scrollRef.current?.scrollIntoView({behavior:'smooth'}), 50)
    })
  }, [streamId])

  async function send(){
    if(!text) return
    await addDoc(collection(db, `streams/${streamId}/chat`), {
      text,
      uid: auth.currentUser?.uid || 'guest',
      displayName: auth.currentUser?.displayName || auth.currentUser?.email || '匿名',
      createdAt: serverTimestamp()
    })
    setText('')
  }

  return (
    <div className="card chat-card">
      <div className="card-header">
        <h4>チャット</h4>
        <span className="muted">{streamId ? 'リアルタイム' : '配信未選択'}</span>
      </div>
      <div className="chat-list">
        {streamId ? (
          <>
            {list.map(m => (
              <div key={m.id} className="chat-message">
                <b>{m.displayName}:</b> {m.text}
              </div>
            ))}
            <div ref={scrollRef} />
          </>
        ) : (
          <div className="empty-state">視聴する配信を選択するとチャットが表示されます。</div>
        )}
      </div>
      <div className="chat-input">
        <input value={text} onChange={e=>setText(e.target.value)} placeholder="コメント" disabled={!streamId} />
        <button onClick={send} disabled={!streamId}>送信</button>
      </div>
    </div>
  )
}

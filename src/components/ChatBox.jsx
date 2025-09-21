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
    <div className="card">
      <h4>チャット</h4>
      <div style={{height:200, overflow:'auto', background:'#fafafa', padding:8}}>
        {list.map(m => <div key={m.id}><b>{m.displayName}:</b> {m.text}</div>)}
        <div ref={scrollRef} />
      </div>
      <div style={{marginTop:8}}>
        <input value={text} onChange={e=>setText(e.target.value)} placeholder="コメント" />
        <button onClick={send}>送信</button>
      </div>
    </div>
  )
}

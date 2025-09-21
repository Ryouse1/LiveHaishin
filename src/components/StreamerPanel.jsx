import React, { useRef, useState } from 'react'
import DailyIframe from '@daily-co/daily-js'
import { createRoom, createToken } from '../utils/dailyHelpers'
import { doc, setDoc, serverTimestamp } from 'firebase/firestore'
import { db } from '../firebase'

export default function StreamerPanel({ user }){
  const frameRef = useRef(null)
  const callRef = useRef(null)
  const [roomName, setRoomName] = useState('')
  const [isLive, setIsLive] = useState(false)
  const [streamId, setStreamId] = useState(null)

  async function start(){
    const name = roomName || `room-${Date.now()}`
    const created = await createRoom(name, { private: false })
    // store metadata
    await setDoc(doc(db, 'streams', created.name), {
      title: '未設定タイトル',
      owner: user.uid,
      createdAt: serverTimestamp(),
      status: 'live',
      roomName: created.name,
      roomUrl: created.url || (`https://${created.name}.daily.co/${created.name}`)
    })
    setStreamId(created.name)
    const token = await createToken(created.name, user.uid, true)
    const callFrame = DailyIframe.createFrame(document.createElement('div'))
    callRef.current = callFrame
    frameRef.current.appendChild(callFrame.iframe)
    await callFrame.join({ url: created.url, token: token?.token })
    setIsLive(true)
  }

  function stop(){
    if(callRef.current){
      callRef.current.leave()
      callRef.current.destroy()
      callRef.current = null
    }
    frameRef.current.innerHTML = ''
    setIsLive(false)
  }

  return (
    <div className="card">
      <h3>配信者用パネル</h3>
      <input placeholder="room name (任意)" value={roomName} onChange={e=>setRoomName(e.target.value)} />
      {!isLive ? <button onClick={start}>配信開始</button> : <button onClick={stop}>配信終了</button>}
      <div ref={frameRef} style={{width:800, height:600, marginTop:12}}></div>
    </div>
  )
}

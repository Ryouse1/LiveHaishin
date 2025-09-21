import React, { useRef } from 'react'
import DailyIframe from '@daily-co/daily-js'
import { createToken } from '../utils/dailyHelpers'

export default function StreamPlayer({ roomName, user }) {
  const frameRef = useRef(null)
  const callRef = useRef(null)

  async function join(){
    const token = await createToken(roomName, user?.uid || 'guest', false)
    const callFrame = DailyIframe.createFrame(document.createElement('div'))
    callRef.current = callFrame
    frameRef.current.appendChild(callFrame.iframe)
    await callFrame.join({ url: `https://${roomName}.daily.co/${roomName}`, token: token?.token })
  }

  function leave(){
    if(callRef.current){
      callRef.current.leave()
      callRef.current.destroy()
      callRef.current = null
    }
    frameRef.current.innerHTML = ''
  }

  return (
    <div className="card">
      <h4>視聴プレイヤー: {roomName}</h4>
      <button onClick={join}>視聴</button>
      <button onClick={leave}>退出</button>
      <div ref={frameRef} style={{width:800, height:480, marginTop:8}}></div>
    </div>
  )
}

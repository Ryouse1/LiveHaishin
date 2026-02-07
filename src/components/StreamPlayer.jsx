import React, { useRef, useState } from 'react'
import DailyIframe from '@daily-co/daily-js'
import { createToken } from '../utils/dailyHelpers'

export default function StreamPlayer({ roomName, user }) {
  const frameRef = useRef(null)
  const callRef = useRef(null)
  const [joined, setJoined] = useState(false)

  async function join(){
    const token = await createToken(roomName, user?.uid || 'guest', false)
    const callFrame = DailyIframe.createFrame(document.createElement('div'))
    callRef.current = callFrame
    frameRef.current.appendChild(callFrame.iframe)
    await callFrame.join({ url: `https://${roomName}.daily.co/${roomName}`, token: token?.token })
    setJoined(true)
  }

  function leave(){
    if(callRef.current){
      callRef.current.leave()
      callRef.current.destroy()
      callRef.current = null
    }
    frameRef.current.innerHTML = ''
    setJoined(false)
  }

  return (
    <div className="card player-card">
      <div className="player-header">
        <div>
          <h4>視聴プレイヤー</h4>
          <p className="muted">Room: {roomName}</p>
        </div>
        <div className="player-actions">
          <button onClick={join} disabled={joined}>視聴開始</button>
          <button className="secondary" onClick={leave} disabled={!joined}>退出</button>
        </div>
      </div>
      <div className="player-frame" ref={frameRef}>
        {!joined && (
          <div className="player-placeholder">
            <p>配信を選択して視聴を開始しましょう。</p>
          </div>
        )}
      </div>
    </div>
  )
}

import React, { useState } from 'react'
import { loginWithUsername, loginWithProvider } from '../utils/authHelpers'

export default function Login(){
  const [username, setUsername] = useState('')
  const [pw, setPw] = useState('')

  async function handle(e){
    e.preventDefault()
    try{
      await loginWithUsername(username.trim(), pw)
      // onAuthStateChanged in App will update
    }catch(err){
      alert('ログイン失敗: ' + err.message)
    }
  }

  async function handleSSO(){
    try{
      await loginWithProvider()
    }catch(err){
      alert(err.message)
    }
  }

  return (
    <div className="card">
      <h3>ログイン</h3>
      <form onSubmit={handle}>
        <input placeholder="ユーザー名" value={username} onChange={e=>setUsername(e.target.value)} />
        <input placeholder="パスワード" type="password" value={pw} onChange={e=>setPw(e.target.value)} />
        <button type="submit">ログイン</button>
      </form>
      <hr />
      <button onClick={handleSSO}>Google/Twitter/Apple でログイン (SSO)</button>
    </div>
  )
}

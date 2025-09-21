import React, { useState } from 'react'
import { registerWithUsername } from '../utils/authHelpers'

export default function Register(){
  const [username, setUsername] = useState('')
  const [pw, setPw] = useState('')

  async function handle(e){
    e.preventDefault()
    try{
      await registerWithUsername(username.trim(), pw)
      alert('登録成功。承認待ちの状態です。プロフィール編集で申請できます。')
    }catch(err){
      alert(err.message)
    }
  }

  return (
    <div className="card">
      <h3>ユーザー登録 (ユーザー名 + パスワード)</h3>
      <form onSubmit={handle}>
        <input placeholder="ユーザー名" value={username} onChange={e=>setUsername(e.target.value)} />
        <input placeholder="パスワード" type="password" value={pw} onChange={e=>setPw(e.target.value)} />
        <button type="submit">登録</button>
      </form>
    </div>
  )
}

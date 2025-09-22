import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()
  const auth = getAuth()

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password)
      navigate('/stream')
    } catch (err) {
      console.error(err)
      alert('ログインに失敗しました')
    }
  }

  const handleSignup = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password)
      navigate('/stream')
    } catch (err) {
      console.error(err)
      alert('アカウント作成に失敗しました')
    }
  }

  return (
    <div style={{ padding: 20 }}>
      <h2>ログイン / サインアップ</h2>
      <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
      <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
      <button onClick={handleLogin}>ログイン</button>
      <button onClick={handleSignup}>アカウント作成</button>
    </div>
  )
}

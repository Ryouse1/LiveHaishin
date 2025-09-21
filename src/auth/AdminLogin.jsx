import React from 'react'
import { auth } from '../firebase'
import { GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth'

const ADMIN_EMAIL = import.meta.env.VITE_ADMIN_EMAIL || 'ryouseikoseki1114@gmail.com'

export default function AdminLogin(){
  const provider = new GoogleAuthProvider()

  async function doLogin(){
    try{
      const res = await signInWithPopup(auth, provider)
      const u = res.user
      if (u.email !== ADMIN_EMAIL) {
        alert('管理者アカウントではありません')
        await signOut(auth)
        return
      }
      alert('管理者ログイン成功')
    }catch(err){
      alert(err.message)
    }
  }

  return <button onClick={doLogin}>管理者用 Google SSO ログイン</button>
}

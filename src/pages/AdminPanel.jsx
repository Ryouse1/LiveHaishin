import React, { useEffect, useState } from 'react'
import { auth, db } from '../firebase'
import { collection, query, where, getDocs, doc, updateDoc } from 'firebase/firestore'
import { onAuthStateChanged } from 'firebase/auth'

const ADMIN_EMAIL = import.meta.env.VITE_ADMIN_EMAIL || 'ryouseikoseki1114@gmail.com'

export default function AdminPanel({ user }) {
  const [authorized, setAuthorized] = useState(false)
  const [pending, setPending] = useState([])

  useEffect(()=>{
    const unsub = onAuthStateChanged(auth, u => {
      setAuthorized(!!(u && u.email === ADMIN_EMAIL))
    })
    return unsub
  },[])

  useEffect(()=>{ if(authorized) loadPending() }, [authorized])

  async function loadPending(){
    const q = query(collection(db, 'users'), where('approved', '==', false))
    const snap = await getDocs(q)
    setPending(snap.docs.map(d => ({ id: d.id, ...d.data() })))
  }

  async function approve(uid){
    await updateDoc(doc(db, 'users', uid), { approved: true })
    loadPending()
  }

  async function ban(uid){
    await updateDoc(doc(db, 'users', uid), { banned: true })
    loadPending()
  }

  if(!authorized) return <div className="card">管理者認証が必要です。Admin用Googleログインでログインしてください。</div>

  return (
    <div>
      <h3>管理ダッシュボード</h3>
      <div className="card">
        <h4>配信者申請（未承認）</h4>
        {pending.length===0 && <div>申請なし</div>}
        {pending.map(u => (
          <div key={u.id} style={{display:'flex', justifyContent:'space-between', alignItems:'center', padding:6}}>
            <div>{u.username} ({u.id})</div>
            <div>
              <button onClick={()=>approve(u.id)}>承認</button>
              <button onClick={()=>ban(u.id)} style={{marginLeft:8}}>BAN</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

import React from 'react'
import Login from '../auth/Login'
import Register from '../auth/Register'
import AdminLogin from '../auth/AdminLogin'

export default function Home({ user }) {
  return (
    <div>
      <h3>Welcome to Live App</h3>
      {!user && <div style={{display:'flex', gap:12}}>
        <Register />
        <Login />
        <div className="card">
          <h4>管理者ログイン</h4>
          <AdminLogin />
        </div>
      </div>}
      {user && <div className="card">
        <p>ログイン中: {user.displayName || user.email}</p>
      </div>}
    </div>
  )
}

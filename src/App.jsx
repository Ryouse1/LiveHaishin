import React, { useState } from "react";
import Login from "./auth/Login";
import Dashboard from "./pages/Dashboard"; // 既存のライブ配信ページ

export default function App() {
  const [user, setUser] = useState(null);

  return user ? (
    <Dashboard user={user} />
  ) : (
    <Login onLogin={(u) => setUser(u)} />
  );
}

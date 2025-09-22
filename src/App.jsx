// LiveHaishin/src/App.jsx
import React, { useEffect, useState } from "react";
import Login from "./auth/Login";
import StreamPage from "./pages/StreamPage";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";

export default function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  if (loading) return <p className="text-center mt-20">読み込み中…</p>;

  return user ? <StreamPage user={user} /> : <Login />;
}

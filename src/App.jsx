import { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import Login from "./Login";
import LiveApp from "./LiveApp"; // 既存のライブ配信や部屋作成コンポーネント

export default function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
  }, []);

  if (loading) return <p>読み込み中...</p>;
  if (!user) return <Login onLogin={() => setUser(auth.currentUser)} />;

  return <LiveApp />; // ログイン後は既存の機能に遷移
}

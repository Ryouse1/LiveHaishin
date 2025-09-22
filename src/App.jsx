// LiveHaishin/src/App.jsx
import React, { useState } from "react";
import Login from "./auth/Login";
import StreamPage from "./pages/StreamPage";

export default function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <>
      {loggedIn ? (
        <StreamPage /> // ログイン後のページ
      ) : (
        <Login onLogin={() => setLoggedIn(true)} /> // ログイン画面
      )}
    </>
  );
}

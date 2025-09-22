// LiveHaishin/src/auth/Login.jsx
import React, { useState } from "react";
import AuthForm from "./AuthForm";

export default function Login({ onLogin }) {
  const [mode, setMode] = useState("login"); // "login" or "signup"

  return (
    <div>
      <AuthForm mode={mode} onSuccess={onLogin} />
      <div className="text-center mt-4">
        {mode === "login" ? (
          <p>
            アカウントがないですか？{" "}
            <button className="text-blue-500 underline" onClick={() => setMode("signup")}>
              新規登録
            </button>
          </p>
        ) : (
          <p>
            すでにアカウントがありますか？{" "}
            <button className="text-blue-500 underline" onClick={() => setMode("login")}>
              ログイン
            </button>
          </p>
        )}
      </div>
    </div>
  );
}

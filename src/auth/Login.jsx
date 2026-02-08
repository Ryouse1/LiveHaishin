// src/auth/Login.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';

export default function Login({ setUser }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      setUser(userCredential.user);
      navigate('/stream');
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };

  const handleLogin = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      setUser(userCredential.user);
      navigate('/stream');
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };

  return (
    <div className="login-layout">
      <section className="login-hero">
        <p className="eyebrow">ライブ配信プラットフォーム</p>
        <h1>完全なライブ配信サイトをすぐに構築</h1>
        <p className="subtext">
          配信準備、視聴体験、チャット、ギフトまでをワンストップで管理。プロの配信者向けの
          ダッシュボードを提供します。
        </p>
        <div className="hero-stats">
          <div>
            <h3>2,430</h3>
            <span>アクティブ配信</span>
          </div>
          <div>
            <h3>58K</h3>
            <span>同時視聴者</span>
          </div>
          <div>
            <h3>4.9/5</h3>
            <span>配信満足度</span>
          </div>
        </div>
        <div className="hero-highlights">
          <div>🎥 高品質な低遅延ストリーミング</div>
          <div>💬 リアルタイムチャット＆モデレーション</div>
          <div>🎁 ギフトとマネタイズ機能</div>
          <div>📈 配信分析ダッシュボード</div>
        </div>
      </section>
      <section className="login-card">
        <h2>ログイン / 新規登録</h2>
        <label>
          メールアドレス
          <input type="email" placeholder="your@email.com" value={email} onChange={e=>setEmail(e.target.value)} />
        </label>
        <label>
          パスワード
          <input type="password" placeholder="••••••••" value={password} onChange={e=>setPassword(e.target.value)} />
        </label>
        <div className="login-actions">
          <button onClick={handleLogin}>ログイン</button>
          <button className="secondary" onClick={handleRegister}>アカウント作成</button>
        </div>
        <div className="login-footer">
          <span>配信者向けガイド</span>
          <span>ヘルプセンター</span>
          <span>プライバシー</span>
        </div>
      </section>
    </div>
  );
}

import React from "react";
import ReactDOM from "react-dom/client";
import "./main.css"; // ← CSS を読み込む

function App() {
  return (
    <div className="app">
      <div className="header">
        <h1>ライブ配信アプリ</h1>
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);

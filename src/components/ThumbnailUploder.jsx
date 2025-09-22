import { useState } from "react";
import { createClient } from "@supabase/supabase-js";

// Supabase クライアント
const supabase = createClient(
  "https://dmrsndcznjzuyodohclc.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRtcnNuZGN6bmp6dXlvZG9oY2xjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg0NTc0MzksImV4cCI6MjA3NDAzMzQzOX0.Xx72iK4hZrCixWQwroEpboDi2yKLIA5m2tcinalhr3Q"
);

export default function CuteThumbnailUploader({ streamId }) {
  const [preview, setPreview] = useState(null);
  const [uploading, setUploading] = useState(false);

  // DB に保存
  const saveThumbnailToDB = async (base64) => {
    const { error } = await supabase
      .from("streams")
      .update({ thumbnail_base64: base64 })
      .eq("id", streamId);

    if (error) throw error;
  };

  // DB から削除
  const deleteThumbnailFromDB = async () => {
    const { error } = await supabase
      .from("streams")
      .update({ thumbnail_base64: null })
      .eq("id", streamId);

    if (error) throw error;
    setPreview(null);
  };

  // ファイル選択
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const img = new Image();
    const reader = new FileReader();

    reader.onload = (event) => (img.src = event.target.result);
    reader.readAsDataURL(file);

    img.onload = async () => {
      try {
        setUploading(true);
        const MAX_WIDTH = 320;
        const MAX_HEIGHT = 180;
        const canvas = document.createElement("canvas");
        canvas.width = MAX_WIDTH;
        canvas.height = MAX_HEIGHT;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, MAX_WIDTH, MAX_HEIGHT);

        const base64 = canvas.toDataURL("image/png");
        setPreview(base64);

        await saveThumbnailToDB(base64);
      } catch (err) {
        console.error(err);
        alert("保存に失敗しました");
      } finally {
        setUploading(false);
      }
    };
  };

  return (
    <div style={{ fontFamily: "Arial, sans-serif", maxWidth: 400, margin: "20px auto", textAlign: "center" }}>
      <h2 style={{ color: "#ff69b4" }}>🎀 サムネイル設定 🎀</h2>

      {preview ? (
        <div>
          <img
            src={preview}
            alt="thumbnail preview"
            style={{ width: 320, height: 180, borderRadius: 12, boxShadow: "0 4px 8px rgba(0,0,0,0.2)" }}
          />
          <div style={{ marginTop: 10 }}>
            <label
              style={{
                backgroundColor: "#ffb6c1",
                padding: "8px 16px",
                borderRadius: 20,
                cursor: "pointer",
                marginRight: 8,
                boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
              }}
            >
              変更
              <input type="file" accept="image/*" onChange={handleFileChange} style={{ display: "none" }} />
            </label>
            <button
              onClick={deleteThumbnailFromDB}
              style={{
                backgroundColor: "#f08080",
                padding: "8px 16px",
                borderRadius: 20,
                cursor: "pointer",
                boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
                border: "none",
                color: "white",
              }}
            >
              削除
            </button>
          </div>
        </div>
      ) : (
        <label
          style={{
            backgroundColor: "#ffb6c1",
            padding: "12px 24px",
            borderRadius: 20,
            cursor: "pointer",
            boxShadow: "0 2px 6px rgba(0,0,0,0.3)",
            display: "inline-block",
          }}
        >
          アップロード
          <input type="file" accept="image/*" onChange={handleFileChange} style={{ display: "none" }} />
        </label>
      )}

      {uploading && <p style={{ color: "#ff69b4" }}>アップロード中…</p>}
    </div>
  );
}

import { useState } from "react";
import { createClient } from "@supabase/supabase-js";

// Supabase クライアント初期化
const supabase = createClient(
  "https://dmrsndcznjzuyodohclc.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRtcnNuZGN6bmp6dXlvZG9oY2xjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg0NTc0MzksImV4cCI6MjA3NDAzMzQzOX0.Xx72iK4hZrCixWQwroEpboDi2yKLIA5m2tcinalhr3Q"
);

export default function ThumbnailUploader({ streamId }) {
  const [preview, setPreview] = useState(null);
  const [uploading, setUploading] = useState(false);

  // DB に Base64 を保存
  const saveThumbnailToDB = async (streamId, base64) => {
    const { data, error } = await supabase
      .from("streams")
      .update({ thumbnail_base64: base64 })
      .eq("id", streamId);

    if (error) throw error;
    return data;
  };

  // ファイル選択時の処理
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const img = new Image();
    const reader = new FileReader();

    reader.onload = (event) => {
      img.src = event.target.result;
    };
    reader.readAsDataURL(file);

    img.onload = async () => {
      try {
        setUploading(true);

        // ピクセル制限（サムネ用）
        const MAX_WIDTH = 320;
        const MAX_HEIGHT = 180;
        const canvas = document.createElement("canvas");
        canvas.width = MAX_WIDTH;
        canvas.height = MAX_HEIGHT;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, MAX_WIDTH, MAX_HEIGHT);

        // Base64 に変換
        const base64 = canvas.toDataURL("image/png");
        setPreview(base64);

        // DB に保存
        await saveThumbnailToDB(streamId, base64);
        alert("サムネイルを保存しました！");
      } catch (err) {
        console.error(err);
        alert("サムネイル保存に失敗しました");
      } finally {
        setUploading(false);
      }
    };
  };

  return (
    <div>
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        disabled={uploading}
      />
      {uploading && <p>アップロード中…</p>}
      {preview && (
        <div style={{ marginTop: "8px" }}>
          <p>プレビュー:</p>
          <img src={preview} alt="thumbnail preview" />
        </div>
      )}
    </div>
  );
}

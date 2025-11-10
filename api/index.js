// api/index.js
import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

dotenv.config();

const app = express();

// __dirname 대체
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 정적 파일 경로
app.use(express.static(path.join(__dirname, "../public")));

// 루트 경로 → index.html 반환
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../public", "index.html"));
});

// ✅ Vercel에서는 listen이 아니라 export 해야 함!
export default app;

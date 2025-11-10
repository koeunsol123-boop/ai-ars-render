// server.js
import express from "express";
import dotenv from "dotenv";
import twilio from "twilio";
import path from "path";
import { fileURLToPath } from "url";

// __dirname 대체 (ESM 환경용)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// .env 불러오기
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// public 폴더 정적 파일 경로
app.use(express.static(path.join(__dirname, "public")));

// 루트 경로 요청 시 index.html 응답
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// 서버 실행
app.listen(port, () => {
  console.log(`✅ Server is running on port ${port}`);
});


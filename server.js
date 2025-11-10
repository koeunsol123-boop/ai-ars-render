// server.js
import express from "express";
import dotenv from "dotenv";
import twilio from "twilio";
import path from "path";

dotenv.config({ path: path.resolve(process.cwd(), ".env") });

const app = express();
const port = process.env.PORT || 3000;

// public 폴더 내 정적 파일(index.html 등) 제공
app.use(express.static("public"));
app.use(express.json());

// ✅ 토큰 발급 엔드포인트
app.get("/token", (req, res) => {
  try {
    const AccessToken = twilio.jwt.AccessToken;
    const VoiceGrant = AccessToken.VoiceGrant;

    const voiceGrant = new VoiceGrant({
      outgoingApplicationSid: process.env.TWIML_APP_SID,
      incomingAllow: true,
    });

    const token = new AccessToken(
      process.env.TWILIO_ACCOUNT_SID,
      process.env.TWILIO_API_KEY_SID,
      process.env.TWILIO_API_KEY_SECRET,
      { identity: "demo-user" } // 임의 사용자명
    );

    token.addGrant(voiceGrant);
    res.send({ token: token.toJwt() });
  } catch (error) {
    console.error("❌ Token 생성 오류:", error);
    res.status(500).send("Error creating token");
  }
});

// ✅ 서버 실행
app.listen(port, () => {
  console.log(`✅ Server running on port ${port}`);
});

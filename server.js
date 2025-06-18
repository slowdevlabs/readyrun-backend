// server.js

const express = require('express');
const cors = require('cors');
const bodyPaser = require('body-parser');
require('dotenv').config();
///const dotenv = require('dotenv');
///const { createClient } = require('@supabase/supabase-js');

// .env 파일에 있는 환경변수 불러오기
//dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// 미들웨어 설정
app.use(cors());
app.use(express.json()); // JSON 요청 처리 가능하게 함

// Supabase 클라이언트 설정
///const supabase = createClient(
///  process.env.SUPABASE_URL,
///  process.env.SUPABASE_KEY
///);

// 라우터 불러오기
const authRoutes = require('./src/routes/auth');
app.use('/src/api/v1/auth', authRoutes);

app.listen(port, () => {
  console.log(`ReadyRun API 서버가 ${port}번 포트에서 실행 중`);
});

// 기본 라우터
///app.get('/', (req, res) => {
///  res.send('🚀 ReadyRun API 서버가 작동 중입니다!');
///});

// 서버 실행
///app.listen(port, () => {
///  console.log(`✅ 서버 실행 중: http://localhost:${port}`);
///});


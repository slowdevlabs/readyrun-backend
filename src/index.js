const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const { errorHandler } = require('./middleware/errorHandler');
// const setupSwagger = require('./swagger');
const { initializeFirebase } = require('./config/firebase');

// Firebase 초기화
initializeFirebase();

const authRoutes = require('./routes/auth');
const marathonRoutes = require('./routes/marathons');
const favoriteRoutes = require('./routes/favorites');
const notificationRoutes = require('./routes/notifications');
const adminRoutes = require('./routes/admin');
const hello2Routes = require('./routes/hello2');

const app = express();

console.log("############## 1 ##############");
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

/*
// 기본 에러 처리 미들웨어
app.use((err, req, res, next) => {
  if (err.name === 'HeadersTimeoutError') {
    return res.status(408).json({ error: 'Request Timeout' });
  }
  next(err);
});
*/

// 루트 경로 핸들러
app.get('/', (req, res) => {
    res.json({ message: 'ReadyRun API Server is running!' });
});

// API 라우터 등록
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/marathons', marathonRoutes);
app.use('/api/v1/favorites', favoriteRoutes);
app.use('/api/v1/notifications', notificationRoutes);
app.use('/api/v1/admin', adminRoutes);
app.use('/api/v1/hello2', hello2Routes);

// 공통 에러 핸들러
app.use(errorHandler);

console.log("############## 5 ##############");
// setupSwagger가 비동기 함수가 되었으므로, IIFE (즉시 실행 함수 표현식)를 사용해 비동기적으로 호출
/* (async () => {
  await setupSwagger(app);
})(); */

console.log("############## 10 ##############");
module.exports = app;
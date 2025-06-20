const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const { errorHandler } = require('./middleware/errorHandler');
// const setupSwagger = require('./swagger');
require('./config/firebase');

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// 루트 경로 핸들러
app.get('/', (req, res) => {
    // res.json({ message: 'ReadyRun API Server is running!' });
    res.setHeader('Content-Type', 'application/json');
    res.status(200).end(JSON.stringify({ message: 'ReadyRun API Server is running!' }));
});

// API 라우터를 동적으로 로드
app.use('/api/v1/auth', (req, res, next) => require('./routes/auth')(req, res, next));
app.use('/api/v1/marathons', (req, res, next) => require('./routes/marathons')(req, res, next));
app.use('/api/v1/favorites', (req, res, next) => require('./routes/favorites')(req, res, next));
app.use('/api/v1/notifications', (req, res, next) => require('./routes/notifications')(req, res, next));
app.use('/api/v1/admin', (req, res, next) => require('./routes/admin')(req, res, next));
app.use('/api/v1/health', (req, res, next) => require('./routes/health')(req, res, next));

// 공통 에러 핸들러
app.use(errorHandler);

// setupSwagger가 비동기 함수가 되었으므로, IIFE (즉시 실행 함수 표현식)를 사용해 비동기적으로 호출
/* (async () => {
  await setupSwagger(app);
})(); */

// const serverless = require('serverless-http');
module.exports = app; // serverless(app);
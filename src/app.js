
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const { errorHandler } = require('./middleware/errorHandler');
const setupSwagger = require('./swagger');

const authRoutes = require('./routes/auth');
const marathonRoutes = require('./routes/marathons');
const favoriteRoutes = require('./routes/favorites');
const notificationRoutes = require('./routes/notifications');
const adminRoutes = require('./routes/admin');

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// API 라우터 등록
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/marathons', marathonRoutes);
app.use('/api/v1/favorites', favoriteRoutes);
app.use('/api/v1/notifications', notificationRoutes);
app.use('/api/v1/admin', adminRoutes);

// 공통 에러 핸들러
app.use(errorHandler);

setupSwagger(app);


app.get('/', (req, res) => {
    res.send('ReadyRun API Server is running!');
  });

app.get('/ping', (req, res) => {
  res.send('pong');
});


module.exports = app;
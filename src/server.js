require('dotenv').config();
const app = require('./app');

// 서버 실행
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  //console.log(`ReadyRun API server running on port ${PORT}`);
});
const app = require('../src/index');
const serverless = require('serverless-http');

console.log("serverless handler loaded");

// Edge Runtime 설정으로 서버리스 핸들러 생성
const handler = serverless(app);

module.exports = serverless(app); 
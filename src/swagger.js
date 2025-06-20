const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const path = require('path');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'ReadyRun API',
      version: '1.0.0',
      description: 'ReadyRun 마라톤 정보 서비스 API 문서'
    },
    servers: [
      { url: process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000' }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      }
    },
    security: [{ bearerAuth: [] }]
  },
  // Vercel 빌드 환경을 고려하여 절대 경로로 변경
  apis: [path.join(process.cwd(), 'src', 'routes', '*.js')],
};

// 개발 환경에서만 Swagger를 활성화
module.exports = async (app) => {
  if (process.env.NODE_ENV !== 'production') {
    try {
      // swagger-jsdoc을 비동기로 처리하여 서버 시작을 막지 않도록 함
      const specs = await swaggerJsdoc(options);
      app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
      console.log('Swagger UI setup complete.');
    } catch (error) {
      console.error('Failed to setup Swagger UI:', error);
    }
  }
};

const express = require('express');
const { authenticate } = require('../middleware/auth');
const marathonController = require('../controllers/marathonController');

const router = express.Router();

// 이 라우터의 모든 경로에 authenticate 미들웨어 적용
router.use(authenticate);

/**
 * @swagger
 * /marathons:
 *   get:
 *     summary: 마라톤 목록 조회
 *     tags: [Marathons]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema: { type: integer }
 *         description: 페이지 번호
 *       - in: query
 *         name: limit
 *         schema: { type: integer }
 *         description: 페이지당 개수
 *     responses:
 *       200:
 *         description: 성공
 */
router.get('/', marathonController.listMarathons);

/**
 * @swagger
 * /marathons/search:
 *   get:
 *     summary: 마라톤 검색
 *     tags: [Marathons]
 *     parameters:
 *       - in: query
 *         name: q
 *         schema: { type: string }
 *         description: 검색어
 *     responses:
 *       200:
 *         description: 성공
 */
router.get('/search', marathonController.searchMarathons);

/**
 * @swagger
 * /marathons/{id}:
 *   get:
 *     summary: 마라톤 상세 조회
 *     tags: [Marathons]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *         description: 마라톤 ID
 *     responses:
 *       200:
 *         description: 성공
 */
router.get('/:id', marathonController.getMarathonDetail);

module.exports = router;
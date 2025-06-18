const express = require('express');
const { authenticate } = require('../middleware/auth');
const favoriteController = require('../controllers/favoriteController');

const router = express.Router();

router.use(authenticate);

/**
 * @swagger
 * /favorites:
 *   get:
 *     summary: 즐겨찾기 목록 조회
 *     tags: [Favorites]
 *     responses:
 *       200:
 *         description: 성공
 */
router.get('/', favoriteController.listFavorites);

/**
 * @swagger
 * /favorites:
 *   post:
 *     summary: 즐겨찾기 추가
 *     tags: [Favorites]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               marathon_id:
 *                 type: string
 *     responses:
 *       200:
 *         description: 성공
 */
router.post('/', favoriteController.addFavorite);

/**
 * @swagger
 * /favorites/{marathon_id}:
 *   delete:
 *     summary: 즐겨찾기 삭제
 *     tags: [Favorites]
 *     parameters:
 *       - in: path
 *         name: marathon_id
 *         required: true
 *         schema: { type: string }
 *         description: 마라톤 ID
 *     responses:
 *       200:
 *         description: 성공
 */
router.delete('/:marathon_id', favoriteController.removeFavorite);

module.exports = router;
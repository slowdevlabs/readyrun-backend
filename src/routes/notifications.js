const express = require('express');
const { authenticate } = require('../middleware/auth');
const notificationController = require('../controllers/notificationController');

const router = express.Router();

router.use(authenticate);

/**
 * @swagger
 * /notifications:
 *   get:
 *     summary: 알림 목록 조회
 *     tags: [Notifications]
 *     responses:
 *       200:
 *         description: 성공
 */
router.get('/', notificationController.listNotifications);

/**
 * @swagger
 * /notifications/{id}:
 *   patch:
 *     summary: 알림 읽음 처리
 *     tags: [Notifications]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *         description: 알림 ID
 *     responses:
 *       200:
 *         description: 성공
 */
router.patch('/:id', notificationController.markAsRead);

module.exports = router;
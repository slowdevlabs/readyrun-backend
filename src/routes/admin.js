const express = require('express');
const { authenticate, requireAdmin } = require('../middleware/auth');
const adminController = require('../controllers/adminController');

const router = express.Router();

router.use(authenticate, requireAdmin);

/**
 * @swagger
 * /admin/marathons/pending:
 *   get:
 *     summary: 승인 대기 마라톤 목록 조회
 *     tags: [Admin]
 *     responses:
 *       200:
 *         description: 성공
 */
router.get('/marathons/pending', adminController.listPendingMarathons);

/**
 * @swagger
 * /admin/marathons/{id}/approve:
 *   post:
 *     summary: 마라톤 승인
 *     tags: [Admin]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *         description: 마라톤 ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               notes:
 *                 type: string
 *               changes:
 *                 type: object
 *     responses:
 *       200:
 *         description: 성공
 */
router.post('/marathons/:id/approve', adminController.approveMarathon);

/**
 * @swagger
 * /admin/marathons/{id}/reject:
 *   post:
 *     summary: 마라톤 거부
 *     tags: [Admin]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *         description: 마라톤 ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               reason:
 *                 type: string
 *               notes:
 *                 type: string
 *     responses:
 *       200:
 *         description: 성공
 */
router.post('/marathons/:id/reject', adminController.rejectMarathon);

module.exports = router;
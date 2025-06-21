const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { authenticate } = require('../middleware/auth');

// 모든 /user 라우트들은 인증이 필요합니다.
router.use(authenticate);

// 사용자 프로필 조회
router.get('/profile', userController.getProfile);

// 사용자 프로필 수정
router.patch('/profile', userController.updateProfile);

// 회원 탈퇴
router.delete('/account', userController.deleteAccount);

module.exports = router; 
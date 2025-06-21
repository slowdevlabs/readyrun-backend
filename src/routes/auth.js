const express = require('express');
const router = express.Router();
const admin = require('../config/firebase');
const supabase = require('../config/supabase');

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: 인증 및 회원가입 관련 API
 */
// POST /auth/register
router.post('/register', async (req, res) => {
  const { firebase_uid, email, display_name, preferred_language, preferred_units } = req.body;

  try {
    // Firebase UID 유효성 검사
    console.log(`[AUTH] Validating Firebase UID. Value: "${firebase_uid}", Type: ${typeof firebase_uid}`);
    if (!firebase_uid || typeof firebase_uid !== 'string') {
      console.error('[AUTH] firebase_uid is invalid or not provided.');
      return res.status(400).json({ success: false, message: 'Firebase UID is required.' });
    }

    const userRecord = await admin.auth().getUser(firebase_uid);

    if (!userRecord) {
      return res.status(401).json({ success: false, message: 'Invalid Firebase UID' });
    }

    // Supabase에 사용자 등록
    console.log(`Attempting to insert user into Supabase with firebase_uid: ${firebase_uid}`);
    const { data, error } = await supabase
      .from('users') // Supabase 테이블명
      .insert([
        {
          firebase_uid,
          email,
          display_name,
          preferred_language,
          preferred_units,
        },
      ])
      .select()
      .single();

    if (error) {
      console.error('>>> SUPABASE INSERT ERROR:', JSON.stringify(error, null, 2));
      throw error;
    }

    console.log('Successfully inserted user into Supabase.');
    return res.status(200).json({
      success: true,
      data: { user: data },
    });

  } catch (err) {
    console.error(err);
    return res.status(500).json({
      success: false,
      message: 'Internal Server Error',
    });
  }
});

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Firebase UID 기반 회원가입
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - firebase_uid
 *               - email
 *               - display_name
 *             properties:
 *               firebase_uid:
 *                 type: string
 *                 description: Firebase 인증 UID
 *               email:
 *                 type: string
 *                 description: 사용자 이메일
 *               display_name:
 *                 type: string
 *                 description: 사용자 이름
 *               preferred_language:
 *                 type: string
 *                 description: 선호 언어(ko 등)
 *               preferred_units:
 *                 type: string
 *                 description: 선호 단위(metric 등)
 *     responses:
 *       200:
 *         description: 성공 시 유저 정보 반환
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: object
 *                   properties:
 *                     user:
 *                       type: object
 *       401:
 *         description: Firebase UID가 유효하지 않을 때
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *       500:
 *         description: 서버 에러
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 */

module.exports = router;
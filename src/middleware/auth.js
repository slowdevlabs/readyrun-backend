const admin = require('../config/firebase');
const supabase = require('../config/supabase');

// JWT 인증 미들웨어
async function authenticate(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ success: false, error: { code: 'UNAUTHORIZED', message: 'No token' } });

  const token = authHeader.split(' ')[1];
  try {
    const decoded = await admin.auth().verifyIdToken(token);
    req.user = decoded;
    // 사용자 DB 정보 attach
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('firebase_uid', decoded.uid)
      .single();
    if (error) throw error;
    req.user.db = data;
    next();
  } catch (err) {
    res.status(401).json({ success: false, error: { code: 'UNAUTHORIZED', message: err.message } });
  }
}

// 관리자 권한 체크 미들웨어
function requireAdmin(req, res, next) {
  if (req.user.db && req.user.db.role && ['admin', 'super_admin'].includes(req.user.db.role)) {
    return next();
  }
  return res.status(403).json({ success: false, error: { code: 'FORBIDDEN', message: 'Admin only' } });
}

module.exports = { authenticate, requireAdmin };
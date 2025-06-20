const admin = require('firebase-admin');

let isInitialized = false;

function initializeFirebase() {
  if (isInitialized) {
    return;
  }

  try {
    const serviceAccount = process.env.FIREBASE_ADMIN_JSON;
    if (!serviceAccount) {
      throw new Error('FIREBASE_ADMIN_JSON environment variable is not set.');
    }

    // 이미 초기화된 경우 건너뛰기
    if (admin.apps.length === 0) {
      admin.initializeApp({
        credential: admin.credential.cert(JSON.parse(serviceAccount))
      });
      console.log('Firebase Admin initialized successfully.');
    }
    
    isInitialized = true;

  } catch (error) {
    console.error('Failed to initialize Firebase Admin:', error);
    // Vercel 서버리스 환경에서는 오류를 다시 던져서 함수 실행이 실패했음을 알리는 것이 좋습니다.
    throw error;
  }
}

module.exports = {
  admin,
  initializeFirebase,
  isFirebaseInitialized: () => isInitialized,
};
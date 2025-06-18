const admin = require('firebase-admin');

// Firebase Admin 초기화
admin.initializeApp({
  credential: admin.credential.cert(JSON.parse(process.env.FIREBASE_ADMIN_JSON))
});

module.exports = admin;
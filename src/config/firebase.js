const admin = require('firebase-admin');
const { Buffer } = require('node:buffer');

// Ensure initialization only happens once.
if (admin.apps.length === 0) {
  try {
    const serviceAccountBase64 = process.env.FIREBASE_ADMIN_JSON;
    if (!serviceAccountBase64) {
      throw new Error('FIREBASE_ADMIN_JSON environment variable is not set.');
    }
    
    const serviceAccount = JSON.parse(Buffer.from(serviceAccountBase64, 'base64').toString('utf8'));

    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount)
    });
  } catch (error) {
    console.error('Failed to initialize Firebase Admin:', error);
    throw error;
  }
}

module.exports = admin;
const admin = require('firebase-admin');
const { Buffer } = require('node:buffer');

// Ensure initialization only happens once.
if (admin.apps.length === 0) {
  try {
    const serviceAccountBase64 = process.env.FIREBASE_ADMIN_JSON;
    if (!serviceAccountBase64) {
      throw new Error('FIREBASE_ADMIN_JSON environment variable is not set.');
    }
    
    // Decode the base64 service account key
    const serviceAccount = JSON.parse(Buffer.from(serviceAccountBase64, 'base64').toString('utf8'));

    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount)
    });
    console.log('Firebase Admin initialized successfully.');
  } catch (error) {
    console.error('Failed to initialize Firebase Admin:', error);
    // In a serverless environment, throwing the error can help fail the invocation clearly.
    throw error;
  }
}

module.exports = admin;
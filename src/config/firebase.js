const admin = require('firebase-admin');

// Ensure initialization only happens once.
if (admin.apps.length === 0) {
  try {
    const serviceAccount = process.env.FIREBASE_ADMIN_JSON;
    if (!serviceAccount) {
      throw new Error('FIREBASE_ADMIN_JSON environment variable is not set.');
    }
    admin.initializeApp({
      credential: admin.credential.cert(JSON.parse(serviceAccount))
    });
    console.log('Firebase Admin initialized successfully.');
  } catch (error) {
    console.error('Failed to initialize Firebase Admin:', error);
    // In a serverless environment, throwing the error can help fail the invocation clearly.
    throw error;
  }
}

module.exports = admin;
const admin = require('firebase-admin');
const { Buffer } = require('node:buffer');

// Ensure initialization only happens once.
if (admin.apps.length === 0) {
  const serviceAccountBase64 = process.env.FIREBASE_ADMIN_JSON;
  
  // --- Start of Debugging Logs ---
  console.log('Attempting to initialize Firebase Admin...');
  if (!serviceAccountBase64) {
    console.error('DEBUG: FIREBASE_ADMIN_JSON environment variable is NOT SET.');
    throw new Error('FIREBASE_ADMIN_JSON environment variable is not set.');
  } else {
    console.log(`DEBUG: FIREBASE_ADMIN_JSON is set. Length: ${serviceAccountBase64.length}`);
    console.log(`DEBUG: Starts with: ${serviceAccountBase64.substring(0, 20)}`);
  }
  // --- End of Debugging Logs ---

  try {
    const decodedString = Buffer.from(serviceAccountBase64, 'base64').toString('utf8');
    const serviceAccount = JSON.parse(decodedString);

    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount)
    });
    console.log('Firebase Admin initialized successfully.');
  } catch (error) {
    console.error('DEBUG: Failed to decode or parse FIREBASE_ADMIN_JSON, or to initialize app.');
    console.error(error); 
    throw error;
  }
}

module.exports = admin;
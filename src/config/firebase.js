const admin = require('firebase-admin');
const { Buffer } = require('node:buffer');

// Ensure initialization only happens once.
if (admin.apps.length === 0) {
  const serviceAccountBase64 = process.env.FIREBASE_ADMIN_JSON;
  if (!serviceAccountBase64) {
    throw new Error('FIREBASE_ADMIN_JSON environment variable is not set.');
  }

  try {
    const decodedString = Buffer.from(serviceAccountBase64, 'base64').toString('utf8');
    const serviceAccount = JSON.parse(decodedString);

    // --- Start of Advanced Debugging Logs ---
    console.log(`DEBUG: Successfully parsed service account.`);
    console.log(`DEBUG: Project ID: ${serviceAccount.project_id}`);
    console.log(`DEBUG: Client Email: ${serviceAccount.client_email}`);
    // --- End of Advanced Debugging Logs ---

    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount)
    });
    console.log('Firebase Admin initialized successfully.');
  } catch (error) {
    console.error('Failed to initialize Firebase Admin. Error during decoding, parsing, or initialization:');
    console.error(error);
    throw error;
  }
}

module.exports = admin;
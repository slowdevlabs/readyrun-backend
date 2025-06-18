

  import { initializeApp } from 'firebase/app';
  import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
  
  const firebaseConfig = {
    apiKey: 'AIzaSyAeZeqXYHETHPNu95eKYoSTwekFKGsWOdo',
    authDomain: 'readyrun.firebaseapp.com',
  };
  
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  
  const email = 'noine@naver.com';
  const password = 'abcdef1234';
  
  signInWithEmailAndPassword(auth, email, password)
    .then(userCredential => userCredential.user.getIdToken())
    .then(token => {
      console.log('Firebase JWT Token:', token);
      process.exit(0);
    })
    .catch(err => {
      console.error('Error:', err.message);
      process.exit(1);
    });
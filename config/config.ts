// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// Check .env.example for environment variables
const firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  projectId: process.env.PROJECT_ID,
  storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId: process.env.MESSAGING_SENDER_ID,
  appId: process.env.APP_ID,
  measurementId: process.env.MEASUREMENT_ID,
};

const firebaseDevelopmentConfig = {
  targetEnv: 'development',
  useEmulators: true,
  emulatorHost: '192.168.10.34',
  firestorePort: 8080,
  functionsPort: 5001,
};

export default {
  ...firebaseDevelopmentConfig,
  firebaseConfig,
};

/**
 * File: config.ts
 * Author: Joonas Nislin
 * Date: 14.8.2023
 * Description: This file contains Firebase configuration.
 * For Firebase JS SDK v7.20.0 and later, measurementId is optional
 * Check .env.example for environment variables
 */

const firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  projectId: process.env.PROJECT_ID,
  databaseURL: process.env.DATABASE_URL,
  storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId: process.env.MESSAGING_SENDER_ID,
  appId: process.env.APP_ID,
  measurementId: process.env.MEASUREMENT_ID,
};

export default {
  firebaseConfig,
};

/**
 * File: firebase.ts
 * Author: Joonas Nislin
 * Date: 12.8.2023
 * Description: This file contains Firebase initialization.
 * Import Firebase functions that are needed in the app
 * Available Firebase libraries
 * https://firebase.google.com/docs/web/setup#available-libraries
 */

import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';
import config from './config';

// Initialize Firebase
const app = initializeApp(config.firebaseConfig);
const database = getDatabase(app);

// Export initialized app and database
export { app, database };

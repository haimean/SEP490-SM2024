import dotenv from 'dotenv';
import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';
dotenv.config();
// See: https://firebase.google.com/docs/web/learn-more#config-object
const firebaseConfig = {
  apiKey: process.env.FIREBASE_APIKEY,
  authDomain: process.env.FIREBASE_AUTHDOMAIN,
  databaseURL: process.env.FIREBASE_DBURL,
  projectId: process.env.FIREBASE_PRJID,
  storageBucket: process.env.FIREBASE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSSEND,
  appId: process.env.FIREBASE_APPID,
  measurementId: process.env.FIREBASE_MEASUEMENID,
  // The value of `databaseURL` depends on the location of the database
};

// Initialize Firebase
export const appFirebase = initializeApp(firebaseConfig);

// Initialize Realtime Database and get a reference to the service
export const databaseFirebase = getDatabase(appFirebase);

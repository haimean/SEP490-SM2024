import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
// import dotenv from "dotenv";

// dotenv.config();
// See: https://firebase.google.com/docs/web/learn-more#config-object
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTHDOMAIN,
  databaseURL: import.meta.env.VITE_FIREBASE_DBURL,
  projectId: import.meta.env.VITE_FIREBASE_PRJID,
  storageBucket: import.meta.env.VITE_FIREBASE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSSEND,
  appId: import.meta.env.VITE_FIREBASE_APPID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUEMENID,
  // The value of `databaseURL` depends on the location of the database
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Realtime Database and get a reference to the service
export const dbFireBase = getDatabase(app);

// src/firebase/config.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// const firebaseConfig = {
//   apiKey: "AIzaSyBjmBLfaz-lM9q82hXquEzEdWZbLw3oFWA",
//   authDomain: "agenda-del-runner-test.firebaseapp.com",
//   projectId: "agenda-del-runner-test",
//   storageBucket: "agenda-del-runner-test.firebasestorage.app",
//   messagingSenderId: "903464186081",
//   appId: "1:903464186081:web:be9b3491c43928e78107a0"
// };

// firestore/config.js

export const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};


// Inicializar Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
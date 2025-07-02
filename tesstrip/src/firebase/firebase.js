// src/firebase/firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAUmTMhrQMCrCsHUAIhp1-gn4NnWI1OtpM",
  authDomain: "tesstripweb.firebaseapp.com",
  projectId: "tesstripweb",
  storageBucket: "tesstripweb.appspot.com",
  messagingSenderId: "349207773401",
  appId: "1:349207773401:web:ebb85ada516903e35e3ec8",
  measurementId: "G-SWQ0DLYFT9"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };

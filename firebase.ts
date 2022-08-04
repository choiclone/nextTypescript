// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDrXrfhp1VQ9Cb96-7zvU3dR0q_4rAuaCU",
  authDomain: "netflix-clone-nt-25f65.firebaseapp.com",
  projectId: "netflix-clone-nt-25f65",
  storageBucket: "netflix-clone-nt-25f65.appspot.com",
  messagingSenderId: "568056672435",
  appId: "1:568056672435:web:294f7f9617a07fdb8580c6"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore();
const auth = getAuth();

export default app;
export { auth, db };
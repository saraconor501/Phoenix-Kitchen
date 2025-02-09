// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCEaNze5wjmP4CRCYWDpL31yVYGo2cjk00",
  authDomain: "phoenix-kitchen.firebaseapp.com",
  projectId: "phoenix-kitchen",
  storageBucket: "phoenix-kitchen.firebasestorage.app",
  messagingSenderId: "163516191772",
  appId: "1:163516191772:web:e3d9b459d76b736f94bbd9",
  measurementId: "G-W29JXN7ZPK"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const auth = getAuth(app)
export const db = getFirestore(app)
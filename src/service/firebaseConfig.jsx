// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAJVpP6wafNyxy5gycpNFu8SITkF0RhfAM",
  authDomain: "travel-8398f.firebaseapp.com",
  projectId: "travel-8398f",
  storageBucket: "travel-8398f.firebasestorage.app",
  messagingSenderId: "724737994905",
  appId: "1:724737994905:web:39136f8e33fffc04184808",
  measurementId: "G-9JR6G68GL1"
};

// Initialize Firebase
 export const app = initializeApp(firebaseConfig);
 export const db= getFirestore(app);
// const analytics = getAnalytics(app);

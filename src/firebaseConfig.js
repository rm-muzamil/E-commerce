// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC5EiINKj30xWwrCjPtMoX6Fa5Qgko23qw",
  authDomain: "e-commerce-by-rm.firebaseapp.com",
  projectId: "e-commerce-by-rm",
  storageBucket: "e-commerce-by-rm.firebasestorage.app",
  messagingSenderId: "93376712257",
  appId: "1:93376712257:web:ff61fcffcfa2d75ecfc0c0",
  measurementId: "G-HNNCRCEFQJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
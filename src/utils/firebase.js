// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBql7bZp4MY48IUb26PqVK833BmE4OxXiQ",
  authDomain: "netflixgpt-3fc49.firebaseapp.com",
  projectId: "netflixgpt-3fc49",
  storageBucket: "netflixgpt-3fc49.appspot.com",
  messagingSenderId: "227789064327",
  appId: "1:227789064327:web:9a6401b68a4b7b61321022",
  measurementId: "G-BJ1CHR6KQ0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();
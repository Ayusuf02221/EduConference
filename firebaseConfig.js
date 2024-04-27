// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyByih6YDhfAvMEry7fhwCb7Y6WgtxLalU4",
  authDomain: "educonference-744b1.firebaseapp.com",
  projectId: "educonference-744b1",
  storageBucket: "educonference-744b1.appspot.com",
  messagingSenderId: "767808620644",
  appId: "1:767808620644:web:f196a171158fa0b4b8b771",
  measurementId: "G-MKJH9Q0HCD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
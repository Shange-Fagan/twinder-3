// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional


// Initialize Firebase
const app = initializeApp({
  apiKey: "AIzaSyAST7kOtpqeZYkZa5DkrSMpFV3M94pE374",
  authDomain: "twinder-7b30d.firebaseapp.com",
  projectId: "twinder-7b30d",
  storageBucket: "twinder-7b30d.appspot.com",
  messagingSenderId: "236293699216",
  appId: "1:236293699216:web:6a4293da3023ded8ef8a15",
  measurementId: "G-NMXGVL36N4"
});
// const analytics = getAnalytics(app);
const auth = getAuth();
const db = getFirestore();

export { auth, db };
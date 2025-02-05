// Import the functions you need from the SDKs you need
import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyADjpWK8kD_5K0-EQP397KYW81hNW-5hl8",
  authDomain: "react-of-auth-project.firebaseapp.com",
  projectId: "react-of-auth-project",
  storageBucket: "react-of-auth-project.firebasestorage.app",
  messagingSenderId: "257965738774",
  appId: "1:257965738774:web:7123d8e4293416be581e37"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export default auth;
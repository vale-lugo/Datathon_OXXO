// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDAWnmtcv5ST-uWNgG3bnEyKV2iDJb07Io",
  authDomain: "neural-drip.firebaseapp.com",
  projectId: "neural-drip",
  storageBucket: "neural-drip.firebasestorage.app",
  messagingSenderId: "663747372185",
  appId: "1:663747372185:web:14a9403ed61abad0020408",
  measurementId: "G-GJ9XV48C5P"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
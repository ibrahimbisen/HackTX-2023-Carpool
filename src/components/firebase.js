// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBVbg6Fiewh8i0TjghRCcI9NGzJIrxPPd0",
  authDomain: "hacktx2023-carpool-77ebd.firebaseapp.com",
  projectId: "hacktx2023-carpool-77ebd",
  storageBucket: "hacktx2023-carpool-77ebd.appspot.com",
  messagingSenderId: "762994420279",
  appId: "1:762994420279:web:0a5ce157aa688d1f7fedb2",
  measurementId: "G-30BPRM8WN6",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const db = getFirestore(app);

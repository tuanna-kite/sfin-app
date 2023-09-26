import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyAQZrin9ZrzGZKeghxtt34Gb6HsGtFR1Ew",
  authDomain: "sfin-85748.firebaseapp.com",
  projectId: "sfin-85748",
  storageBucket: "sfin-85748.appspot.com",
  messagingSenderId: "284000042750",
  appId: "1:284000042750:web:2fe81c9687f192327f2faf",
  measurementId: "G-DWYMJKC1LP"
};

const firebaseApp = initializeApp(firebaseConfig);
export const firebaseAuth = getAuth(firebaseApp);
export const firebaseDb = getFirestore(firebaseApp);
export const firebaseStorage = getStorage(firebaseApp);
export default firebaseApp;
// For more information on how to access Firebase in your project,
// see the Firebase documentation: https://firebase.google.com/docs/web/setup#access-firebase

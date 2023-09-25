import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBthVISrR7ZXO4Vu56gGyHAWHG1kzXJwow",
  authDomain: "practice-d2619.firebaseapp.com",
  projectId: "practice-d2619",
  storageBucket: "practice-d2619.appspot.com",
  messagingSenderId: "912870007169",
  appId: "1:912870007169:web:bbf7dd5454325730004880",
  measurementId: "G-DZL8RZZ9Z6",
};

const firebaseApp = initializeApp(firebaseConfig);
export const firebaseAuth = getAuth(firebaseApp);
export const firebaseDb = getFirestore(firebaseApp);
export const firebaseStorage = getStorage(firebaseApp);
export default firebaseApp;
// For more information on how to access Firebase in your project,
// see the Firebase documentation: https://firebase.google.com/docs/web/setup#access-firebase

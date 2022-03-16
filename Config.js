// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAh5QjPxy7VTLGIXBuZyIUBVvizl4e6iDY",
  authDomain: "odysseyapp-68ab0.firebaseapp.com",
  databaseURL: "https://odysseyapp-68ab0-default-rtdb.firebaseio.com",
  projectId: "odysseyapp-68ab0",
  storageBucket: "odysseyapp-68ab0.appspot.com",
  messagingSenderId: "222943303341",
  appId: "1:222943303341:web:1f3a76ffa1586eb02cd824",
  measurementId: "G-273YJN3B8W",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

// Firestore database
export const db = getFirestore();

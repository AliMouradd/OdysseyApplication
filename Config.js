// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "firebase api",
  authDomain: "DB AuthDomain",
  databaseURL: "DataBase URL",
  projectId: "DBProject ID",
  storageBucket: "db storage bucket",
  messagingSenderId: "messaginSenderID",
  appId: "APP ID",
  measurementId: "Measure id",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

// Firestore database
export const db = getFirestore();

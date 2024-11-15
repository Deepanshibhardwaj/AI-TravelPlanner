// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAD30WMp7KufpfasBqx5elgklsbVjpmnZo",
  authDomain: "ai-travel-planner-11da5.firebaseapp.com",
  projectId: "ai-travel-planner-11da5",
  storageBucket: "ai-travel-planner-11da5.firebasestorage.app",
  messagingSenderId: "526963840123",
  appId: "1:526963840123:web:ff179e8d753522027fbede",
  measurementId: "G-XKB8TXLHQL"
};

// Initialize Firebase
 export const app = initializeApp(firebaseConfig);
 export const db =getFirestore(app);

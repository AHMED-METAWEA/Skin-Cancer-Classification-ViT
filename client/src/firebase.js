// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyC8G7DpDCBFMlhOJxUWYlxChCLYP2N1oxU",
  authDomain: "safeskin-dcba8.firebaseapp.com",
  projectId: "safeskin-dcba8",
  storageBucket: "safeskin-dcba8.firebasestorage.app",
  messagingSenderId: "1029607858737",
  appId: "1:1029607858737:web:06f8674058376878a3eb10",
  measurementId: "G-P9VSLR71PC"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const analytics = getAnalytics(app);
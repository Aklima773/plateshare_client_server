// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCPsl4gL_Vui2A6eOrqD0iZ-cSmvhNPZgE",
  authDomain: "plateshare-89737.firebaseapp.com",
  projectId: "plateshare-89737",
  storageBucket: "plateshare-89737.firebasestorage.app",
  messagingSenderId: "314348055851",
  appId: "1:314348055851:web:8e96248cbc2cdcabdea96e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
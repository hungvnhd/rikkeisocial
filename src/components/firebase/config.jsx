// Import the functions you need from the SDKs you need

import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAG5NaMDy52e7f-_w-VdXc-XoqV2ZYZr0Y",
  authDomain: "rikkeichat-94b17.firebaseapp.com",
  projectId: "rikkeichat-94b17",
  storageBucket: "rikkeichat-94b17.appspot.com",
  messagingSenderId: "629791864097",
  appId: "1:629791864097:web:3b6b70e7db097a5bb47a60",
  measurementId: "G-66TBPVXQ9Q",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const db = firebase.firestore();

export default firebase;

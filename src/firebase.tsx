// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "my-blog-df051.firebaseapp.com",
  projectId: "my-blog-df051",
  storageBucket: "my-blog-df051.appspot.com",
  messagingSenderId: "922697004465",
  appId: "1:922697004465:web:a0ec43ca9c71902e41b990",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

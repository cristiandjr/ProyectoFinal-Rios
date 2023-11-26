import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "codermmerce.firebaseapp.com",
  projectId: "codermmerce",
  storageBucket: "codermmerce.appspot.com",
  messagingSenderId: "1052107638863",
  appId: "1:1052107638863:web:934e29708fa1cb9c01423a"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
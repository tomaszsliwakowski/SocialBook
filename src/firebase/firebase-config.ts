import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAbDC84r1h3MAf_SivshRvPzP1h2vCH5Io",
  authDomain: "blog-8b642.firebaseapp.com",
  projectId: "blog-8b642",
  storageBucket: "blog-8b642.appspot.com",
  messagingSenderId: "199025205574",
  appId: "1:199025205574:web:2c5e3a0cd9d60f95d20547",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDQc8fko7Hfo2R8wqNwqyS0S-I82SeM-6w",
  authDomain: "haishin-32cbb.firebaseapp.com",
  projectId: "haishin-32cbb",
  storageBucket: "haishin-32cbb.firebasestorage.app",
  messagingSenderId: "535597979065",
  appId: "1:535597979065:web:2c9dfbb59297e3283ad268",
  measurementId: "G-YXLB4Z5GVN"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

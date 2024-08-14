import { initializeApp } from "firebase/app";
import { collection, getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA98uoOEtkXkgtaU-04RwAnTsL3ZTZrQWo",
  authDomain: "vue-eats-23793.firebaseapp.com",
  projectId: "vue-eats-23793",
  storageBucket: "vue-eats-23793.appspot.com",
  messagingSenderId: "516270129103",
  appId: "1:516270129103:web:ff8c5659d26d5faa8a5cba",
};

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);

const db = getFirestore(firebaseApp);

export const cafesRefs = collection(db, 'cafes')

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyCE5PlZUK0I6FkZ-ito4pvjEGdoRS6YQjc",
  authDomain: "react-native-e6a8f.firebaseapp.com",
  projectId: "react-native-e6a8f",
  storageBucket: "react-native-e6a8f.appspot.com",
  messagingSenderId: "616187244772",
  appId: "1:616187244772:web:e6306556524dc57dc23cf1",
  measurementId: "G-EK0XLXYSS3"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth (app);
export const db = getFirestore();
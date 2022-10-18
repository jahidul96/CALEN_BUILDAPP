import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";
import { initializeFirestore } from "firebase/firestore";
// import {initializeFirestore} from 'firebase/firestore'

export const firebaseConfig = {
  apiKey: "AIzaSyAKISgkLpc0jWWy6oPGUeOw04HSHyHmX1c",

  authDomain: "expodemopractice.firebaseapp.com",

  projectId: "expodemopractice",

  storageBucket: "expodemopractice.appspot.com",

  messagingSenderId: "847447105011",

  appId: "1:847447105011:web:7b992021e382e006a98686",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = initializeFirestore(app, {
  experimentalForceLongPolling: true,
});
export const storage = getStorage(app);

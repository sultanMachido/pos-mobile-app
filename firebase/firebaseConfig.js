// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { collection, getFirestore } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBrqT9ft_EuPgeznZuomu2ydlbpnwl1WLk",
  authDomain: "inventory-app-987f8.firebaseapp.com",
  projectId: "inventory-app-987f8",
  storageBucket: "inventory-app-987f8.appspot.com",
  messagingSenderId: "296406602765",
  appId: "1:296406602765:web:27b41bf6bd06af7a513144",
  measurementId: "G-TMBP883MJ2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


//initialize services
 export const db = getFirestore(app)
 console.log(db,'db')

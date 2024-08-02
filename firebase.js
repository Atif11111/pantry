// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAVNyiplF2bbZyvIDBEuYdMP2yu2dslHTU",
  authDomain: "hspantryapp-9ae4d.firebaseapp.com",
  projectId: "hspantryapp-9ae4d",
  storageBucket: "hspantryapp-9ae4d.appspot.com",
  messagingSenderId: "277493372140",
  appId: "1:277493372140:web:543b64d82518ea71fbc1c9",
  measurementId: "G-VHP3SMEKSR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);
const analytics = getAnalytics(app);
export {
  app,
  firestore
}
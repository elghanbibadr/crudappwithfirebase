// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCiu3iEQsPf_4pO1wvsrIdRvrqaPo3j1SI",
  authDomain: "booksshelf-1dbfb.firebaseapp.com",
  projectId: "booksshelf-1dbfb",
  storageBucket: "booksshelf-1dbfb.appspot.com",
  messagingSenderId: "676031496108",
  appId: "1:676031496108:web:f2f4e3712753b46e668409"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db=getFirestore(app)
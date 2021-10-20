
import 'firebase/firestore';
import 'firebase/auth';
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { GoogleAuthProvider } from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {

    apiKey: "AIzaSyDgaIh5PjbGy7AZMP-je70YYBCuIvwMVVg",
    authDomain: "react-app-a8754.firebaseapp.com",
    projectId: "react-app-a8754",
    storageBucket: "react-app-a8754.appspot.com",
    messagingSenderId: "638889815434",
    appId: "1:638889815434:web:02f71b533a101a844d6c73"
    //tuinformación de tu app en firebase
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore();

const googleAuthProvider = new GoogleAuthProvider();

export {
    app,
    db,
    googleAuthProvider
}
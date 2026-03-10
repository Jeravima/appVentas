import {getAuth} from 'firebase/auth'
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDVhOaYiADI2paJK95Qlu0HhGg60un1irc",
    authDomain: "appventas94.firebaseapp.com",
    projectId: "appventas94",
    storageBucket: "appventas94.firebasestorage.app",
    messagingSenderId: "820686726986",
    appId: "1:820686726986:web:2757d7b073ac799cdd43b3",

};

// Initialize Firebase
const appFirebase = initializeApp(firebaseConfig);


export const auth = getAuth(appFirebase)
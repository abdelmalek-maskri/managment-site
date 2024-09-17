import firebase from "firebase";
import "firebase/firestore";
import "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyADUjNM2epD7lPkX0rV8JHyEQXasOLXEog",
    authDomain: "management-site-32f28.firebaseapp.com",
    projectId: "management-site-32f28",
    storageBucket: "management-site-32f28.appspot.com",
    messagingSenderId: "135264379276",
    appId: "1:135264379276:web:0daf7ead4791ae17bcb6a9"
};

firebase.initializeApp(firebaseConfig);

const projectAuth = firebase.auth();

const db = firebase.firestore();

//timestamp

const timestamp = firebase.firestore.Timestamp;

export { projectAuth, db , timestamp};


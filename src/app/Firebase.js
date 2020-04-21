import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDFqHPgSpo8h-YBJ3iNaLzpnzr6s60yk7w",
    authDomain: "paeweb-e3848.firebaseapp.com",
    databaseURL: "https://paeweb-e3848.firebaseio.com",
    projectId: "paeweb-e3848",
    storageBucket: "paeweb-e3848.appspot.com",
    messagingSenderId: "1013155139131",
    appId: "1:1013155139131:web:2924d16ec0b5153a6ed61e",
    measurementId: "G-JQVVDLE1R7"
};

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const firestore = firebase.firestore();
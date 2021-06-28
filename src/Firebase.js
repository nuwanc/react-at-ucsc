import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';


// Initialize Firebase
const config = {
    apiKey: "AIzaSyBcccBN0sVdnrVIVC33s0G8JFiOKPOS_-E",
    authDomain: "react-at-ucsc.firebaseapp.com",
    projectId: "react-at-ucsc",
    storageBucket: "react-at-ucsc.appspot.com",
    messagingSenderId: "813818995137",
    appId: "1:813818995137:web:c5bfdb146f3c9c565a8f40"
};
firebase.initializeApp(config);
const db = firebase.firestore();
const auth = firebase.auth();
export {db , auth};
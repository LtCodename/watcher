import firebase from 'firebase'

const firebaseConfig = {
    apiKey: "AIzaSyAPqEWX9_Rf42-bVy_x0rYYRjkVRXmWZjE",
    authDomain: "watcher-2932.firebaseapp.com",
    databaseURL: "https://watcher-2932.firebaseio.com",
    projectId: "watcher-2932",
    storageBucket: "watcher-2932.appspot.com",
    messagingSenderId: "445629515970",
    appId: "1:445629515970:web:7022bb511ff8058bb9135b",
    measurementId: "G-QN3767WMBQ"
};

const fire = firebase.initializeApp(firebaseConfig);
export default fire;

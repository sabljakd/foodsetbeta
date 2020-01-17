import firebase from 'firebase';
import 'firebase/firestore'
import 'firebase/firebase-auth'
import 'firebase/storage'
require('firebase/firestore');

  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyAezm6978LtfoF0hWIVO_f0Wdm7pjGxNAw",
    authDomain: "foodset-c1188.firebaseapp.com",
    databaseURL: "https://foodset-c1188.firebaseio.com",
    projectId: "foodset-c1188",
    storageBucket: "foodset-c1188.appspot.com",
    messagingSenderId: "981306447001",
    appId: "1:981306447001:web:242791a338529cde755408"
  };

  export const fb = firebase.initializeApp(config);
  const db = firebase.firestore();

  export {db}
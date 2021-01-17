import firebase from 'firebase';
require('@firebase/firestore');

const firebaseConfig = {
  apiKey: "AIzaSyCjdIqK7fyl-Au0vUf6SXUaOjXsm1EO1Fo",
  authDomain: "barter-app-f7b55.firebaseapp.com",
  projectId: "barter-app-f7b55",
  storageBucket: "barter-app-f7b55.appspot.com",
  messagingSenderId: "430943394351",
  appId: "1:430943394351:web:32bf15bfe66de9218384da",
  measurementId: "G-2EREV7ZJVM"
};

firebase.initializeApp(firebaseConfig);

export default firebase.firestore();
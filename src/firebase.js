import firebase from "firebase"

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBuXjtYmkB8_j2DWWbj3csWgCrSdx0_d2w",
    authDomain: "bt3103-week-6-dbdfb.firebaseapp.com",
    projectId: "bt3103-week-6-dbdfb",
    storageBucket: "bt3103-week-6-dbdfb.appspot.com",
    messagingSenderId: "24160324816",
    appId: "1:24160324816:web:866d15c076372bd95222d5",
    measurementId: "G-RDPHE54QV3"
  };

  firebase.initializeApp(firebaseConfig);
  var database = firebase.firestore();
  export default database;
import firebase from "firebase";
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyA9PVMPZTQjVARZ0TeEeFs_F7iK2HRicAM",
  authDomain: "instagram-clonerk.firebaseapp.com",
  databaseURL: "https://instagram-clonerk.firebaseio.com",
  projectId: "instagram-clonerk",
  storageBucket: "instagram-clonerk.appspot.com",
  messagingSenderId: "1042088357813",
  appId: "1:1042088357813:web:89b8c47ec25655d9d433fc",
  measurementId: "G-MTME0TDJHD",
});

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export { db, auth, storage };

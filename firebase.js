import firebase from "firebase/compat/app";
import { initializeApp } from "@firebase/app";
import { getFirestore } from "@firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBdCmdVtJaxK4ybIywQQnf4G62OhVC9OXI",
  authDomain: "chitchatchoot.firebaseapp.com",
  projectId: "chitchatchoot",
  storageBucket: "chitchatchoot.appspot.com",
  messagingSenderId: "1049735740335",
  appId: "1:1049735740335:web:340f8dbaef50ee41dccd5a",
  measurementId: "G-L8DY8KHYY9",
};

const app = !firebase.apps.length
  ? initializeApp(firebaseConfig)
  : firebase.app();

const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { db, auth, provider };

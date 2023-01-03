import { initializeApp } from "firebase/app";
import store from "../store"
import { 
    getAuth, 
    setPersistence, 
    browserSessionPersistence, 
    onAuthStateChanged, 
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    GoogleAuthProvider,
    signInWithPopup,
    signOut,
} from "@firebase/auth";
import {
  getDatabase,
  ref,
  set,
  child,
  get,
  update,
  remove,
} from "@firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyBYG43e-GJZGiZcQ7f9ckz31lKx2uIGUmw",
    authDomain: "memorvise.firebaseapp.com",
    databaseURL: "https://memorvise-default-rtdb.firebaseio.com",
    projectId: "memorvise",
    storageBucket: "memorvise.appspot.com",
    messagingSenderId: "1036407656797",
    appId: "1:1036407656797:web:25e9a78566e4873b5018b4",
    measurementId: "G-HE85QZ5SHZ"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const realdb = getDatabase();

setPersistence(auth, browserSessionPersistence)
.then(async () => {
    if(auth.currentUser){
        store.commit("SET_USER", auth.currentUser);
        store.dispatch("loadSubjects");                   
    }
})
.catch((error) => {
    alert(error.message)
})

export {
    getAuth, 
    setPersistence, 
    browserSessionPersistence, 
    onAuthStateChanged, 
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    GoogleAuthProvider,
    signInWithPopup,
    signOut,
    getDatabase,
    ref,
    set,
    child,
    get,
    update,
    remove,
    auth, 
    realdb
};
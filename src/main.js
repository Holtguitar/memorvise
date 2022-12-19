// import { createApp } from 'vue';
// import App from './App.vue';
// import router from './router';
// import store from "./store";
// import useStore from "./store"
// import './assets/main.css';
// import { initializeApp } from "firebase/app";
// import {getAuth, setPersistence, browserSessionPersistence, onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth"
// const firebaseConfig = {
//     apiKey: "AIzaSyBYG43e-GJZGiZcQ7f9ckz31lKx2uIGUmw",
//     authDomain: "memorvise.firebaseapp.com",
//     databaseURL: "https://memorvise-default-rtdb.firebaseio.com",
//     projectId: "memorvise",
//     storageBucket: "memorvise.appspot.com",
//     messagingSenderId: "1036407656797",
//     appId: "1:1036407656797:web:25e9a78566e4873b5018b4",
//     measurementId: "G-HE85QZ5SHZ"
// };
// createApp(App).use(store).use(router).mount("#app");
// initializeApp(firebaseConfig);

// const auth = getAuth();
// setPersistence(auth, browserSessionPersistence)
//     .then(async () => {
//         if(auth.currentUser){
//             store.commit("SET_USER", auth.currentUser);
//             await store.dispatch("loadSubjects");                    
//         }
//     })
//     .catch((error) => {
//         alert(error.message)
//     })
import { createApp, onRenderTriggered } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./assets/main.css";

createApp(App).use(store).use(router).mount("#app");


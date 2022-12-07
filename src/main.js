import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from "./store";
import './assets/main.css'

// firebase compnents
import { initializeApp } from "firebase/app";

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

initializeApp(firebaseConfig);
// const app = createApp(App)
// app.use(router)
// app.use(store)
// app.mount('#app')

createApp(App).use(store).use(router).mount("#app");

<template>
  <h1>Sign in or create an account</h1>
  <p><input type="text" placeholder="Email" v-model="email"/></p>
  <p><input type="password" placeholder="Password" v-model="password"/></p>
  <p><button @click="signIn">Sign In</button></p>
  <p><button @click="register">Register New Account</button></p>
  <p><button @click="signInWithgoogle">Sign in with Google</button></p>
</template>
  
<script setup>
  import {ref} from "vue";
  import {getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup} from "firebase/auth";
  import { useRouter } from "vue-router";

  const email = ref("");
  const password = ref("");
  const router = useRouter();
  const errMsg = ref();

  const signIn = () => {
    signInWithEmailAndPassword(getAuth(), email.value, password.value).then((data) => {
      router.push("/")
    }).catch((error) => {
      alert(error.message);
      switch(error.code) {
        case "auth/invalid-email":
          errMsg.value = "Invalid Email";
          break;
        case "auth/user-not-found":
          errMsg.value = "No account exists with that email.";
          break;
        case "auth/wrong-password":
          errMsg.value = "Incorrect password";
          break;
        default:
          errMsg.value = "Email or password was incorrect";
          break;
      }
    })
  };

  const register = () => {
    createUserWithEmailAndPassword(getAuth(), email.value, password.value).then((data) => {
      router.push("/")
    }).catch((error) => {
      alert(error.message);
    })

  };

  const signInWithgoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(getAuth(), provider).then((result) => {
      router.push("/")
    }).catch((error) => {

    })
  };
</script>
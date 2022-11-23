<script setup>
</script>

<template>
  <nav>
    <router-link class="nav-item" id="home" to="/"  v-if="isLoggedIn">Home</router-link>
    <router-link class="nav-item" id="cards" to="/cards" v-if="isLoggedIn">Cards</router-link>
    <router-link class="nav-item" id="card-creator" to="/card-creator" v-if="isLoggedIn">Card Creator</router-link>
    <router-link class="nav-item" id="sign-in" to="/sign-in" v-if="!isLoggedIn">Sign In</router-link>
    <button @click="handleSignOut" id="sign-out" v-if="isLoggedIn">Sign Out</button>
  </nav>
  <router-view/>
</template>

<script setup>
  import {onMounted, ref} from "vue";
  import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
  import router from "./router"

  const isLoggedIn = ref(false);

  let auth;
  onMounted(() => {
    auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if(user){
        isLoggedIn.value = true;
      } else {
        isLoggedIn.value = false;
      }
    })
  });

  const handleSignOut = () => {
    signOut(auth).then(() => {
      router.push("/sign-in");
    })
  }
</script>

<style>

nav {
  /* position: flex;
  background-color: rgb(109, 15, 15);
  width: 110vw;
  height: 150px;
  text-align: center;
  left: -10%;
  top: -4% */

  position: -webkit-sticky;
  /* position: fixed; */
  display: flex;
  margin-top: -1%;
  -webkit-justify-content: space-between;
  justify-content: space-between;
  background-color: rgb(108, 10, 10);
  margin-bottom: 50px !important;
}

.nav-item {
  margin-right: 30px;
  padding: 5px;
  top: 30%;
}

#sign-out, #sign-in {
  /* top: 25%;
  float: right;
  right: 15%; */
}

</style>
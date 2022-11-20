<script setup>
</script>

<template>
  <nav>
    <router-link class="nav-item" to="/">Home</router-link>
    <router-link class="nav-item" to="/cards" v-if="isLoggedIn">Cards</router-link>
    <router-link class="nav-item" to="/card-creator" v-if="isLoggedIn">Card Creator</router-link>
    <router-link class="nav-item" to="/sign-in" v-if="!isLoggedIn">Sign In</router-link>
    <button @click="handleSignOut" v-if="isLoggedIn">Sign Out</button>
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

.nav-item {
  margin-right: 30px;
  padding: 5px;
  width: 10px
}

</style>
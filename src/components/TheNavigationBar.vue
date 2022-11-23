<!-- <script setup>
</script>

<template>
  <nav>
    <router-link class="nav-item" to="/">Home</router-link>
    <router-link class="nav-item" to="/cards" v-if="isLoggedIn">Cards</router-link>
    <router-link class="nav-item" to="/card-creator" v-if="isLoggedIn">Card Creator</router-link>
    <router-link class="nav-item" to="/sign-in" v-if="!isLoggedIn">Sign In</router-link>
    <button @click="handleSignOut" v-if="isLoggedIn">Sign Out</button>
  </nav>
</template>

<script>
  import {onMounted, ref} from "vue";
  import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
//   import router from "router"

  export default {
    data(){
        return{
            isLoggedIn: ref(false), 
            auth: getAuth()
        }
    },
    methods: {
        handleSignOut(){
            signOut(auth).then(() => {
                router.push("/sign-in")
            })
        }
    },
    onMounted(){
        onAuthStateChanged(auth, (user) => {
            if(user){
            isLoggedIn.value = true;
        } else {
            isLoggedIn.value = false;
        }
    })
    }
  }
</script>

<style>

.nav {
  background-color: rgb(105, 169, 248);
}

.nav-item {
  margin-right: 30px;
  padding: 5px;
  width: 10px
}

</style> -->
<script setup>
  import TheNavigationBarVue from './components/TheNavigationBar.vue';
</script>

<template>
  <the-navigation-bar-vue></the-navigation-bar-vue>
  <router-view/>
</template>

<script>
  import {onMounted, ref} from "vue";
  import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
  import router from "./router"

  export default {
    components: {
      TheNavigationBarVue
    }
  }
</script>

<style>

</style>
<script setup>
  import TheNavigationBarVue from './components/TheNavigationBar.vue';
  import TheFooter from './components/TheFooter.vue';
</script>

<template>
  <the-navigation-bar-vue></the-navigation-bar-vue>
  <router-view/>
  <the-footer></the-footer>

</template>

<script>
  import {onMounted, ref} from "vue";
  import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
  import router from "./router"

  export default {
    components: {
      TheNavigationBarVue,
      TheFooter
    }
  }
</script>

<style>

</style>
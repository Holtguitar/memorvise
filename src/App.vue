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
  export default {
    components: {
      TheNavigationBarVue,
      TheFooter
    }
  }
</script>

<style>

</style>
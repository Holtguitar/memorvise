<template>
    <div>
      <div class="footer-bar">
        <!-- <router-link id="logo" to="/" v-if="this.store.state.user">Memorvise</router-link>
        <div id="logo-else" to="/" v-else>Memorvise</div>
        <router-link class="footer-item" id="home" to="/" v-if="this.store.state.user">Account Info</router-link>
        <router-link class="footer-item" id="cards" to="/cards" v-if="this.store.state.user">Cards</router-link>
        <router-link class="footer-item" id="card-creator" to="/card-creator" v-if="this.store.state.user">Create</router-link>
        <router-link  id="sign-in" to="/sign-in" v-if="!this.store.state.user">Sign In</router-link>
        <button @click="handleSignOut"  id="sign-out" v-if="this.store.state.user">Sign Out</button> -->
        </div>
    </div>
  </template>
  
  <script>
    import { useStore } from "vuex"
  
    export default {
      data(){
        return {
          store: useStore()
        }
      },
      methods: {
        handleSignOut(){
          this.store.dispatch("logout");
        }
      }
    }
  
  </script>
  
  <style>
    .footer-bar {
      position: fixed;
      display: flex;
      justify-content: center;
      text-align: center;
      width: 100vw;
      height: 70px;
      bottom: 0%;
      left: 0%;
      background-color: whitesmoke;
    }
  
    .footer-item {
      margin-right: 30px;
      padding: 5px;
      top: 30%;
      font-size: 30px;
      height: 60px;
      font-family: 'Shadows Into Light', cursive;
    }
  
    .footer-item:hover {
      text-decoration: underline;
    }
  
    /* #logo {
      position: absolute;
      padding: 5px;
      top: 30%;
      left: 5%;
      font-size: 30px;
      height: 60px;
      font-family: 'Playball', cursive;
      text-decoration: underline;
    } */
  
    /* #logo-else {
      position: absolute;
      padding: 5px;
      top: 30%;
      left: 5%;
      font-size: 30px;
      height: 60px;
      font-family: 'Playball', cursive;
      text-decoration: underline;
      color: rgb(16, 122, 87)
    } */
  
    /* #sign-out, #sign-in {
      position: absolute;
      margin-right: 30px;
      padding: 5px;
      top: 30%;
      left: 80%;
      font-size: 30px;
      height: 60px;
      border: none;
      background-color: transparent;
      text-decoration: none;
      color: rgb(16, 122, 87);
      font-weight: 600;
      font-family: 'Shadows Into Light', cursive;
      
      padding: calc(var(--g) + var(--b));
      --_g: #0000 25%,var(--c) 0;
      background: 
        conic-gradient(from 180deg at top    var(--b) right var(--b),var(--_g))
        var(--_i,200%) 0  /200% var(--_i,var(--b))  no-repeat,
        conic-gradient(            at bottom var(--b) left  var(--b),var(--_g))
        0   var(--_i,200%)/var(--_i,var(--b)) 200%  no-repeat;
      transition: .3s, background-position .3s .3s;
      cursor: pointer;
    }
  
    #sign-in {
      position: absolute;
    }
  
    #sign-out:hover, #sign-in:hover {
      --_i: 100%;
      transition: .3s, background-size .3s .3s;
      cursor: pointer;
    }
  
    #sign-out {
      background-color: transparent;
    } */
  
  </style>
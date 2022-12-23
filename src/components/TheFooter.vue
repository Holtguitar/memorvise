<template>
  <div class="footer-bar">
    <div class="doppio-section">
      <div class="doppio-text">Powered by © Doppio Web Designs</div>
      <a 
        class="doppio-link" 
        href="https://brandon-holt-portfolio.netlify.app/"
        target="_blank"
      >
        <img src="/doppio-logo.png" class="doppio-logo"/>
      </a>
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
      width: 100vw;
      height: 70px;
      bottom: 0%;
      left: 0%;
      background-color: whitesmoke;
    }
  
    .doppio-section {
      font-size: 13px;
      height: 60px;
      font-family: 'Short Stack', cursive;
      width: 400px;
      height: 100%;
      left: 40%;
      text-align: center;
      display: flex;
      flex-direction: row;
    }

    .doppio-logo {
      height: 100%;
      transform: rotate(19deg)
    }

    .doppio-text {
      top: 30%;
    }

    .doppio-link {
      top: 0%;
      width: 70px;
      height: 100%;
      left: 5%;
    }

    .doppio-link:hover {
      cursor:pointer;
    }

    @media (max-width: 900px) and (min-width: 380px){

      .footer-bar {
        height: 45px;
      }

      .doppio-section {
        left: 7%;
      }

      .doppio-link {
        left: 1%;
      }
    }  
  </style>
<template>
  <div v-if="store.state.user" class="account-info">
    <h2 class="account-title">Account Info:</h2>
    <p>Email: <span>{{this.email}}</span></p>
    <!-- <p>Total cards:</p> -->
    <p>Total Subjects: <span>{{subjects}}</span></p>
    <br/>
    <router-link class="delete-account" to="/sign-in" @click="this.deleteAccount()">Delete Account</router-link>
  </div>
  
</template>

<script>
  import {getAuth} from "firebase/auth";
  import { getDatabase, set, ref } from "@firebase/database";
  import {RouterLink} from "vue-router"
  import { Store, useStore } from "vuex";

  export default {
    data(){
      return{
        user: getAuth(),
        email: "",
        store: useStore(),
        subjects: 0,
        store: useStore()
      }
    },
    methods: {
      getAccountInfo() {
        this.email = this.store.state.user.email;
      },
      deleteAccount(){
        let confirmDelete = confirm("Are you sure you want to delete your account?")
        
        if(confirmDelete){
          const db = getDatabase();
          const userID = this.store.state.user.uid;
          const path = `cards/${userID}`
          const details = {db, path, userID}
          this.store.dispatch("deleteUser", details);
          
        }
        
      }, 
      loadSubjects(){
        this.store.dispatch("loadSubjects")
        if(this.store.state.subjects){
          this.subjects = this.store.state.subjects.length;
        }
      },
    },
    mounted(){
      if(this.store.state.user){
        this.getAccountInfo();
        this.loadSubjects();
      }
    }
  }
</script>

<style scoped>
  .account-info {
    position: fixed;
    width: 500px;
    height: fit-content;
    margin-top: 25px;
    padding: 5px;
    left: 32%;
    font-family: 'Shadows Into Light';
    font-size: 20px;
    font-weight: bolder;
    top: 25%;
    color: rgb(16, 122, 87);
  }

  .account-info p {
    font-size: 30px;
  }

  .account-info span {
    color: rgb(83, 84, 83);
  }

  .account-title {
    left: 30%;
    text-decoration: underline;
    font-family: 'Playball', cursive;
    /* font-size: 20px; */
    margin-bottom: 25px;
  }

  .delete-account {
    left: 32%;
    color: rgb(82, 1, 1);
    font-weight: 800;
  }

</style>
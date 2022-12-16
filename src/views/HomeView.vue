<template>
  <div v-if="store.state.user" class="account-info">
    <p>Email: <span>{{this.email}}</span></p>
    <p v-if="this.displayName">Name: <span>{{this.displayName}}</span></p>
    <p>Created: <span>{{this.accountCreationDate}}</span></p>
    <p>Topics: <span>{{subjectsLength}}</span></p>
    <br/>
    <router-link class="delete-account" to="/sign-in" @click="this.deleteAccount()">Delete Account</router-link>
  </div>
  <div class="cards-info">
    <p></p>
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
        store: useStore(),
        user: "",
        displayName: "",
        email: "",
        accountCreationDate: ""
      }
    },
    computed :{
      subjectsLength: () => {
        const store = useStore();
        const newArr = store.state.subjects;
        return newArr.length;
      }
    },
    methods: {
      getAccountInfo() {
        this.email = this.store.state.user.email;
        this.displayName = this.store.state.user.displayName;
        this.user = this.store.state.user;
        const created = this.user.metadata.creationTime;
        this.accountCreationDate = created.slice(0, -13)
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
      this.getAccountInfo();
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
    border-radius: 5%;
    background-color:#0bd692;
    box-shadow: 0 14px 28px rgba(0,0,0,0.25), 
    0 10px 10px rgba(0,0,0,0.22);
    padding: 35px;
    margin: 20px;
  }

  .account-info {
    /* display: flex;
    flex-direction: column;
    height: fit-content;
    border-radius: 5%;
    background-color:#0bd692;
    box-shadow: 0 14px 28px rgba(0,0,0,0.25), 
    0 10px 10px rgba(0,0,0,0.22);
    padding: 35px;
    margin: 20px; */
  }

  .account-info p {
    font-size: 30px;
  }

  .account-info span {
    color: rgb(38, 20, 140);
    font-family:fantasy;
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
    color: rgb(151, 0, 0);
    font-weight: 800;
  }

</style>
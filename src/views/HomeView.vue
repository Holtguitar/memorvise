<template>
  <div v-if="user" class="account-info">
    <h2 class="account-title">Account Info:</h2>
    <p>Email: <span>{{this.email}}</span></p>
    <!-- <p>Total cards:</p> -->
    <p>Total Subjects: <span>{{this.subjects.length}}</span></p>
    <br/>
    <router-link class="delete-account" to="/sign-in" @click="this.deleteAccount()">Delete Account</router-link>
  </div>
  
</template>

<script>
  import {getAuth} from "firebase/auth";
  import { getDatabase, set, ref } from "@firebase/database";
  import {RouterLink} from "vue-router"

  export default {
    data(){
      return{
        user: getAuth(),
        email: "",
        subjects: [],
      }
    },
    methods: {
      getAccountInfo() {
        this.email = this.user.currentUser.email;
        this.loadSubjects()
      },
      deleteAccount(){
        let confirmDelete = confirm("Are you sure you want to delete your account?")
        
        if(confirmDelete){
          const db = getDatabase();
          const auth = getAuth();
          const user = auth.currentUser.uid

          set(ref(db, user), {
            id: null,
          }).then(() => {
            this.user.currentUser.delete();
            window.location.href="/sign-in"
          }).catch((error) => {
            alert(error);
          });
        }
        
      }, 
      loadSubjects(){
      fetch(`https://memorvise-default-rtdb.firebaseio.com/${this.user.currentUser.uid}.json`)
      .then((res) => {
        if(res.ok){
          return res.json();
        }
      }).then((data) => {
        const subjects = [];
        for(const id in data){
          subjects.push({
            subjectOption: id,
          })
        };
        this.subjects = subjects;
      }).catch((error) => {
        this.error = error;
        alert(error);
      })
      
    },
    },
    mounted(){
      if(this.user){
        // setTimeout(this.getAccountInfo(), 100)
        this.getAccountInfo()
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
<template>
  <div class="account-info">
    <h2 class="account-title">Account Info:</h2>
    <p>Email: <p>{{this.email}}</p></p>
    <p>Display Name: <p>{{this.displayName}}</p></p>
    <p>Total cards:</p>
    <p>Total Subjects: {{this.subjects.length}}</p>
  </div>
  <router-link to="/sign-in" @click="this.deleteAccount()">Delete Account</router-link>
</template>

<script>
  import {getAuth} from "firebase/auth";
  import {RouterLink} from "vue-router"

  export default {
    data(){
      return{
        user: getAuth(),
        email: "",
        subjects: [],
        displayName: "None"
      }
    },
    methods: {
      getAccountInfo() {
        this.email = this.user.currentUser.email;
        this.displayName = this.user.currentUser.displayName;
        this.loadSubjects()
      },
      deleteAccount(){
        // alert("Are you sure?")
        this.user.currentUser.delete();
        
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
        setTimeout(this.getAccountInfo(), 300)
      }
    }
  }
</script>

<style scoped>
  .account-info {
    /* background-color: red; */
    width: 500px;
    height: fit-content;
    margin-top: 25px;
    padding: 5px;
    left: 28%;
    font-family: 'Shadows Into Light';
    font-size: 20px;
    top: -7%;
  }

  .account-info p {
    font-size: 30px;
  }

  .account-title {
    left: 30%;
    text-decoration: underline;
    font-family: 'Playball', cursive;
    /* font-size: 20px; */
    margin-bottom: 25px;
  }


</style>
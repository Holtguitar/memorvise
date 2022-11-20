<template>
  <h1>Home</h1>
  <div class="learning-summary">
    <h2>Learning Summary</h2>
    <p>Total cards:</p>
    <p>Total Subjects: {{this.subjects.length}}</p>
  </div>
  <div class="account-info">
    <h2>Account Info:</h2>
    <p>Email: <div>{{this.email}}</div></p>
    <p>Account created:</p>
    <!-- <button @click.prevent="getAccountInfo">Show account info</button> -->
    <!-- <button @click.prevent="deleteAccount">Delete Account</button> -->
  </div>
</template>

<script>
  import {getAuth} from "firebase/auth";

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
        this.user.deleteAccount;
        console.log("Account Deleted!")
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
            // subjectTitle: this.capFirst(id)
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
        setTimeout(this.loadSubjects, 300)
      }
    }
  }
</script>

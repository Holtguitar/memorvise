<template>
  <div  v-if="store.state.user">
    <div class="account-info">
    <p>Email: <span>{{this.email}}</span></p>
    <p v-if="this.displayName">Name: <span>{{this.displayName}}</span></p>
    <p>Created: <span>{{this.accountCreationDate}}</span></p>
    <p>Topics: <span>{{subjectsLength}}</span></p>
    <br/>
    <router-link class="delete-account" to="/sign-in" @click="this.deleteAccount()">Delete Account</router-link>
  </div>
  <div class="subject-editor">
    <h1>Topics <img src="\edit-icon.png" class="subject-edit-icon" @click.prevent="this.toggleEditMode()"/></h1>
    <hr/>
    <div v-for="(item, key) in subjects" class="subject-list">
      <p>{{item}} <img src="\cancel-icon.png" class="delete-subject-icon" style="width:25px;" v-if="this.editMode" @click.prevent="this.deleteSubject(item)"/></p>
    </div>
  </div>
  </div>
  <div v-else class="welcome-page">
    <h2 class="welcome-title">Memorwise</h2>
    <div class="welcome-message">A Key Tool For Your Learning Journey</div>
    <div class="scene scene--card">
      <div
          class="welcome-card"
          v-bind:class="{ flipme: cardOne == 'flipped' }">
          <div class="welcome-card__face welcome-card__face--front">
              <div class="front-details"><span class="first-word">{{firstWord}}</span> something <span class="last-word">{{lastWord}}</span></div>
          </div>
          <div class="welcome-card__face welcome-card__face--back">
          <div class="back-details">Learn something </div>
          </div>
      </div>
    </div>
  </div>
  
</template>

<script>
  import { getDatabase, set, ref } from "../firebase";
  import {RouterLink} from "vue-router"
  import { Store, useStore } from "vuex";

  export default {
    data(){
      return{
        store: useStore(),
        user: "",
        displayName: "",
        email: "",
        accountCreationDate: "",
        cardOne: "start",
        firstWord: "Write",
        lastWord: "new",
        subjects: this.$store.state.subjects,
        editMode: false
      }
    },
    computed :{
      subjectsLength: () => {
        const store = useStore();
        const newArr = store.state.subjects;
        return newArr.length;
      },
      subjectArr(){
        return this.store.state.stubjects
      }
    },
    methods: {
      deleteSubject(e){
        this.store.dispatch("deleteSubject", e);
        let arr = [];
        for(let value of Object.values(this.subjects)){
          if(value !== e){
            arr.push(value);
          } 
        };

        this.subjects = arr;
      },
      toggleEditMode(){
        this.editMode = !this.editMode;
      },
      welcomeAnimation(){
        setTimeout(() => {
          this.firstWord = "Study";
          this.lastWord = "often"

          setTimeout(() => {
            this.firstWord = "Memorize";
            this.lastWord = "well"
          }, 2000)
        }, 2000);
      },
      getAccountInfo() {
        this.loadSubjects();
        this.subjects = this.store.state.subjects;
        this.email = this.store.state.user.email;
        this.displayName = this.store.state.user.displayName;
        this.user = this.store.state.user;
        const created = this.user.metadata.creationTime;
        this.accountCreationDate = created.slice(0, -13)
      },
      deleteAccount(){
        let confirmDelete = confirm("Are you sure you want to delete your account?");
        
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
      } else {
        this.welcomeAnimation();
      }

    }
  }
</script>

<style scoped>
  .account-info {
    position: fixed;
    width: 500px;
    height: 350px;
    margin-top: 25px;
    padding: 5px;
    left: 22%;
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
    margin-bottom: 25px;
  }

  .delete-account {
    left: 32%;
    color: rgb(151, 0, 0);
    font-weight: 800;
  }

  .welcome-title {
    position: absolute;
    padding: 5px;
    top: 5rem;
    font-size: 60px;
    height: 100px;
    font-family: 'Playball', cursive;
    text-decoration: underline;
    color: #107a57;
  }

  .welcome-message {
    padding: 5px;
    top: 12rem;
    left: -20%;
    font-size: 30px;
    height: 70px;
    font-family: 'Playball', cursive;
    color: #107a57;
  }

  /* Welcome Card View */
   /* Card Preview */
   .scene {
    width: 400px;
    height: 260px;
    perspective: 600px;
    justify-content: center;
    align-items: center;
    background-color: rgb(190, 190, 190);
    top: 15rem;
    left: -3rem;
    font-family: 'Shadows Into Light', cursive;
    
  }
  
  .welcome-card {
    width: 100%;
    height: 100%;
    transition: transform 1s;
    transform-style: preserve-3d;
    position: relative;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);

  }
  
  .welcome-card__face {
    position: absolute;
    width: 100%;
    height: 100%;
    text-align: center;
    font-weight: bold;
    backface-visibility: hidden;
    overflow-y: scroll;
    padding: 15px;
    font-size: 30px;
  }
  
  .front-details {
    margin-top: 25%
  }
  
  .welcome-card__face--back {
    transform: rotateY(180deg);
  }

  .back-details {
    margin-top: 25%;
  }

  .flipme {
    transform: rotateY(180deg);
  }

  /* Subject Editor */
  .subject-editor {
    position: fixed;
    width: 300px;
    height: 350px;
    margin-top: 25px;
    padding: 5%;
    left: 65%;
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
    overflow-y: scroll;
  }

  .subject-list {
    font-size: 35px;
    margin-top: 15px;
  }

  .subject-edit-icon {
    position: absolute;
    height: 20px;
    top: 0%;
    left: 90%;
  }

  .subject-edit-icon:hover, .delete-subject-icon:hover {
    cursor: pointer;
  }

  .subject-edit-icon:active, .delete-subject-icon:active {
    transform: scale(.90);
  }

  hr {
    background-color: black;
    border: none;
    height: 1px;
  }
</style>
<template>
    <div v-if="!editMode" class="scene scene--card">
      <div
        :class="this.colorClass"
        v-bind:class="{ flipme: cardOne == 'flipped' }">
        <div class="card__face card__face--front">
            <div class="front-details">{{front}}</div>
        </div>
        <div class="card__face card__face--back">
          <div class="back-details">{{back}}</div>
        </div>
      </div>
      <span class="card-controller">
        <img 
          src="rotate-icon.png" 
          class="rotate-image-icon"
          @click="cardOne == 'start' ? (cardOne = 'flipped' ) : (cardOne = 'start' )"
        />
        <div id="{{id}}"><button @click="this.editCard($event)">Edit</button></div>
        <div id="{{id}}"><button @click="this.deleteCard($event)">Delete</button></div>
       </span>
    </div>
    <div v-else class="scene scene--card">
      <div
        :class="this.colorClass"
        v-bind:class="{ flipme: cardOne == 'flipped' }">
        <div class="card__face card__face--front">
            <input 
              class="front-details" 
              type="text" 
              placeholder="{{frontEdit}}"
              v-model="this.frontEdit"
              required
            >
        </div>
        <div class="card__face card__face--back">
          <input 
              class="back-details" 
              type="text" 
              placeholder="{{backEdit}}"
              v-model="this.backEdit"
              required
            >
        </div>
      </div>
      <span class="card-controller">
        <img 
          src="rotate-icon.png" 
          class="rotate-image-icon"
          @click="cardOne == 'start' ? (cardOne = 'flipped' ) : (cardOne = 'start' )"
        />
        <div><button @click="this.cancelEdit()">Cancel</button></div>
        <div><button @click="this.saveCard()">Save</button></div>
       </span>
    </div>


</template>

<script>
import { getAuth } from '@firebase/auth';
import { getDatabase, ref, child, push, update, set } from '@firebase/database';
import {  useStore } from "vuex"

export default {
    props: ["subject", "email", "key", "front", "back", "id"],
    
  data() {
    return {
        colorClass: `card color-${Math.floor(Math.random() * (6 - 1) + 1)}`,
        cardOne: "start",
        user: getAuth(),
        store: useStore(),
        editMode: false,
        keyEdit: null,
        idEdit: null,
        subjectEdit: null,
        emailEdit: null,
        frontEdit: null,
        backEdit: null,
      
    };
  },
  methods: {
    deleteCard(e){
      let deleteConfirm = confirm("Are you sure you want to delete this card?");
      if(deleteConfirm){
        const db = getDatabase();
        const id = e.target.__vueParentComponent.props.id;
        const subject = e.target.__vueParentComponent.props.subject;
        const userID = this.store.state.user.uid;
        const path = `cards/${userID}/${subject}/${id}`
        const details = {db, path, userID, subject}
        this.store.dispatch("deleteCard", details);

      }
    },
    editCard(e){
      this.keyEdit = e.target.__vueParentComponent.props.id;
      this.idEdit = e.target.__vueParentComponent.props.id;
      this.subjectEdit = this.store.state.subject;
      this.emailEdit = e.target.__vueParentComponent.props.email;
      this.frontEdit = e.target.__vueParentComponent.props.front;
      this.backEdit = e.target.__vueParentComponent.props.back;
      this.editMode = true;
    },
    saveCard(e){
      this.editMode = false;
      const key = this.keyEdit;
      const id = this.idEdit;
      const subject = this.subjectEdit;
      const email = this.store.state.user.email;
      const front = this.frontEdit;
      const back = this.backEdit;
      const userID = this.store.state.user.uid;
      const db = getDatabase();
      const path = `cards/${userID}/${subject}/${id}`
      const details = {path, userID, subject, id, key, email, front, back, db};
      console.log(details)
      this.store.dispatch("editCard", details);

    },
    cancelEdit(){
      this.editMode = false;
      this.keyEdit = null;
      this.idEdit = null;
      this.subjectEdit = null;
      this.emailEdit = null;
      this.frontEdit = null;
      this.backEdit = null;
      
    }
  }
};
</script>

<style scoped>body {
    font-family: sans-serif;
  }
  
  .scene {
    width: 400px;
    min-height: 260px;
    margin: 40px 0;
    perspective: 600px;
  }
  
  .card {
    width: 100%;
    height: 100%;
    transition: transform 1s;
    transform-style: preserve-3d;
    position: relative;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  }
  
  .card__face {
    position: absolute;
    width: 100%;
    height: 100%;
    text-align: center;
    font-weight: bold;
    font-size: 20px;
    backface-visibility: hidden;
    overflow-y: scroll;
    padding: 15px;
  }
  
  .front-details {
    margin-top: 25%
  }

  /* .title {
    margin-top: 10px;
  } */
  
  .card__face--back {
    transform: rotateY(180deg);
  }

  .back-details {
    margin-top: 25%;
  }

  .edit-card {
    float: right;
    border: none;
    background-color: transparent;
    font-size: 20px;
    backface-visibility: hidden;
  }

  .edit-card:hover{
    cursor: pointer;
  }

  .edit-card__options{
    display: none;
  }

  .rotate-image-icon {
    width: 35px;
  }

  .card-controller {
    display:flex;
    flex-direction: row;
    justify-content: space-between;
    left: 25%;
    top: 3%;
    width: 200px;
  }
  
  .flipme {
    transform: rotateY(180deg);
  }

  /* Dynamic color themes */
  .color-1 {
    background-color: #a6a5ac;
    color: rgb(252, 252, 252);
  }
  
  .color-2 {  
    background-color: rgb(90, 184, 131);
    color: rgb(74, 74, 74);
  }
  .color-3 {
    background-color: #F26659;
    color: rgb(255, 255, 255);
  }
  
  .color-4 {
    background-color: #8CA9D3;
    color: rgb(255, 255, 255);
  }
  
  .color-5 {
    background-color: #c28cd3;
    color: rgb(255, 255, 255);
  }
  
  .color-6 {
    background-color: #EBC999;
    color: rgb(214, 137, 22);
  }
</style>
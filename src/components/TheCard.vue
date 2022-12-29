<template>
    <div 
      v-if="!editMode" 
      class="scene scene--card"
      :style="this.displayStyle"
    >
      <div
        class="card"
        v-bind:class="{ flipme: cardOne == 'flipped' }"
        :style="this.cardStyle"
      >
        <div class="card__face card__face--front">
            <div v-if="(this.front.length < 100)" class="front-details">{{front}}</div>
            <div v-else class="front-details-long">{{front}}</div>
        </div>
        <div class="card__face card__face--back">
          <div v-if="(this.back.length < 100)" class="back-details">{{back}}</div>
          <div v-else class="back-details-long">{{back}}</div>
        </div>
      </div>
      <span class="card-controller">
        <img 
          src="\rotate-icon.png" 
          class="rotate-image-icon"
          @click="cardOne == 'start' ? (cardOne = 'flipped' ) : (cardOne = 'start' )"
        />
        <div id="{{id}}"><img src="\edit-icon.png" class="edit-icon" @click.prevent="this.editCard($event)"/></div>
        <div id="{{id}}"><img src="\delete-icon.png" class="delete-icon" @click.prevent="this.deleteCard($event)"/></div>
       </span>
    </div>
    <div v-else class="scene scene--card">
      <div
        class="card"
        :style="this.colorsEdit"
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
          src="\rotate-icon.png" 
          class="rotate-image-icon-edit"
          @click="cardOne == 'start' ? (cardOne = 'flipped' ) : (cardOne = 'start' )"
        />
        <div class="text-color-edit"><img src="\letter-t.png" class="text-image"/><input type="color" class="text-color-picker" v-model="this.textColorEdit" v-on:change="changeTextColor()"/></div>
        <div class="card-color-edit"><img src="\cards.png" class="cards-image"/><input type="color" class="card-color-picker" v-model="this.cardColorEdit" v-on:change="changeCardColor()"/></div>
        <div><img src="\cancel-icon.png" class="cancel-icon" @click.prevent="this.cancelEdit()"/></div>
        <div><img src="\save-icon.png" class="save-icon" @click.prevent="this.saveCard()"/></div>
      </span>

  </div>
</template>

<script>
import { getAuth } from '@firebase/auth';
import { getDatabase, ref, child, push, update, set } from '@firebase/database';
import {  useStore } from "vuex"

export default {
    props: ["subject", "email", "key", "front", "back", "id", "colors", "display", "textColor", "cardColor"],
    
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
        textColorEdit: this.textColor,
        cardColorEdit: this.cardColor,
        colorsEdit: `background-color: ${this.cardColorEdit}; color: ${this.textColorEdit}`
      
    };
  },
  computed: {
    cardStyle(){
      return this.colors
    },
    displayStyle(){
      if(this.front === "" && this.back === ""){
        return "display: none";
      }
    }
  },
  methods: {
    changeTextColor(){
      // this.colorsEdit = `background-color: ${this.cardColorEdit}; color: ${this.textColorEdit}`
    },    
    changeCardColor(){
      this.colorsEdit = `background-color: ${this.cardColorEdit}; color: ${this.textColorEdit}`
    },
    deleteCard(e){
      let deleteConfirm = confirm("Are you sure you want to delete this card?");
      if(deleteConfirm){
        const db = getDatabase();
        const id = this.id;
        const subject = this.subject;
        const userID = this.store.state.user.uid;
        const path = `cards/${userID}/${subject}/${id}`
        const colors = this.colors;
        const textColor = this.textColor
        const cardColor = this.cardColor
        const details = {db, path, userID, subject, id, colors, textColor, cardColor}
        this.store.dispatch("deleteCard", details);

      }
    },
    editCard(e){
      this.keyEdit = this.id;
      this.idEdit = this.id;
      this.subjectEdit = this.subject;
      this.emailEdit = this.email;
      this.frontEdit = this.front;
      this.backEdit = this.back;
      this.cardColorEdit = this.cardColor;
      this.textColorEdit = this.textColor;
      this.colorsEdit = this.colors;
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
      const textColor = this.textColorEdit;
      const cardColor = this.cardColorEdit;
      const colors = `background-color: ${cardColor}; color: ${textColor}`
      const userID = this.store.state.user.uid;
      const db = getDatabase();
      const path = `cards/${userID}/${subject}/${id}`
      const details = {path, userID, subject, id, key, email, front, back, db, colors, textColor, cardColor};
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
      this.colorsEdit = null;
      this.cardColorEdit = null;
      this.textColorEdit = null;
    }
  }
};
</script>

<style scoped>
  
  .scene {
    width: 400px;
    height: 260px;
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
    padding: 15px;
    overflow-y: scroll;
    -ms-overflow-style: none; 
    scrollbar-width: none; 
    -webkit-overflow-scrolling: touch;
  }

  .card-face::-webkit-scrollbar {
    display: none;
  }
  
  .front-details {
    margin-top: 25%;    
  }

  /* .front-details-webkit-scrollbar {
    display: none;
  } */

  .front-details-long {
    margin-top: 0%;    
    /* overflow-y: scroll;
    -ms-overflow-style: none; 
    scrollbar-width: none;  */
  }

  /* .front-details-long-webkit-scrollbar {
    display: none;
  } */
  
  .card__face--back {
    transform: translateZ(-1px) rotateY(180deg);
  }

  .back-details {
    margin-top: 25%;    
    /* overflow-y: scroll;
    -ms-overflow-style: none; 
    scrollbar-width: none;  */
  }

  /* .back-details-webkit-scrollbar {
    display: none;
  } */

  .back-details-long {
    margin-top: 0%;
    /* overflow-y: scroll;
    -ms-overflow-style: none; 
    scrollbar-width: none;  */
  }

  /* .back-details-long-webkit-scrollbar {
    display: none;
  } */

  .edit-card {
    float: right;
    border: none;
    background-color: transparent;
    font-size: 20px;
    backface-visibility: hidden;
  }

  .rotate-image-icon-edit {
    width: 45px;
    height: 20px;
    margin-top: 5px;
  }

  .edit-icon:hover, 
  .cancel-icon:hover, 
  .save-icon:hover, 
  .delete-icon:hover, 
  .text-image:hover, 
  .cards-image:hover, 
  .rotate-image-icon-edit:hover,
  .text-color-picker:hover,
  .card-color-picker:hover {
    cursor: pointer;
  }

  .edit-card__options{
    display: none;
  }

  .rotate-image-icon {
    width: 45px;
    height: 20px;
    margin-top: 5px;
  }

  .edit-icon {
    width: 25px;
    color: red;
    margin-top: 5px;
  }

  .delete-icon {
    width: 25px;
    margin-top: 5px;
  }

  .cancel-icon {
    width: 25px;
    left: 60%;
  }

  .save-icon {
    width: 30px;
  }

  .scene .text-color-picker, .card-color-picker, .cards-image, .text-image {
    position: fixed;
    height: 25px;
  }

  .text-image, .text-color-picker {
    position: fixed;
    left: 30%;
    margin-top: 5px;
  }

  .cards-image, .card-color-picker {
    position: fixed;
    left: 47%;
    margin-top: 5px;
  }

  .card-controller {
    display:flex;
    flex-direction: row;
    justify-content: space-between;
    left: 5%;
    top: 3%;
    width: 350px;
    /* background-color: red; */
  }

  .card-controller button {
    /* margin-top: 15px; */
    border-radius: 10px;
    box-shadow: 0 1px 1px rgba(0,0,0,0.25), 
    0 1px 1px rgba(0,0,0,0.22);
    height: 25px;
    border-color: transparent;
    background-color: whitesmoke;
  }

  .card-edit-menu {
    position: absolute;
    display: flex;
    flex-direction: column;
    height: 250px;
    width: 200px;
    border-radius: 15px;
    background-color:#0bd692;
    box-shadow: 0 14px 28px rgba(0,0,0,0.25), 
    0 10px 10px rgba(0,0,0,0.22);
    right: 0vw;
    top: 10%;
  }

  .text-color-picker {
    position: fixed;
    opacity: 0;
  }

  .card-color-picker {
    position: fixed;
    opacity: 0;
  }

  .card-controller button:hover {
    cursor: pointer;
  }

  .card-controller button:active {
    box-shadow: 0 4px 4px rgba(0,0,0,0.25), 
    0 4px 4px rgba(0,0,0,0.22);
  }
  
  .flipme {
    transform: rotateY(180deg);
  }

  @media (max-width: 900px) and (min-width: 380px){
  .scene {
    width: 300px;
    height: 195px;
    margin: 30px;
  }
  
  .card {
    width: 100%;
    height: 100%;
    position: absolute;
  }
  
  .card__face {
    position: fixed;
    width: 100%;
    height: 100%;
    font-size: 15px;
    padding: 15px;
  }
  
  .front-details {
    margin-top: 25%
  }

  .front-details-long {
    margin-top: 0%;
  }

  .back-details {
    margin-top: 25%;
  }

  .back-details-long {
    margin-top: 1%;
  }

  .rotate-image-icon-edit {
    width: 30px;
    height: 15px;
    margin-top: 5px;
  }

  .rotate-image-icon {
    width: 30px;
    height: 15px;
    margin-top: 5px;
  }

  .edit-icon {
    width: 15px;
  }

  .delete-icon {
    width: 15px;
  }

  .cancel-icon {
    width: 15px;
    left: 60%;
    margin-top: 2px;
  }

  .save-icon {
    width: 20px;
  }

  .scene .text-color-picker, .card-color-picker, .cards-image, .text-image {
    height: 15px;
  }

  .text-image, .text-color-picker {
    left: 35%;
    margin-top: 5px;
  }

  .cards-image, .card-color-picker {
    left: 47%;
    margin-top: 7px;
  }

  .card-controller {
    position: absolute;
    left: 18%;
    top: 100%;
    margin-top: 15px;
    width: 200px;
  }

  .card-edit-menu {
    position: absolute;
    display: flex;
    flex-direction: column;
    height: 250px;
    width: 200px;
    right: 0vw;
    top: 10%;
  }

  .text-color-picker {
    position: fixed;
    opacity: 0;
  }

  .card-color-picker {
    position: fixed;
    opacity: 0;
  }

  }

  
</style>
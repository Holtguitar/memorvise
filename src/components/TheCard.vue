<template>
    <div class="scene scene--card">
      <div
        :class="this.colorClass"
        v-bind:class="{ flipme: cardOne == 'flipped' }">
        <div class="card__face card__face--front">
            <!-- <div class="title"><u>{{title}}</u></div> -->
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
        <div><button>Edit</button></div>
        <div id="{{id}}"><button @click="this.delete($event)">Delete</button></div>
       </span>
    </div>


</template>

<script>
import { getAuth } from '@firebase/auth';

export default {
    props: ["title", "subject", "email", "key", "front", "back", "id"],
    
  data() {
    return {
        colorClass: `card color-${Math.floor(Math.random() * (6 - 1) + 1)}`,
        cardOne: "start",
        user: getAuth(),
    };
  },
  methods: {
    delete(e){
      const id = e.target.__vueParentComponent.props.id;
      const subject = e.target.__vueParentComponent.props.subject;
      
      fetch(`https://memorvise-default-rtdb.firebaseio.com/${this.user.currentUser.uid}/${subject}/${id}.json`, {
        method:"DELELTE",
        mode: 'cors',
        cache: 'no-cache'
      })
      .then((res) => {
        if(res.ok){
          return res.json();
        }
      }).catch((error) => {
        this.error = error;
        alert(error);
      })
      
    },
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
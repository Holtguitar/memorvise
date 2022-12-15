<template>
    <div class="card-creator">
        <form class="card-form">
            <h3 class="create-title">New Flash Card</h3>
            <p><input type="text" maxlength="30" v-model="subject" placeholder="Subject" required></p>
            <p><input type="text" v-model="front" placeholder="Front" required/></p>
            <p><input type="text" v-model="back" placeholder="Back" required/></p>
            <p>
                <p>Filter difficulty</p>
                <input type="radio" id="easy" name="difficulty" value="easy"/>
                <label for="easy">Easy</label>
                <input type="radio" id="hard" name="difficulty" value="hard"/>
                <label for="hard">Hard</label>
                <input type="radio" id="harder" name="difficulty" value="harder"/>
                <label for="harder">Harder</label>
            </p>
            <button class="create-button" @click.prevent="createCard()">Create</button>
        </form>
        <div class="scene scene--card">
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
            </span>
        </div>
    </div>
    
</template>

<script>
    import {ref} from "vue";
    import {getAuth} from "firebase/auth"
    import { useStore } from "vuex"

    export default {
        data() {
            return{
                subject: ref(""),
                front: ref(""),
                back: ref(""),
                user: getAuth(),
                email: ref(""),
                invalidInput: false,
                error: null,
                subjects: [],
                store: useStore(),
                colorClass: `card color-${Math.floor(Math.random() * (6 - 1) + 1)}`,
                cardOne: "start",
        
            }
        },
        methods: {
        createCard() {
            this.email = this.user.currentUser.email;
            if(
            this.subject === "" ||
            this.front === "" ||
            this.back === "" ||
            this.email === "" 
            ){ 
                this.invalidInput = true;
                alert("Invalid input!")
            }

            this.invalidInput = false;
            this.error = null;

            fetch(`https://memorvise-default-rtdb.firebaseio.com/cards/${this.user.currentUser.uid}/${this.subject}.json`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    subject: this.subject,
                    front: this.front,
                    back: this.back,
                    email: this.email,
                })
            }).then((res) => {
                if(res.ok) {
                    this.store.dispatch("loadSubjects")
                } else {
                    throw new Error("Could not submit new card to the data base.")
                }
            }).catch((error) => {
                this.error = error.message
            });

            this.front = "";
            this.back = "";
        },

        loadSubjects(){
            fetch(`https://memorvise-default-rtdb.firebaseio.com/cards/${this.user.currentUser.uid}.json`)
            .then((res) => {
                if(res.ok){
                return res.json();
                }
            }).then((data) => {
                const subjects = [];

                for(const id in data){
                subjects.push(id)
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

<style>
    .card-creator {
        display: flex;
        flex-direction: row;
        justify-content: center;
        height: fit-content;
        top: 15%;
    }
    /* Card Creator Form */
    .card-form {
        display: flex;
        flex-direction: column;
        height: fit-content;
        border-radius: 5%;
        background-color:rgb(11, 214, 146);
        box-shadow: 0 14px 28px rgba(0,0,0,0.25), 
        0 10px 10px rgba(0,0,0,0.22);
        padding: 35px;
        margin: 20px;
    }

    .create-title {
        top: -5%;
        font-family: 'Shadows Into Light', cursive;
        font-size: 30px;
    }

    .mem-filter {
        display: flex;
        flex-direction: row;
    }

    .create-button {
        margin-top: 15px;
        border-radius: 5%;
        box-shadow: 0 14px 28px rgba(0,0,0,0.25), 
        0 10px 10px rgba(0,0,0,0.22);
        width: 10rem;
        height: 30px;
        border-color: transparent;
    }

    /* Card Preview */
  .scene {
    width: 400px;
    min-height: 260px;
    perspective: 600px;
    justify-content: center;
    align-items: center;
    margin: 20px;
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
    width: fit-content;
    left: 42.5%;
    top: 10%;
  }
  
  .flipme {
    transform: rotateY(180deg);
  }

  #easy, #hard, #harder {
    background-color: red;
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
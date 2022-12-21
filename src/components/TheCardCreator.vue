<template>
    <div class="card-creator">
        <form class="subject-form">
            <h3 class="create-title">New Topic</h3>
            <p><input type="text" maxlength="30" v-model="newSubject" placeholder="Topic"/></p>
            <button class="create-subject-button"  @click.prevent="createSubject()">Create</button>
        </form>
        <form class="card-form">
            <div class="card-form-span">
                <h3 class="create-title">New Flash Card</h3>
                <select class="subject-selector-creator" id="subject" v-model="this.subject">
                    <option v-for="(item, key) in subjects" :value="item">{{item}}</option>
                </select>
                <p><input type="text" v-model="front" placeholder="Front" required/></p>
                <p><input type="text" v-model="back" placeholder="Back" required/></p>
                <button class="create-button" @click.prevent="createCard()">Build</button>
            </div>
            <div class="color-form-span">
                <div class="color-form">
                    <label for="cardColor">Card Color:</label>
                    <input 
                        class="color-picker-creator" 
                        style="background-color: transparent; border-color: transparent; width: 25px; height: 25px;" 
                        id="cardColor" 
                        type="color" 
                        v-model="this.cardColor" 
                        v-on:change="changeColor"/>
                    <br/>
                    <br/>
                    <label for="textColor">Text Color:</label>
                    <input 
                        class="color-picker-creator" 
                        style="background-color: transparent; border-color: transparent; width: 25px; height: 25px;" 
                        id="textColor" 
                        type="color" 
                        v-model="this.textColor" 
                        v-on:change="changeColor"/>
                    
                </div>
            </div>
        </form>
        <div class="scene scene--card">
            <div
                :style="this.colorClass"
                class="card"
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
                src="\rotate-icon.png" 
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
                newSubject: ref(""),
                front: ref(""),
                back: ref(""),
                user: getAuth(),
                email: ref(""),
                invalidInput: false,
                error: null,
                subjects: this.$store.state.subjects,
                store: useStore(),
                cardColor: "#FFFFFF",
                textColor: "#000000",
                colorClass: "background-color: #FFFFFF; color: #000000",
                cardOne: "start"
            }
        },
        methods: {
        createSubject(){

            fetch(`https://memorvise-default-rtdb.firebaseio.com/cards/${this.user.currentUser.uid}/${this.newSubject}.json`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    subject: this.newSubject,
                    front: "",
                    back: "",
                    email: "",
                })
            }).then((res) => {
                if(res.ok) {
                    this.store.dispatch("loadSubjects");
                    this.subjects.push(this.newSubject);
                    this.newSubject = "";
                } else {
                    throw new Error("Could not submit new card to the data base.")
                }
            }).catch((error) => {
                this.error = error.message
            });
        },
        changeColor(){
            this.colorClass = "background-color: " + this.cardColor + "; color: " + this.textColor;
        },
        printSub(){
            console.log(this.email)
        },
        createCard() {
            this.email = this.user.currentUser.email;
            if(
                this.subject === "" ||
                this.front === "" ||
                this.back === "" ||
                this.email === "" 
            ){ 
                this.invalidInput = true;
                alert("Invalid input!");
            } else {
                this.invalidInput = false;
                this.error = null;
                console.log

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
                        textColor: this.textColor,
                        cardColor: this.cardColor,
                        colors: `background-color: ${this.cardColor}; color: ${this.textColor}`
                    })
                }).then((res) => {
                    if(res.ok) {
                        this.store.dispatch("loadSubjects");
                    } else {
                        throw new Error("Could not submit new card to the data base.")
                    }
                }).catch((error) => {
                    this.error = error.message
                });

                this.front = "";
                this.back = "";
            }
        },
    loadSubjects(){
      this.store.dispatch("loadSubjects");
    },
    },
    mounted(){
        this.changeColor;
        this.loadSubjects;
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
        height: 70vh;
    }
    /* Card Creator Form */
    .card-form, .subject-form {
        display: flex;
        flex-direction: column;
        border-radius: 15px;
        background-color:#0bd692;
        box-shadow: 0 14px 28px rgba(0,0,0,0.25), 
        0 10px 10px rgba(0,0,0,0.22);
        padding: 35px;
        margin: 20px;
    }

    .subject-form {
        height: 175px;
        text-align: center;
    }

    .card-form {
        grid-template-columns: auto auto;
        column-gap: 50px;
        width: 500px;
        height: 300px;
    }

    .card-form-span {
        height: 250px;
        width: 200px;
        text-align: center;   
    }
    
    .create-button {
        border-radius: 5%;
        box-shadow: 0 14px 28px rgba(0,0,0,0.25), 
        0 10px 10px rgba(0,0,0,0.22);
        width: 10rem;
        height: 30px;
        border-color: transparent;
        margin-top: 15%;
    }

    .color-form {
        width: 150px;
        height: 100px;
        width: 115px;
        top: 30%;
        left: 20%;
        /* background-color: red; */
        text-align: center;
        justify-content: space-between;
        padding-top: 3%;
    }

    .color-form-span {
        position: absolute;
        background-color: rgb(81, 121, 253);
        color:rgb(2, 2, 101);
        border-radius: 200px 15px 15px 200px;
        width: 150px;
        height: 300px;
        right: 0%;
        top: 0%;
    }

    .card-formatter {
        text-align: center;
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

    .create-subject-button {
        position: absolute;
        bottom: 10%;
        left: 30%;
        border-radius: 5%;
        box-shadow: 0 14px 28px rgba(0,0,0,0.25), 
        0 10px 10px rgba(0,0,0,0.22);
        width: 5rem;
        height: 30px;
        border-color: transparent;
    }

    .create-button:hover, .create-subject-button:hover {
        cursor: pointer;
    }

    .create-button:active, .create-subject-button:active {
        transform: scale(.98);
        box-shadow: 0 14px 28px rgba(0,0,0,0.25), 
        0 15px 15px rgba(0,0,0,0.22);
    }

    .color-picker-creator:hover {
        cursor: pointer;
    }

    /* Card Preview */
  .scene {
    width: 400px;
    height: 260px;
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

  .rotate-image-icon:hover {
    cursor: pointer;
  }

  .card-controller {
    left: 45%;
    top: 10%;
    padding: 5px;
  }
  
  .flipme {
    transform: rotateY(180deg);
  }

  @media (max-width: 900px) and (min-width: 380px) {
        .card-creator {
            position: fixed;
            display: block;
            margin-left: auto;
            margin-right: auto;
            top: 10%;
            left: 0%;
            height: 90vh;
            justify-content: center;
        }

        /* Card Creator Form */
        .card-form, .subject-form {
            padding: 15px;
            margin: 0px;
        }

        .subject-form {
            height: 150px;
            width: 150px;
            text-align: center;
            font-size: 20px;
            left: 10%;
            top: 2%;
        }

        .subject-form input {
            width: 125px;
        }

        .card-form {
            grid-template-columns: auto auto;
            column-gap: 50px;
            width: fit-content;
            height: fit-content;
            left: 7%;
            top: 5%;
        }

        .card-form-span {
            height: 150px;
            width: 300px;
            text-align: center;   
        }
        
        .create-button {
            width: 60px;
            height: 30px;
            margin-top: 15px;
        }

        .color-form {
            top: 15%;
            left: 15%;
        }

        .color-form-span {
            position: absolute;
            width: 150px;
            height: 150px;
            right: 0%;
            top: -94%;
            border-radius: 5%;
            box-shadow: 0 14px 28px rgba(0,0,0,0.25), 
            0 10px 10px rgba(0,0,0,0.22);
            background-color:#0bd692;
            text-align: center;
        }

        .create-title {
            top: -5%;
            font-family: 'Shadows Into Light', cursive;
            font-size: 20px;
        }

        .create-subject-button {
            width: 60px;
            height: 30px;
            left: 30%;
        }

        /* Card Preview */
        .card-creator .scene {
            width: 400px;
            height: 260px;
            perspective: 600px;
            justify-content: center;
            align-items: center;
            margin: 20px;
        }
        
        .card-creator .card {
            width: 100%;
            height: 100%;
            transition: transform 1s;
            transform-style: preserve-3d;
            position: relative;
            box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
            display: none;
        }
        
        .card-creator .card__face {
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
        
        .card-creator .front-details {
            margin-top: 25%
        }

        .card-creator .back-details {
            margin-top: 25%;
        }

        .card-creator .edit-card {
            float: right;
            border: none;
            background-color: transparent;
            font-size: 20px;
            backface-visibility: hidden;
        }

        .card-creator .edit-card__options{
            display: none;
        }

        .card-creator .rotate-image-icon {
            width: 35px;
            display: none;
        }

        .card-creator .card-controller {
            left: 45%;
            top: 10%;
            padding: 5px;
        }
    
  }

</style>
<template>
    <form class="card-form">
        <h3 class="create-title">New Flash Card</h3>
        <p><input type="text" maxlength="30" v-model="subject" placeholder="Subject" required></p>
        <p><input type="text" v-model="front" placeholder="Front" required/></p>
        <p><input type="text" v-model="back" placeholder="Back" required/></p>
        <input class="mem-filter" type="checkbox"/><span>Mem Filter?</span>
        <button class="create-button" @click.prevent="createCard()">Create</button>
    </form>
    
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
                store: useStore()
        
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
    .card-form {
        display: flex;
        flex-direction: column;
        height: fit-content;
        border-radius: 5%;
        background-color:rgb(11, 214, 146);
        top: 15%;
        left: -1%;
        box-shadow: 0 14px 28px rgba(0,0,0,0.25), 
        0 10px 10px rgba(0,0,0,0.22);
        padding: 35px;
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
</style>
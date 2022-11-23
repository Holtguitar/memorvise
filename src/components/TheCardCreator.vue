<template>
    <form class="card-form">
        <h3>New Flash Card</h3>
        <p><input type="text" maxlength="30" v-model="subject" placeholder="Subject" required></p>
        <!-- <p><input type="text" maxlength="40" v-model="title" placeholder="Title" required/></p> -->
        <p><input type="text" maxlength="500" v-model="front" placeholder="Front" required/></p>
        <p><input type="text" maxlength="500" v-model="back" placeholder="Back" required/></p>
        <button @click.prevent="createCard()">Create</button>
    </form>
    
</template>

<script>
    import {ref} from "vue";
    import {getAuth} from "firebase/auth"
    import {getDatabase, ref as sRef, set, child, get, update, remove,} from "firebase/database";

    export default {
        data() {
            return{
                subject: ref(""),
                // title: ref(""),
                front: ref(""),
                back: ref(""),
                user: getAuth(),
                email: ref(""),
                invalidInput: false,
                error: null,
                subjects: [],
                id: ""
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

                fetch(`https://memorvise-default-rtdb.firebaseio.com/${this.user.currentUser.uid}/${this.subject}.json`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        subject: this.subject,
                        // title: this.title,
                        front: this.front,
                        back: this.back,
                        email: this.email,
                        id: this

                    })
                }).then((res) => {
                    if(res.ok) {
                        console.log(id)
                    } else {
                        throw new Error("Could not submit new card to the data base.")
                    }
                }).catch((error) => {
                    this.error = error.message
                });

                // this.subject = "";
                // this.title = "";
                this.front = "";
                this.back = "";
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
    }
</style>
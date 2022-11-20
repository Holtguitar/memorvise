<template>
  <div>
    <h3>Select a Subject</h3>
    <p>
      <label for="subject">Subject:</label>
      <select id="subject" 
          v-model="this.subject" @click="loadSubjects" v-on:change="loadCards">
        <option
          v-for="(item, key) in subjects" :value="item"
        >{{item}}</option>
      </select>
    </p>
  </div>
  <div class="card-holder">
   <the-card 
    v-for="result in results"
      :key="result.key"
      :title="result.title"
      :subject="result.subject"
      :email="result.email"
      :front="result.front"
      :back="result.back"
    ></the-card>
  </div> 
</template>

<script>
import TheCard from "../components/TheCard.vue";
import { getAuth } from "@firebase/auth";

export default {
  components: {
    TheCard,
  }, 
  data() {
    return {
      results: [],
      subjects: [],
      tempSubs: ['Math', 'Science'],
      isLoading: false,
      error: null,
      user: getAuth(),
      subject: "",
    }
  },
  methods: {
    printVal(e){
      console.log(e.target.value)
    },
    capFirst(a) {
      return a.charAt(0).toUpperCase() + a.slice(1);
    },
      //Retrieves the subjects in use from the current user
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
        console.log(this.subjects)
      }).catch((error) => {
        this.error = error;
        alert(error);
      })
      
    },

      //Retrieves the information for each card from the current user
    loadCards(){
      console.log("subject: ", this.subject)
      this.isLoading = true;
      this.error = null;

      fetch(`https://memorvise-default-rtdb.firebaseio.com/${this.user.currentUser.uid}/${this.subject}.json`)
      .then((res) => {
        if(res.ok){
          return res.json();
        }
      }).then((data) => {
        this.isLoading = false;
        const results = []
        for(const id in data){
          results.push({
            key: id,
            title: data[id].title,
            subject: data[id].subject,
            email: data[id].email,
            front: data[id].front,
            back: data[id].back
        })
          this.results = results;
        }
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



<style scoped>
  .card-holder {
    display: grid;
    grid-template-columns: auto auto;
    column-gap: 50px;
  }

  @media (max-width: 850px) {
    .card-holder {
    display: grid;
    grid-template-columns: auto;
    column-gap: 50px;
  }
  }
</style>

  
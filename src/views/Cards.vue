<template>
  <div class="subject-selector">
    <h3 class="select-title">Select a Subject</h3>
    <p class="subject-selector-form">
      <select id="subject" 
          v-model="this.subject" v-on:change="loadCards">
        <option v-for="(item, key) in subjects" :value="item">{{item}}</option>
      </select>
    </p>
  </div>
  <div class="card-holder">
   <the-card
    v-if="flip" 
    v-for="result in results"
      :key="result.key"
      :id="result.key"
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
import {useStore} from "vuex";

export default {
  components: {
    TheCard,
  }, 
  data() {
    return {
      store: useStore(),
      results: [],
      subjects: [],
      tempSubs: ['Math', 'Science'],
      isLoading: false,
      error: null,
      subject: "",
      front: true,
    }
  },
  methods: {
    flip(){
      front = !front
    },
    loadSubjects(){
      this.store.dispatch("loadSubjects")
      this.subjects = this.store.state.subjects;
      console.log(this.store.state.subjects);
    },

    //Retrieves the information for each card from the current user
    loadCards(){
      this.loadUser();
      this.isLoading = true;
      this.error = null;

      fetch(`https://memorvise-default-rtdb.firebaseio.com/cards/${this.user}/${this.subject}.json`)
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
    if(this.store.state.user){
        this.loadSubjects();
      }
  }
}
</script>



<style scoped>

  .select-title {
    font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
    color: rgb(47, 55, 52);
    font-weight: 700;
    font-size: 20px;
  }

  .card-holder {
    display: grid;
    grid-template-columns: auto auto;
    column-gap: 50px;
    top: 35%;
    overflow-y: scroll;
    /* background-color: red; */
  }

  .subject-selector {
    position: fixed;
    text-align: center;
    display: flex;
    flex-direction: column;
    height: 150px;
    width: 350px;
    border-radius: 5%;
    background-color:rgb(11, 214, 146);
    left: 36%;
    top: 15%;
    box-shadow: 0 14px 28px rgba(0,0,0,0.25), 
    0 10px 10px rgba(0,0,0,0.22);
    padding: 35px;
    /* position: fixed;
    left: 40%;
    top: 18%;
    width: fit-content;
    padding: 8px;
    justify-content: center;
    text-align: center;
    font-size: 50px; */
  }

  .subject-selector-form {
    font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
    color: rgb(47, 55, 52);
    font-weight: 700;
    font-size: 40px;
  }

  .subject {    
    font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
    color: rgb(47, 55, 52);
    font-weight: 700;
    font-size: 40px;
    padding: 10px;
    background-color: blue;
    color: green;
  }
  @media (max-width: 850px) {
    .card-holder {
    display: grid;
    grid-template-columns: auto;
    column-gap: 50px;
  }
  }


</style>

  
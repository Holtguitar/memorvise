<template>
  <div v-if="(subjects.length > 0)" class="subject-selector">
    <h3 class="select-title">Select a topic</h3>
    <p class="subject-selector-form">
      <select id="subject" 
          v-model="this.subject" v-on:change="loadCards">
        <option v-for="(item, key) in subjects" :value="item">{{item}}</option>
      </select>
    </p>
  </div>
  <div v-else class="subject-selector">
    <h3>No topics to view</h3>
    <hr style="border: solid 1px grey;">
  </div>
  <div class="card-holder">
   <the-card
    v-if="flip" 
    v-for="result in this.$store.state.cards"
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
      cards: this.$store.state.cards,
      subjects: this.$store.state.subjects,
      subject: this.$store.state.subject,
      front: true,
    }
  },
  watch: {
    // getSubject: () => {console.log(this.subject)}
  },
  computed: {
    getSubject(){
      return this.$store.state.subject;
    },
    getCards(){
      return this.$store.getters.getSubject;
    },
    getSubjects(){
      return this.$store.getters.getSubjects;
    }
  },
  methods: {
    flip(){
      front = !front
    },
    loadSubjects(){
      this.store.dispatch("loadSubjects");
    },
    loadCards(){
      this.store.commit("CLEAR_CARDS")
      const user = this.store.state.user.uid;
      const subject = this.subject;
      const path = `https://memorvise-default-rtdb.firebaseio.com/cards/${user}/${this.subject}.json`
      const details = {path, subject};
      this.store.dispatch("loadCards", details);
    }
  },
  mounted(){
    if(this.store.state.user){
      this.loadSubjects();
      this.loadCards();
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

  
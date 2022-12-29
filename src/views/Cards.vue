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
  <div class="card-scroll">
    <!-- <div class="card-holder"> -->
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
          :colors="result.colors"
      ></the-card>
    <!-- </div> -->
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
      cards: this.getCards,
      subjects: this.$store.state.subjects,
      subject: this.getSubject,
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
      this.store.commit("CLEAR_CARDS");
      this.store.dispatch("loadSubjects");
      this.store.commit("SET_SUBJECT", this.subject);
      this.store.dispatch("loadCards");
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
    margin-top: -10% !important;
  }

  .card-holder {
    position: absolute;
    display: grid;
    grid-template-columns: auto auto;
    column-gap: 50px;
  }

  .card-scroll {
    position: fixed;
    top: 27%;
    /* left: 21%; */
    height: 60vh;
    /* padding-bottom: 250px; */
    /* width: 150vh; */
    /* margin-bottom: 200px; */
    overflow-y: scroll;
    -webkit-overflow-scrolling: touch;
    -ms-overflow-style: none; 
    scrollbar-width: none; 
/* Test */
    /* position: absolute; */
    display: grid;
    grid-template-columns: auto auto;
    column-gap: 50px;
    left: 20%;
    width: 60vw;
  }

  .card-scroll::-webkit-scrollbar {
    display: none;
  }

  .subject-selector {
    position: fixed;
    text-align: center;
    display: flex;
    flex-direction: column;
    height: 100px;
    width: 250px;
    border-radius: 5%;
    background-color:rgb(11, 214, 146);
    left: 40%;
    top: 12%;
    box-shadow: 0 14px 28px rgba(0,0,0,0.25), 
    0 10px 10px rgba(0,0,0,0.22);
    padding: 35px;
  }

  .subject-selector-form {
    font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
    color: rgb(47, 55, 52);
    font-weight: 700;
    font-size: 40px;
    top: -50%;
    max-width: 100px !important;
  }

  .subject {    
    font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
    color: rgb(47, 55, 52);
    font-weight: 700;
    font-size: 40px;
    padding: 10px;
  }

  #subject {
    width: 150px;
    left: 15%;
  }

  @media (max-width: 900px) and (min-width: 380px){
    .card-holder {
      display: flex;
      flex-direction: column;
      width: 100vw;
      left: 3%;
      margin-left: 0;
      padding-bottom: 100px;
      /* background-color: red; */
      overflow-x: hidden;
    }

    .card-scroll {
      position: fixed;
      top: 25%;
      left: 0%;
      height: 60vh;
      width: 95vw;
      margin-bottom: 200px;
      overflow-x: hidden;
    }

    .subject-selector {
      top: 12%;
      left: 18%;
      height: 85px;
      padding: 5px;
    }

    .select-title {
      font-size: 15px;
      top: 35%;
    }

    #subject {
      top: 85%;
      left: 40%;
    }
  }

 

</style>

  
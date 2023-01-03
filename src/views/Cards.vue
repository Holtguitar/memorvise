<template>
  <div v-if="(subjects.length > 0)" class="card-settings-header">
    <div class="subject-selector">
      <h3 class="select-title">Select a topic</h3>
      <p class="subject-selector-form">
        <select id="subject" v-model="this.subject" v-on:change="loadCards">
          <option v-for="(item, key) in subjects" :value="item">
            {{ item }}
          </option>
        </select>
      </p>
    </div>
    <div class="slide-mode">
      <h3>Slider Mode</h3>
      <label class="switch">
        <input type="checkbox" v-on:change="toggleSlideMode" />
        <span class="slider round"></span>
      </label>
    </div>
  </div>
  <div v-else class="subject-selector">
    <h3>No topics to view</h3>
    <hr style="border: solid 1px grey;" />
  </div>

  <div class="card-scroll" v-if="!this.slideMode">
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
  </div>
  <div class="card-scroll-single" v-else>
    <img
      class="left-arrow"
      src="/arrow-left.png"
      v-if="this.cardIndex !== 0"
      @click="this.decrease()"
    />
    <div class="card-holder">
      <the-card
        v-if="flip"
        v-for="result in this.$store.state.currentCard"
        :key="result.key"
        :id="result.key"
        :title="result.title"
        :subject="result.subject"
        :email="result.email"
        :front="result.front"
        :back="result.back"
        :colors="result.colors"
      ></the-card>
    </div>
    <img
      class="right-arrow"
      src="/arrow-right.png"
      @click="this.increase()"
      v-if="this.cardIndex !== this.maxCardIndex"
    />
  </div>
</template>

<script>
import TheCard from '../components/TheCard.vue'
import { useStore } from 'vuex'

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
      slideMode: false,
      cardIndex: 0,
      maxCardIndex: null,
    }
  },
  computed: {
    getSubject() {
      return this.$store.state.subject
    },
    getCards() {
      return this.$store.getters.getSubject
    },
    getSubjects() {
      return this.$store.getters.getSubjects
    },
  },
  methods: {
    increase() {
      if (this.cardIndex <= this.$store.state.cards.length - 1) {
        this.cardIndex++
        this.loadIndexedCard()
      }
    },
    decrease() {
      if (this.cardIndex !== 0) {
        this.cardIndex--
        this.loadIndexedCard()
      }
    },
    flip() {
      front = !front
    },
    loadSubjects() {
      this.store.dispatch('loadSubjects')
    },
    loadCards() {
      this.toggleSlideMode()
      this.store.commit('CLEAR_CARDS')
      this.store.dispatch('loadSubjects')
      this.store.commit('SET_SUBJECT', this.subject)
      this.store.dispatch('loadCards')
    },
    loadIndexedCard() {
      this.store.dispatch('loadIndexedCard', this.cardIndex)
    },
    toggleSlideMode() {
      this.cardIndex = 0
      this.maxCardIndex = this.$store.state.cards.length - 2
      this.slideMode = !this.slideMode
      this.loadIndexedCard()
    },
  },
  mounted() {
    if (this.store.state.user) {
      this.loadSubjects()
      this.loadCards()
      this.loadIndexedCard()
    }
  },
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

.card-scroll {
  position: absolute;
  display: grid;
  grid-template-columns: auto auto auto;
  column-gap: 50px;
  row-gap: 20px;
  overscroll-behavior: auto;
  position: fixed;
  left: 0%;
  top: 26%;
  height: 65%;
  width: 100%;
  padding-bottom: 100px;
  padding-left: 2%;
  overflow-y: scroll;
  -webkit-overflow-scrolling: touch;
  -ms-overflow-style: none;
  scrollbar-width: none;
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
  background-color: rgb(11, 214, 146);
  left: 40%;
  top: 12%;
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
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

/*------------- Slide Mode Switch and Card Scroll functionality---------------- */
.card-scroll-single {
  position: absolute;
  display: grid;
  grid-template-columns: auto auto auto;
  column-gap: 50px;
  row-gap: 20px;
  overscroll-behavior: auto;
  position: fixed;
  left: 25%;
  top: 26%;
  height: 50%;
  width: 700px;
  padding-bottom: 100px;
  padding-left: 2%;
  overflow-y: scroll;
  -webkit-overflow-scrolling: touch;
  -ms-overflow-style: none;
  scrollbar-width: none;
  background-color: green;
}

.card-holder {
  position: absolute;
  /* background-color: red; */
  left: 20%;
}

.left-arrow,
.right-arrow {
  position: absolute;
  width: 35px;
  top: 45%;
  /* background-color: yellow; */
}

.left-arrow {
  margin-left: 50px;
}

.right-arrow {
  margin-left: 600px;
}

.left-arrow:active,
.right-arrow:active {
  /* background-color: grey; */
  transform: scale(0.89);
}

.left-arrow:hover,
.right-arrow:hover {
  cursor: pointer;
}

.slide-mode {
  position: fixed;
  top: 13%;
  left: 60%;
  width: 220px;
  text-align: center;
  font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
  color: rgb(47, 55, 52);
  font-weight: 700;
  font-size: 20px;
}
.switch {
  display: inline-block;
  width: 60px;
  height: 34px;
}

.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  -webkit-transition: 0.4s;
  transition: 0.4s;
}

.slider:before {
  position: absolute;
  content: '';
  height: 26px;
  width: 26px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  -webkit-transition: 0.4s;
  transition: 0.4s;
}

input:checked + .slider {
  background-color: #2196f3;
}

input:focus + .slider {
  box-shadow: 0 0 1px #2196f3;
}

input:checked + .slider:before {
  -webkit-transform: translateX(26px);
  -ms-transform: translateX(26px);
  transform: translateX(26px);
}

/* Rounded sliders */
.slider.round {
  border-radius: 34px;
}

.slider.round:before {
  border-radius: 50%;
}

@media (max-width: 900px) and (min-width: 380px) {
  .card-scroll {
    position: fixed;
    grid-template-columns: auto;
    top: 23%;
    height: 75vh;
    padding-left: 0%;
    left: 0%;
  }

  .card-scroll-single {
    position: fixed;
    top: 23%;
    height: 40%;
    width: 120%;
    left: 0%;
    justify-content: space-between !important;
    /* height: 40vh; */
    /* width: 100; */
    /* padding-left: 0%; */
    /* left: 0%; */
    background-color: red;
    margin-left: -20%;
  }

  .left-arrow,
  .right-arrow {
    position: absolute;
    width: 35px;
    top: 5%;
    background-color: yellow;
  }

  .left-arrow {
    left: 20%;
  }

  .right-arrow {
    left: 100%;
  }

  .subject-selector {
    top: 12%;
    left: 18%;
    height: 85px;
    padding: 5px;
    text-align: left;
  }

  .select-title {
    font-size: 15px;
    top: 35%;
    left: 10%;
  }

  #subject {
    top: 85%;
    left: 10%;
  }
  /* Slider */
  .slide-mode {
    position: fixed;
    top: 13%;
    left: 62%;
    width: 80px;
    text-align: center;
  }
  .switch {
    margin-top: 15px;
    display: inline-block;
  }

  .slide-mode {
    font-size: 10px;
    height: 75px;
  }

  .slider:before {
    position: absolute;
    content: '';
    /* height: 26px; */
    /* width: 26px; */
    left: 4px;
    bottom: 4px;
    background-color: white;
    -webkit-transition: 0.4s;
    transition: 0.4s;
  }
}
</style>

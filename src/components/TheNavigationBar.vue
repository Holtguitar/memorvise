<template>
  <nav>
    <nav class="nav-bar">
      <router-link id="mobile-logo" to="/">Recollect</router-link>
      <router-link
        class="nav-item"
        id="home"
        to="/"
        v-if="this.store.state.user"
      >
        Account
      </router-link>
      <router-link
        class="nav-item"
        id="cards"
        to="/cards"
        v-if="this.store.state.user"
      >
        Cards
      </router-link>
      <router-link
        class="nav-item"
        id="card-creator"
        to="/card-creator"
        v-if="this.store.state.user"
      >
        Create
      </router-link>
      <router-link
        class="nav-item"
        id="sign-in"
        to="/sign-in"
        v-if="!this.store.state.user"
      >
        Sign In
      </router-link>
      <button
        class="nav-item"
        id="sign-out"
        v-if="this.store.state.user"
        @click="handleSignOut"
      >
        <p class="sign-out-text">Sign Out</p>
        <img class="sign-out-icon" src="/sign-out-icon.png" />
      </button>
    </nav>
  </nav>
</template>

<script>
import { useStore } from 'vuex'

export default {
  data() {
    return {
      store: useStore(),
    }
  },
  methods: {
    handleSignOut() {
      this.store.dispatch('logout')
    },
  },
}
</script>

<style>
.nav-bar {
  position: fixed;
  display: flex;
  justify-content: center;
  text-align: center;
  margin-bottom: 50px !important;
  width: 100vw;
  height: 90px;
  left: -0.5%;
  top: -0.5%;
  margin-bottom: 50px;
  background-color: whitesmoke;
}

.nav-item {
  margin-right: 30px;
  padding: 5px;
  top: 30%;
  font-size: 30px;
  height: 60px;
  font-family: 'Merienda One', cursive;
  font-weight: 400;
}

.sign-out-text {
  font-weight: 400;
}

.nav-item:hover {
  text-decoration: underline;
}

#logo {
  position: absolute;
  padding: 5px;
  top: 30%;
  left: 5%;
  font-size: 30px;
  height: 60px;
  font-family: 'Rubik Vinyl', cursive;
}

#mobile-logo {
  position: absolute;
  padding: 5px;
  top: 30%;
  left: 5%;
  font-size: 30px;
  height: 60px;
  font-family: 'Rubik Vinyl', cursive;
  /* display: none; */
}

#sign-out,
#sign-in {
  position: absolute;
  margin-right: 30px;
  padding: 5px;
  top: 20%;
  left: 80%;
  height: 60px;
  border: none;
  background-color: transparent;
  text-decoration: none;
  color: rgb(16, 122, 87);
  font-weight: 400;
  font-family: 'Merienda One', cursive;
  --c: rgb(16, 122, 87); /* the border color */
  --b: 3px; /* the border thickness*/
  --g: 5px; /* the gap on hover */

  padding: calc(var(--g) + var(--b));
  --_g: #0000 25%, var(--c) 0;
  background: conic-gradient(
        from 180deg at top var(--b) right var(--b),
        var(--_g)
      )
      var(--_i, 200%) 0 /200% var(--_i, var(--b)) no-repeat,
    conic-gradient(at bottom var(--b) left var(--b), var(--_g)) 0
      var(--_i, 200%) / var(--_i, var(--b)) 200% no-repeat;
  transition: 0.3s, background-position 0.3s 0.3s;
  cursor: pointer;
}

.sign-out-icon {
  display: none;
}

#sign-in {
  position: absolute;
}

#sign-out:hover,
#sign-in:hover {
  --_i: 100%;
  transition: 0.3s, background-size 0.3s 0.3s;
  cursor: pointer;
}

#sign-out {
  background-color: transparent;
}

@media (max-width: 900px) and (min-width: 380px) {
  .nav-bar {
    text-align: center;
    justify-content: flex-start;
    margin-bottom: 0px;
    height: 70px;
    padding-left: 5%;
  }

  #mobile-logo {
    /* height: 50px; */
    /* font-size: 20px; */
    display: none;
  }

  #logo {
    display: none;
  }

  .nav-item {
    margin-right: 20px;
    padding: 8px;
    top: 25%;
    font-size: 18px;
  }

  #sign-out,
  #sign-in {
    left: 70%;
    height: 50px;
    font-size: 18px;
  }

  .sign-out-text {
    display: none;
  }

  .sign-out-icon {
    display: block;
    width: 35px;
    left: 20%;
  }

  #sign-out {
    width: 60px;
    left: 75%;
  }
}

@media (max-width: 300px) {
}
</style>

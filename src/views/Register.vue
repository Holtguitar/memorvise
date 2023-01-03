<template>
  <router-link id="logo" to="/">
    Recollect
  </router-link>
  <div class="container" id="container">
    <div class="form-container sign-in-container">
      <form action="#">
        <h1 class="form-title">Sign in</h1>
        <div class="social-container" @click.prevent="loginWithGoogle">
          <img src="\google.png" class="google__sign-in" />
        </div>
        <input type="email" placeholder="Email" v-model="login_form.email" />
        <input
          type="password"
          placeholder="Password"
          v-model="login_form.password"
        />
        <!-- <a href="#">Forgot your password?</a> -->
        <button class="login-button" @click.prevent="login">Sign In</button>
      </form>
    </div>
    <div class="overlay-container">
      <div class="overlay">
        <div class="overlay-panel overlay-right">
          <h1 class="form-title">New Account</h1>
          <br />
          <br />
          <input
            type="email"
            placeholder="Email"
            v-model="register_form.email"
          />
          <input
            type="password"
            placeholder="Password"
            v-model="register_form.password"
          />
          <!-- <input type="password" placeholder="Confirm Password" v-model="confirmPassword"/> -->
          <button class="register-button" id="sign-up-button" @click="register">
            Sign Up
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useStore } from 'vuex'

let login_form = ref({})
let register_form = ref({})
const store = useStore()

const login = () => {
  store.dispatch('loginWithEmail', login_form)
}

const register = () => {
  store.dispatch('register', register_form)
}

const loginWithGoogle = () => {
  store.dispatch('loginWithGoogle')
}
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Montserrat:400,800');
#logo {
  display: none;
}

.form-title {
  font-weight: bold;
  margin: 0;
}

.container {
  position: fixed;
  top: 25%;
  margin-left: 5%;
}

.login-button,
.register-button {
  border-radius: 20px;
  border: 1px solid #0b1ec8;
  background-color: #2f21eb;
  color: #ffffff;
  font-size: 12px;
  font-weight: bold;
  padding: 12px 45px;
  letter-spacing: 1px;
  text-transform: uppercase;
  transition: transform 80ms ease-in;
  margin-top: 15px;
}

.login-button:hover,
.register-button:hover {
  cursor: pointer;
}

.login-button:active,
.register-button:active {
  transform: scale(0.95);
}

.login-button:focus,
.register-button:focus {
  outline: none;
}

#sign-up-button {
  background-color: transparent;
  border-color: #ffffff;
}

.container form {
  background-color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 0 50px;
  height: 100%;
  text-align: center;
}

.container input {
  background-color: #eee;
  border: none;
  padding: 12px 15px;
  margin: 8px 0;
  width: 100%;
}

.container {
  left: 15%;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  overflow: hidden;
  width: 768px;
  max-width: 100%;
  min-height: 480px;
}

.form-container {
  position: absolute;
  top: 0;
  height: 100%;
  transition: all 0.6s ease-in-out;
}

.sign-in-container {
  left: 0;
  width: 50%;
  z-index: 2;
}

.sign-up-container {
  left: 0;
  width: 50%;
  opacity: 0;
  z-index: 1;
}

.overlay-container {
  position: absolute;
  top: 0;
  left: 50%;
  width: 50%;
  height: 100%;
  overflow: hidden;
  transition: transform 0.6s ease-in-out;
  z-index: 100;
}

.overlay {
  background: #05740e;
  background: -webkit-linear-gradient(to right, #2f21eb, #2f21eb);
  background: linear-gradient(to right, #2f21eb, #2f21eb);
  background-repeat: no-repeat;
  background-size: cover;
  background-position: 0 0;
  color: #ffffff;
  position: relative;
  left: -100%;
  height: 100%;
  width: 200%;
  transform: translateX(0);
  transition: transform 0.6s ease-in-out;
}

.overlay-panel {
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 0 40px;
  text-align: center;
  top: 0;
  height: 100%;
  width: 50%;
  transform: translateX(0);
  transition: transform 0.6s ease-in-out;
}

.overlay-right {
  right: 0;
  transform: translateX(0);
}

.social-container {
  margin: 20px 0;
}

.social-container a {
  border: 1px solid #dddddd;
  border-radius: 50%;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  margin: 0 5px;
  height: 40px;
  width: 40px;
}

.social-container img:hover {
  cursor: pointer;
  box-shadow: 0 14px 28px rgba(174, 174, 174, 0.25);
}

.social-container:active {
  transform: scale(0.95);
}

.button:hover {
  cursor: pointer;
  box-shadow: 0 14px 28px rgba(20, 20, 20, 0.25);
}

@media (max-width: 900px) {
  #logo {
    display: block;
    font-size: 18px;
  }

  .form-title {
    font-size: 20px;
  }

  .container {
    position: fixed;
    top: 10rem;
    left: 0%;
    margin-left: 0%;
    width: 100vw;
    height: 330px;
    min-height: 0;
  }

  .login-button,
  .register-button {
    width: 100px;
    height: 35px;
    padding: 0%;
  }

  .container input {
    width: 150px;
  }

  .container form {
    padding: 0;
    height: 100%;
  }

  .social-container img:hover {
    box-shadow: none;
  }

  .overlay-container {
    height: 100%;
  }

  .google__sign-in {
    width: 150px;
  }
}

@media (max-width: 300px) {
}
</style>

import { createRouter, createWebHistory } from 'vue-router'
// import {getAuth, onAuthStateChanged} from "firebase/auth";
// import { auth } from "../firebase"

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import("../views/HomeView.vue"),
    },
    {
      path: '/cards',
      name: '/cards',
      component: () => import('../views/Cards.vue'),
      meta: {
        requiresAuth: true,
      }
    },
    {
      path: '/card-creator',
      name: 'card-creator',
      component: () => import('../views/CardCreator.vue')
    },
    {
      path: '/sign-in',
      name: 'sign-in',
      component: () => import('../views/Register.vue')
    },
  ]
});

export default router

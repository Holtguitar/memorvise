import { createRouter, createWebHistory } from 'vue-router'
import {getAuth, onAuthStateChanged} from "firebase/auth";

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

// const getCurrentUser = () => {
//   return new Promise((resolve, reject) => {
//     const removeListener = onAuthStateChanged(
//       getAuth(), 
//       (user) => {
//       removeListener();
//       resolve(user);
//     }, 
//     reject
//   );
//   })
// }

// router.beforeEach(async (to, from, next) => {
//   if(to.matched.some((record) => record.meta.requiresAuth)) {
//     if(await getCurrentUser()){
//       next("/");
//     } else {
//       alert("Access Denied!")
//       next("/")
//     }
//   }
// })
export default router

import { createStore } from "vuex";
import router from "../router";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { getDatabase, ref, child, push, update, set } from '@firebase/database';


export default createStore({
    state: {
        user: null,
        subject: null,
        numSubjects: 0,
        numCards: 0,
        numFriends: 0,
        friendsList: [],
        subjects: [],
        cards: []
    },
    mutations: {
        SET_USER(state, user){
            state.user = user;
        },
        CLEAR_USER(state) {
            state.user = null;
        },
        GET_USER(state){
          return state.user;
        },
        SET_SUBJECTS(state, subjectArr){
          state.subjects = [];
          for(let value of Object.values(subjectArr)){
            state.subjects.push(value.subjectOption);
          }
        },
        SET_SUBJECT(state, selectedSubject){
          state.subject = selectedSubject;
        },
        CLEAR_SUBJECT(state){
          state.subject = null;
        },
    },
    actions: {
////////////////////ACCOUNT AND USER MANAGEMENT///////////////////////////////////
        async loginWithEmail({ commit }, details) {
          const {email, password} = details.value;
          const auth = getAuth();
            try {
              await signInWithEmailAndPassword(auth, email, password);
            } catch (error) {
              switch (error.code) {
                case "auth/user-not-found":
                  alert("User not found");
                  break;
                case "auth/wrong-password":
                  alert("Wrong password");
                  break;
                default:
                  alert("Something went wrong");
              }
              return;
            }
            commit("SET_USER", auth.currentUser);
            router.push("/");
        },
        async loginWithGoogle({ commit }) {
            const provider = new GoogleAuthProvider();
            const auth = getAuth();
            try {
                const provider = new GoogleAuthProvider();
                await signInWithPopup(auth, provider);
            } catch (error) {
                switch (error.code) {
                    case "auth/user-not-found":
                    alert("User not found");
                    break;
                    case "auth/wrong-password":
                    alert("Wrong password");
                    break;
                    default:
                    alert("Something went wrong");
                }
                return;
            }
            commit("SET_USER", auth.currentUser);
            router.push("/");
          },
          async register({ commit }, details) {
            const { email, password } = details.value;
            const auth = getAuth();
            try {
              await createUserWithEmailAndPassword(auth, email, password);
            } catch (error) {
              switch (error.code) {
                case "auth/email-already-in-use":
                  alert("Email already in use");
                  break;
                case "auth/invalid-email":
                  alert("Invalid email");
                  break;
                case "auth/operation-not-allowed":
                  alert("Operation not allowed");
                  break;
                case "auth/weak-password":
                  alert("Weak password");
                  break;
                default:
                  alert("Something went wrong");
              }
              return;
            }
            commit("SET_USER", auth.currentUser);
            router.push("/");
          },
          
        async logout({ commit }) {
          const auth = getAuth();
          await signOut(auth);
          commit("CLEAR_USER");
          router.push("/sign-in");
        },
        fetchUser({ commit }) {
          auth.onAuthStateChanged(async (user) => {
            if (user === null) {
              commit("CLEAR_USER");
            } else {
              commit("SET_USER", user);
    
              if (router.isReady() && router.currentRoute.value.path === "/") {
                router.push("/");
              }
            }
          });
        },
        deleteAccount({commit}){

        },
////////////////////////SUBJECT AND CARD MANAGEMENT///////////////////////////////////        
        async loadSubjects({commit}){
          let loadedSubjects = [];
          const user = getAuth();

          await fetch(`https://memorvise-default-rtdb.firebaseio.com/cards/${user.currentUser.uid}.json`)
          .then((res) => {
            if(res.ok){
              return res.json();
            }
          }).then((data) => {
            let subjects = [];
            for(const id in data){
              subjects.push({
                subjectOption: id,
              })
              loadedSubjects = subjects;
            };
            commit("SET_SUBJECTS", loadedSubjects);
          }).catch((error) => {
            this.error = error;
            alert(error);
          });
        },
        setSubject({commit, state}, selectedSubject){
          commit("SET_SUBJECT", selectedSubject)
        },
    },
    getters: {
      getSubject: state => {
        return state.subject;
      },
      getSubjects(state) {
        return state.subjects
      }
    }
});

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


export default createStore({
    state: {
        user: null,
        subject: null,
        numSubjects: 0,
        numCards: 0,
        numFriends: 0,
        friendsList: [],
    },
    mutations: {
        SET_USER(state, user){
            state.user = user;
        },
        CLEAR_USER(state) {
            state.user = null;
        },
        SET_SUBJECT(state, subject){
            state.user = subject;
        },
        CLEAR_SUBJECT(state) {
            state.subject = null;
        },
        SET_NUMSUBJECTS(state, numSubjects){
            state.numSubjects = user;
        },
        CLEAR_NUMSUBJECTS(state) {
            state.numSubjects = null;
        },
    },
    actions: {
        async loginWithEmail({ commit }, details) {
          const {email, password} = details.value;
          console.log(email, " ", password)

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
    }
});

import Vue from "vue";
import Vuex from "vuex";
import state from "./state";
import getters from "./getters";
import actions from "./actions";
import mutations from "./mutations";

Vue.use(Vuex);

export default new Vuex.Store({
    // state,
    // getters,
    // mutations,
    // actions
    modules: {
        saber: {
            state: {
                saber: "saber"
            },
            mutations: {
                bbb(state, payload) {
                    console.log(state, payload);
                }
            }
        }
    },
    state: {
        lancer: "lancer"
    },
    mutations: {
        aaa(state, payload) {
            state.lancer = payload;
            console.log(state, payload);
        }
    },
    actions: {}
});

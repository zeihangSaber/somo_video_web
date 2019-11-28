import Vue from "vue";
import Vuex from "vuex";
import option from "@/store/modules";
// vuex本地持续化
import createPersistedState from "vuex-persistedstate";
Vue.use(Vuex);
export default new Vuex.Store({
    ...option,
    plugins: [createPersistedState()]
});

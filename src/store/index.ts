import Vue from "vue";
import Vuex from "vuex";
import option from "@/store/modules";
// vuex本地持续化
import createPersistedState from "vuex-persistedstate";
Vue.use(Vuex);
export default new Vuex.Store({
	...option,
	plugins: [
		createPersistedState({
			reducer(state) {
				return {
					login_status: state.login_status,
					userName: state.userName,
					cookie: state.cookie,
					uid: state.uid
				};
			}
		})
	]
});

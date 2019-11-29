import { Moudles } from "@/Types";

export default <Moudles>{
	state: {
		login_status: false
	},
	getters: {},
	mutations: {
		login_status(state: any, status: boolean): void {
			state.login_status = status;
		}
	},
	actions: {
		setLoginStatus({ commit }, value: boolean): void {
			commit("login_status", value);
		}
	}
};

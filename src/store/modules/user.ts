import { Moudles } from "@/Types";

export default <Moudles>{
	state: {
		login_status: false,
		userName: ""
	},
	getters: {},
	mutations: {
		LoginStatus(state: any, status: boolean): void {
			state.login_status = status;
		},
		UserName(state: any, userName: string): void {
			state.userName = userName;
		}
	},
	actions: {
		setLoginStatus({ commit }, value: boolean): void {
			commit("LoginStatus", value);
		},
		setUserName({ commit }, value: string): void {
			commit("UserName", value);
		}
	}
};

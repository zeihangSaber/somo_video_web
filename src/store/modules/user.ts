import { Moudles } from "@/Types";

export default <Moudles>{
	state: {
		login_status: false,
		userName: "",
		uid: "",
		cookie: ""
	},
	getters: {},
	mutations: {
		LoginStatus(state: any, status: boolean): void {
			state.login_status = status;
		},
		UserName(state: any, userName: string): void {
			state.userName = userName;
		},
		Uid(state: any, uid: string): void {
			state.uid = uid;
		},
		Cookie(state: any, cookie: string): void {
			state.cookie = cookie;
		}
	},
	actions: {
		setLoginStatus({ commit }, value: boolean): void {
			commit("LoginStatus", value);
		},
		setUserName({ commit }, value: string): void {
			commit("UserName", value);
		},
		setUid({ commit }, value: string): void {
			commit("Uid", value);
		},
		setCookie({ commit }, value: string): void {
			commit("Cookie", value);
		}
	}
};

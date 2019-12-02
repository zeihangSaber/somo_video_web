import { Moudles } from "@/Types";

export default <Moudles>{
	state: {
		activityList: ""
	},
	getters: {},
	mutations: {
		setActivityList(state: any, value: []) {
			state.activityList = value;
		}
	},
	actions: {
		ActivityList({ commit }, value: []): void {
			commit("setActivityList", value);
		}
	}
};

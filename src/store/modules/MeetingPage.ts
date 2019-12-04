import { Moudles } from "@/Types";

export default <Moudles>{
	state: {
		Mcode: "", //mid
		connectStatus: 0 //
	},
	getters: {},
	mutations: {
		MeetingMcode(state: any, status: string | number): void {
			state.Mcode = status;
		},
		MeetingconnectStatus(state: any, status: string | number): void {
			state.connectStatus = status;
		}
	},
	actions: {
		setMeetingMcode({ commit }, value: string | number): void {
			commit("MeetingMcode", value);
		},
		setMeetingconnectStatus({ commit }, value: string | number): void {
			commit("MeetingconnectStatus", value);
		}
	}
};

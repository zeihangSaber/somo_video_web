import { Moudles } from "@/Types";

export default <Moudles>{
	state: {
		Mcode: "", //mid
		connectStatus: 0, //连接状态
		microphone: 1, //判断麦克风是否开启
		camera: 1 //判断摄像头是否开启
	},
	getters: {},
	mutations: {
		MeetingMcode(state: any, status: string | number): void {
			state.Mcode = status;
		},
		MeetingconnectStatus(state: any, status: string | number): void {
			state.connectStatus = status;
		},
		Meetingmicrophone(state: any, status: number): void {
			state.microphone = status;
		},
		Meetingcamera(state: any, status: number): void {
			state.camera = status;
		}
	},
	actions: {
		setMeetingMcode({ commit }, value: string | number): void {
			commit("MeetingMcode", value);
		},
		setMeetingconnectStatus({ commit }, value: string | number): void {
			commit("MeetingconnectStatus", value);
		},
		setMeetingmicrophone({ commit }, value: number): void {
			commit("Meetingmicrophone", value);
		},
		setMeetingcamera({ commit }, value: number): void {
			commit("Meetingcamera", value);
		}
	}
};

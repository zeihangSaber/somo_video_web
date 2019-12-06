import { ActionTree, GetterTree, MutationTree } from "vuex";

type str = "uid" | "dt" | "os" | "device" | "cookie" | "tenant" | "mid";
export interface Post {
	[key: string]: {
		url: string;
		defaultData: str[];
	};
}
export interface Moudles {
	state: {
		[key: string]: any;
	};
	getters: GetterTree<Moudles["state"], any>;
	actions: ActionTree<Moudles["state"], any>;
	mutations: MutationTree<any>;
}

export interface HeaderData {
	bannerUrl: string; //图片地址
	subject: string; //活动标题
	money: string; //活动金额
	mettingCode: number | string; //会议号
	paidState: boolean; //购买状态
	startTime: string; //开始时间
	endTime: string; //结束时间
	address: string; //活动地址
	width: string; //图片宽度
	height: string; //图片高度
	type: number; //1改变原样式，0表示不改变
	studentInfo: []; //报名规则
}

export interface ContentData {
	topic: string; //探讨话题
	notice: string; //报名须知
	declare: string; //特殊说明
	qr: string; //二维码地址
	type: number; //1改变原样式，0表示不改变
}

export interface actItem {
	id: number;
	tenant: number;
	subject: string;
	desc: string;
	money: number;
	start: number;
	end: number;
	bid: number;
	status: number;
	paid?: number;
}

export type actList = actItem[];

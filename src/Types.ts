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
export interface ImgLayout {
	width: string; //图片宽度
	height: string; //图片高度
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
}

export interface ContentData {
	topic: string; //探讨话题
	notice: string; //报名须知
	declare: string; //特殊说明
	qr: string; //二维码地址
}

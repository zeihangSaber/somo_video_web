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
	width: string;
	height: string;
}

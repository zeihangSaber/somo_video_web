import headerTab from "@/store/modules/headerTab";
import user from "@/store/modules/user";
import activitys from "@/store/modules/activitys";
import MeetingPage from "@/store/modules/MeetingPage";
import { Moudles } from "@/Types";
const modules: Moudles[] = [headerTab, user, activitys, MeetingPage];

const option = {
	state: {},
	getters: {},
	actions: {},
	mutations: {}
};

modules.forEach(m => {
	option.state = { ...option.state, ...m.state };
	option.getters = { ...option.getters, ...m.getters };
	option.actions = { ...option.actions, ...m.actions };
	option.mutations = { ...option.mutations, ...m.mutations };
});

export default option;

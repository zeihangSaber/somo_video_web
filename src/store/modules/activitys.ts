import { Moudles } from "@/Types";
import ajax from "@/utils/ajax";
import { actItem } from "@/Types";

type actList = actItem[];

export default <Moudles>{
	state: {
		activityList: <actList>[],
		myCreateActList: <actList>[]
	},
	getters: {},
	mutations: {
		setActivityList(state, value: actList) {
			state.activityList = value;
		},
		setMyCreateActList(state, value: actList) {
			state.myCreateActList = value;
		}
	},
	actions: {
		async ActivityList({ commit }): Promise<any> {
			const { items }: { items: actList } = await ajax.actList({
				tenant: 0,
				start: new Date().getTime() - 3600 * 1000 * 24 * 30,
				end: new Date().getTime() + 3600 * 1000 * 24 * 30,
				limit: 4
			});
			items.map(item => {
				return (item.paid = 0);
			});
			commit("setActivityList", items);
			if (ajax.defaultParameter.tenant) {
				const arr = items.filter(item => {
					return item.tenant === ajax.defaultParameter.tenant;
				});
				commit("setMyCreateActList", arr);
			}
		}
	}
};

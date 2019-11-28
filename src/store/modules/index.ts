import activity from "@/store/modules/activity";
import { Moudles } from "@/Types";
const modules: Moudles[] = [activity];

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

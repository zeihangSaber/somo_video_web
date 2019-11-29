import { Moudles } from "@/Types";

export default <Moudles>{
    state: {
        activeIndex: "home"
    },
    getters: {},
    mutations: {
        activeIndex(state: any, modules: string): void {
            state.activeIndex = modules;
        }
    },
    actions: {
        setActiveIndex({ commit }, value: string): void {
            commit("activeIndex", value);
        }
    }
};

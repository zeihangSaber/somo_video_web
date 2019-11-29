import { Moudles } from "@/Types";

export default <Moudles>{
    state: {
        activeIndex: "home",
        loginShow: false
    },
    getters: {},
    mutations: {
        ActiveIndex(state: any, modules: string): void {
            state.activeIndex = modules;
        },
        LoginShow(state: any, modules: boolean): void {
            state.loginShow = modules;
        }
    },
    actions: {
        setActiveIndex({ commit }, value: string): void {
            commit("ActiveIndex", value);
        },
        setLoginShow({ commit }, value: boolean): void {
            commit("LoginShow", value);
        }
    }
};

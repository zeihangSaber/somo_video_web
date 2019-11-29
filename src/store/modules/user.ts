import { Moudles } from "@/Types";

export default <Moudles>{
    state: {
        login_status: ""
    },
    getters: {},
    mutations: {
        login_status(state: any, status: any): void {
            state.login_status = status;
        }
    },
    actions: {}
};

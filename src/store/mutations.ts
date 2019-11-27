import { MutationTree } from "Vuex";
import TPYE from "./mutation-types";

const mutations: MutationTree<any> = {
    [TPYE.SET_ACTIVEINDEX](state: any, modules: string): void {
        state.activeIndex = modules;
    }
};

export default mutations;

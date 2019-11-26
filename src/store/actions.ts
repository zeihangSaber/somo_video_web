import { ActionTree } from "Vuex";
import { States } from "./state";
import TYPE from "./mutation-types";
const actions: ActionTree<States, any> = {
  setActiveIndex({ commit }, value: string): void {
    commit(TYPE.SET_ACTIVEINDEX, value);
  }
};

export default actions;

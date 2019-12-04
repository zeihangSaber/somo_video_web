import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import "animate.css";
import md5 from "js-md5";
import { getNum, format } from "@/common/common";

Vue.prototype.$md5 = md5;
Vue.config.productionTip = false;
Vue.use(ElementUI);

// 金钱
Vue.filter("getNum", getNum);
// 时间
Vue.filter("format", format);

new Vue({
	router,
	store,
	render: h => h(App)
}).$mount("#app");

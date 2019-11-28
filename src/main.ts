import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ElementUI from "element-ui";
import Somo from "somo-fir";
import "element-ui/lib/theme-chalk/index.css";
import "animate.css";

Vue.prototype.$somo = Somo;
Vue.config.productionTip = false;
Vue.use(ElementUI);
new Vue({
    router,
    store,
    render: h => h(App)
}).$mount("#app");

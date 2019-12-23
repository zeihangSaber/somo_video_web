import Vue from 'vue';
import App from './App.vue';
import VueClipboard from 'vue-clipboard2';
import toast from './utils/toast/toast';

Vue.use(VueClipboard);
const Base64 = require('js-base64').Base64;
Vue.config.productionTip = false;
Vue.use(toast);

new Vue({
  render: h => h(App),
}).$mount('#app');

import Vue from 'vue'
import App from './App.vue'
const Base64 = require('js-base64').Base64;
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')

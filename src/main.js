// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import {server} from './http/http-service.js'
import md5 from 'js-md5';
import add_js from './assets/js/whole_situation.js'
import axios from 'axios';
const appid = '2a89a275a9fe442784041d0468b0fa5b'

const items_version = '1.0.0'//项目版本号

Vue.prototype.$appid = appid
Vue.prototype.$axios1=axios;
Vue.prototype.$items_version = items_version;
Vue.prototype.$md5 = md5;
Vue.prototype.$axios=server;
Vue.prototype.$add_js = add_js;


Vue.config.productionTip = false







/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})

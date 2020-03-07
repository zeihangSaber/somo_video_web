import Vue from 'vue';
import App from './App.vue';
import VueClipboard from 'vue-clipboard2';
import toast from './utils/toast/toast';

Vue.use(VueClipboard);
const Base64 = require('js-base64').Base64;
Vue.config.productionTip = false;
Vue.use(toast);
Vue.filter("midFilter", (mid) => {
    if (mid.length < 7) {
        return mid
    } else if (mid.length < 12) {
        return `${mid.slice(0, 3)} ${mid.slice(3, 6)} ${mid.slice(6)}`
    } else {
        return `${mid.slice(0, 3)} ${mid.slice(0, 7)} ${mid.slice(7)}`
    }
});

new Vue({
    render: h => h(App)
}).$mount('#app');

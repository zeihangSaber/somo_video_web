import Vue from 'vue';
import ToastComponent from './toast.vue';
let toastVue = null;
let getVueToast = () => {
    toastVue = new Vue({
        render: h => h(ToastComponent),
    }).$mount();
    document.getElementsByClassName('playerBigBox')[0].append(toastVue.$el);
};
const Toast = {
    success(options) {
        !toastVue && getVueToast();
        toastVue.$children[0].add(options)
    }
};

export default {
    install(_Vue) {
        let $toast = {};
        Object.keys(Toast).forEach(key => {
            $toast[key] = Toast[key]
        });
        _Vue.prototype.$Toast = $toast;
    }
}

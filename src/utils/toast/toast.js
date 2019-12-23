import Vue from 'vue';
import ToastComponent from './toast.vue';
let toastVue = null;
let getVueToast = () => {
    toastVue = new Vue({
        render: h => h(ToastComponent),
    }).$mount();
    document.body.append(toastVue.$el);
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
        console.log('!!!!!!!!!!!!!', $toast, _Vue);
        _Vue.prototype.$Toast = $toast;
    }
}

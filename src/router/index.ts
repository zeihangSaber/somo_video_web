import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Price from "../views/Price.vue";
import Download from "../views/Download.vue";
import About from "../views/About.vue";
import Activitys from "../views/Activitys.vue";

Vue.use(VueRouter);

const routes = [
    {
        path: "/",
        redirect: "/activitys"
    },
    {
        path: "/home",
        name: "home",
        component: Home
    },
    {
        path: "/price",
        name: "price",
        component: Price
    },
    {
        path: "/download",
        name: "download",
        component: Download
    },
    {
        path: "/about",
        name: "about",
        component: About
    },
    {
        path: "/activitys",
        name: "activitys",
        component: Activitys
    }
];

const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes
});

export default router;

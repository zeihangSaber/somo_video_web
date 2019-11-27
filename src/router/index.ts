import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Price from "../views/Price.vue";
import Download from "../views/Download.vue";
import About from "../views/About.vue";
import Activity from "../views/Activity.vue";
import PersonalCenter from "../views/PersonalCenter.vue";

Vue.use(VueRouter);

const routes = [
    {
        path: "/",
        redirect: "/activity"
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
        path: "/activity",
        name: "activity",
        component: Activity
    },
    {
        path: "/personalCenter",
        name: "personalCenter",
        component: PersonalCenter
    }
];

const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes
});

export default router;

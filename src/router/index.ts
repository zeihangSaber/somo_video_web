import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Price from "../views/Price.vue";
import Download from "../views/Download.vue";
import About from "../views/About.vue";
import Activitys from "../views/Activitys.vue";
import Register from "../views/Register.vue";
import JoinConference from "../views/JoinConference.vue";
import ManageAct from "@/views/manageAct.vue";
import CreateAct from "@/views/manageAct/CreateAct.vue";
import MeetingPage from "@/views/MeetingPage.vue";

// import PersonalCenter from "../views/PersonalCenter.vue";

Vue.use(VueRouter);

const routes = [
	{
		path: "/manageAct",
		name: "manageAct",
		component: ManageAct,
		children: [
			{
				path: "/manageAct/create",
				name: "createAct",
				component: CreateAct
			}
		]
	},
	{
		path: "/home",
		name: "home",
		component: MeetingPage
	},
	{
		path: "/product",
		name: "product",
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
	},
	{
		path: "/register",
		name: "register",
		component: Register
	},
	{
		path: "/joinConference",
		name: "joinConference",
		component: JoinConference
	},
	{
		path: "/meetingPage",
		name: "meetingPage",
		component: MeetingPage
	}

	// {
	//     path: "/personalCenter",
	//     name: "personalCenter",
	//     component: PersonalCenter
	// }
];

const router = new VueRouter({
	mode: "history",
	base: process.env.BASE_URL,
	routes
});

export default router;

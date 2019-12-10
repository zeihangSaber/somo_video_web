import Vue from "vue";
import VueRouter from "vue-router";
import Home from "@/views/Home.vue";
import Price from "@/views/Price.vue";
import Download from "@/views/Download.vue";
import About from "@/views/About.vue";
import Activitys from "@/views/Activitys.vue";
import ActivityDetails from "@/views/ActivityDetails.vue";
import Register from "@/views/Register.vue";
import JoinConference from "@/views/JoinConference.vue";
import ManageAct from "@/views/manageAct/index.vue";
import CreateAct from "@/views/manageAct/CreateAct.vue";
import PaidActivity from "@/views/manageAct/PaidActivity.vue";
import ActivityDetail from "@/views/manageAct/ActivityDetail.vue";
import History from "@/views/manageAct/History.vue";
import MeetingPage from "@/views/MeetingPage.vue";
import StatusAct from "@/views/manageAct/StatusAct.vue";

// import PersonalCenter from "../views/PersonalCenter.vue";
const originalPush: any = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location: any): any {
	return originalPush.call(this, location).catch((err: any): any => err);
};

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
			},
			{
				path: "/manageAct/status",
				name: "statusAct",
				component: StatusAct
			},
			{
				path: "/manageAct/history",
				name: "history",
				component: History
			},
			{
				path: "/manageAct/paidActivity",
				name: "paidActivity",
				component: PaidActivity
			},
			{
				path: "/manageAct/activityDetail",
				name: "activityDetail",
				component: ActivityDetail
			}
		]
	},
	{
		path: "/home",
		name: "home",
		component: Home
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
		path: "/activitys/details",
		name: "activityDetails",
		component: ActivityDetails
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
	},
	{
		path: "/",
		redirect: "/home"
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

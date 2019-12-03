<template>
	<div class="container">
		<div class="titile">
			<h2>精选活动</h2>
			<h3>Selected activities</h3>
		</div>
		<div class="activitys" v-show="activitysShow">
			<Activity class="activity" v-for="activity in activityList" :key="activity.id" :activity="activity" />
		</div>
	</div>
</template>

<script lang="ts">
import deepclone from "../../public/deepclone";
import Activity from "@/components/activity.vue";
import Somo_ajax from "@/utils/ajax";
import { State, Action } from "vuex-class";
import { Component, Vue } from "vue-property-decorator";
@Component({
	components: {
		Activity
	}
})
export default class Activitys extends Vue {
	@State uid: string;
	@Action ActivityList: (value: []) => void;
	public activityList: [any] = [""];
	private activitysShow: boolean = false;
	created() {
		Somo_ajax.actList({
			tenant: 0,
			start: new Date().getTime() - 3600 * 1000 * 24 * 30,
			end: new Date().getTime() + 3600 * 1000 * 24 * 30,
			limit: 8
		}).then((res: any): void => {
			this.activityFilter(res.items);
		});
	}
	//活动过滤
	activityFilter(list: []) {
		const newTime = new Date().getTime();
		let activityList = list ? deepclone(list) : [];
		activityList = activityList
			.filter((activity: any): any => +activity.status === 1 && activity.end > newTime)
			.sort((a: any, b: any) => b.start - a.start);
		this.activityList = activityList;
		this.ActivityList(activityList);
		Somo_ajax.singUpList().then((res: any) => {
			this.activitysShow = true;
			res.acts && this.paidActivity(res.acts, activityList);
		});
	}
	//活动支付过滤
	paidActivity(activity: [], activityList: any) {
		let paidIdList = activity.filter((item: any) => +item.paid === 1).map((item: any) => item.actid);
		const noPaidId = activity.map((item: any) => item.actid);
		for (let item of activityList) {
			if (paidIdList.includes(item.id)) {
				item.paid = 1;
			} else if (noPaidId.includes(item.id) && item.money === 0) {
				item.paid = 1;
			} else {
				item.paid = 0;
			}
		}
		const [paidActivitys, nopaidActivitys] = activityList.reduce(
			(activityState: any, activity: any) => {
				if (activity.paid === 1) {
					activityState[0].push(activity);
				}
				if (activity.paid === 0) {
					activityState[1].push(activity);
				}
				return activityState;
			},
			[[], []]
		);
		activityList = [...paidActivitys, ...nopaidActivitys];
		this.activityList = activityList;
		this.ActivityList(activityList);
	}
}
</script>

<style lang="less" scoped>
@import "../common/common.less";
.container {
	margin: 0 auto;
	width: 1080px;
	margin-bottom: 140px;
	min-height: 600px;
	.titile {
		margin: 85px 0 30px 30px;
		h2 {
			display: inline-block;
			font-size: 20px;
			font-weight: 500;
			color: rgba(24, 144, 255, 1);
			margin-right: 13px;
		}
		h3 {
			display: inline-block;
			font-size: 8px;
			font-weight: 500;
			color: rgba(204, 204, 204, 1);
		}
	}
	.activitys {
		.flex-option();
		flex-wrap: wrap;
		cursor: pointer;
		.activity {
			margin: 0 10px;
			margin-bottom: 40px;
		}
	}
}
</style>

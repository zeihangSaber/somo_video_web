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
			this.ActivityList(res.items);
			this.activitysShow = true;
			this.activityList = res.items;
			this.activityFilter(res.items);
		});
	}
	activityFilter(list: []) {
		console.log(this.uid);
		const newTime = new Date().getTime();
		let activityList = list ? deepclone(list) : [];
		activityList = activityList
			.filter((activity: any): any => +activity.status === 1 && activity.end > newTime)
			.sort((a: any, b: any) => a.start - b.start);
		console.log("未过期的活动数据列表", activityList);
		Somo_ajax.singUpList().then((res: any) => console.log(res));
	}
}
</script>

<style lang="less" scoped>
@import "../common/common.less";
.container {
	margin: 0 auto;
	width: 1080px;
	margin-bottom: 140px;
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

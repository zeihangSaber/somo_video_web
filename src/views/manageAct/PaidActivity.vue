<template>
	<div class="paidActivity">
		<div class="title">已购买</div>
		<div class="activitys" v-loading="loading">
			<Activity class="activity" v-for="activity in activitys" :key="activity.id" :activity="activity"></Activity>
		</div>
	</div>
</template>

<script lang="ts">
import { actItem } from "@/Types";
import deepclone from "../../../public/deepclone";
import Somo_ajax from "@/utils/ajax";
import Activity from "@/components/activity";
import { Component, Vue } from "vue-property-decorator";
import { Mutation } from "vuex-class";
@Component({
	components: {
		Activity
	}
})
export default class PaidActivity extends Vue {
	private activitys: actItem | any[] = [];
	private paidId: [number];
	private loading: boolean = true;
	@Mutation setActivityList: (value: actItem) => void;
	async created() {
		await Somo_ajax.singUpList().then((res: any) => {
			this.paidId = res.acts.filter((item: any) => +item.paid === 1).map((item: any) => item.actid);
			this.getactList(this.paidId);
		});
	}
	getactList(paidId: [number]) {
		console.log(paidId);
		Somo_ajax.actList({
			tenant: 0,
			start: new Date().getTime() - 3600 * 1000 * 24 * 30,
			end: new Date().getTime() + 3600 * 1000 * 24 * 360
		}).then((res: any) => {
			this.setActivityList(res.items);
			const newTime = new Date().getTime();
			let activitys = deepclone(res.items).filter((item: any) => this.paidId.includes(item.id));
			console.log(activitys);
			let [underway, notStarted, end] = activitys.reduce(
				(array: any, activity: any) => {
					if (activity.end >= newTime && activity.start <= newTime) {
						array[0].push(activity);
					} else if (activity.end < newTime) {
						array[2].push(activity);
					} else {
						array[1].push(activity);
					}
					return array;
				},
				[[], [], []]
			);
			this.activitys = [...underway, ...notStarted, ...end];
			this.loading = false;
		});
	}
}
</script>

<style lang="less" scoped>
@import "../../common/common.less";
.paidActivity {
	margin-left: 40px;
	.title {
		margin: 34px 0;
		font-size: 20px;
		font-weight: 500;
		color: rgba(0, 0, 0, 1);
		line-height: 28px;
	}
	.activitys {
		min-height: 600px;
		.flex-option();
		flex-wrap: wrap;
		.activity {
			cursor: pointer;
			background-color: #fff;
			margin-right: 30px;
			margin-bottom: 40px;
		}
	}
}
</style>

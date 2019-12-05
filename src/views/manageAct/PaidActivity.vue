<template>
	<div class="paidActivity">
		<div class="title">已购买</div>
		<div class="activity">
			<!-- <Activity v-for="activity in activitys" :key="activity.id" :activity="activity"></Activity> -->
		</div>
	</div>
</template>

<script lang="ts">
import deepclone from "../../../public/deepclone";
import Somo_ajax from "@/utils/ajax";
import Activity from "@/components/activity";
import { Component, Vue } from "vue-property-decorator";
@Component({
	components: {
		Activity
	}
})
export default class PaidActivity extends Vue {
	private activitys: any = [];
	created() {
		Somo_ajax.actList({
			tenant: 0,
			start: new Date().getTime() - 3600 * 1000 * 24 * 360,
			end: new Date().getTime() + 3600 * 1000 * 24 * 360
		}).then((res: any) => {
			console.log("一年内的全部订单", res.items);
		});
		Somo_ajax.singUpList().then((res: any) => {
			this.activitys = deepclone(res.acts);
			console.log("已购买", res.acts);
		});
	}
}
</script>

<style lang="less" scoped></style>

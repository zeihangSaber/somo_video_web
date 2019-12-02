<template>
	<div class="activity" @click="toDetails(activity.id)">
		<div class="activity_header">
			<span class="activity_state activity_underway"></span>
			<img :src="activity_desc.banner" alt="" />
		</div>

		<div class="activity_text">
			<div class="activity_subject">{{ activity.subject }}</div>
			<div class="activity_time">{{ activity_time }}</div>
			<div class="activity_money">￥{{ activity_money }}</div>
		</div>
	</div>
</template>
<script lang="ts">
import { getNum, setTime } from "@/common/common";
import { Component, Vue, Prop } from "vue-property-decorator";
@Component
export default class HeaderTab extends Vue {
	private activity_desc: object = {};
	private activity_time: string = "";
	private activity_money: any = "";
	@Prop() activity: any | undefined;
	created() {
		this.activity_money = getNum(this.activity.money);
		this.activity_desc = this.activity && JSON.parse(this.activity.desc);
		this.activity_time = `${setTime(this.activity.start)}-${setTime(this.activity.end)}`;
	}
	mounted() {}
	toDetails(actId: string) {
		this.$router.push({
			path: "/activitys/details",
			query: {
				actId
			}
		});
	}
}
</script>

<style lang="less" scoped>
@import "../common/common.less";
.activity {
	width: 250px;
	background-color: #f7f7f7;
	border-radius: 8px;
	padding: 20px;
	.activity_header {
		box-sizing: border-box;
		position: relative;
		.activity_state {
			position: absolute;
			top: 5px;
			left: 7px;
			width: 70px;
			height: 24px;
		}
		.activity_underway {
			.backgroundImg("../assets/activity/activity-underway.png");
		}
		.activity_notStarted {
			.backgroundImg("../assets/activity/activity-notStarted.png");
		}
		img {
			display: inline-block;
			width: 210px;
			height: 157px;
			border-radius: 8px;
		}
	}
	.activity_text {
		margin-left: 7px;
		margin-top: 10px;
		.activity_subject {
			max-width: 197px;
			font-size: 14px;
			font-weight: 500;
			color: rgba(51, 51, 51, 1);
			line-height: 20px;
			letter-spacing: 1px;
			.text-overflow(2);
		}
		.activity_time {
			margin: 10px 0;
			font-size: 12px;
			color: rgba(153, 153, 153, 1);
			line-height: 17px;
		}
		.activity_money {
			font-size: 18px;
			font-weight: 600;
			color: rgba(213, 180, 92, 1);
			line-height: 25px;
		}
	}
}
</style>

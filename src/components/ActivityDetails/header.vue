<template>
	<div class="header">
		<slot class="return"></slot>
		<div class="header_container">
			<img :src="desc.banner" :style="{ width: imgLayout.width, height: imgLayout.height }" />
			<div class="header_right">
				<h2>{{ activityDetail.subject }}</h2>
				<h3>¥ {{ money }}</h3>
				<div class="TimetoAddress">
					<span class="icon icon_time"></span>
					<span class="container">2019年10月27日13:00-2019年10月28日17:00</span>
				</div>
				<div class="TimetoAddress">
					<span class="icon icon_address"></span>
					<span class="container">福建厦门思明区望海路65号701-3</span>
				</div>
				<el-button type="primary" class="button">加入会议</el-button>
				<div class="mettingCode" v-show="mettingCode">
					<span class="left">会议号</span>
					<span class="right">{{ mettingCode }}</span>
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { ImgLayout } from "@/Types";
import { getNum } from "@/common/common";
import { Component, Vue, Prop } from "vue-property-decorator";
import { State, Action } from "vuex-class";
@Component
export default class header extends Vue {
	private activityDetail: any = {};
	private actId: string = "";
	private desc: any = "";
	private money: any = "";
	@Prop() imgLayout: ImgLayout;
	@Prop() mettingCode: string;
	@State activityList: any;
	created() {
		this.actId = this.$route.query.actId as string;
		this.activityDetail = this.activityList.filter((item: any): any => +item.id === +this.actId)[0];
		this.desc = JSON.parse(this.activityDetail.desc);
		this.money = getNum(this.activityDetail.money);
		console.log(this.imgLayout);
		console.log(this.mettingCode);
	}
}
</script>

<style lang="less" scoped>
@import "../../common/common.less";
.header {
	width: 100%;
	padding: 30px 0 30px 40px;
	background: rgba(250, 250, 250, 1);
	.header_container {
		.flex-option();
		img {
			display: inline-block;
			border: 0;
			border-radius: 8px;
		}
		.header_right {
			margin-top: 10px;
			margin-left: 38px;
			h2 {
				font-size: 24px;
				color: rgba(0, 0, 0, 1);
				line-height: 33px;
			}
			h3 {
				margin: 8px 0;
				font-size: 24px;
				font-weight: 600;
				color: rgba(213, 180, 92, 1);
				line-height: 33px;
			}
			.TimetoAddress {
				margin-top: 5px;
				.icon {
					display: inline-block;
					width: 20px;
					height: 20px;
					margin-right: 10px;
				}
				.icon_time {
					.backgroundImg("../assets/activity/activity-icon_time.png");
				}
				.icon_address {
					.backgroundImg("../assets/activity/activity-icon_address.png");
				}
				.container {
					vertical-align: top;
					font-size: 14px;
					font-weight: 400;
					color: rgba(102, 102, 102, 1);
					line-height: 20px;
				}
			}
			.button {
				margin-top: 20px;
			}
			.mettingCode {
				margin-left: 30px;
				display: inline-block;
				height: 36px;
				border-radius: 4px;
				border: 1px solid #e2eef9;
				.left {
					text-align: center;
					display: inline-block;
					width: 54px;
					height: 34px;
					background: rgba(226, 238, 249, 1);
					font-size: 14px;
					font-weight: 500;
					color: rgba(113, 187, 255, 1);
					line-height: 33px;
				}
				.right {
					text-align: center;
					padding: 8px 11px;
					font-size: 14px;
					font-weight: 500;
					color: rgba(17, 139, 251, 1);
					line-height: 33px;
				}
			}
		}
	}
}
</style>

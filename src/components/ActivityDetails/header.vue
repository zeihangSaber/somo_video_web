<template>
	<div class="activityDetails_header">
		<slot class="return"></slot>
		<div class="header_container">
			<img :src="headerData.bannerUrl" :style="{ width: imgLayout.width, height: imgLayout.height }" />
			<div class="header_right">
				<h2>{{ headerData.subject }}</h2>
				<h3>¥ {{ headerData.money }}</h3>
				<div class="TimetoAddress">
					<span class="icon icon_time"></span>
					<span class="container">{{ `${headerData.startTime} - ${headerData.endTime}` }}</span>
				</div>
				<div class="TimetoAddress">
					<span class="icon icon_address"></span>
					<span class="container">{{ headerData.address }}</span>
				</div>
				<el-button type="primary" class="button">加入会议</el-button>
				<div class="mettingCode" v-show="headerData.mettingCode">
					<span class="left">会议号</span>
					<span class="right">{{ headerData.mettingCode }}</span>
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { ImgLayout, HeaderData } from "@/Types";
import { Component, Vue, Prop } from "vue-property-decorator";
@Component
export default class activityDetails_header extends Vue {
	@Prop() imgLayout: ImgLayout;
	@Prop() headerData: HeaderData;
}
</script>

<style lang="less" scoped>
@import "../../common/common.less";
.activityDetails_header {
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

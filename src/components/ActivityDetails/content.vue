<template>
	<div class="activityDetails_content">
		<slot></slot>
		<div class="activity_gambit activity_detail">
			<h4>探讨话题</h4>
			<div class="text">
				{{ contentData.topic }}
			</div>
		</div>
		<div class="activity_rule activity_detail">
			<h4>报名须知</h4>
			<div class="text">
				{{ contentData.notice }}
			</div>
		</div>
		<el-divider></el-divider>
		<div class="especially_text" v-show="contentData.declare">
			{{ contentData.declare }}
		</div>
		<div class="qr" v-show="contentData.qr">
			<img class="qrImg" :src="contentData.qr" />
			<p>扫码添加工作人员微信</p>
		</div>
	</div>
</template>

<script lang="ts">
import { ContentData } from "@/Types";
import { Component, Vue, Prop } from "vue-property-decorator";
@Component
export default class activityDetails_content extends Vue {
	@Prop() contentData: ContentData;
}
</script>

<style lang="less" scoped>
@import "../../common/common.less";
.activityDetails_content {
	width: 100%;
	padding: 30px 40px 50px 40px;
	background: rgba(250, 250, 250, 1);
	border-radius: 8px;
	.activity_detail {
		margin-bottom: 30px;
		h4 {
			font-size: 16px;
			font-weight: 600;
			color: rgba(51, 51, 51, 1);
			line-height: 22px;
			margin-bottom: 8px;
		}
		.text {
			font-size: 14px;
			font-weight: 400;
			color: rgba(51, 51, 51, 1);
			line-height: 22px;
		}
	}
	.el-divider {
		background-color: #eee;
	}
	.especially_text {
		margin: 0 auto;
		text-align: center;
		margin-top: 20px;
		margin-bottom: 25px;
		max-width: 240px;
		font-size: 14px;
		font-weight: 400;
		color: rgba(51, 51, 51, 1);
		line-height: 20px;
	}
	.qr {
		.flex-option(column, center, center);
		img {
			text-align: center;
			display: inline-block;
			width: 100px;
			height: 100px;
		}
		p {
			margin-top: 8px;
			font-size: 12px;
			font-weight: 400;
			color: rgba(153, 153, 153, 1);
			line-height: 17px;
		}
	}
}
</style>

<template>
	<div class="container">
		<DetailHeader :imgLayout="imgLayout" class="header">
			<!-- <div class="slot_return">
				<span class="icon_return"></span>
				<span>返回</span>
			</div> -->
		</DetailHeader>
		<DetailContent> </DetailContent>
	</div>
</template>

<script lang="ts">
import { ImgLayout } from "@/Types";
import DetailHeader from "../components/ActivityDetails/header.vue";
import DetailContent from "../components/ActivityDetails/content.vue";
import { getNum } from "@/common/common";
import { Component, Vue } from "vue-property-decorator";
import { State, Action } from "vuex-class";
@Component({
	components: {
		DetailHeader,
		DetailContent
	}
})
export default class activityDetails extends Vue {
	private imgLayout: ImgLayout;
	created() {
		this.imgLayout = {
			width: "280px",
			height: "210px"
		};
	}
}
</script>

<style lang="less" scoped>
@import "../common/common.less";
.container {
	width: 1200px;
	margin: 0 auto;
	margin-top: 50px;
	.header {
		border-radius: 8px;
		.slot_return {
			margin-bottom: 24px;
			span {
				font-size: 14px;
				font-weight: 400;
				color: rgba(51, 51, 51, 1);
				line-height: 20px;
			}
			.icon_return {
				.backgroundImg("../assets/activity/activity-icon_retuen.png");
				display: inline-block;
				width: 9px;
				height: 12px;
				margin-right: 5px;
			}
		}
	}
}
</style>

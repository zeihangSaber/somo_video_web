<template>
	<div class="container">
		<DetailHeader :imgLayout="imgLayout" :headerData="headerData" class="main_header">
			<!-- <div class="slot_return">
				<span class="icon_return"></span>
				<span>返回</span>
			</div> -->
		</DetailHeader>
		<DetailContent class="main_content" :contentData="contentData">
			<div class="title">
				<h3>活动详情</h3>
				<el-divider></el-divider>
			</div>
		</DetailContent>
	</div>
</template>

<script lang="ts">
import { ImgLayout, HeaderData, ContentData } from "@/Types";
import { getNum, detailTime } from "@/common/common";
import { Component, Vue } from "vue-property-decorator";
import { State, Action } from "vuex-class";
import DetailHeader from "../components/ActivityDetails/header.vue";
import DetailContent from "../components/ActivityDetails/content.vue";
@Component({
	components: {
		DetailHeader,
		DetailContent
	}
})
export default class activityDetails extends Vue {
	public headerData: HeaderData;
	public contentData: ContentData;
	private activityDetail: any = {}; //通过actId筛选出的活动数据
	private imgLayout: ImgLayout;
	@State activityList: any;
	created() {
		this.imgLayout = {
			width: "280px",
			height: "210px"
		};
		this.initData();
	}
	initData() {
		const actId: string = this.$route.query.actId as string;
		this.activityDetail = this.activityList.filter((item: any): any => +item.id === +actId)[0];
		console.log("筛选出的活动", this.activityDetail);
		const desc = JSON.parse(this.activityDetail.desc);
		console.log("筛选出的活动详情", desc);
		this.headerData = {
			subject: this.activityDetail.subject,
			bannerUrl: desc.banner,
			address: desc.address,
			money: getNum(this.activityDetail.money) as string,
			paidState: false,
			startTime: detailTime(this.activityDetail.start),
			endTime: detailTime(this.activityDetail.end),
			mettingCode: ""
		};
		this.contentData = {
			topic: desc.topic,
			notice: desc.notice,
			declare: desc.declare,
			qr: desc.qr
		};
		console.log(this.headerData);
	}
}
</script>

<style lang="less" scoped>
@import "../common/common.less";
.container {
	width: 1200px;
	margin: 0 auto;
	margin-top: 50px;
	margin-bottom: 66px;
	.main_header {
		border-radius: 8px;
		margin-bottom: 20px;
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
	.main_content {
		width: 890px;
		.title {
			h3 {
				font-size: 18px;
				font-weight: 600;
				color: rgba(0, 0, 0, 1);
				line-height: 25px;
			}
		}
		.el-divider--horizontal {
			margin: 16px 0 29px 0;
		}
		.el-divider {
			background-color: #eee;
		}
	}
}
</style>

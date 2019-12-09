<template>
	<div class="container" v-show="activityDetailsShow">
		<DetailHeader :headerData="headerData" :actId="actId" class="main_header">
			<div class="slot_return">
				<el-button class="backBtn" @click="back" type="text" icon="el-icon-arrow-left">返回</el-button>
			</div>
		</DetailHeader>
		<DetailContent :contentData="contentData" class="main_content"> </DetailContent>
	</div>
</template>

<script lang="ts">
import Somo_ajax from "../../utils/ajax";
import { HeaderData, ContentData } from "@/Types";
import { getNum, detailTime } from "@/common/common";
import { Component, Vue } from "vue-property-decorator";
import { State, Action } from "vuex-class";
import DetailHeader from "../../components/ActivityDetails/header.vue";
import DetailContent from "../../components/ActivityDetails/content.vue";
@Component({
	components: {
		DetailHeader,
		DetailContent
	}
})
export default class activityDetail extends Vue {
	public headerData: HeaderData = {
		subject: "",
		bannerUrl: "",
		address: "",
		money: "",
		paidState: false,
		startTime: "",
		endTime: "",
		mettingCode: "",
		width: "360px",
		height: "270px",
		type: 0,
		studentInfo: []
	};
	public contentData: ContentData = {
		topic: "",
		notice: "",
		declare: "",
		qr: "",
		type: 0
	};
	private activityDetailsShow: boolean = false;
	private activityDetail: any = {}; //通过actId筛选出的活动数据
	private actId: string | number;
	@State activityList: any;
	@State login_status: boolean;
	created() {
		this.actId = this.$route.query.actId as string;
		this.singUpCheck();
	}
	initData(mettingCode: string | number = "", paidState: boolean = false) {
		this.activityDetail = this.activityList.filter((item: any): any => +item.id === +this.actId)[0];
		const desc = JSON.parse(this.activityDetail.desc);
		this.headerData = Object.assign(this.headerData, {
			subject: this.activityDetail.subject,
			bannerUrl: desc.banner,
			address: desc.address,
			money: getNum(this.activityDetail.money) as string,
			paidState,
			startTime: detailTime(this.activityDetail.start),
			endTime: detailTime(this.activityDetail.end),
			mettingCode,
			studentInfo: desc.studentInfo
		});
		this.contentData = Object.assign(this.contentData, {
			topic: desc.topic,
			notice: desc.notice,
			declare: desc.declare,
			qr: desc.qr
		});
		this.activityDetailsShow = true;
	}
	singUpCheck() {
		if (this.login_status) {
			Somo_ajax.singUpCheck({ actid: this.actId }).then((res: any): void => {
				this.initData(res.code, true);
			});
		} else {
			this.initData();
		}
	}
	back() {
		this.$router.back();
	}
}
</script>

<style lang="less" scoped>
@import "../../common/common.less";
.container {
	margin: 0 auto;
	margin-bottom: 66px;
	.main_header {
		border-radius: 8px;
		margin-bottom: 20px;
		.backBtn {
			.fontStyle(14px, #333);
			margin-bottom: 20px;
		}
	}
	.main_content {
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

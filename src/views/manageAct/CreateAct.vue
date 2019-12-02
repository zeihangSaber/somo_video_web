<template>
	<div class="constant">
		<el-button class="backBtn" type="text" icon="el-icon-arrow-left">返回</el-button>
		<el-form ref="form" :model="form" :rules="rules" label-width="80px">
			<div class="smallTitle">
				<span class="titleAct">创建活动</span>
				<el-button class="issueBtn" type="primary" icon="el-icon-s-promotion">
					主要按钮
				</el-button>
			</div>
			<div>
				<span class="infoAct">活动信息</span>
				<el-divider></el-divider>
				<el-form-item label="活动海报">
					<el-upload
						class="poster-uploader"
						action="/file"
						:auto-upload="false"
						:show-file-list="false"
						:on-change="bannerSec"
					>
						<img v-if="form.desc.banner" :src="form.desc.banner" class="poster" />
						<i v-else class="el-icon-plus poster-uploader-icon"></i>
					</el-upload>
					大小不超过2M 图片尺寸420x315像
				</el-form-item>
				<el-form-item label="活动名称" prop="subject">
					<el-input size="medium" v-model="form.subject" placeholder="请输入活动主题/会议名称"></el-input>
				</el-form-item>
				<el-form-item label="活动时间">
					<div class="formDate">
						<el-date-picker
							class="date"
							type="date"
							size="medium"
							placeholder="选择日期"
							v-model="form.date1"
							style="width: 100%;"
						></el-date-picker>
						<span>~</span>
						<el-time-picker
							is-range
							placeholder="选择时间"
							v-model="form.date2"
							range-separator="-"
							start-placeholder="开始时间"
							end-placeholder="结束时间"
							style="width: 100%;"
						></el-time-picker>
					</div>
				</el-form-item>
				<el-form-item label="活动地点" prop="address">
					<el-input size="medium" v-model="form.desc.address" placeholder="请输入活动地点"></el-input>
				</el-form-item>
				<el-form-item label="探讨话题" prop="topic">
					<el-input type="textarea" v-model="form.desc.topic" placeholder="请输入话题内容"></el-input>
				</el-form-item>
				<el-form-item label="报名须知">
					<el-input size="medium" v-model="form.desc.notice"></el-input>
				</el-form-item>
				<el-form-item label="特别说明">
					<el-input
						size="medium"
						v-model="form.desc.declare"
						placeholder="*活动最终所有解释权归***所有。如有任何问题，请联系****工作人员。"
					></el-input>
				</el-form-item>
				<el-form-item label="联系方式">
					<el-upload
						class="avatar-uploader"
						action="https://jsonplaceholder.typicode.com/posts/"
						:show-file-list="false"
					>
						<img v-if="imageUrl" :src="imageUrl" class="avatar" />
						<i v-else class="el-icon-plus avatar-uploader-icon"></i>
					</el-upload>
					<span>添加联系人二维码</span>
				</el-form-item>
				<span class="infoAct">报名设置</span>
				<el-divider></el-divider>
				<el-form-item label="收费金额">
					<el-input size="medium" v-model="form.name" placeholder="请输入活动地点"></el-input>
				</el-form-item>
				<el-form-item label="层报名信息采集">
					<el-checkbox-group v-model="form.type">
						<el-checkbox label="姓名" name="type"></el-checkbox>
						<el-checkbox label="手机号码" name="type"></el-checkbox>
						<el-checkbox label="邮箱" name="type"></el-checkbox>
						<el-checkbox label="公司名称" name="type"></el-checkbox>
						<el-checkbox label="职务" name="type"></el-checkbox>
					</el-checkbox-group>
				</el-form-item>
				<span class="infoAct">活动发布</span>
				<el-divider></el-divider>
				<el-form-item label="发布状态选择">
					<el-radio-group v-model="form.resource">
						<el-radio label="线上品牌商赞助"></el-radio>
						<el-radio label="线下场地免费"></el-radio>
					</el-radio-group>
				</el-form-item>
			</div>
		</el-form>
	</div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { State, Action } from "vuex-class";
@Component
export default class HeaderTab extends Vue {
	private ruleForm = {
		name: ""
	};
	private rules = {
		subject: [{ required: true, message: "请输入活动名称", trigger: "blur" }],
		address: [{ required: true, message: "请输入活动地址", trigger: "blur" }],
		topic: [{ required: true, message: "请输入话题内容", trigger: "blur" }]
	};
	private imageUrl: string = "";
	private form = {
		subject: "",
		start: 0,
		end: 0,
		money: 0,
		desc: {
			address: "",
			topic: "",
			notice: "",
			declare: "",
			banner: "",
			qr: ""
		}
	};
	onSubmit() {
		console.log("submit!");
	}
	bannerSec(res: any) {
		console.log(res);
	}
}
</script>
<style lang="less" scoped>
@import "../../common/common";

.backBtn {
	.fontStyle(14px, #333);
}
.constant {
	padding: 20px 40px;
}
.smallTitle {
	.flex(space-between, center);
}
.titleAct {
	.fontStyle(20px, #000, bolder);
}
.issueBtn {
	.fontStyle(14px, #fff);
}
.infoAct {
	.fontStyle(16px, @dodgerBlue);
}
.el-divider {
	background-color: @dodgerBlue;
	margin: 8px 0;
}
.formDate {
	.flex(flex-start, flex-start);
	span {
		margin: 0 10px;
	}
	.date {
		height: 40px;
		input {
			height: 40px;
			line-height: 40px;
		}
	}
}
</style>

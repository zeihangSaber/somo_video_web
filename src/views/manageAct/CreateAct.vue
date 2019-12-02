<template>
	<div class="constant">
		<el-button class="backBtn" type="text" icon="el-icon-arrow-left">返回</el-button>
		<el-form ref="form" :model="form" label-width="80px">
			<div class="smallTitle">
				<span class="titleAct">创建活动</span>
				<el-button class="issueBtn" type="primary" icon="el-icon-s-promotion">
					主要按钮
				</el-button>
			</div>
			<span class="infoAct">活动信息</span>
			<el-divider></el-divider>
			<el-form-item label="活动海报">
				<el-upload
					class="poster-uploader"
					action="https://jsonplaceholder.typicode.com/posts/"
					:show-file-list="false"
				>
					<img v-if="imageUrl" :src="imageUrl" class="poster" />
					<i v-else class="el-icon-plus poster-uploader-icon"></i>
				</el-upload>
				大小不超过2M 图片尺寸420x315像
			</el-form-item>
			<el-form-item label="活动名称">
				<el-input size="medium" v-model="form.name" placeholder="层请输入活动主题/会议名称"></el-input>
			</el-form-item>
			<el-form-item label="活动时间">
				<el-col :span="11">
					<el-date-picker
						type="date"
						placeholder="选择日期"
						v-model="form.date1"
						style="width: 100%;"
					></el-date-picker>
				</el-col>
				<el-col :span="11">
					<el-time-picker
						is-range
						placeholder="选择时间"
						v-model="form.date2"
						range-separator="-"
						start-placeholder="开始时间"
						end-placeholder="结束时间"
						style="width: 100%;"
					></el-time-picker>
				</el-col>
			</el-form-item>
			<el-form-item label="活动地点">
				<el-input size="medium" v-model="form.name" placeholder="请输入活动地点"></el-input>
			</el-form-item>
			<el-form-item label="探讨话题">
				<el-input type="textarea" v-model="form.desc"></el-input>
			</el-form-item>
			<el-form-item label="报名须知">
				<el-input size="medium" v-model="form.name"></el-input>
			</el-form-item>
			<el-form-item label="特别说明">
				<el-input
					size="medium"
					v-model="form.name"
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
	private rules: any;
	private imageUrl: string;
	private form = {
		name: "",
		region: "",
		date1: "",
		date2: "",
		delivery: false,
		type: [],
		resource: "",
		desc: ""
	};
	onSubmit() {
		console.log("submit!");
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
</style>

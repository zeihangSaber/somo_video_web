<template>
	<div class="constant">
		<el-button class="backBtn" type="text" icon="el-icon-arrow-left">返回</el-button>
		<div class="smallTitle">
			<span class="titleAct">创建活动</span>
			<el-button class="issueBtn" @click="submitForm('form')" type="primary" icon="el-icon-s-promotion">
				发布活动
			</el-button>
		</div>
		<el-form ref="form" :model="form" :rules="rules" label-width="110px">
			<div class="fromMain">
				<span class="infoAct">活动信息</span>
				<el-divider></el-divider>
				<el-form-item class="upBigBox" label="活动海报" prop="banner">
					<div class="uploadBox">
						<el-upload
							class="poster-uploader"
							action="/file"
							:show-file-list="false"
							:http-request="bannerSec"
						>
							<img v-if="form.desc.banner" :src="form.desc.banner" class="poster" />
							<i v-else class="el-icon-plus poster-uploader-icon"></i>
						</el-upload>
						<div class="detail">
							<p>大小不超过2M</p>
							<p>图片尺寸420x315像</p>
						</div>
					</div>
				</el-form-item>
				<el-form-item label="活动名称" prop="subject">
					<el-input
						size="medium"
						v-model="form.subject"
						maxlength="40"
						show-word-limit
						placeholder="请输入活动主题/会议名称"
					></el-input>
				</el-form-item>
				<el-form-item label="活动时间" prop="time">
					<el-date-picker
						v-model="form.start"
						:default-value="new Date().getTime()"
						:picker-options="pickerOptions"
						type="datetime"
						placeholder="开始时间"
					>
					</el-date-picker>
					<span> ~ </span>
					<el-date-picker
						v-model="form.end"
						:default-value="new Date().getTime()"
						:picker-options="pickerOptions"
						type="datetime"
						placeholder="结束时间"
					>
					</el-date-picker>
				</el-form-item>
				<el-form-item label="活动地点" prop="address">
					<el-input
						size="medium"
						v-model="form.desc.address"
						maxlength="40"
						placeholder="请输入活动地点"
					></el-input>
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
				<el-form-item class="upBigBox" label="联系方式">
					<div class="uploadBox">
						<el-upload
							class="avatar-uploader"
							action="https://jsonplaceholder.typicode.com/posts/"
							:show-file-list="false"
							:http-request="qrSec"
						>
							<img v-if="form.desc.qr" :src="form.desc.qr" class="avatar" />
							<i v-else class="el-icon-plus avatar-uploader-icon"></i>
						</el-upload>
						<div class="detail qr">
							<p>添加联系人二维码</p>
						</div>
					</div>
				</el-form-item>
				<span class="infoAct">报名设置</span>
				<el-divider></el-divider>
				<el-form-item label="收费金额" prop="money">
					<el-input-number v-model="form.money" size="medium" :min="0" :max="9999.99"></el-input-number>
				</el-form-item>
				<el-form-item label="报名信息采集" prop="studentInfo">
					<el-checkbox-group v-model="form.desc.studentInfo">
						<el-checkbox label="name" disabled>姓名</el-checkbox>
						<el-checkbox label="phone" disabled>手机号码</el-checkbox>
						<el-checkbox label="mail">邮箱</el-checkbox>
						<el-checkbox label="company">公司名称</el-checkbox>
						<el-checkbox label="duty">职务</el-checkbox>
					</el-checkbox-group>
				</el-form-item>
				<span class="infoAct">活动发布</span>
				<el-divider></el-divider>
				<el-form-item label="发布状态选择" prop="status">
					<el-radio-group v-model="form.desc.status">
						<el-radio :label="1">上架</el-radio>
						<el-radio :label="2">下架</el-radio>
					</el-radio-group>
				</el-form-item>
			</div>
		</el-form>
	</div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { VueCropper } from "vue-cropper";
import { State, Action } from "vuex-class";
import ajax from "@/utils/ajax";
import moment from "moment";

@Component
export default class HeaderTab extends Vue {
	private rules = {
		banner: [{ required: true, validator: this.checkBanner, message: "请添加活动海报", trigger: "submit" }],
		subject: [{ required: true, message: "请输入活动名称", trigger: "submit" }],
		time: [{ required: true, validator: this.checkTime, message: "请选择活动时间", trigger: "submit" }],
		address: [{ required: true, validator: this.checkAddress, message: "请输入活动地址", trigger: "submit" }],
		topic: [{ required: true, validator: this.checkTopic, message: "请输入活动话题", trigger: "submit" }],
		studentInfo: [{ required: true, validator: this.check, message: "无", trigger: "submit" }],
		status: [{ required: true, validator: this.check, message: "无", trigger: "submit" }],
		money: [{ required: true, validator: this.check, message: "无", trigger: "submit" }]
	};
	private form = {
		subject: "1",
		start: new Date().getTime() + 3600 * 10,
		end: new Date().getTime() + 3600 * 100,
		money: 0,
		desc: {
			address: "1",
			topic: "1",
			notice: "1",
			declare: "",
			banner: "",
			qr: "",
			studentInfo: ["name", "phone"],
			status: 2
		}
	};
	private bannerFlag: boolean = false;
	private pickerOptions = {
		disabledDate(arg: Date) {
			return arg.getTime() <= new Date().getTime();
		}
	};
	submitForm(formName: string) {
		console.log(223);
		// @ts-ignore
		this.$refs[formName].validate((flag: boolean) => {
			if (flag) {
				const obj = { ...this.form };
				// @ts-ignore
				obj.desc = JSON.stringify(this.form.desc);
				ajax.addAct(obj).then((res: any) => {
					console.log(res);
				});
			} else {
				console.log("error submit!!");
				return false;
			}
		});
	}
	bannerSec(res: any) {
		let render = new FileReader();
		render.readAsDataURL(res.file);
		render.onload = res => {
			ajax.uploadImg({
				name: `act-${ajax.defaultParameter.uid}-${new Date().getTime()}.jpg`,
				body: (render.result as string).split(",")[1]
			}).then((res: any) => {
				this.bannerFlag = true;
				this.form.desc.banner = res.url;
			});
		};
	}
	qrSec(res: any) {
		let render = new FileReader();
		render.readAsDataURL(res.file);
		render.onload = res => {
			ajax.uploadImg({
				name: `act-${ajax.defaultParameter.uid}-${new Date().getTime()}.jpg`,
				body: (render.result as string).split(",")[1]
			}).then((res: any) => {
				this.form.desc.qr = res.url;
			});
		};
	}
	check(rule: any, value: any, callback: any) {
		callback();
	}
	checkBanner(rule: any, value: any, callback: any) {
		!this.bannerFlag ? callback(new Error()) : callback();
	}
	checkAddress(rule: any, value: any, callback: any) {
		!this.form.desc.address.length ? callback(new Error()) : callback();
	}
	checkTime(rule: any, value: any, callback: any) {
		//"活动时间太长啦"
		if (this.form.end > this.form.start + 1000 * 60 * 60 * 24) {
			rule.message = "活动时间太长啦";
			return callback(new Error());
		}
		// "时间设置有误，请重新设置"
		if (this.form.end <= this.form.start) {
			rule.message = "时间设置有误，请重新设置";
			return callback(new Error());
		}
		// "活动开始时间距离现在太近了"
		if ([this.form.start, this.form.end].every(u => u <= new Date().getTime())) {
			rule.message = "活动开始时间距离现在太近了";
			return callback(new Error());
		}
		callback();
	}
	checkTopic(rule: any, value: any, callback: any) {
		!this.form.desc.topic.length ? callback(new Error()) : callback();
	}
}
</script>
<style lang="less" scoped>
@import "../../common/common";

.backBtn {
	.fontStyle(14px, #333);
	margin-left: 40px;
}
.constant {
	padding: 20px 0;
	height: 100%;
	.flex(flex-start, flex-start);
	flex-direction: column;
	.el-form {
		flex: 1;
		height: 0;
		overflow-y: auto;
		padding: 0 40px;
		width: 100%;
	}
	.myScroll(el-form);
}
.smallTitle {
	.flex(space-between, center);
	width: 100%;
	padding: 0 40px;
	.titleAct {
		.fontStyle(20px, #000, bolder);
	}
	.issueBtn {
		.fontStyle(14px, #fff);
	}
}
.fromMain {
	margin-top: 32px;
	overflow: hidden;
	.upBigBox {
		margin-top: 25px;
		.uploadBox {
			.flex();
			.detail {
				.fontStyle(14px, #909399);
				line-height: 20px;
				margin-left: 20px;
				margin-top: 52px;
				&.qr {
					margin-top: 74px;
				}
			}
		}
	}
}
.infoAct {
	.fontStyle(16px, @dodgerBlue);
}
.el-divider {
	background-color: @dodgerBlue;
	margin: 8px 0;
}
</style>

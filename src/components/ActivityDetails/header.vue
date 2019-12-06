<template>
	<div class="activityDetails_header" :class="{ activityDetailsHeader: headerData.type === 1 }">
		<slot class="return"></slot>
		<div class="header_container" v-show="headerData">
			<img :src="headerData.bannerUrl" :style="{ width: headerData.width, height: headerData.height }" />
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
				<el-button @click="joinMetting" type="primary" class="button">{{
					headerData.paidState ? "加入会议" : "报名参会"
				}}</el-button>
				<div class="mettingCode" v-show="headerData.mettingCode">
					<span class="left">会议号</span>
					<span class="right">{{ headerData.mettingCode }}</span>
				</div>
			</div>
		</div>

		<el-collapse-transition>
			<div class="registration" v-show="fromShow">
				<el-divider></el-divider>
				<div class="registration_title">报名信息</div>
				<el-form
					:model="registration"
					ref="registration"
					size="medium"
					:rules="rules"
					label-position="right"
					label-width="210px"
				>
					<el-form-item class="label" label="姓名" prop="name">
						<el-input v-model="registration.name" class="input" placeholder="请输入姓名"></el-input>
					</el-form-item>
					<el-form-item class="label" label="手机号" prop="mobile">
						<el-input v-model="registration.mobile" class="input" placeholder="请输入手机号码"></el-input>
					</el-form-item>
					<el-form-item class="label" label="邮箱" prop="email">
						<el-input v-model="registration.email" class="input" placeholder="请输入邮箱"></el-input>
					</el-form-item>
					<el-form-item class="label" label="公司名称" prop="company">
						<el-input v-model="registration.company" class="input" placeholder="请输入公司名称"></el-input>
					</el-form-item>
					<el-form-item class="label" label="职务" prop="post">
						<el-input v-model="registration.post" class="input" placeholder="请输入职务"></el-input>
					</el-form-item>
					<div class="btn">
						<el-button type="primary" @click.prevent="onSubmit('registration')">提交</el-button>
						<el-button @click="close">取消</el-button>
					</div>
				</el-form>
			</div>
		</el-collapse-transition>
	</div>
</template>

<script lang="ts">
import Somo_ajax from "../../utils/ajax";
import { validateName, validatePhone, validateEmail, validateCompany, validatePost } from "../../utils/validate";
import { HeaderData } from "@/Types";
import { Component, Vue, Prop } from "vue-property-decorator";
import { State, Mutation } from "vuex-class";
@Component
export default class activityDetails_header extends Vue {
	@State login_status: boolean;
	@Mutation LoginShow: (loginShow: boolean) => void;
	@Prop() headerData: HeaderData;
	@Prop() actId: number;
	private fromShow: boolean = false;
	private registration: any = {
		name: "",
		mobile: "",
		email: "",
		company: "",
		post: ""
	};
	private rules: any = {
		name: { validator: validateName, trigger: "blur", required: true },
		mobile: { validator: validatePhone, trigger: "blur", required: true },
		email: {},
		company: {},
		post: {}
	};
	created() {
		const { studentInfo } = this.headerData;
		const validate = {
			email: validateEmail,
			company: validateCompany,
			post: validatePost
		};
		if (studentInfo.length > 0) {
			for (let info in studentInfo) {
				this.rules[studentInfo[info]] = {
					validator: validate[studentInfo[info]],
					trigger: "blur",
					required: true
				};
			}
		}
		console.log(this.rules);
	}
	onSubmit(formName: any) {
		const vue: any = this.$refs[formName];
		vue.validate((valid: any): any => {
			if (valid) {
				Somo_ajax.signUp({
					actid: this.actId,
					detail: JSON.stringify(this.registration)
				}).then((res: any) => {
					console.log(res);
				});
			} else {
				console.log("error submit!!");
				return false;
			}
		});
	}
	joinMetting() {
		if (this.login_status) {
			this.fromShow = true;
		} else {
			this.LoginShow(true);
		}
	}
	close() {
		this.fromShow = false;
	}
}
</script>

<style lang="less" scoped>
@import "../../common/common.less";
.activityDetails_header {
	width: 100%;
	padding: 30px 40px 30px 40px;
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
	.registration {
		.registration_title {
			text-indent: 90px;
			margin: 30px 0;
			font-size: 18px;
			font-weight: 600;
			color: rgba(17, 139, 251, 1);
			line-height: 25px;
		}
		.label {
			margin-bottom: 30px;
		}
		.btn {
			margin-left: 210px;
		}
	}
}
.activityDetailsHeader {
	padding: 30px 170px 30px 170px;
}

.input {
	::-webkit-input-placeholder {
		/* WebKit, Blink, Edge */
		font-size: 14px;
		color: rgba(153, 153, 153, 1);
	}
	:-moz-placeholder {
		/* Mozilla Firefox 4 to 18 */
		font-size: 14px;
		color: rgba(153, 153, 153, 1);
		opacity: 1;
	}
	::-moz-placeholder {
		/* Mozilla Firefox 19+ */
		font-size: 14px;
		color: rgba(153, 153, 153, 1);
		opacity: 1;
	}
	:-ms-input-placeholder {
		/* Internet Explorer 10-11 */
		font-size: 14px;
		color: rgba(153, 153, 153, 1);
	}
}
</style>
<style>
.label label {
	font-size: 16px !important;
	color: rgba(0, 0, 0, 1) !important;
	line-height: 40px !important;
	padding-right: 70px !important;
}
.input input {
	height: 40px !important;
	font-size: 14px !important;
	color: rgba(0, 0, 0, 1) !important;
	line-height: 40px !important;
	margin-bottom: 0px !important;
}
.el-form-item__label:before {
	margin-right: 10px !important;
}
.el-form-item__error {
	left: 28px !important;
}
</style>

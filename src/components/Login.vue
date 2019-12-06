<template>
	<div class="login" v-show="loginShow">
		<div class="login_mask"></div>
		<div class="login_content">
			<div class="loginClose" @click="loginClose"></div>
			<div class="loginMethod " :class="qrcodeShow ? '' : 'QR'" @click="changeLogin"></div>
			<div class="login_titleImg"></div>
			<div class="login_inputBox" v-show="!qrcodeShow">
				<el-form
					ref="accountForm"
					class="login_content_input"
					:model="accountForm"
					label-width="330px"
					v-show="!inputBoxShow"
				>
					<div class="login_inputTitile">账号密码登录</div>
					<el-input
						type="text"
						placeholder="请输入账号/手机号/邮箱号"
						v-model="accountForm.account"
					></el-input>
					<el-input type="password" placeholder="请输入密码" v-model="accountForm.password"></el-input>
					<div class="inputCheckbox ">
						<!-- <el-checkbox size="small" v-model="accountForm.checked"
                            >记住我</el-checkbox
                        > -->
						<div class="verification" @click="changeInputBox">
							验证码登录
						</div>
					</div>
					<button class="login_Btn" @click.prevent="login(accountForm)">
						登录
					</button>
				</el-form>
				<el-form
					class="login_content_input"
					ref="codeForm"
					:model="codeForm"
					label-width="330px"
					v-show="inputBoxShow"
				>
					<div class="login_inputTitile">验证码登录</div>
					<el-input type="text" placeholder="请输入手机号/邮箱号" v-model="codeForm.account"></el-input>
					<el-input maxlength="10" type="text" placeholder="请输入验证码" v-model="codeForm.code"> </el-input>
					<button class="authCode" id="authCode" @click.prevent="getCode(codeForm.account)">
						获取验证码
					</button>
					<div class="inputCheckbox ">
						<!-- <el-checkbox size="small" v-model="codeForm.checked"
                            >记住我</el-checkbox
                        > -->
						<div class="verification" @click="changeInputBox">
							账号密码登录
						</div>
					</div>
					<button class="login_Btn" @click.prevent="login(codeForm)">
						登录
					</button>
				</el-form>
				<div class="login_foot">登录即代表你同意 <a href="">《SOMO服务协议》</a></div>
			</div>
			<div class="login_QRcontent" v-show="qrcodeShow">
				<qrcode-vue :value="qrUrl" :size="260" level="H"></qrcode-vue>
				<div class="login_qrcode_title">使用蓝猫微会App扫码登录</div>
				<div class="login_method">
					<span class="login_account" id="login_account">账号密码登录</span>
					<span class="cutOff">&nbsp;&nbsp;|&nbsp;&nbsp;</span>
					<span class="login_register" id="login_register">注册</span>
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
//账号密码登录
interface LoginForm {
	type: string;
	account: any;
	password?: string;
	code?: string;
	checked: boolean;
}
import QrcodeVue from "qrcode.vue";
import Somo_ajax from "@/utils/ajax";
import { Component, Vue, Prop } from "vue-property-decorator";
import { State, Action, Mutation } from "vuex-class";
@Component({
	components: {
		QrcodeVue
	}
})
export default class Login extends Vue {
	@State loginShow: boolean;
	@Action setLoginShow: (value: boolean) => void;
	@Action setLoginStatus: (value: boolean) => void;
	@Action setUserName: (value: string) => void;
	@Action setUid: (value: string) => void;
	@Action setCookie: (value: string) => void;
	@Mutation Role: (value: number) => void;
	@Mutation Tenant: (value: number) => void;
	@Mutation TenantName: (value: string) => void;
	//登录方式切换
	private inputBoxShow: boolean = true;
	//账号类型(手机或邮箱)
	private accountKid: string = "";
	private accountForm: LoginForm = {
		type: "account",
		account: "",
		password: "",
		checked: false
	};
	private codeForm: LoginForm = {
		type: "code",
		account: "",
		code: "",
		checked: false
	};
	private qrcodeShow: boolean = false;
	private qrUrl: string = "http://www.somo.tech";
	private qrcodeTimetimer: any = "";
	public $md5: (str: string) => string;
	//账号验证
	accoutVerify(account: any) {
		if (account == "" || account == undefined) {
			alert("手机号码或者邮箱不能为空！");
			return false;
		}
		if (account.indexOf("@") >= 0 || !account.match(/^\d/)) {
			if (!account.match(/^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/)) {
				alert("邮箱格式有错！");
				return false;
			}
			this.accountKid = "email";
			console.log("邮箱");
		} else {
			if (
				!account.match(/^\d{11}$/) &&
				!account.match(/^[0-9]{4}'\-'?[0-9]{7}$/) &&
				!account.match(/^[0-9]{3}'\-'?[0-9]{8}$/)
			) {
				alert("手机号不正确！");
				return false;
			} else {
				this.accountKid = "mobile";
			}
		}
	}
	//获取验证码
	getCode(account: any) {
		this.accoutVerify(account);
		if (this.accountKid === "email") {
			Somo_ajax.emailCode({
				email: account
			})
				.then((res: object): void => {
					alert("验证码已发送成功！");
				})
				.catch((): void => {
					alert("验证码发送失败，请重新发送");
				});
		} else if (this.accountKid === "mobile") {
			Somo_ajax.mobileCode({
				mobile: account
			})
				.then((res: object): void => {
					alert("验证码已发送成功！");
				})
				.catch((): void => {
					alert("验证码发送失败，请重新发送");
				});
		}
	}

	//登录
	login(from: LoginForm) {
		if (from.type === "account") {
			Somo_ajax.login({
				account: from.account,
				password: this.$md5(from.password as string)
			}).then((res: any): void => {
				this.setData(res);
			});
		} else if (from.type === "code") {
			if (this.accountKid === "email") {
				Somo_ajax.emailLogin({
					email: from.account,
					code: from.code
				}).then((res: any): void => {
					this.setData(res);
				});
			} else if (this.accountKid === "mobile") {
				Somo_ajax.mobileLogin({
					mobile: from.account,
					code: from.code
				}).then((res: any): void => {
					this.setData(res);
				});
			}
		}
	}
	//账号登录方式切换
	changeInputBox() {
		this.inputBoxShow = !this.inputBoxShow;
	}
	//二维码，账号方式切换
	changeLogin() {
		this.qrcodeShow = !this.qrcodeShow;
		clearInterval(this.qrcodeTimetimer);
		if (this.qrcodeShow) {
			Somo_ajax.qrcodeCode().then((res: any) => {
				this.qrUrl = `somo://loginqrcode?uuid=${res.code}`;
				this.qrcodeTime(res.code);
			});
		}
	}
	//登录按钮关闭
	loginClose() {
		this.qrcodeShow = false;
		this.setLoginShow(false);
		clearInterval(this.qrcodeTimetimer);
	}

	//二维码登录时间
	qrcodeTime(code: string) {
		this.qrcodeTimetimer = setInterval(() => {
			Somo_ajax.qrcodeQuery({ code }).then((res: any): void => {
				if (res.code && +res.code === 1013) {
					alert("二维码已失效");
					clearInterval(this.qrcodeTimetimer);
					window.location.pathname = "/";
					return;
				}
				if (!res.code) {
					clearInterval(this.qrcodeTimetimer);
					this.setData(res);
					window.location.pathname = "/";
				}
			});
		}, 1000);
	}
	async setData(data: any) {
		console.log(data);
		this.setLoginStatus(true);
		this.setLoginShow(false);
		this.setUserName(data.name);
		this.setUid(data.uid);
		this.setCookie(data.cookie);
		Somo_ajax.setTenant(data.tenant as number);
		await Somo_ajax.setUid(data.uid as number);
		Somo_ajax.setRole(data.role as number);
		Somo_ajax.setCookie(data.cookie as string);
		this.Role(Somo_ajax.defaultParameter.role as number);
		this.Tenant(Somo_ajax.defaultParameter.tenant as number);
		this.TenantName(Somo_ajax.defaultParameter.tenantName as string);
		// window.location.pathname = "home";
	}
}
</script>
<style>
.el-input > .el-input__inner {
	height: 52px;
	border-radius: 3px;
	border: 1px solid rgba(0, 0, 0, 0.1);
	margin-bottom: 11px;
	font-size: 18px;
	text-indent: 11px;
	outline: none;
	color: black;
}
</style>
<style lang="less" scoped>
@import "../common/common.less";
.login {
	.login_mask {
		position: fixed;
		left: 0;
		right: 0;
		top: 0;
		bottom: 0;
		height: 100%;
		background: rgba(0, 0, 0, 1);
		opacity: 0.5;
		z-index: 10;
	}
	.login_content {
		position: fixed;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
		z-index: 11;
		.box(440px, 550px);
		background: rgba(255, 255, 255, 1);
		box-shadow: 0px 5px 26px 0px rgba(21, 22, 22, 0.5);
		border-radius: 10px;
		.flex-option(column, flex-start, center);
		padding: 0 55px;
		.loginClose {
			.box(14px, 14px);
			.backgroundImg("../assets/login/somo_loginClose.png");
			position: absolute;
			left: 20px;
			top: 20px;
		}
		.loginMethod {
			.box(87px, 87px);
			position: absolute;
			right: 1px;
			top: 1px;
			.backgroundImg("../assets/login/somo_loginPC.png");
		}
		.QR {
			.backgroundImg("../assets/login/somo_loginQR.png");
		}
		.login_titleImg {
			.box(160px, 40px);
			.backgroundImg("../assets/login/somo_loginTitle.png");
			margin: 50px 0 47px 0;
		}
		.login_inputBox {
			text-align: center;
			.login_content_input {
				position: relative;
				.login_inputTitile {
					width: 100%;
					font-size: 19px;
					color: rgba(0, 0, 0, 1);
					text-align: left;
					margin-bottom: 11px;
				}
				.authCode {
					.box(100px, 30px);
					cursor: pointer;
					background-color: #fff;
					margin-left: 11px;
					text-align: center;
					border-radius: 3px;
					border: 1px solid rgba(17, 139, 251, 1);
					font-size: 14px;
					color: rgba(17, 139, 251, 1);
					line-height: 30px;
					position: absolute;
					right: 11px;
					top: 110px;
				}
				.loginMobile {
					padding: 11px;
					text-indent: 0 !important;
					.flex-option(row, flex-start, flex-start);
					h3 {
						font-size: 18px;
						color: rgba(0, 0, 0, 0.38);
					}
					span {
						.box(1px, 28px);
						margin-left: 11px;
						background: rgba(221, 221, 221, 1);
					}
					input {
						font-size: 18px;
						height: 100%;
						flex: 1;
						text-indent: 11px;
						outline: none;
					}
				}
				.loginInput {
					.box(330px, 52px);
					border-radius: 3px;
					border: 1px solid rgba(0, 0, 0, 0.1);
					margin-bottom: 11px;
					font-size: 18px;
					text-indent: 11px;
					outline: none;
				}
				::-webkit-input-placeholder {
					color: rgba(204, 204, 204, 1);
				}
				::-moz-placeholder {
					color: rgba(204, 204, 204, 1);
				}
				:-moz-placeholder {
					color: rgba(204, 204, 204, 1);
				}
				:-ms-input-placeholder {
					color: rgba(204, 204, 204, 1);
				}
			}
			.inputCheckbox {
				font-size: 16px;
				position: relative;
				text-align: left;
				.verification {
					position: absolute;
					top: 0;
					right: 11px;
					color: rgba(17, 139, 251, 1);
					cursor: pointer;
				}
			}
			.login_Btn {
				.box(330px, 52px);
				margin-top: 80px;
				background: linear-gradient(
					141deg,
					rgba(96, 177, 255, 1) 0%,
					rgba(24, 115, 255, 1) 88%,
					rgba(23, 114, 255, 1) 100%
				);
				border-radius: 3px;
				font-size: 18px;
				color: rgba(255, 255, 255, 1);
				line-height: 52px;
				text-align: center;
				border: 0px;
				cursor: pointer;
			}
			.login_foot {
				margin-top: 25px;
				font-size: 14px;
				color: rgba(102, 102, 102, 1);
				a {
					text-decoration: none;
					color: #118bfb;
				}
			}
			#login1 {
				display: block;
			}
		}
		.login_QRcontent {
			text-align: center;
			#login_qrcode {
				.box(260px, 260px);
			}
			.login_qrcode_title {
				text-align: center;
				margin-top: 13px;
				font-size: 18px;
				font-weight: 400;
				color: rgba(0, 35, 88, 1);
			}
			.login_method {
				margin-top: 38px;
				margin: 38px 68px 0 68px;
				display: flex;
				span {
					cursor: pointer;
					font-size: 14px;
					color: rgba(153, 153, 153, 1);
				}
			}
		}
	}
}
</style>

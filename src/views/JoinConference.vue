<template>
	<div>
		<div class="join">
			<div class="join_box">
				<div :class="tab_status == 1 ? 'left_img_' : 'left_img'"></div>
				<div class="right_box">
					<div class="meeting">
						<div class="meeting_tab">
							<div :class="tab_status == 1 ? 'meeting_btn active' : 'meeting_btn'" @click="tab(1)">
								发起会议
								<div class="underline" v-if="tab_status == 1"></div>
							</div>
							<div :class="tab_status == 2 ? 'meeting_btn active' : 'meeting_btn'" @click="tab(2)">
								加入会议
								<div class="underline" v-if="tab_status == 2"></div>
							</div>
						</div>
						<div class="join_meeting" v-if="tab_status == 2">
							<div>
								<div class="input_box">
									<div class="icon_meetingNUM">
										<img src="../assets/JoinConference/2.png" alt="" />
									</div>
									<input type="text" placeholder="请输入会议号" v-model="conference_num" />
								</div>
								<div class="required_"><span style="color: #FF6059;">*</span>必填</div>
							</div>
							<div style="margin-top: 40px;">
								<div class="input_box">
									<div class="icon_meetingNUM">
										<img
											style="width: 25px;height: 25px;"
											src="../assets/JoinConference/3.png"
											alt=""
										/>
									</div>
									<input type="text" placeholder="请输入会议密码" v-model="conference_password" />
								</div>
							</div>
							<div class="encryption">如会议未加密，则无需输入</div>
							<div style="margin-top: 40px;">
								<div class="input_box">
									<div class="icon_meetingNUM">
										<img
											style="width: 25px;height: 25px;"
											src="../assets/JoinConference/4.png"
											alt=""
										/>
									</div>
									<input type="text" placeholder="请输入会议中的昵称" v-model="conference_name" />
								</div>
								<div class="required_"><span style="color: #FF6059;">*</span>必填</div>
							</div>
							<span style="">
								<div class="set">
									<div @click="radio(1)" style="margin-right: 70px;">
										<div :class="radio_1 == true ? 'radio' : 'radio radio_active'">
											<img v-if="radio_1" src="../assets/JoinConference/5.png" alt="" />
										</div>
										<div>开启麦克风</div>
									</div>
									<div @click="radio(2)">
										<div :class="radio_2 == true ? 'radio' : 'radio radio_active'">
											<img v-if="radio_2" src="../assets/JoinConference/5.png" alt="" />
										</div>
										<div>开启摄像头</div>
									</div>
								</div>
								<!-- <div class="hint">所有错误提示具体文案详见产品文档，样式见此</div> -->
								<div class="join_btn" @click="JoinConference_btn()">加入会议</div>
							</span>
						</div>
						<div v-if="tab_status == 1">
							<div class="sponsor_meeting">
								<div class="sponsor_img"><img src="../assets/JoinConference/7.png" alt="" /></div>
								<div>非会员可免费体验40分钟</div>
							</div>
							<div class="set">
								<div @click="radio(1)" style="margin-right: 70px;">
									<div :class="radio_1 == true ? 'radio' : 'radio radio_active'">
										<img v-if="radio_1" src="../assets/JoinConference/5.png" alt="" />
									</div>
									<div>开启麦克风</div>
								</div>
								<div @click="radio(2)">
									<div :class="radio_2 == true ? 'radio' : 'radio radio_active'">
										<img v-if="radio_2" src="../assets/JoinConference/5.png" alt="" />
									</div>
									<div>开启摄像头</div>
								</div>
							</div>
							<div class="join_btn sponsor_btn" @click="sponsorMeeting()">发起会议</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Somo from "../utils/somo";
import { State, Action } from "vuex-class";
import { checkout } from "../common/common";
@Component
export default class JoinConference extends Vue {
	private conference_num = ""; //会议号
	private conference_password = ""; //会议密码
	private conference_name = ""; //会议内自己的昵称
	private tab_status = 1; //加入会议和发起会议的tab切换
	private radio_1: boolean = true;
	private radio_2: boolean = true;
	private mid: number;
	@State login_status: boolean; //判断是否登录
	@State userName: string; //用户名称
	@State Mcode: number; //mid
	@State uid: number;
	@State cookie: string;
	@Action setMeetingMcode: (value: number | string) => void; //赋值mid
	@Action setMeetingmicrophone: (value: number) => void; //麦克风设置
	@Action setMeetingcamera: (value: number) => void; //摄像头设置
	$md5: (str: string) => string;
	created() {
		this.conference_name = this.userName;
	}
	radio(radio_status: number) {
		if (radio_status == 1) {
			this.radio_1 = !this.radio_1;
		} else if (radio_status == 2) {
			this.radio_2 = !this.radio_2;
		}
	}
	tab(tab_status: number) {
		this.tab_status = tab_status;
		this.radio_1 = true;
		this.radio_2 = true;
	}
	JoinConference_btn() {
		console.log(this.login_status);
		// this.$store.commit("login_status", true);
		if (!this.login_status) {
			alert("请先登录");
			return;
		} else {
			if (this.conference_num == "") {
				alert("请填写会议号");
				return;
			} else if (this.conference_name == "") {
				alert("会议昵称不能为空");
				return;
			}
			console.log(Somo.defaultParameter);
			Somo.queryMid({
				os: 3,
				code: this.conference_num
			}).then((res: any): void => {
				console.log(res.code);
				console.log(res);
				if (res.id) {
					console.log(res);
					Somo.setMid(res.id);
					// let route_arguments = {
					// 	mid: res.id,
					// 	uid: this.uid,
					// 	cookie: this.cookie,
					// 	camera: this.radio_2, //摄像头开关状态
					// 	microphone: this.radio_1 //麦克风开关状态
					// };
					// window.location.href = "http://192.168.1.171:8080/?arguments=" + JSON.stringify(route_arguments);
					Somo.joinMid({
						mid: res.id
					}).then((res_: any): void => {
						console.log(res);
						this.setMeetingMcode(res.id);
						console.log("2", this.Mcode);
						if (!this.radio_1) {
							this.setMeetingmicrophone(0);
						} else if (!this.radio_2) {
							this.setMeetingcamera(0);
						}
						this.$router.push({ path: "./meetingPage" });
						let route_arguments = {
							mid: this.Mcode,
							uid: this.uid,
							// url_head:
							camera: this.radio_2, //摄像头开关状态
							microphone: this.radio_1 //麦克风开关状态
						};
						// window.location.href =
						// "http://192.168.1.171:8080/?arguments=" + JSON.stringify(route_arguments);
					});
				} else {
					checkout(res.code);
				}
			});
		}
	}
	sponsorMeeting() {
		if (!this.login_status) {
			alert("请先登录");
			return;
		}
		Somo.create({}).then((res: any) => {
			console.log(res);

			Somo.joinMid({
				mid: res.id
			}).then((res_: any): void => {
				this.$router.push({ path: "./MeetingPage" });
			});

			// Somo.queryMid({
			// 	os: 3,
			// 	code: this.conference_num
			// }).then((res: any): void => {
			// 	Somo.setMid(res.id);
			// 	Somo.joinMid({
			// 		mid: res.id
			// 	}).then((res_: any): void => {
			// 		this.$router.push({ path: "./MeetingPage" });
			// 	});
			// });
		});
	}
}
</script>

<style lang="less" scoped>
@import "../common/common.less";

.sponsor_btn {
	margin: 0 auto;
	margin-top: 70px;
}

.sponsor_img > img {
	width: 100%;
	height: 100%;
}

.sponsor_img {
	width: 140px;
	height: 140px;
	margin: 0 auto;
	margin-bottom: 10px;
}

.sponsor_meeting {
	font-size: 14px;
	font-family: PingFangSC-Light, PingFang SC;
	font-weight: 300;
	color: rgba(42, 80, 130, 1);
	text-align: center;
}

.join_btn {
	width: 369px;
	height: 58px;
	background: linear-gradient(
		141deg,
		rgba(96, 177, 255, 1) 0%,
		rgba(24, 115, 255, 1) 88%,
		rgba(23, 114, 255, 1) 100%
	);
	border-radius: 3px;
	font-size: 20px;
	font-family: PingFangSC-Regular, PingFang SC;
	font-weight: 400;
	color: rgba(255, 255, 255, 1);
	display: flex;
	justify-content: center !important;
	align-items: center;
	position: absolute;
	bottom: 50px;
	left: calc(50% - 184.5px);
}

.hint {
	font-size: 14px;
	font-family: PingFangSC-Regular, PingFang SC;
	font-weight: 400;
	color: rgba(255, 96, 89, 1);
	margin-left: 40px;
	margin-bottom: 27px;
}

.set > div {
	.flex(center, center);
	font-size: 14px;
	color: #999999;
}

.set {
	width: 250px;
	height: 50px;
	display: flex;
	justify-content: flex-start;
	align-items: center;
	position: absolute;
	bottom: 120px;
	left: calc(50% - 125px);
}

.radio > img {
	width: 70%;
	height: 70%;
}

.radio_active {
	border: 1px solid #cccccc !important;
	background: #ffffff !important;
}

.radio {
	width: 14px;
	height: 14px;
	display: flex;
	justify-content: center;
	align-items: center;
	background: #3083fb;
	margin-right: 3px;
}

.encryption {
	font-size: 14px;
	font-family: PingFangSC-Regular, PingFang SC;
	font-weight: 400;
	color: rgba(187, 187, 187, 1);
	padding-left: 40px;
	box-sizing: border-box;
}

.required_ {
	font-size: 14px;
	font-family: PingFangSC-Medium, PingFang SC;
	font-weight: 500;
	color: #cccccc;
	.flex(center, center);
}

.join {
	width: 100%;
	background: #f5f5f5;
	display: flex;
	justify-content: center;
	align-items: center;

	.join_box {
		width: 1100px;
		height: 655px;
		background: #ffffff;
		margin-top: 80px;
		margin-bottom: 121px;
		.flex(flex-start, center);
		border-radius: 7px;
		.left_img {
			width: 339px;
			height: 100%;
			background-image: url(../assets/JoinConference/1.png);
			background-repeat: no-repeat;
			background-size: 100% 100%;
		}

		.left_img_ {
			width: 339px;
			height: 100%;
			background-image: url(../assets/JoinConference/6.png);
			background-repeat: no-repeat;
			background-size: 100% 100%;
		}

		.right_box {
			width: calc(100% - 339px);
			height: 100%;
			// padding: 0 136px 0 194px;
			// box-sizing: border-box;
			display: flex;
			justify-content: center;
			align-items: center;
			.flex(center, center);

			.meeting {
				width: 530px;
				height: 570px;
				position: relative;
				input {
					width: 323px;
					height: 35px;
					border-bottom: 1px solid #cccccc;
					font-size: 18px;
					font-family: PingFangSC-Medium, PingFang SC;
					font-weight: 500;
					color: rgba(0, 0, 0, 1);
				}

				.join_meeting {
					height: 35px;
					padding-left: 30px;
					box-sizing: border-box;
				}

				.join_meeting > div {
					width: 400px;
					margin: 0 auto;
					.input_box {
						.flex(flex-start, center);
					}

					.flex(space-between, center);

					.icon_meetingNUM {
						width: 23px;
						height: 15px;
						margin-right: 15px;
					}

					.icon_meetingNUM > img {
						width: 100%;
						height: 100%;
					}
				}

				.meeting_tab {
					.flex(space-between, center);
					margin: 58px 0;

					.meeting_btn {
						width: 50%;
						height: 55px;
						.flex(center, center);
						font-size: 30px;
						font-family: PingFangSC-Regular, PingFang SC;
						font-weight: 400;
						color: rgba(204, 204, 204, 1);
						position: relative;

						.underline {
							width: 30px;
							height: 4px;
							background: rgba(17, 139, 251, 1);
							position: absolute;
							bottom: 0;
							left: calc(50% - 15px);
						}
					}

					.active {
						font-weight: 500;
						color: #3083fb;
					}
				}
			}
		}
	}
}

input {
	outline: none;
}

input::-webkit-input-placeholder {
	color: #999999;
	font-size: 18px;
	font-weight: 100;
}
</style>

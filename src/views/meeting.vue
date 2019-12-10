<template>
	<div class="bigbox" @mousemove="move()" ref="saber">
		<div class="meeting_video" id="meeting_video">
			<!-- video.js -->
			<videoPlayer  ref="videoPlayer" :options="videoOptions"/>
			<!-- head -->
			<div class="meeting_head">
				<div class="meeting_num">会议号：888-9990</div>
				<div class="meeting_passwod">密码：1234</div>
				<div>
					<span>北京总部产品评审会</span>
					<img class="numberOFpeople_icon" src="../assets/numberOFpeople_icon.png" alt="">
					<span>3</span>
				</div>
				<div>
					<span>全体静音</span>
					<img class="mute_icon" src="../assets/mute_icon.png" alt="">
					<span>3</span>
				</div>
				<div>
					<img class="meetingTime_iocn" src="../assets/meetingTime_iocn.png" alt="">
					<span>00:00:00</span>
				</div>
				<img class="signal_icon" src="../assets/signal_icon1.png" alt="">
			</div>
			<div class="compere_label">
				<span>北京总部</span>
				<img src="../assets/mute_icon1.png" alt="">
				<div class="compere">
					<img src="../assets/compere_icon.png" alt="">
				</div>
			</div>

			<!-- foot -->
			<div class="meeting_foot" v-if="foot_show == 1">
				<div class="operation_box">
					<div class="meeting_operation">
						<img src="../assets/mute_icon2.png" alt="">
						<div>静音</div>
					</div>
					<div class="meeting_operation">
						<img src="../assets/camera_icon.png" alt="">
						<div>视频</div>
					</div>
					<div class="meeting_operation">
						<img src="../assets/invite_icon.png" alt="">
						<div>邀请</div>
					</div>
					<div class="meeting_operation" @click="shutOpen(4)">
						<img src="../assets/news_icon.png" alt="">
						<div>消息</div>
					</div>
					<div class="meeting_operation" @click="shutOpen(2)">
						<img src="../assets/attendMeetings_icon.png" alt="">
						<div>参会方</div>
					</div>
					<div class="meeting_operation">
						<img src="../assets/set_icon.png" alt="">
						<div>设置</div>
					</div>
					<div class="magnify">
						<img src="../assets/magnify.png" alt="">
					</div>
				</div>
			</div>

		</div>
		<div class="status_popup_show">
			<div class="meeting_details">
				<div class="meeting_details_left">
					<div>北京总部产品评审会</div>
					<div class="meeting_number_password">
						<span>会议号：889 990 768</span>
						<span>密码：1234</span>
					</div>
				</div>
				<div class="meeting_details_img"><img src="../assets/magnify_active.png" alt=""></div>
			</div>
			<div class="attendMeetings_IM">
				<div v-if="member_module == 1">
					<div class="attendMeetings_title">
						<span>参会方(6)</span>
						<img @click="shutOpen(1)" src="../assets/shut.png" alt="">
					</div>
					<div class="attendMeetings_box">
						<input type="text" placeholder="搜索账号名称">
						<div class="member_box">
							<div class="member">
								<img src="../assets/attendMeetings_icon_active.png" alt="">
								<div class="member_post">
									<span>北京研发中心设计师</span>
									<img class="compere-iocn" src="../assets/compere_icon.png" alt="">
									<img class="speaker-icon" src="../assets/speaker_icon.png" alt="">
								</div>
								<div class="camera_microphone">
									<img src="../assets/camera_close.png" alt="">
									<img src="../assets/microphone_close.png" alt="">
								</div>
							</div>
							<div class="member">
								<img src="../assets/attendMeetings_icon_active.png" alt="">
								<div class="member_post">
									<span>北京研发中心设计师</span>
									<img class="compere-iocn" src="../assets/compere_icon.png" alt="">
									<img class="speaker-icon" src="../assets/speaker_icon.png" alt="">
								</div>
								<div class="camera_microphone">
									<img src="../assets/camera_close.png" alt="">
									<img src="../assets/microphone_close.png" alt="">
								</div>
							</div>
						</div>
						<div class="attendMeetings_foot">
							<div>全体静音</div>
							<div>解除全体静音</div>
							<div>锁定会议</div>
						</div>
					</div>
				</div>
				<div v-if="message_module == 1">
					<div class="attendMeetings_title">
						<span>消息(6)</span>
						<img @click="shutOpen(3)" src="../assets/shut.png" alt="">
					</div>
					<div id="sss" class="IM">
						<div class="IM_main">
							<div class="IM_time">13:56</div>
							<div class="IM_message">
								<div>名字</div>
								<div class="IM_message_main">聊天内容</div>
							</div>
							<div class="IM_message">
								<div>名字</div>
								<div class="IM_message_main">聊天内容</div>
							</div>
						</div>
						<div class="IM_textarea">
							<textarea placeholder="在此处输入消息…"></textarea>
							<div class="send_btn">发送</div>
						</div>
					</div>
				</div>
				

			</div>
		</div>
	</div>
</template>

<script>
	import {Antiquity} from "zeihang_saber";
	
	import 'video.js/dist/video-js.css'
	import {
		videoPlayer
	} from 'vue-video-player'
	import 'videojs-flash'
	export default {
		data() {
			return {
				videoOptions: {
					width: '500',
					height: '500',
					sources: [{
						type: 'rtmp/mp4',
						// src: 'rtmp://rtmp1.video.somo.tech/video/2000U1000'
						src: 'rtmp://58.200.131.2:1935/livetv/hunantv'
					}],
					techOrder: ['flash'],
					muted: true, // 默认静音
					preload: 'auto', // 视频预加载
					autoplay: true,
					controls: false,
					notSupportedMessage: '此视频暂无法播放，请稍后再试'
				},
				member_module:1,//参会方块显示隐藏
				message_module:1,//消息模块的显示隐藏
				foot_show: 0,//底部的显示隐藏
				microphone:'',
				camera:'',
				srcJoint:'',
				route_data:{},
				url_head:'',
				somo:{}
				// status: true,
				// mouse_time: '',
				// now_time: ''
			};
		},
		created() {
			// somo.initStreamer({
			// 	src: "./RtmpStreamer.swf",
			// 	width: 500,
			// 	height: 500
			// });
		},
		components: {
			videoPlayer
		},
		watch: {
			mouse_time: 'time_calculate'
		},
		mounted() {
			
			let that = this
			this.route_data = JSON.parse(this.$route.query.arguments)
			this.somo = new Antiquity(this.route_data.uid,this.route_data.cookie);
			// somo.init();
			// somo.setUid(this.route_data.uid)//向sdk  setuid
			// somo.setCookie(this.route_data.cookie)//向sdk  setcookie
			// somo.setMid(this.route_data.mid)//向sdk  setmid
			// console.log(somo.defaultParameter)
			this.join(this.route_data.mid)//加入会议
			// // 判断摄像头的开关
			// if(this.route_data.camera){
			// 	this.camera = 1
			// }else{
			// 	this.camera = 0
			// }
			// // 判断麦克风的开关
			// if(this.route_data.microphone){
			// 	this.microphone = 1
			// }else{
			// 	this.microphone = 0
			// }
			// // 判断刷新退出
			// // if (!somo.defaultParameter.mid) {
			// // 	this.leaveMeeting();
			// // }
			// this.$refs.saber.appendChild(somo.streamerDom);
			
// =========================设置视频的宽高===========================================================
			that.videoOptions.width = document.getElementById('meeting_video').offsetWidth
			that.videoOptions.height = document.getElementById('meeting_video').offsetHeight
			window.onresize = function(){
				console.log(document.getElementById('meeting_video').offsetHeight,'高')
				console.log(document.getElementById('meeting_video').offsetWidth,'宽')
				that.videoOptions.width = document.getElementById('meeting_video').offsetWidth
				that.videoOptions.height = document.getElementById('meeting_video').offsetHeight
			}
		},
		methods: {
			// 加入会议
			join:function(mid){
				console.log(this.route_data.mid)
				this.somo.joinMeeting({
					code: this.route_data.mid,
					src: './RtmpStreamer.swf',
					width:'100px',
					height:'100px',
					dom: this.$refs.saber,
				}).then(res => {
					// console.log(res);
					// this.url_head = res.vmt.video_url
					// this.srcJoint = this.route_data.mid + "U" + this.route_data.uid;
					// this.microphoneORcamera(this.microphone, 1);
					// this.microphoneORcamera(this.camera, 2);
				});
			},
			// 视频推流
			push:function() {
				console.log(this.url_head,this.srcJoint)
				somo.publish("rtmp://rtmp2.video.somo.tech/video", '2000U1000');
				// somo.publish('rtmp://rtmp1.video.somo.tech/video', this.srcJoint);
			},
			//初始进入麦克风摄像头的设置
			microphoneORcamera:function(status, type) {
				// status:1开启，0关闭；type：1麦克风设置，2摄像头设置
				console.log(status, type);
				if (type == 1) {
					somo.tellYou({
						mid: this.route_data.mid,
						mic: status,
						volume: "80%"
					});
					
				} else if (type == 2) {
					somo.showYou({
						mid: this.mid,
						camera: status
					});
				}
				if (status == 1 && type == 1) {
					//麦克风开启
					console.log(somo.agr.createClient)
					somo.agr.createClient(1);
					// somo.createClient();
					// somo.clientInit();
					// somo.join();
				}
				if (status == 1 && type == 2) {
					//摄像头开启
					setTimeout(this.push, 1000);
				}
			},
			//离开退出会议
			leaveMeeting:function() {
				somo.leaveMid({
					mid: this.mid
				}).then(res => {
					console.log(res);
				});
			},
			// 参会方和消息模块的显示隐藏
			shutOpen:function(shutType){
				if(shutType == 1){//参会方关闭按钮(隐藏参会方模块)
					this.member_module = 0
				}else if(shutType == 2){//底部的参会方按钮(显示参会方模块)
					this.member_module = !this.member_module
				}else if(shutType == 3){//消息模块的关闭按钮(隐藏消息模块)
					this.message_module = 0
				}else if(shutType == 4){//底部的消息按钮(显示消息模块)
					this.message_module = !this.message_module
				}
			},
			time_calculate: function() {
				// window.clearTimeout(t1)
				this.now_time = Date.parse(new Date()) / 1000;
				// console.log(this.mouse_time)
				// var t1 = window.setTimeout(()=>{
				// 	this.foot_show = 0
				// }, 3000);
			},
			move: function() {
				this.foot_show = 1
				this.status = false
				this.mouse_time = Date.parse(new Date()) / 1000;
				// console.log(this.mouse_time)
			},
			stop_move: function() {

			}
		}
	};
</script>

<style scoped>
	.send_btn {
		width: 70px;
		height: 30px;
		background: rgba(17, 139, 251, 1);
		border-radius: 5px;
		font-size: 16px;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: rgba(255, 255, 255, 1);
		display: flex;
		justify-content: center;
		align-items: center;
		position: absolute;
		right: 20px;
		bottom: 14px;
	}

	.IM_textarea>textarea {
		width: 100%;
		height: calc(100% - 44px);
		padding: 20px;
		box-sizing: border-box;
		border: none;
	}

	.IM_textarea {
		height: 144px;
		position: relative;
	}

	.member_box {
		max-height: 283px;
		overflow: auto;
		overflow-y: auto;
	}

	.IM_message_main {
		font-size: 16px;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: rgba(24, 24, 24, 1);
		margin-top: 5px;
	}

	.IM_message {
		padding: 0 21px;
		box-sizing: border-box;
		margin-bottom: 16px;
		font-size: 14px;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: rgba(153, 153, 153, 1);
	}

	.IM_time {
		height: 50px;
		font-size: 14px;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: rgba(153, 153, 153, 1);
		text-align: center;
		line-height: 50px;
	}

	.IM_main {
		height: 256px;
		border-bottom: 2px solid #F4F4F4;
	}

	.IM {
		height: 400px;
		background: #FFFFFF;
		border-radius: 6px;
		overflow: hidden;
	}

	.attendMeetings_foot>div {
		width: 100px;
		height: 36px;
		border-radius: 4px;
		border: 1px solid rgba(17, 139, 251, 1);
		font-size: 14px;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: rgba(17, 139, 251, 1);
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.attendMeetings_foot {
		width: 100%;
		height: 60px;
		padding: 0 20px;
		box-sizing: border-box;
		display: flex;
		justify-content: space-between;
		align-items: center;
		border-top: 2px solid #F4F4F4;
	}

	.camera_microphone>img {
		width: 20px;
		height: 20px;
		vertical-align: middle;
	}

	.camera_microphone {}

	.speaker-icon {
		width: 28px;
		height: 14px;
		border-radius: 2px;
	}

	.compere-iocn {
		width: 34px;
		height: 14px;
		border-radius: 2px;
		margin: 0 3px;
	}

	.member_post>img {
		vertical-align: middle;
	}

	.member>img {
		width: 32px;
		height: 32px;
	}

	.member {
		height: 35px;
		padding: 0 20px;
		box-sizing: border-box;
		display: flex;
		justify-content: space-between;
		align-items: center;
		font-size: 16px;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: rgba(30, 33, 38, 1);
		margin-bottom: 16px;
	}

	.attendMeetings_box>input {
		width: 328px;
		height: 32px;
		background: rgba(244, 244, 244, 1);
		border-radius: 16px;
		margin: 20px 0;
		text-align: center;

	}

	.attendMeetings_box {
		max-height: 416px;
		text-align: center;
		background: #FFFFFF;
		border-radius: 6px;
		overflow: hidden;
	}

	.attendMeetings_title>img {
		width: 18px;
		height: 18px;
	}

	.attendMeetings_title {
		height: 56px;
		display: flex;
		justify-content: space-between;
		align-items: center;
		font-size: 18px;
		font-family: PingFangSC-Medium, PingFang SC;
		font-weight: 500;
		color: rgba(0, 0, 0, 1);
	}

	.attendMeetings_IM {
		padding: 0 16px;
		box-sizing: border-box;
	}

	.meeting_details_img>img {
		width: 100%;
		height: 100%;
	}

	.meeting_details_img {
		width: 90px;
		height: 68px;
	}

	.meeting_number_password {
		font-size: 14px;
		font-family: PingFangSC-Medium, PingFang SC;
		font-weight: 500;
		color: rgba(0, 0, 0, 1);
		margin-top: 10px;
	}

	.meeting_details_left {
		font-size: 22px;
		font-family: PingFangSC-Medium, PingFang SC;
		font-weight: 500;
		color: rgba(0, 0, 0, 1);
	}

	.meeting_details {
		width: 100%;
		height: 108px;
		padding: 0 20px;
		box-sizing: border-box;
		background: #FFFFFF;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.magnify>img {
		width: 100%;
		height: 100%;
	}

	.magnify {
		width: 42px;
		height: 42px;
		position: absolute;
		right: 20px;
		top: 18px;
	}

	.meeting_operation>img {
		width: 44px;
		height: 44px;
	}

	.meeting_operation {
		/* width: ; */
		font-size: 16px;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: rgba(255, 255, 255, 1);
		text-align: center;
	}

	.compere>img {
		width: 100%;
		height: 100%;
	}

	.compere {
		width: 50px;
		height: 21px;

	}

	.compere_label>img {
		width: 24px;
		height: 24px;
		margin: 0 5px;
	}

	.compere_label {
		width: 212px;
		height: 40px;
		background: rgba(0, 0, 0, 1);
		border-radius: 0px 73px 73px 0px;
		background: rgba(0, 0, 0, 0.5);
		font-size: 22px;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: rgba(238, 238, 238, 1);
		display: flex;
		justify-content: center;
		align-items: center;
		position: fixed;
		left: 0;
		top: 50px;
	}

	.operation_box {
		width: 450px;
		height: 100%;
		display: flex;
		justify-content: space-around;
		align-items: center;
	}

	.meeting_foot {
		width: 100%;
		height: 80px;
		background: rgba(0, 0, 0, 0.3);
		position: absolute;
		bottom: 0;
		left: 0;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.signal_icon {
		width: 19.78px;
		height: 19.78px;
		position: absolute;
		top: 8px;
		right: 20px;
	}

	.meeting_passwod .meeting_num {
		font-weight: 600%;
	}

	.meetingTime_iocn {}

	.numberOFpeople_icon,
	.mute_icon,
	.meetingTime_iocn {
		width: 20px;
		height: 20px;
		vertical-align: middle;
		margin-left: 8px;
		margin-right: 4px;
	}

	.meeting_head>div {
		margin-right: 40px;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.meeting_head {
		width: 100%;
		min-width: 830px;
		/* border: 1px solid red; */
		height: 36px;
		background: rgba(0, 0, 0, 0.3);
		position: absolute;
		top: 0;
		left: 0;
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 16px;
		font-family: PingFangSC-Semibold, PingFang SC;
		font-weight: 400;
		color: rgba(255, 255, 255, 1);
	}

	.status_popup_show {
		width: 20.83%;
		min-width: 400px;
		height: 100%;
		background: #F4F4F4;
		animation: show 2s linear;
		animation-fill-mode: both;
	}

	.status_popup_hide {
		width: 20%;
		height: 100%;
		background: red;
		animation: hide 2s linear;
		animation-fill-mode: both;
	}

	.meeting_video {
		width: 100%;
		min-width: 830px;
		height: 100%;
		overflow: hidden;
		background: #42B983;
		position: relative;
	}

	.bigbox {
		width: 100vw;
		height: 100vh;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
</style>

<template>
	<div class="bigbox">
		<div class="video_box">
			<videoPlayer style="width: 100%;height: 100%;" ref="videoPlayer" :options="videoOptions" class="vjs-custom-skin videoPlayer" />
		</div>
		<div class="right_box">
			<div class="conference_num" v-if="chat_status != 1">
				<div>会议号：888-9990</div>
				<div class="message_icon">
					<img src="../assets/11.png" alt="">
					<div>5</div>
				</div>
			</div>
			<div class="conference_num_active" v-if="chat_status == 1">会议号：888-9990</div>
			<div class="chat_box" v-if="chat_status == 0">
				<img @click="_chat_box_active(1)" v-if="chat_status == 0" src="../assets/14.png" alt="">
			</div>
			<div :class="chat_status==1?'chat_box_active':'chat_box_active_1'" v-if="chat_status != 0">
				<img @click="_chat_box_active(1)" v-if="chat_status == 2" src="../assets/14.png" alt="">
				<img @click="_chat_box_active(2)" v-if="chat_status == 1" src="../assets/10.png" alt="">
				<div class="message_box">
					<div class="message_title">消息(0)</div>
					<div class="message_main">
						<div class="message_main_1">

						</div>
						<div class="message_main_2">
							<textarea placeholder="写消息"></textarea>
							<div class="btn">发送</div>
						</div>
					</div>
				</div>
			</div>
		</div>



		<button @click="send">发消息</button>


	</div>
</template>

<script>
	import 'video.js/dist/video-js.css'
	import {
		videoPlayer
	} from 'vue-video-player'
	import 'videojs-flash'
	export default {
		data() {
			return {
				join_data:{},
				params:'123456789',
				path: "wss://vmtws.video.somo.tech/api/v1/vmt/ws",
				socket: "",
				// ===========================================
				videoOptions: {
					height: '100',
					sources: [{
						type: 'rtmp/mp4',
						src: ''
						// src: ' rtmp://rtmp1.video.somo.tech/video/10244523U10003722'
					}],
					techOrder: ['flash'],
					muted: true, // 默认静音
					preload: 'auto', // 视频预加载
					autoplay: true,
					controls: true,
					notSupportedMessage: '此视频暂无法播放，请稍后再试',
					fluid: true
				},
				chat_status: 0,
				uid:'',
				http_device:'',
				tick:1
			};
		},
		methods: {
			init: function() {
				if (typeof(WebSocket) === "undefined") {
					alert("您的浏览器不支持socket")
				} else {
					// 实例化socket
					this.socket = new WebSocket(this.path)
					console.log(this.socket)
					console.log(this.socket.onmessage)
					// 监听socket连接
					this.socket.onopen = this.open
					// 监听socket错误信息
					this.socket.onerror = this.error
					// 监听socket消息
					this.socket.onmessage = this.getMessage()
					// 监听socket断开连接
					this.socket.onclose = this.close
				}
			},
			open: function() {
				console.log("socket连接成功")
				this.send()
			},
			error: function() {
				console.log("连接错误")
			},
			getMessage: function(msg) {
				console.log(msg)
			},
			send: function() {
				var data = {
					uid:this.login_uid,
					dt:2,
					device:this.join_data.users[0].device,
					mid:this.join_data.mid,
					cookie:'MTAwMDA0MzQtMTU3MjMzNTQxMzM1OC0yNjQ4MjI1'
				}
				var dat = JSON.stringify({
					command:'ping',
					data:encode(JSON.stringify(data))
				})
				console.log(encode(JSON.stringify(data)))
				this.socket.send(dat)
			},
			close: function() {
				console.log("socket已经关闭")
			},
			ping:function(){
				console.log(1111111)
				let ping = {
					uid: this.login_uid,
					dt: 2,
					device: this.http_device,
					mid: this.join_data.mid,
					tick: this.tick ++
					// os: 3,
				}
				this.$axios.ping(ping).then(data => {
					if (data.code == 0) {
						console.log(data_.data)
					}
				
				})
			},
			// ------------------------------------------------			
			_chat_box_active: function(e) {
				this.chat_status = e
			}
		},
		created() {
			
		},
		mounted() {
			this.join_data = JSON.parse(this.$route.query.join_data)
			this.login_uid = this.$route.query.login_uid
			this.path = 'ws://' + this.join_data.vmt.servers + '/api/v1/vmt/ws'
			console.log(this.join_data)
			// console.log(this.join_data.vmt.video_url + this.join_data.mid + 'U' + this.join_data.vmt.uid)
			// console.log(this.videoOptions.sources[0].src)
			for (var i = 0; i < this.join_data.users.length; i++) {
				console.log(this.join_data.users[i].speaker)
				if(this.join_data.users[i].speaker == 1){
					this.uid = this.join_data.users[i].uid
				}
				if(this.join_data.users[i].uid = this.login_uid){
					console.log(this.join_data.users[i].device)
					this.http_device = this.join_data.users[i].device
				}
			}
			this.videoOptions.sources[0].src = this.join_data.vmt.video_url + this.join_data.mid + 'U' + this.uid
			this.init()
			setInterval( () => {
				this.send()
			}, 10000)
			setInterval( () => {
				this.ping()
			}, 3000)
			
		},
		components: {
			videoPlayer
		}

	};
</script>

<style scoped>
	
	.btn {
		width: 90px;
		height: 30px;
		background: rgba(48, 131, 251, 1);
		border-radius: 5px;
		position: absolute;
		right: 10px;
		bottom: 10px;
		font-size: 18px;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: rgba(255, 255, 255, 1);
		text-align: center;
		line-height: 30px;
	}

	textarea {
		width: 100%;
		height: 75%;
		resize: none;
		border: none;
		padding: 12px 23px;
		box-sizing: border-box;
		outline: none;
		font-size: 18px;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
	}

	.message_main_2 {
		height: 24%;
		position: relative;
	}

	.message_main_1 {
		height: 75%;
		border-bottom: 1px solid rgba(204, 204, 204, 1);
	}

	.message_main {
		height: calc(100vh - 146px);
		background: rgba(255, 255, 255, 1);
		border-radius: 5px;
		border: 1px solid rgba(204, 204, 204, 1);
	}

	.message_title {
		height: 23px;
		margin: 10px 0 16px 18px;
		font-size: 18px;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: rgba(30, 33, 38, 1);
	}

	@keyframes myfirst {
		0% {
			right: -395px;
		}

		100% {
			right: 0px;

		}
	}

	@keyframes myfirst_1 {
		0% {
			right: 0px;
		}

		100% {
			right: -400px;

		}
	}

	.chat_box>img,
	.chat_box_active>img,
	.chat_box_active_1>img {
		width: 30px;
		height: 130px;
		position: absolute;
		top: calc(50% - 65px);
		left: -30px;
	}

	.chat_box_active_1 {
		width: 100%;
		height: calc(100% - 72px);
		background: #F6F6F6;
		position: absolute;
		top: 72px;
		right: -400px;
		animation: myfirst_1 0.5s;
		animation-fill-mode: forwards;
		padding: 12px;
		box-sizing: border-box;
	}

	.chat_box_active {
		width: 100%;
		height: calc(100% - 72px);
		background: #F6F6F6;
		position: absolute;
		top: 72px;
		right: -400px;
		animation: myfirst 0.5s;
		animation-fill-mode: forwards;
		padding: 12px;
		box-sizing: border-box;
	}

	.chat_box {
		width: 100%;
		height: calc(100% - 72px);
		background: #F6F6F6;
		position: absolute;
		top: 72px;
		right: -400px;
		padding: 12px;
		box-sizing: border-box;
	}

	.message_icon>div {
		width: 20px;
		height: 20px;
		background: rgba(240, 50, 33, 1);
		display: flex;
		justify-content: center;
		align-items: center;
		border-radius: 50%;
		font-size: 16px;
		font-family: PingFangSC-Medium, PingFang SC;
		font-weight: 500;
		color: rgba(255, 255, 255, 1);
		position: absolute;
		top: -5px;
		right: -5px;
	}

	.message_icon>img {
		width: 34px;
		height: 34px;

	}

	.message_icon {
		position: relative;
		margin-left: 45px;
	}

	.conference_num_active {
		width: 399px;
		height: 72px;
		background: rgba(41, 49, 66, 1);
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 24px;
		font-family: PingFangSC-Semibold, PingFang SC;
		font-weight: 600;
		color: rgba(255, 255, 255, 1);
		position: absolute;
		top: 0;
		animation: myfirst 0.5s;
		animation-fill-mode: forwards;
	}

	.conference_num {
		width: 399px;
		height: 72px;
		background: rgba(30, 36, 48, 1);
		border-radius: 10px;
		opacity: 0.8;
		font-size: 24px;
		font-family: PingFangSC-Semibold, PingFang SC;
		font-weight: 600;
		color: rgba(255, 255, 255, 1);
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.right_box {
		width: 399px;
		height: 100vh;
		/* background: pink; */
		position: fixed;
		top: 0;
		right: 0;
		z-index: 1000000;
	}

	.video_box {
		width: 100vw;
		height: 100vh;
		position: absolute;
		top: 0;
		left: 0;
		z-index: -1;
	}

	.vjs_video_3-dimensions,
	.video-js {
		width: 100vw !important;
		height: 100vh !important;
	}
</style>

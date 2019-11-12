<template>
	<div class="bigbox">
		<div class="video_box">
			<div class="video_box1">
				<videoPlayer ref="videoPlayer" :options="videoOptions"/>
			</div>
			<div class="video_box2">
				<videoPlayer ref="videoPlayer" :options="videoOptions"/>
				<videoPlayer ref="videoPlayer" :options="videoOptions"/>
			</div>
		</div>
		<div class="right_box">
			<div class="conference_num" v-if="chat_status != 1">
				<div>会议号：{{conference_num}}</div>
				<div class="message_icon">
					<img src="../assets/11.png" alt="">
					<div v-if="conceal_message != 0">{{conceal_message}}</div>
				</div>
			</div>
			<div class="conference_num_active" v-if="chat_status == 1">会议号：{{conference_num}}</div>
			<div class="chat_box" v-if="chat_status == 0">
				<img @click="_chat_box_active(1)" v-if="chat_status == 0" src="../assets/14.png" alt="">
			</div>
			<div :class="chat_status==1?'chat_box_active':'chat_box_active_1'" v-if="chat_status != 0">
				<img @click="_chat_box_active(1)" v-if="chat_status == 2" src="../assets/14.png" alt="">
				<img @click="_chat_box_active(2)" v-if="chat_status == 1" src="../assets/10.png" alt="">
				<div class="message_box">
					<div class="message_title">消息({{history_message.length}})</div>
					<div class="message_main">
						<div class="message_main_1">
							<div class="dummy-status" v-if="history_message.length == 0">
								<div class="message_icon_box">
									<img src="../assets/15.png" alt="">
									<div>暂无聊天信息</div>
								</div>
							</div>
							<div class="time" v-if="history_message.length > 0">{{time}}</div>
							<div v-for="item in history_message" v-if="history_message.length > 0">
								<div class="spokesman_message" v-if="item.uid != login_uid">
									<div class="spokesman">{{item.uid}}</div>
									<div class="message">{{item.text}}</div>
								</div>
								<div class="spokesman_message_me" v-if="item.uid == login_uid">
									<div class="spokesman">{{item.name}}</div>
									<div class="message">{{item.text}}</div>
								</div>
							</div>
						</div>
						<!-- 滚动条遮挡 -->
						<div class="scroll_bar">
							<div class="scroll_bar_line"></div>
						</div>
						<div class="message_main_2">
							<textarea placeholder="写消息" v-model="message_content"></textarea>
							<div class="btn" @click="_sendAmessage()">发送</div>
						</div>
					</div>
				</div>
			</div>
		</div>



		<!-- <button @click="send">发消息</button> -->


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
				join_data: {},
				params: '123456789',
				path: "wss://vmtws.video.somo.tech/api/v1/vmt/ws",
				socket: "",
				// ===========================================
				videoOptions: {
					height: '',
					sources: [{
						type: 'rtmp/mp4',
						src: 'rtmp://live.hkstv.hk.lxdns.com/live/hks1'
						// src: ' rtmp://rtmp1.video.somo.tech/video/10244523U10003722'
					}],
					techOrder: ['flash'],
					muted: true, // 默认静音
					preload: 'auto', // 视频预加载
					autoplay: true,
					controls: true,
					notSupportedMessage: '此视频暂无法播放，请稍后再试',
					fluid: false
				},
				chat_status: 0,
				uid: '', //主讲人的uid
				http_device: '',
				tick: 1,
				cookie: '',
				eventId: '',
				conference_num: '',
				message_content: '',
				history_message: [],
				login_uid: '', //登陆人的uid
				time: '',
				conceal_message: 0,
				staff_name:[],//参会人员的名字
				join_incident:[]//加入的事件
			};
		},
		methods: {
			// 获取参会人员的姓名
			get_name: function() {
				console.log(this.join_data.users)
				var all_uid = []
				for (var i = 0; i < this.join_data.users.length; i++) {
					all_uid.push(this.join_data.users[i].uid)
				}
				let meetingName_data = {
					uid: this.login_uid,
					seq: 3,
					uids: all_uid,
					cookie: this.cookie
				}
				this.$axios.meetingName(meetingName_data).then(data => {
					if (data.code == 0) {
						console.log(data.data.uinfos)
						this.staff_name = data.data.uinfos
					}
				})
			},
			// 
			_conceal_message: function() {
				if (this.chat_status == 1) {

				}
				// console.log(this.chat_status)
			},
			// 实时获取当前电脑时间
			_time: function() {
				var t = new Date()
				var hour = t.getHours(); //得到小时
				var minu = t.getMinutes(); //得到分钟
				var sec = t.getSeconds(); //得到秒
				this.time = hour + ':' + minu
				// console.log(this.time)
			},
			// 发消息的函数
			_sendAmessage: function() {
				let message_data = {
					uid: this.login_uid,
					dt: 2,
					device: localStorage.getItem('device'),
					mid: this.join_data.mid, //（会议id）
					text: encode(this.message_content), //消息内容，需要把字符串转换为base64格式
					cookie: this.cookie
				}
				this.$axios.sendAmessage(message_data).then(data => {
					if (data.code == 0) {
						var message_box = {
							text: this.message_content,
							uid: this.login_uid,
							name: this.name
						}
						this.history_message.push(message_box)
						this.message_content = ''
						console.log(data)
					}

				})
			},
			// WebSocket初始化
			init: function() {
				if (typeof(WebSocket) === "undefined") {
					alert("您的浏览器不支持socket")
				} else {
					// 实例化socket
					this.socket = new WebSocket(this.path)
					// console.log(this.socket)
					// console.log(this.socket.onmessage)
					// 监听socket连接
					this.socket.onopen = this.open
					// 监听socket错误信息
					this.socket.onerror = this.error
					// 监听socket消息
					this.socket.onmessage = this.getMessage
					// 监听socket断开连接
					this.socket.onclose = this.close
				}
			},
			//连接成功
			open: function() {
				console.log("socket连接成功")
				this.send(1)
			},
			//连接失败
			error: function() {
				console.log("连接错误")
			},
			// WebSocket收到信息
			getMessage: function(msg) {
				var Message = JSON.parse(msg.data)
				var Message_data = JSON.parse(decode(Message.data))
				var speaker = JSON.parse(Message_data.data).speaker //判断当前有没有设置主讲人speaker=1有，0没有
				this.eventId = Message.eventId
				// console.log(Message.eventId)
				// console.log(JSON.parse(Message_data.data).speaker)
				// 2-加入会议;3-离开会议;4-踢出掉线的;6-设置角色;7-踢除;8-会议锁定;9-会议关闭;10-开始分享;11-结束分享;12-
				// if (Message_data.event == 25 && speaker == 1) {
				// 	this.videoOptions.sources[0].src = this.join_data.vmt.video_url + Message_data.mid + 'U' + Message_data.uid
				// }
				// if (Message_data.event == 2) {//加入会议
				// 	this.get_back(1,2,Message_data)
				// }
				// if (Message_data.event == 3) {//离开会议
				// 	var leave_name = ''
				// 	for (var i = 0; i < this.join_data.users.length; i++) {
				// 		if(this.join_data.users[i].uid != Message_data.uid){
				// 			this.join_data.users.push(Message_data)
				// 		}
				// 	}
				// 	this.get_name()
				// 	for (var i = 0; i < this.staff_name.length; i++) {
				// 		console.log(this.staff_name[i].uid)
				// 		if(this.staff_name[i].uid = Message_data.id){
				// 			leave_name = this.staff_name[i].name
				// 		}
				// 	}
				// 	alert(leave_name + '离开会议')
				// }
				// if (Message_data.event == 41) {
				// 	var name = '' 
				// 	if (this.chat_status == 0 || this.chat_status == 2) {
				// 		this.conceal_message = this.conceal_message + 1
				// 		console.log(this.conceal_message)
				// 	}
				// 	console.log(Message_data)
				// 	for (var i = 0; i < this.staff_name.length; i++) {
				// 		console.log(this.staff_name[i].uid)
				// 		if(this.staff_name[i].uid = Message_data.id){
				// 			name = this.staff_name[i].name
				// 		}
				// 	}
				// 	var text = decode(JSON.parse(Message_data.data).text)
				// 	var message_box = {
				// 		text: text,
				// 		uid: name,
				// 		id: Message_data.id
				// 	}
				// 	this.history_message.push(message_box)
				// 	// console.log(decode(JSON.parse(Message_data.data).text))
				// 	alert('接收到消息')
				// }
				// this.send(2)

			},
			// 返回事件的处理函数
			get_back:function(status,num,incident){
				if(status == 1){
					this.join_incident.push(incident)
				}else{
					for (var i = 0; i < this.join_incident.length; i++) {
						if(this.join_incident[i]){
							
						}
					}
				}
				
				// this.join_incident.push(incident)
				if(num == 2){
					var enter_name = ''
					for (var i = 0; i < this.join_data.users.length; i++) {
						if(this.join_data.users[i].uid != incident.uid){
							this.join_data.users.push(incident)
						}
					}
					this.get_name()
					for (var i = 0; i < this.staff_name.length; i++) {
						console.log(this.staff_name[i].uid)
						if(this.staff_name[i].uid = incident.id){
							enter_name = this.staff_name[i].name
						}
					}
					alert(enter_name + '加入会议')
				}
				
				
				
				
				
				
			},
			// WebSocket发送信息
			send: function(e) {
				//WebSocket 10秒ping一次
				if (e == 1) {
					var data = {
						uid: this.login_uid,
						dt: 2,
						device: localStorage.getItem('device'),
						mid: this.join_data.mid,
						cookie: this.cookie
					}
					var dat = JSON.stringify({
						command: 'ping',
						data: encode(JSON.stringify(data))
					})
					// console.log(encode(JSON.stringify(data)))
					this.socket.send(dat)
				} else if (e == 2) { //接收到消息时event_ack的回传
					var data = {
						uid: this.login_uid,
						dt: 2,
						device: this.join_data.users[0].device,
						mid: this.join_data.mid,
						cookie: this.cookie,
						event: this.eventId
					}
					var dat = JSON.stringify({
						command: 'event_ack',
						data: encode(JSON.stringify(data))
					})
					this.socket.send(dat)
				}
			},
			close: function() {
				console.log("socket已经关闭")
			},
			ping: function() {
				let ping = {
					uid: +this.login_uid,
					dt: 2,
					device: localStorage.getItem('device'),
					mid: this.join_data.mid,
					tick: this.tick++
					// os: 3,
				}
				this.$axios.ping(ping).then(data => {
					// var paixu = this.$add_js.sortKey(data.data.events, 'id')
					// for (var i = 0; i < data.data.events.length; i++) {
					// 	if (data.data.events[i].event == 41) {
					// 		// data.data.events[i]
					// 		// 本地已有聊天记录的时候
					// 		for (var j = 0; j < this.history_message.length; j++) {
					// 			if (this.history_message[j].uid != data.data.events[i].id) {
					// 				// console.log(data.data.events[i])
					// 				var text = decode(JSON.parse(data.data.events[i].data).text)
					// 				var message_box = {
					// 					text: text,
					// 					uid: data.data.events[i].uid,
					// 					id: data.data.events[i].id
					// 				}
					// 			}
					// 		}
					// 	}
					// 	this.history_message.push(message_box)
					// }


				})

			},
			// ------------------------------------------------			
			_chat_box_active: function(e) {
				this.chat_status = e
				if (this.chat_status == 1) {
					this.conceal_message = 0
				}
			}
		},
		created() {
			var that = this
			window.onresize = function() {
				console.log(document.body.clientWidth)
				console.log(document.body.clientWidth - 100)
				// localStorage.setItem('height',document.body.clientWidth - 100)
				that.videoOptions.height = document.body.clientWidth - 100
				// console.log(that.videoOptions.height)
			}
			// console.log(this.videoOptions.height)
		},
		watch: {
			chat_status: '_conceal_message'
		},
		mounted() {
			var that = this
			// 监听回车键的按下
			document.onkeydown = function(ev) {
				var event = ev || event
				if (event.keyCode == 13 && this.message_content != '') {
					that._sendAmessage()
				}
			}
			this.conference_num = this.$route.query.conference_num //获取会议号
			this.join_data = JSON.parse(this.$route.query.join_data)
			console.log(this.join_data)
			this.cookie = this.$route.query.cookie
			this.login_uid = this.$route.query.login_uid
			this.path = 'ws://' + this.join_data.vmt.servers + '/api/v1/vmt/ws'
			this.name = this.$route.query.name //自己的昵称
			this.get_name()
			// console.log(this.join_data.vmt.video_url + this.join_data.mid + 'U' + this.join_data.vmt.uid)
			// console.log(this.videoOptions.sources[0].src)
			for (var i = 0; i < this.join_data.users.length; i++) {
				console.log(this.join_data.users[i].speaker)
				if (this.join_data.users[i].speaker == 1) {
					this.uid = this.join_data.users[i].uid
				}
				if (this.join_data.users[i].uid = this.login_uid) {
					console.log(this.join_data.users[i].device)
					this.http_device = this.join_data.users[i].device
				}
			}
			// this.videoOptions.sources[0].src = this.join_data.vmt.video_url + this.join_data.mid + 'U' + this.uid
			this.init()
			setInterval(() => {
				this._time()
			}, 1000)
			setInterval(() => {
				this.send(1)
			}, 10000)
			setInterval(() => {
				this.ping()
			}, 3000)

		},
		components: {
			videoPlayer
		}

	};
</script>

<style scoped>
	.time {
		width: 100%;
		height: 30px;
		position: absolute;
		top: 0px;
		left: 0;
		background: #FFFFFF;
		/* left: calc(50% - 5px); */
		text-align: center;
		line-height: 30px;
		font-size: 14px;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: rgba(153, 153, 153, 1);
	}

	.scroll_bar_line {
		width: 100%;
		height: calc(75% - 1px);
		/* background: rgba(204, 204, 204, 1); */
		/* margin-top: 75%; */
		border-bottom: 1px solid rgba(204, 204, 204, 1);
		position: absolute;
		top: 0;
		right: 0;
		z-index: 10;
	}

	.scroll_bar {
		width: 20px;
		height: 100%;
		background: white;
		position: absolute;
		top: 0;
		right: 0;
	}

	.spokesman_message_me {
		text-align: right;
		margin-bottom: 27px;
		text-justify: newspaper;
		word-break: break-all;
	}

	.spokesman_message {
		margin-bottom: 27px;
	}

	.message {
		font-size: 18px;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: rgba(30, 33, 38, 1);
	}

	.spokesman {
		font-size: 14px;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: rgba(102, 102, 102, 1);
	}

	.message_icon_box>img {
		width: 90px;
		height: 90px;
		margin-bottom: 12px;
	}

	.message_icon_box {
		text-align: center;
		font-size: 16upx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: rgba(204, 204, 204, 1);
	}

	.dummy-status {
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.video_box2 {
		width: 30vw;
		margin-left: 5vw;
	}

	.video_box1 {
		width: 60vw;
		height: 50px;
		border: 5px solid red;
	}

	.video_box {
		width: 100vw;
		height: 100vh;
		position: absolute;
		top: 0;
		left: 0;
		z-index: -1;
		display: flex;
		justify-content: flex-start;
		align-items: flex-start;
	}

	.bigbox {
		/* background: black; */
		width: 100vw;
		height: 100vh;
		position: absolute;
		top: 0;
		left: 0;
		z-index: -2;
	}

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
		width: 100%;
		height: 24%;
		position: relative;
	}

	/* .message_main_1::-webkit-scrollbar {display:none} */
	.message_main_1 {
		width: 100%;
		height: 75%;
		overflow: hidden;
		overflow-y: scroll;
		padding: 23px;
		padding-top: 50px;
		box-sizing: border-box;
		border-bottom: 1px solid rgba(204, 204, 204, 1);
		/* position: relative; */
	}

	.message_main {
		height: calc(100vh - 146px);
		background: rgba(255, 255, 255, 1);
		border-radius: 5px;
		border: 1px solid rgba(204, 204, 204, 1);
		position: relative;
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
</style>

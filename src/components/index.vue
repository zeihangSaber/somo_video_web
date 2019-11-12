<template>
	<div class="bigbox">
		<videoPlayer ref="videoPlayer" :options="videoOptions" />
		<!-- <video autoplay id="aa"></video> -->
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
								<!-- 他人发的消息 -->
								<div class="spokesman_message" v-if="item.uid != login_uid">
									<div class="spokesman">{{item.name}}</div>
									<div class="message">{{item.text}}</div>
								</div>
								<!-- 自己发的消息 -->
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
	</div>
</template>

<script>
	import 'video.js/dist/video-js.css'
	import {videoPlayer} from 'vue-video-player'
	import 'videojs-flash'
	export default{
		data () {
			return{
				path:'',//WebSocket的连接地址
				router_data:{},//页面传值的对象
				eventId:'',
				uid_name:[],
				// video.js的数值
				videoOptions: {
					width:'500',
					height: '500',
					sources: [{
						type: 'rtmp/mp4',
						src: 'rtmp://58.200.131.2:1935/livetv/hunantv'
					}],
					techOrder: ['flash'],
					muted: true, // 默认静音
					preload: 'auto', // 视频预加载
					autoplay: true,
					controls: false,
					notSupportedMessage: '此视频暂无法播放，请稍后再试'
				},
				uid:'',//video播放视频(主讲人的uid)
				chat_status: 0,
				conceal_message: 0,
				history_message: [],//聊天记录
				message_content: '',//本人发送的消息内容
				tick: 1,//标识3秒ping一下
				time: '',//获取当前时间
				staff_name:[],//参会人员的名字
				all_incident:[],//所有已完成的事件
		// ===================================================
				account_number:'QAtest028',//账号
				password:'123456',//密码
				type_version: [], //机型和版本号
				device:'',
				conference_num:'',//获取会议号
				login_uid:'',//登陆的uid
				join_mid:'',//加入接口返回的mid(会议号)
				users:[],//加入接口返回的参会人员
				video_url:'',//主讲人(没有投屏的前缀)
				speaker:'',//主讲人的uid
			}
		},
		components: {
			videoPlayer
		},
		// watch: {
		// 	chat_status: '_conceal_message'
		// },
		methods:{
			
			// 加入接口
			join: function() {
				this.device = this.$add_js.uuid()
				let mid_ = {
					uid: this.$route.query.uid,
					dt: 2,
					cookie: this.$route.query.cookie,
					code: this.$route.query.mid,
					tenant: +this.$route.query.tenant
				}
				this.$axios.code(mid_).then(data => {
					if (data.code == 0) {
							this.join_mid = data.data.id
							this.path = 'ws://' + data.data.servers + '/api/v1/vmt/ws'//WebSocket的连接地址
							this.init()
							
							console.log(data.data)
							let join_data = {
								mid: data.data.id,
								uid: this.$route.query.uid,
								dt: 2,
								os: 3,
								device: this.device,
								cookie: this.$route.query.cookie
							}
							this.$axios.join(join_data).then(data_ => {
								if (data_.code == 0) {
									this.video_url = data_.data.vmt.video_url
									// this.users = data_.data.users
									// this.get_name()
									for (var i = 0; i < data_.data.users.length; i++) {
										console.log(data_.data.users[i])
										if (data_.data.users[i].speaker == 1) {
											this.uid = data_.data.users[i].uid
										}
									}
									this.videoOptions.sources[0].src = data_.data.vmt.video_url + data_.data.mid + 'U' + this.uid
								}
							
							})
							this._users()
						}
						
				})
				
			},
			// websocket的初始化
			init: function() {
				if (typeof(WebSocket) === "undefined") {
					alert("您的浏览器不支持socket")
				} else {
					this.socket = new WebSocket(this.path)// 实例化socket
					this.socket.onopen = this.open// 监听socket连接
					this.socket.onerror = this.error// 监听socket错误信息
					this.socket.onmessage = this.getMessage// 监听socket消息
					this.socket.onclose = this.close// 监听socket断开连接
				}
			},
			// WebSocket连接成功的提示
			open: function() {
				console.log("socket连接成功")
				this.send(1)
			},
			//连接失败
			error: function() {
				console.log("连接错误")
			},
			// 向WebSocket传值
			send: function(e) {
				//WebSocket 10秒ping一次
				if (e == 1) {
					var data = {
						uid: this.$route.query.uid,
						dt: 2,
						device: this.device,
						mid: this.join_mid,
						cookie: this.$route.query.cookie
					}
					// console.log(data)
					var dat = JSON.stringify({
						command: 'ping',
						data: encode(JSON.stringify(data))
					})
					this.socket.send(dat)
				} else if (e == 2) { //接收到消息时event_ack的回传
					var data = {
						uid: this.$route.query.uid,
						dt: 2,
						device: this.device,
						mid: this.join_mid,
						cookie: this.$route.query.cookie,
						event: this.eventId
					}
					var dat = JSON.stringify({
						command: 'event_ack',
						data: encode(JSON.stringify(data))
					})
					this.socket.send(dat)
				}
			},
			// 接收WebSocket消息
			getMessage:function(msg){
				var Message = JSON.parse(msg.data)
				var Message_data = JSON.parse(decode(Message.data))
				var speaker = JSON.parse(Message_data.data).speaker //判断当前有没有设置主讲人speaker=1有，0没有
				// console.log(Message)
				// console.log(Message_data)
				this.eventId = Message.eventId
				this.incident_dispose(Message_data)
				this.send(2)
			},
			// 获取用户名称的函数
			get_name(e) {
				
	// ======================================================================
				// console.log(this.users)
				// var all_uid = []
				// this.uid_name = []//所有参会人员的uid，初始置空
				// for (var i = 0; i < this.users.length; i++) {
				// 	this.uid_name.push(this.users[i].uid)
				// }
				// console.log(all_uid)
				// let meetingName_data = {
				// 	uid: this.$route.query.uid,
				// 	seq: 3,
				// 	uids: this.uid_name,
				// 	cookie: this.$route.query.cookie
				// }
				// this.$axios.meetingName(meetingName_data).then(data => {
				// 	if (data.code == 0) {
				// 		this.staff_name = data.data.uinfos
				// 		console.log(this.staff_name)
				// 	}
				// })
				var name = [e]
				console.log(name)
				let meetingName_data = {
					uid: this.$route.query.uid,
					seq: 3,
					uids: name,
					cookie: this.$route.query.cookie
				}
				this.$axios.meetingName(meetingName_data).then(data => {
					if (data.code == 0) {
						this.staff_name = data.data.uinfos
						console.log(this.staff_name)
						return this.staff_name
					}
				})
			},
			// 过滤名称
			filtration_name:function(e,cancel){
				return new Promise((resolve, reject) => {
					var name;
					var name_ = []
					name_.push(e)
					let meetingName_data = {
						uid: this.$route.query.uid,
						seq: 3,
						uids: name_,
						cookie: this.$route.query.cookie
					}
					this.$axios.meetingName(meetingName_data).then(data => {
						if (data.code == 0) {
							console.log(data.data.uinfos[0].name)
							name = data.data.uinfos[0].name
							resolve(name)
							// alert(data.data.uinfos[0].name + "加入会议")
						}
					})
					
				})
				// console.log(this.staff_name)
				// for (var i = 0; i < this.staff_name.length; i++) {
				// 	if(this.staff_name[i].uid == e){
				// 		name = this.staff_name[i].name
				// 	}
				// }
			},
			//实时获取会议中的所有参会人员 
			_users:function(){
				var that = this
				that.users = []
				var aa = 'https://vmt.video.somo.tech/api/v1/vmt/'+ that.join_mid + '/users'
				that.$axios.users(aa).then(data => {
					if (data.code == 0) {
							data.data.users.forEach((e)=>{
								// console.log(e)
								that.users.push(e)
								// console.log(that.users)
							})
					}
						
				})
			},
			ceshi:function(e){
				var name = []
				let aa = ''
				name.push(e)
				let meetingName_data = {
					uid: this.$route.query.uid,
					seq: 3,
					uids: name,
					cookie: this.$route.query.cookie
				}
				this.$axios.meetingName(meetingName_data).then(data => {
					if (data.code == 0) {
						console.log(data.data.uinfos[0])
						aa = data.data.uinfos[0].name
						// alert(data.data.uinfos[0].name + "离开会议")
					}
				})
				return aa
			},
			incident_dispose:function(event){
				this._users()
				var eventStatus = true
				if (this.all_incident.length > 0) {
				  this.all_incident.forEach((e) => {
				    if (event.id === e.id && event.event === e.event) {
				      eventStatus = false
				    }
				  })
				}
				if (this.all_incident.length >= 200) {
				  this.all_incident = []
				}
				if(eventStatus){
					if(event.event == 2){//加入会议
						this.filtration_name(event.uid).then(data =>{
							alert(data + "加入会议")
						})
					}else if(event.event == 3){//离开会议
						if(this.speaker == event.uid){//当前离开的是主讲人
							this.videoOptions.sources[0].src = ''
						}
						this.filtration_name(event.uid).then(data =>{
							alert(data + "离开会议")
						})
					}else if(event.event == 4){//退出会议（自动踢除掉线的）
						this.filtration_name(event.uid).then(data =>{
							alert(data + "退出会议")
						})
					
					
					}else if(event.event == 6){//设置角色
						var role = JSON.parse(event.data).role
						if(role == 4){
							if(this.$route.query.uid == event.uid){
								alert('您被设为主持人')
							}else{
								this.filtration_name(event.uid).then(data =>{
									alert(data + "被设为主持人")
								})
							}
						}
					}else if(event.event == 7){//退出会议（主动踢除）
						if(event.uid == this.$route.query.uid){
							alert('您已被主持人移除会议')
						}else{
							this.filtration_name(event.uid).then(data =>{
								alert(data + "退出会议")
							})
						}
						
					}else if(event.event == 8){//会议锁定
						alert('当前会议已锁定,其他人不能继续加入')
					}else if(event.event == 9){//会议解锁
						alert('该会议已解锁')
					}else if(event.event == 20){//麦克风设置
						// mic == 1静音;0开启;
						var mic = JSON.parse(event.data).mic
						if(mic == 1){
							if(event.uid == this.$route.query.uid){
								alert('您已被主持人静音')
							}
						}
					}else if(event.event == 23){//规则变化
						// mic == 1静音;0开启;
						var value = JSON.parse(event.data).value
						if(value == 2){//全体静音
							alert('您已被主持人静音')
						}
					}else if(event.event == 25){//主讲人
						this.speaker = event.uid
						var speaker = JSON.parse(event.data).speaker
						if (speaker == 1) {//判断当前有没有设置主讲人speaker=1有，0没有
							this.videoOptions.sources[0].src = this.video_url + event.mid + 'U' + event.uid
							console.log(this.videoOptions.sources[0].src)
							if(this.$route.query.uid == event.uid){
								alert('您被设为主讲人')
							}else{
								this.filtration_name(event.uid).then(data =>{
									alert(data + "被设为主讲人")
								})
							}
						}
					}else if(event.event == 41){
							var text = decode(JSON.parse(event.data).text)
							this.filtration_name(event.uid).then(data =>{
								message_box.name = data
							})
							var message_box = {
								text: text,
								uid: event.uid,
								name: ''
							}
							this.history_message.push(message_box)
							console.log(this.history_message)
							if (this.chat_status == 0 || this.chat_status == 2) {
								this.conceal_message = this.conceal_message + 1
								console.log(this.conceal_message)
							}
						}
						this.all_incident.push(event)
					}
				
			},
			// 发消息的函数
			_sendAmessage: function() {
				let message_data = {
					uid: this.$route.query.uid,//当前用户的识别id
					dt: 2,
					device: this.device,//随机码
					mid: this.join_mid, //加入接口返回的（会议id）
					text: encode(this.message_content), //消息内容，需要把字符串转换为base64格式
					cookie: this.$route.query.cookie
				}
				this.$axios.sendAmessage(message_data).then(data => {
					if (data.code == 0) {
						var message_box = {
							text: this.message_content,
							uid: this.$route.query.uid,
							name: this.$route.query.name
						}
						this.history_message.push(message_box)
						this.message_content = ''
						console.log(this.history_message)
					}
			
				})
			},
			// 聊天块的动画显示隐藏
			_chat_box_active: function(e) {
				this.chat_status = e
				if (this.chat_status == 1) {
					this.conceal_message = 0
				}
			},
			// 3秒ping一下的请求函数
			ping: function() {
				let ping = {
					uid: +this.$route.query.uid,
					dt: 2,
					device: this.device,
					mid: +this.join_mid,
					tick: this.tick++
				}
				this.$axios.ping(ping).then(data => {
					var paixu = this.$add_js.sortKey(data.data.events, 'id')
					paixu.forEach((e) => {
					  this.incident_dispose(e)
					})
					
				})
			
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
			
		},
		mounted() {
			this.login_uid = this.$route.query.uid
			this.join()
			
			this.conference_num = this.$route.query.mid //获取会议号
// ==============机型和版本号=================================================
			this.type_version = this.$add_js.browserORverinfo()
// =========================================================================
			// navigator.mediaDevices.getDisplayMedia().then(e => {
			// 	document.getElementById("aa").srcObject = e
			// })
			
			// console.log(navigator.mediaDevices.getDisplayMedia(videoPlayer))
// ==============监听回车键的按下=================================================
			document.onkeydown = function(ev) {
				var event = ev || event
				if (event.keyCode == 13 && this.message_content != '') {
					that._sendAmessage()
				}
			}
// ==============设置视频的宽高=================================================
			var that = this
			console.log(window.innerHeight)
			this.videoOptions.width = window.innerWidth
			this.videoOptions.height = window.innerHeight
			window.onresize = function(){
				console.log(that)
				that.videoOptions.width = window.innerWidth
				that.videoOptions.height = window.innerHeight
			}
// ============================================================================			
			
			
			
			
			// this.cookie = this.router_data.cookie
			// this.login_uid = this.router_data.login_uid
			
			console.log(this)
			setInterval(() => {//websocket的10秒ping一次
				this.send(1)
			}, 10000)
			setInterval(() => {//3秒接口请求ping
				this.ping()
			}, 3000)
			setInterval(() => {//实时获取当前时间
				this._time()
			}, 1000)
		}
	}
	
	
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
	.bigbox {
		width: 100vw;
		height: 100vh;
		position: absolute;
		top: 0;
		left: 0;
		z-index: -2;
	}
</style>

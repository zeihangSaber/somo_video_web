<template>
	<div class="bigBox">
		<div class="title">
			<p class="p">消息(<span>{{message.length}}</span>)</p>
			<i class="font_family icon-close" @click="$emit('handleMessage')"></i>
		</div>
		<div class="box">
			<div class="top">
				<div class="time">{{time}}</div>
				<div class="topBox">
					<div class="msgBox" v-for="itme in message">
						<div v-if="itme.uid != my.uid">
							<div class="msgBox-name">{{itme.name}}</div>
							<div class="msgBox-content">{{itme.text}}</div>
						</div>
						<div v-if="itme.uid == my.uid" class="ME-msg">
							<div class="msgBox-name">{{itme.name}}</div>
							<div class="msgBox-content">{{itme.text}}</div>
						</div>
					</div>

				</div>
			</div>
			<div class="line"></div>
			<div class="bottom">
				<textarea placeholder="在此处输入消息…" rows="3" v-model="msgContent"></textarea>
				<button :disabled=disabled @click="send_msg()">发送</button>
			</div>
		</div>
		<div class="bulletScreen" v-if="bulletScreen == 1">
			<div v-for="item in arr" class="bulletScreen-msg">
				<div class="bulletScreen-name">{{item.name}}：</div>
				<div class="bulletScreen-main">{{item.text}}</div>
			</div>
		</div>
	</div>
</template>
<script>
	import antiquity from "../utils/Antiquity";

	export default {
		data() {
			return {
				message: [],
				time: '',
				// myUid:'',
				msgContent: '',
				my: '',
			}
		},
		created() {
			antiquity.on("getMsg", (msg) => {
				console.log(msg)
				this.message.push(msg)
				console.log(this.message)
			})
			this.my = JSON.parse(localStorage.getItem('my'))
			console.log(localStorage.getItem('my'))
		},
		mounted() {
			this._time()
			document.onkeydown = (e) => {
				if (e.keyCode === 13) {
					this.send_msg() //这里调用的是点击按钮登录的事件
				}
			}
		},
		computed: {
			bulletScreen(){
				return localStorage.getItem('bulletScreen')
			},
			disabled(){
				let disabled
				if(this.msgContent == ''){
					disabled = true
				}else{
					disabled = false
				}
				return disabled
			},
			arr(){
				let newArr = []
				if(this.message.length>3){
					newArr = [
								this.message[this.message.length-3],
								this.message[this.message.length-2],
								this.message[this.message.length-1]
							]
				}else{
					newArr = this.message
				}
				return newArr
			}
		},
		methods: {
			send_msg: function() {
				alert(this.msgContent)
				if(this.msgContent == ''){
					
					return
				}else{
					antiquity.ajax.broadcast({
						"mid": this.my.mid,
						"text": Base64.encode(this.msgContent)
					}).then((res) => {
						// console.log(res)
						this.message.push({
							name: this.my.name,
							text: this.msgContent,
							uid: this.my.uid
						})
						this.msgContent = ''
					})
				}
				
			},
			// 实时获取当前电脑时间
			_time: function() {
				setInterval(() => {
					var t = new Date()
					var hour = t.getHours(); //得到小时
					var minu = t.getMinutes(); //得到分钟
					var sec = t.getSeconds(); //得到秒
					if(minu < 10){
						minu = '0' +  minu
					}
					if(sec < 10){
						sec = '0' +  sec
					}
					this.time = hour + ':' + minu + ':' + sec
				}, 1000)
			},
		}
	}
</script>
<style lang="less" scoped>
	@import "../common/common";
	.bulletScreen{
		width: 476px;
		// background: pink;
		position: fixed;
		bottom: 100px;
		left: 30px;
		z-index: 500;
		
		.bulletScreen-msg{
			max-height:88px;
			min-height:44px;
			background:rgba(0,0,0,0.5);
			border-radius:6px;
			margin-bottom: 10px;
			padding-left: 22px;
			box-sizing: border-box;
			display: flex;
			justify-content: flex-start;
			align-items: center;
			& div{
				font-size:16px;
				font-family:PingFangSC-Regular,PingFang SC;
				font-weight:400;
			}
			.bulletScreen-name{
				color:rgba(105,183,255,1);
			}
			.bulletScreen-main{
				color:#ffffff;
			}
		}
	}
	.title {
		padding-bottom: 10px;
		.flex(space-between, center);

		.p {
			.fontStyle(18px, #000, blod);
			padding-left: 10px;
			flex: 1;
		}

		.icon-close {
			color: #c5c6c8;
		}
	}

	.box {
		border-radius: 6px;
		background-color: #fff;
		flex: 1;
		.flex();
		flex-direction: column;

		.top,
		.bottom {
			padding: 14px 20px;
		}

		.top {
			height: 0;
			flex: 1;

			.time {
				font-size: 14px;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: rgba(153, 153, 153, 1);
				text-align: center;
				margin-bottom: 12px;
			}

			.topBox {
				height: 85%;
				overflow-y: overlay;


			}

			.myScroll(topBox)
		}

		.msgBox {
			.ME-msg {
				text-align: right;
				padding-right: 10px;
				box-sizing: border-box;
			}

			& div {
				margin-bottom: 16px;
			}

			.msgBox-name {
				font-size: 14px;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: rgba(153, 153, 153, 1);
			}

			.msgBox-content {
				font-size: 16px;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: rgba(24, 24, 24, 1);
				margin-top: 4px;
			}
		}

		.line {
			border-bottom: 2px solid #f4f4f4;
		}

		.bottom {
			height: 136px;
			.flex(flex-start, flex-end);
			flex-direction: column;

			textarea {
				border: none;
				resize: none;
				width: 100%;
				outline: none;
				flex: 1;
				margin-bottom: 5px;
			}

			button {
				background-color: #118BFB;
				border-radius: 4px;
				border: none;
				width: 70px;
				height: 30px;
				color: #fff;
			}
		}
	}
</style>

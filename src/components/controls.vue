<template>
	<div class="ctrlBox">
		<div class="ctrlHeader">
			<i></i>
			<div class="center">
				<span class="bigSpan">会议号：{{this.data.code}}</span>
				<span class="bigSpan" v-if="data.pwd">密码：{{this.data.pwd}}</span>
				<span>{{this.data.name}}</span>
				<span>
					<i class="font_family icon-people-num"></i>
					{{this.peopleNum}}
				</span>
				<span></span>
				<span v-if="this.data.locked">
					<i :class="`font_family icon-${this.data.locked ? 'lock' : 'unlock'}`"></i>
				</span>
				<span>
					<i class="font_family icon-noMute"></i>
					{{this.micNum}}
				</span>
				<span>
					<i class="font_family icon-time"></i>
					{{this.data.start3}}
				</span>
			</div>
			<i class="font_family icon-wifi-high"></i>
		</div>
		<div class="ctrlFooter">
			<i></i>
			<div class="center">
				<button><i class="font_family icon-mic"></i>静音</button>
				<button><i class="font_family icon-camera"></i>视频</button>
				<button><i class="font_family icon-sharing"></i>邀请</button>
				<button @click="$emit('handleMessage')">
					<i :class="`font_family icon-barrage ${showMessage ? 'active' : ''}`"></i>消息
				</button>
				<button @click="$emit('handleParty')">
					<i :class="`font_family icon-members ${showParty ? 'active' : ''}`"></i>参会方
				</button>
				<button @click="set_show()">
					<i :class="`font_family icon-setting ${show ? 'active' : ''}`"></i>设置
					<!-- <i class="font_family icon-setting"></i>设置 -->
				</button>
			</div>
			<button class="zoomIn" @click="$emit('handleSide')">
				<i :class="`font_family ${showSide ? 'icon-zoomIn' : 'icon-zoomOut'}`"></i>
			</button>
		</div>
		<div class="set_box" v-if="show == 1">
			<div class="set_title">
				<div>设置</div>
				<i class="font_family icon-close " @click="set_show()"></i>
			</div>
			<div class="set_main">
				<div class="set_main_box">
					<div class="set_main_title">视频布局:</div>
					<div class="set_gongneng">
						<div @click="set(1,1)">
							<svg  class="icon" aria-hidden="true" v-if="splitScreen == 1">
								<use xlink:href="#icon-select"></use>
							</svg>
							<i class="font_family icon-select-no " v-if="splitScreen == 0"></i>
							<span>四分屏</span>
						</div>
						<div @click="set(1,0)">
							<svg  class="icon" aria-hidden="true" v-if="splitScreen == 0">
								<use xlink:href="#icon-select"></use>
							</svg>
							<i class="font_family icon-select-no " v-if="splitScreen == 1"></i>
							<span>九分屏</span>
						</div>
					</div>
				</div>
				<div class="set_main_box">
					<div class="set_main_title">弹幕消息:</div>
					<div class="set_gongneng">
						<div @click="set(2,1)">
							<svg  class="icon" aria-hidden="true" v-if="bulletScreen == 1">
								<use xlink:href="#icon-select"></use>
							</svg>
							<i class="font_family icon-select-no " v-if="bulletScreen == 0"></i>
							<span>开启</span>
						</div>
						<div @click="set(2,0)">
							<svg  class="icon" aria-hidden="true" v-if="bulletScreen == 0">
								<use xlink:href="#icon-select"></use>
							</svg>
							<i class="font_family icon-select-no " v-if="bulletScreen == 1"></i>
							<span>关闭</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import antiquity from "../utils/Antiquity"
	let interval;
	export default {
		name: "app",
		data(){
			return{
				splitScreen:1,//分屏
				bulletScreen:1,//弹幕
				show:0
			}
		},
		props: ["data", "peopleNum", "micNum", "showSide", "showMessage", "showParty"],
		components: {},
		mounted() {
			localStorage.setItem('bulletScreen',this.bulletScreen)
			interval = setInterval(() => {
				this.data.start3 = this.data.start3 + 1000
			}, 1000)
		},
		methods:{
			set_show(){
				this.show = !this.show
			},
			set(type,select){
				if(type == 1){//分屏
					this.splitScreen = select
				}else if(type == 2){//弹幕
					this.bulletScreen = select
					localStorage.setItem('bulletScreen',this.bulletScreen)
				}
			}
		},
		destroyed() {
			clearInterval(interval)
		}
	};
</script>

<style lang="less" scoped>
@import "../common/common";
.set_box{
	width: 320px;
	// height: 100px;
	background:rgba(0,0,0,0.86);
	// background: red;
	border-radius:8px;
	position: absolute;
	bottom: 115px;
	left: 50%;
	z-index: 110000;
	.set_main{
		padding: 25px 0;
		box-sizing: border-box;
		font-size:16px;
		font-family:PingFangSC-Regular,PingFang SC;
		font-weight:400;
		color:rgba(255,255,255,1);
		.set_main_box{
			width: 60%;
			display: flex;
			justify-content: center;
			align-items: flex-start;
			margin: 0 auto;
			// background: pink;
			margin-bottom: 16px;
			.set_main_title{
				width: 40%;
				// border: 1px solid red;
			}
			.set_gongneng{
				width: 50%;
				& div{
					margin-bottom: 6px;
				}
				& div>span{
					margin-left: 9px;
				}
			}
		}
	}
	.set_title{
		height: 68px;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0 20px 0 24px;
		box-sizing: border-box;
		border-bottom: 1px solid #333333;
		font-size:28px;
		font-family:PingFangSC-Semibold,PingFang SC;
		font-weight:600;
		color:rgba(255,255,255,1);
		& i{
			color: #C5C6C8;
		}
		
	}
}
.ctrlBox {
	width: 100%;
	.ctrlHeader {
		padding: 0 20px;
		height: 36px;
		position: absolute;
		left: 0;
		top: 0;
		width: 100%;
		background-color: rgba(0, 0, 0, 0.6);
		z-index: 9999;
		color: #fff;
		line-height: 36px;
		.flex(space-between, center);
		text-align: center;
		.bigSpan {
			font-weight: bolder;
		}
		.center {
			flex: 1;
			span {
				margin: 0 20px;
			}
		}
	}
	.ctrlFooter {
		padding: 0 20px;
		height: 80px;
		position: absolute;
		left: 0;
		bottom: 0;
		width: 100%;
		background-color: rgba(0, 0, 0, 0.6);
		z-index: 9999;
		color: #fff;
		line-height: 80px;
		.flex(space-between, center);
		.center {
			flex: 1;
			text-align: center;
			button {
				background-color: transparent;
				outline: none;
				border: none;
				color: #fff;
				font-size: 16px;
				margin: 0 20px;
				i {
					display: block;
					font-size: 32px;
				}
			}
		}
		.zoomIn {
			background-color: transparent;
			outline: none;
			border: 2px solid #fff;
			border-radius: 4px;
			color: #fff;
			font-size: 16px;
			width: 34px;
			height: 34px;
			overflow: hidden;
			i {
				font-size: 40px;
				position: relative;
				left: -10px;
				top: -8px;
			}
		}
	}
}
.active {
	color: #118BFB;
}
</style>

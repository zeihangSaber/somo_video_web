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
				<button><i class="font_family icon-setting"></i>设置</button>
			</div>
			<button class="zoomIn" @click="$emit('handleSide')">
				<i :class="`font_family ${showSide ? 'icon-zoomIn' : 'icon-zoomOut'}`"></i>
			</button>
		</div>
	</div>
</template>

<script>
import antiquity from "../utils/Antiquity"
let interval;
export default {
	name: "app",
	props: ["data", "peopleNum", "micNum", "showSide", "showMessage", "showParty"],
	components: {},
	mounted() {
		interval = setInterval(() => {
			this.data.start3 = this.data.start3 + 1000
		}, 1000)
	},
	destroyed() {
		clearInterval(interval)
	}
};
</script>

<style lang="less" scoped>
@import "../common/common";
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

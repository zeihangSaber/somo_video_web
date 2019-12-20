<template>
	<div id="app">
		<div class="content" ref="content">
			<ctrl
				@handleSide="handleSide"
				:data="meetingInfo"
				:peopleNum="peopleNum"
				:micNum="micNum"
				:showSide="isShowSide"
				:showMessage="isShowMessage"
				:ShowShare="isShowShare"
				:showParty="isShowParty"
				:playerNum="playerNum"
				:barrage="barrage"
				@handleMessage="handleMessage"
				@ShowShare="ShowShare"
				@handleParty="handleParty"
				@prevSlide="prevSlide"
				@nextSlide="nextSlide"
				@selectNine="() => (playerNum = 9)"
				@selectFour="() => (playerNum = 4)"
				@barrageTrue="() => (barrage = true)"
				@barrageFalse="() => (barrage = false)"
			></ctrl>
			<div :class="`playerBigBox ${howMany}`" ref="playerBigBox">
				<player v-if="!(speakFlag || shareFlag)" v-for="item of members" :key="item.uid" :data="item"></player>
				<player v-if="speakFlag" :data="speaker"></player>
				<player v-if="shareFlag" :data="sharer"></player>
				<div class="drag" draggable="true" ref="draggable"><div class="move"></div></div>
			</div>
			<share v-if="isShowShare" :shareData="shareData"></share>
			<div class="bubble-BOX">
				<div class="bubble" v-for="item in bubbleMsg">{{ item }}</div>
			</div>
		</div>
		<side-box
			v-if="isShowSide"
			:data="meetingInfo"
			:members="speaker ? [speaker, ...members] : members"
			:showMessage="isShowMessage"
			:showParty="isShowParty"
			:barrage="barrage"
			@handleMessage="handleMessage"
			@handleParty="handleParty"
		></side-box>
	</div>
</template>

<script>
import Player from './components/player';
import Ctrl from './components/controls';
import SideBox from './components/side';
import share from './components/share';
import antiquity, { myMid, Password, MeetingStatus } from './utils/Antiquity';
export default {
	name: 'app',
	components: {
		Player,
		Ctrl,
		SideBox,
		share
	},
	data() {
		return {
			meetingInfo: {},
			members: [],
			peopleNum: 0,
			micNum: 0,
			isShowSide: true,
			isShowMessage: true,
			isShowParty: true,
			isShowShare: false,
			speaker: null,
			sharer: null,
			playerNum: 9,
			slideCount: 1,
			barrage: false,
			shareData: {},
			bubbleMsg: [],
			timer:''
		};
	},
	created() {
		antiquity.on('getMidInfo', meetingInfo => {
			this.meetingInfo = meetingInfo;
			console.log('meetingInfo', this.meetingInfo);
		});
		antiquity.on('getMembers', members => {
			this.members = members;
			this.peopleNum = members.length;
			this.micNum = members.filter(item => {
				if (item.mic === 0) {
					return item;
				}
			}).length;
			console.log('members', this.members);
		});
		antiquity.on('getShareUrl', sharer => {
			console.log('sharer', sharer);
		});
		antiquity.on('getSpeaker', speaker => {
			this.speaker = speaker;
			console.log('speaker', speaker);
		});
		antiquity.on('getToast', msg => {
			console.log('getToast', msg);
			this.bubbleMsg.push(msg);
		});
	},
	// watch: {
	// 	bubbleMsg: 'bubbleMsg_status'
	// },
	async mounted() {
		this.$refs.draggable.ondragend = e => {
			this.$refs.draggable.style.left = `${e.x - 180}px`;
			this.$refs.draggable.style.top = `${e.y}px`;
		};
		this.timer = setInterval(() => {
			this.bubbleMsg_status()
		}, 3000);
		this.$nextTick(() => {
			this.init();
		})
	},
	computed: {
		maxSlide() {
			let maxSlide = Math.max(Math.floor(this.members.length / 4), 1);
			this.speaker && ++maxSlide;
			this.sharer && ++maxSlide;
			console.log('ddd', maxSlide);
			return maxSlide;
		},
		speakFlag() {
			if (this.shareFlag) return this.speaker && this.slideCount === 2;
			return this.speaker && this.slideCount === 1;
		},
		shareFlag() {
			return this.sharer && this.slideCount === 1;
		},
		mineFlag() {
			if (this.speakFlag && this.speakFlag && this.slideCount === 3) return true;
			if (this.speakFlag || (this.speakFlag && this.slideCount === 2)) return true;
			if (this.slideCount === 1) return true;
		},
		howMany() {
			if (this.shareFlag || this.speakFlag) return 'one';
			if (this.playerNum === 4) return 'four';
			if (this.playerNum === 9) return 'nine';
			return '';
		}
	},
	methods: {
		bubbleMsg_status() {
			if (this.bubbleMsg != '') {
				this.bubbleMsg.shift();
			}else{
				// clearTimeout(this.timer)
			}
		},
		ShowShare() {
			this.isShowShare = !this.isShowShare;
		},
		handleSide() {
			this.isShowSide = !this.isShowSide;
		},
		handleMessage() {
			this.isShowMessage = !this.isShowMessage;
		},
		handleParty() {
			this.isShowParty = !this.isShowParty;
		},
		prevSlide() {
			this.slideCount !== 1 && --this.slideCount;
		},
		nextSlide() {
			this.slideCount !== this.maxSlide && ++this.slideCount;
		},
		init() {
			this.$nextTick(async () => {
				this.shareData = {
					mid: myMid,
					password: Password
				};
				this.isShowShare = MeetingStatus;
				await antiquity
						.joinMeeting({
							code: myMid,
							password: Password,
							width: 480,
							height: 360,
							dom: this.$refs.draggable
						})
						.then(res => {
							if (res.code == 2011) {
								window.location.href = 'http://localhost:8080/joinConference';
							}
							console.log(res.code);
						});
				antiquity.rtmp.setScreenSize(480, 360);
				antiquity.rtmp.setScreenPosition(12, 9);
				antiquity.rtmp.setWrap();
				antiquity.rtmp.setCamMode(480, 360, 15);
				antiquity.publish(this.meetingInfo.video_url);
			});
		}
	}
};
</script>

<style lang="less">
@import './common/base';
@import './common/common';
.bubble {
	border-radius: 8px;
	padding: 10px 20px;
	box-sizing: border-box;
	background: rgba(0,0,0,0.3);
	// background: red;
	color: #ffffff;
	margin-bottom: 10px;
}
.bubble-BOX {
	width: 200px;
	height: 200px;
	// border: 1px solid red;
	position: absolute;
	top: calc(50vh - 100px);
	left: calc(50% - 100px);
	text-align: center;
}
.playerBigBox {
	height: 100%;
	.flex(flex-start, flex-start);
	align-content: flex-start;
	flex-wrap: wrap;
	&.one {
		.playerBox {
			width: 100%;
			height: 100%;
		}
	}
	&.two {
	}
	&.four {
		.playerBox {
			width: 49.8%;
			height: 49.8%;
			margin: 0.1%;
		}
	}
	&.nine {
		.playerBox {
			width: 33.133%;
			height: 33.133%;
			margin: 0.1%;
		}
	}
	.playerBox {
		width: 50%;
		height: 50%;
	}
}
.icon {
	width: 1em;
	height: 1em;
	vertical-align: -0.15em;
	fill: currentColor;
	overflow: hidden;
}
.vjs-tech {
	transform: translateZ(0);
}
button,
.icon-close {
	cursor: pointer;
	&:disabled {
		cursor: not-allowed;
		color: #ccc !important;
		border-color: #ccc !important;
		i {
			color: #ccc !important;
		}
	}
}
#app {
	height: 100%;
	width: 100%;
	position: relative;
	.flex(flex-start, flex-start);
	.content {
		min-width: 1080px;
		position: relative;
		height: 100%;
		flex: 1;
		background-color: #91949c;
	}
}
.mineOut {
	position: fixed;
	right: -100%;
	top: 0;
}
.drag {
	width: 240px;
	height: 180px;
	background-color: bisque;
	position: absolute;
	top: 100px;
	right: -180px;
	.move {
		width: 10px;
		height: 10px;
		background-color: #ff6b6f;
		position: absolute;
		z-index: 99999;
		right: 0;
	}
	z-index: 99998;
}
</style>

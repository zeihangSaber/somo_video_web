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
				:maxSlide="maxSlide"
				:shareData="shareData"
				:slideCount="slideCount"
				@handleMessage="handleMessage"
				@ShowShare="ShowShare"
				@handleParty="handleParty"
				@prevSlide="prevSlide"
				@nextSlide="nextSlide"
				@selectNine="() => (playerNum = 9)"
				@selectFour="() => (playerNum = 4)"
				@barrageTrue="() => (barrage = true)"
				@barrageFalse="() => (barrage = false)"
				@selectSlide="(num) => slideCount = num"
			></ctrl>
			<div :class="`playerBigBox ${howMany}`" ref="playerBigBox">
				<div :class="`dragBox ${mineFlag ? 'playerBox' : 'boxOut'}`">
					<div class="drag" ref="draggable">
						<div :class="`${meetingInfo.mine && meetingInfo.mine.camera === 1 ? 'dragHasCamera' : ''}`">
							<i class="font_family icon-camera-none"></i>
						</div>
					</div>
				</div>
				<player
					v-if="!(speakFlag || shareFlag)"
					v-for="item of nowPlayerNum"
					:key="item"
					:meetingInfo="meetingInfo"
					:hawMany="howMany"
					:data="members[playerNum * (realCount - 1) + item - 1]">
				</player>
				<div
					class="space playerBox"
					v-if="!(speakFlag || shareFlag)"
					v-for="item of playerNum - nowPlayerNum"
				></div>
				<player v-if="speakFlag" :data="speaker" :meetingInfo="meetingInfo"></player>
				<player v-if="shareFlag" :data="sharer" :meetingInfo="meetingInfo"></player>
				<div v-if="waiting" class="waiting"><i class="font_family icon-camera-none"></i></div>
			</div>
			<share v-if="isShowShare" :shareData="shareData"></share>
		</div>
		<transition enter-active-class="animated bounceIn faster" leave-active-class="animated bounceOut faster">
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
		</transition>
	</div>
</template>

<script>
import animate from 'animate.css';
import Player from './components/player';
import Ctrl from './components/controls';
import SideBox from './components/side';
import share from './components/share';
import antiquity, { myMid, Password, MeetingStatus, myCamera, myMic } from './utils/Antiquity';
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
			playerNum: 4,
			slideCount: 1,
			barrage: false,
			shareData: {},
			timer:'',
			test: false,
			waiting: true
		};
	},
	beforeCreate() {
		window.onbeforeunload = (e) => {
			e.returnValue=("确定离开当前页面吗？");
		};
		window.onclose = (e) => {
			e.returnValue=("确定离开当前页面吗？");
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
		});
		antiquity.on('getShareUrl', sharer => {
			console.log('sharer', sharer);
		});
		antiquity.on('getSpeaker', speaker => {
			this.speaker = speaker;
			console.log('speaker', speaker);
		});
		this.$nextTick(() => {
			antiquity.on('getToast', msg => {
				this.$Toast.success({message: msg});
			});
		})
	},
	async mounted() {
		this.$nextTick(() => {
			this.init();
		})
	},
	computed: {
		maxSlide() {
			let maxSlide = Math.max(Math.ceil(this.members.length / this.playerNum), 1);
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
			// if (this.members.length < 3) return false;
			if (this.speakFlag && this.speakFlag && this.slideCount === 3) return true;
			if (this.speakFlag || (this.speakFlag && this.slideCount === 2)) return true;
			if (this.slideCount === 1) return true;
			return false
		},
		howMany() {
			if (this.members.length === 1) return 'fir';
			if (this.shareFlag || this.speakFlag) return 'one';
			if (this.members.length === 2) return 'two';
			if (this.playerNum === 4) return 'four';
			if (this.playerNum === 9) return 'nine';
			return 'fir'
		},
		realCount() {
			let realCount = 0;
			if (this.speakFlag && this.shareFlag) {
				realCount = -2;
			} else if (this.speakFlag || this.shareFlag) {
				realCount = -1;
			}
			return Math.max(this.slideCount + realCount, 0);
		},
		nowPlayerNum() {
			return Math.min(this.members.length - this.playerNum * (this.realCount - 1), this.playerNum)
		},
	},
	methods: {
		ShowShare() {
		},
		handleSide() {
			this.isShowSide = !this.isShowSide;
		},
		handleMessage() {
			this.isShowMessage = !this.isShowMessage;
			if (!this.isShowSide) {
				this.isShowSide = true;
				this.isShowMessage = true;
			}
		},
		handleParty() {
			this.isShowParty = !this.isShowParty;
			if (!this.isShowSide) {
				this.isShowSide = true;
				this.isShowParty = true;
			}
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
					password: Password,
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
							this.waiting = false;
						});
				antiquity.publish(this.meetingInfo.video_url, myCamera, myMic);
			});
		}
	},
	watch: {
		mineFlag() {
		}
	}
};
</script>

<style lang="less">

@import './common/base';
@import './common/common';
.playerBigBox {
	height: 100%;
	overflow: hidden;
	.flex(flex-start, flex-start);
	align-content: flex-start;
	flex-wrap: wrap;
	&.fir {
		.playerBox {
			width: 0;
			height: 0;
		}
		.dragBox {
			width: 100%;
			height: 99.5%;
		}
	}
	&.one {
		.playerBox {
			width: 100%;
			height: 100%;
		}
	}
	&.two {
		.playerBox {
			width: 100%;
			height: 100%;
		}
		.dragBox {
			width: 328px;
			height: 188px;
			border: 4px solid #91949C;
			position: absolute;
			z-index: 5;
			top: 50px;
			right: 20px;
		}
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
		.flex(center, center);
		overflow: hidden;
		background-color: #444;
		&.space {
			background-color: #ccc;
		}
	}
	.drag {
		background-color: #444;
		width: 100%;
		height: 100%;
		position: relative;
		.dragHasCamera {
			position: absolute;
			width: 100%;
			height: 100%;
			top: 0;
			left: 0;
			z-index: 5;
			background-color: #444;
			.flex(center, center);
			.icon-camera-none {
				font-size: 80px;
				color: #666;
			}
		}
	}
	.boxOut {
		position: fixed;
		top: -200%;
	}
	.waiting {
		position: absolute;
		width: 100%;
		height: 100%;
		top: 0;
		left: 0;
		z-index: 10;
		background-color: #444;
		.flex(center, center);
		.icon-camera-none {
			font-size: 80px;
			color: #666;
		}
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
	overflow: hidden;
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
.caster {
	left: -500px;
}
.superFaster {
	transition-duration: .02s;
}

</style>

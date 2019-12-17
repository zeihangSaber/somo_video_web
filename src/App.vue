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
				:showParty="isShowParty"
				@handleMessage="handleMessage"
				@handleParty="handleParty"
				@prevSlide="prevSlide"
				@nextSlide="nextSlide"
			></ctrl>
			<div :class="`playerBigBox ${howMany}`">
				<player v-if="!(speakFlag || shareFlag)" v-for="item of members" :key="item.uid" :data="item"></player>
				<player v-if="speakFlag" :data="speaker"></player>
				<player v-if="shareFlag" :data="sharer"></player>
				<div ref="myStream" id="myStream" class="playerBox"></div>
			</div>
		</div>
		<side-box
			v-if="isShowSide"
			:data="meetingInfo"
			:members="speaker ? [speaker, ...members] : members"
			:showMessage="isShowMessage"
			:showParty="isShowParty"
			@handleMessage="handleMessage"
			@handleParty="handleParty"
		></side-box>
	</div>
</template>

<script>
import Player from "./components/player";
import Ctrl from "./components/controls";
import SideBox from "./components/side";
import antiquity from "./utils/Antiquity";
export default {
	name: "app",
	components: {
		Player,
		Ctrl,
		SideBox
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
			speaker: null,
			sharer: null,
			playerNum: 4,
			slideCount: 2
		}
	},
	created() {
		antiquity.on("getMidInfo", (meetingInfo) => {
			this.meetingInfo = meetingInfo;
			console.log("meetingInfo", this.meetingInfo)
		});
		antiquity.on("getMembers", (members) => {
			this.members = members;
			this.peopleNum = members.length;
			this.micNum = members.filter(item => {
				if (item.mic === 0) {
					return item
				}
			}).length
			console.log("members", this.members)
		});
		antiquity.on("getShareUrl", (sharer) => {
			console.log("sharer", sharer)
		});
		antiquity.on("getSpeaker", (speaker) => {
			this.speaker = speaker;
			console.log("speaker", speaker)
		});
	},
	async mounted() {
		const {offsetWidth, offsetHeight} = this.$refs.myStream;
		this.$nextTick(async () => {
			console.log(this.$refs.myStream)
			await antiquity.joinMeeting({
				code: 66666,
				width: offsetWidth,
				height: offsetHeight,
				dom: this.$refs.myStream
			});
			antiquity.rtmp.setScreenSize(offsetWidth*1.2, offsetHeight*1.2);
			antiquity.rtmp.setScreenPosition(-offsetWidth*0.15, 0);
			antiquity.rtmp.setWrap();
			antiquity.rtmp.setCamMode(1280, 720, 24);
			antiquity.publish(this.meetingInfo.video_url.slice(0, -1))
		})
	},
	computed: {
		maxSlide() {
			let maxSlide = Math.max(Math.floor(this.members.length/4), 1);
			this.speaker && ++maxSlide;
			this.sharer && ++maxSlide;
			return maxSlide
		},
		speakFlag() {
			if (this.shareFlag) return this.speaker && this.slideCount === 2;
			return this.speaker && this.slideCount === 1
		},
		shareFlag() {
			return this.sharer && this.slideCount === 1
		},
		howMany() {
			if (this.shareFlag || this.speakFlag) return "one";
			if (this.playerNum === 4) return "four";
			if (this.playerNum === 9) return "nine";
			return ''
		}
	},
	methods: {
		handleSide() {
			this.isShowSide = !this.isShowSide
		},
		handleMessage() {
			this.isShowMessage = !this.isShowMessage
		},
		handleParty() {
			this.isShowParty = !this.isShowParty
		},
		prevSlide() {
			this.slideCount !== 1 && --this.slideCount
		},
		nextSlide() {
			this.slideCount !== this.maxSlide && ++this.slideCount
		},
	}
};
</script>

<style lang="less">
@import "./common/base";
@import "./common/common";
.playerBigBox {
	height: 100%;
	.flex(space-around, flex-start);
	flex-wrap: wrap;
	&.one {
		.playerBox {
			width: 100%;
			height: 100%;
		}
	}
	&.two {}
	&.four {
		.playerBox {
			width: 49%;
			height: 49%;
		}
	}
	&.nine {
		.playerBox {
			width: 33%;
			height: 33%;
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
button, .icon-close {
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
	.flex(flex-start, flex-start);
	.content {
		position: relative;
		height: 100%;
		flex: 1;
		background-color: #91949C;
	}
}
#myStream {
	position: fixed;
	right: -100%;
	top: 0;
}
</style>

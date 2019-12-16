<template>
	<div class="ctrlBox">
		<div class="ctrlHeader">
			<i></i>
			<div class="center">
				<span class="bigSpan">会议号：{{this.meetingInfo.code}}</span>
				<span class="bigSpan">密码： </span>
				<span>{{this.meetingInfo.name}}</span>
				<span>
				<i class="font_family icon-people-num"></i>
				{{this.members.length}}
				</span>
				<span>
					<i class="font_family icon-noMute"></i>
				</span>
				<span>
					<i class="font_family icon-time"></i>
				</span>
			</div>
			<i class="font_family icon-wifi-high"></i>
		</div>
		<div class="ctrlFooter">
			<i></i>
			<div class="center"></div>
			<span><i class="font_family icon-zoomIn"></i></span>
		</div>
	</div>
</template>

<script>
import antiquity from "../utils/Antiquity"
export default {
	name: "app",
	data() {
		return {
			meetingInfo: {},
			members: []
		}
	},
	components: {},
	created() {
		antiquity.on("getMidInfo", (meetingInfo) => {
			this.meetingInfo = meetingInfo
			console.log("meetingInfo", this.meetingInfo)
		})
		antiquity.on("getMembers", (members) => {
			this.members = members
			console.log("members", this.members)
		})
	},
	mounted() {
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
		}
	}
}
.icon-zoomIn {
	line-height: 40px;
	font-size: 40px;
}
</style>

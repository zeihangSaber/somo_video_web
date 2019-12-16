<template>
	<div id="app">
		<div class="content">
			<ctrl></ctrl>
			<player uid="10001240" src="rtmp://rtmp1.video.somo.tech/video/10311312U10001240" index="0"></player>
			<div id="myStream" class="playerBox"></div>
		</div>
		<aside-box pwd="123" code="123" name="123" avarter=""></aside-box>
	</div>
</template>

<script>
import Player from "./components/player";
import Ctrl from "./components/controls";
import AsideBox from "./components/aside";
import antiquity from "./utils/Antiquity";
export default {
	name: "app",
	components: {
		Player,
		Ctrl,
		AsideBox
	},
	mounted() {
		antiquity.joinMeeting({
			code: 66666,
			width: 500,
			height: 500,
			dom: document.getElementById("myStream")
		});
	}
};
</script>

<style lang="less">
@import "./common/base";
@import "./common/common";
.playerBox {
	width: 33%;
	height: 33%;
	background-color: bisque;
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
</style>

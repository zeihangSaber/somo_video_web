<template>
	<div ref="saber">
		<button @click="push">会议</button>
	</div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import somo from "@/utils/somo";
import { State, Action } from "vuex-class";
@Component
export default class MeetingPage extends Vue {
	private dom: any;
	private srcJoint: string;
	@State Mcode: string;
	@State connectStatus: number;
	@State microphone: number; //麦克风状态
	@State camera: number; //摄像头状态
	@State uid: number; //uid
	// private url_head:
	created() {
		somo.initStreamer({
			src: "./RtmpStreamer.swf",
			width: 1080,
			height: 720
		});
	}
	mounted() {
		(this.$refs.saber as HTMLElement).appendChild(somo.streamerDom);
	}

	push() {
		somo.publish("rtmp://rtmp2.video.somo.tech/video", "10288230U10000434");
	}
}
</script>

<style lang="less" scoped></style>

<template>
	<div ref="saber">
		<button @click="push">push</button>
	</div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import somo from "@/utils/somo";
import { State, Action } from "vuex-class";
@Component
export default class MeetingPage extends Vue {
	private dom: any;
	@State Mcode: string;
	@State connectStatus: number;
	// private url_head:
	created() {
		somo.initStreamer({
			src: "./RtmpStreamer.swf",
			width: 1080,
			height: 720
		});
	}
	mounted() {
		window.onbeforeunload = function(event) {
			console.log(1111111111111);
			// this.setMeetingconnectStatus(1);
			// this.leave_meeting();
		};
		console.log(this.connectStatus);
		(this.$refs.saber as HTMLElement).appendChild(somo.streamerDom);
	}
	leave_meeting() {
		somo.leave({
			mid: this.Mcode
		}).then((res: any): void => {
			console.log(res);
		});
	}
	push() {
		somo.publish("rtmp://rtmp2.video.somo.tech/video", "10286079U10000435");
	}
}
</script>

<style lang="less" scoped></style>

<template>
	<div ref="saber">
		<button @click="push">push</button>
	</div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import somo from "@/utils/somo";
@Component
export default class MeetingPage extends Vue {
	private dom: any;
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
		somo.publish("rtmp://rtmp1.video.somo.tech/video", "2000U1000");
	}
}
</script>

<style lang="less" scoped></style>

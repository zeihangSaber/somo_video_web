<template>
	<div ref="saber">
		<button @click="leaveMeeting">退出会议</button>
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
		console.log(somo.defaultParameter.mid);
		if (!somo.defaultParameter.mid) {
			this.quit();
		}
		this.srcJoint = this.Mcode + "U" + this.uid;
		console.log(this.srcJoint);
		(this.$refs.saber as HTMLElement).appendChild(somo.streamerDom);
		this.microphoneORcamera(this.microphone, 1);
		this.microphoneORcamera(this.camera, 2);
	}
	beforeDestroy() {
		alert(123);
		this.leaveMeeting();
		console.log("我已经离开了");
	}
	quit() {
		this.leaveMeeting();
		this.$router.push({ path: "/joinConference" });
	}
	leaveMeeting() {
		somo.leave({
			mid: this.Mcode
		}).then(res => {
			console.log("退出成功");
		});
	}

	microphoneORcamera(status, type) {
		// status:1开启，0关闭；type：1麦克风设置，2摄像头设置
		console.log(status, type);
		if (type == 1) {
			somo.tellYou({
				mid: this.Mcode,
				mic: status,
				volume: "80%"
			});
		} else if (type == 2) {
			somo.showYou({
				mid: this.Mcode,
				camera: status
			});
		}
		if (type == 1 && status == 1) {
			//麦克风开启
			somo.createClient();
			somo.clientInit();
			somo.join();
		}
		if (type == 2 && status == 1) {
			//摄像头开启
			// console.log(111111);
			// setTimeout(() => {
			// 	this.push();
			// }, 400);
			setTimeout(this.push, 1000);
		}
	}
	leave_meeting() {
		somo.leave({
			mid: this.Mcode
		}).then((res: any): void => {
			console.log(res);
		});
	}
	push() {
		// somo.publish("rtmp://rtmp2.video.somo.tech/video", "10286079U10000435");
		somo.publish("rtmp://rtmp2.video.somo.tech/video", this.srcJoint);
		// try {
		// 	somo.publish("rtmp://rtmp2.video.somo.tech/video", "10286079U10000435");
		// } catch (e) {
		// 	console.log(e);
		// 	console.log(1111111111);
		// 	// error
		// }
	}
}
</script>

<style lang="less" scoped></style>

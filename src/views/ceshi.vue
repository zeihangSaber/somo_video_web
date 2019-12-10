<template>
	<div ref="saber">
		<button @click="leaveMeeting">退出会议</button>
		<!-- 声网 -->
		<div id="video" style="margin:0 auto;">
			<div id="agora_local" style="float:right;width:210px;height:147px;display:inline-block;"></div>
		</div>
	</div>
</template>

<script>
	import Somo from "zeihang_saber";
	// const somo = new Somo();
	// somo.init();
	// Ajax.setEnv("pro")
	export default{
		data(){
			return{
				microphone:'',
				camera:'',
				srcJoint:'',
				route_data:{},
				url_head:''
			}
		},
		created() {
			somo.initStreamer({
				src: "./RtmpStreamer.swf",
				width: 500,
				height: 500
			});
		},
		mounted() {
			this.route_data = JSON.parse(this.$route.query.arguments)
			somo.setUid(this.route_data.uid)//向sdk  setuid
			somo.setCookie(this.route_data.cookie)//向sdk  setcookie
			somo.setMid(this.route_data.mid)//向sdk  setmid
			console.log(somo.defaultParameter)
			this.join(this.route_data.mid)//加入会议
			// 判断摄像头的开关
			if(this.route_data.camera){
				this.camera = 1
			}else{
				this.camera = 0
			}
			// 判断麦克风的开关
			if(this.route_data.microphone){
				this.microphone = 1
			}else{
				this.microphone = 0
			}
			// 判断刷新退出
			// if (!somo.defaultParameter.mid) {
			// 	this.leaveMeeting();
			// }
			this.$refs.saber.appendChild(somo.streamerDom);
			
		},
		methods:{
			// 加入会议
			join:function(mid){
				somo.joinMid({
					mid: mid
				}).then(res => {
					console.log(res);
					this.url_head = res.vmt.video_url
					this.srcJoint = this.route_data.mid + "U" + this.route_data.uid;
					this.microphoneORcamera(this.microphone, 1);
					this.microphoneORcamera(this.camera, 2);
				});
			},
			// 视频推流
			push:function() {
				console.log(this.url_head,this.srcJoint)
				somo.publish("rtmp://rtmp2.video.somo.tech/video", '2000U1000');
				// somo.publish('rtmp://rtmp1.video.somo.tech/video', this.srcJoint);
			},
			//初始进入麦克风摄像头的设置
			microphoneORcamera:function(status, type) {
				// status:1开启，0关闭；type：1麦克风设置，2摄像头设置
				console.log(status, type);
				if (type == 1) {
					somo.tellYou({
						mid: this.route_data.mid,
						mic: status,
						volume: "80%"
					});
					
				} else if (type == 2) {
					somo.showYou({
						mid: this.mid,
						camera: status
					});
				}
				if (status == 1 && type == 1) {
					//麦克风开启
					console.log(somo.agr.createClient)
					somo.agr.createClient(1);
					// somo.createClient();
					// somo.clientInit();
					// somo.join();
				}
				if (status == 1 && type == 2) {
					//摄像头开启
					setTimeout(this.push, 1000);
				}
			},
			//离开退出会议
			leaveMeeting:function() {
				somo.leaveMid({
					mid: this.mid
				}).then(res => {
					console.log(res);
				});
			}
		}
	}
</script>

<style>
</style>

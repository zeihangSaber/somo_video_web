<template>
	<div class="playerBox">
		<video :id="`player${uid}`" class="video-js vjs-default-skin" autoplay>
			<source src="rtmp://rtmp1.video.somo.tech/video/10311312U10001240" type="rtmp/mp4" />
		</video>
		<button @click="changeSrc">click</button>
	</div>
</template>

<script lang="ts">
export default {
	props: {
		uid: String,
		// index: Number,
		src: String
	},
	data() {
		return {
			player: null
		};
	},
	methods: {
		changeSrc() {
			// this.src = 'sss'
		}
	},
	watch: {
		src(src) {
			this.player.src(src)
		}
	},
	created() {
		this.$nextTick(() => {
			this.player = window["videojs"](`player${this.uid}`, {
				techOrder: ["flash"]
			});
		});
	}
};
</script>

<style lang="less" scoped>
.playerBox {
	width: 33%;
	height: 33%;
	background-color: bisque;
}
.video-js {
	width: 100%;
	height: 100%;
}
</style>

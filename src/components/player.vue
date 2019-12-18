<template>
	<div class="playerBox">
		<div class="ctrlMiddle">
			{{data.name}}
			<i class="font_family icon-mic" v-if="data.mic === 0"></i>
			<svg v-else class="icon" aria-hidden="true">
				<use xlink:href="#icon-mic-no"></use>
			</svg>
			<div v-if="data.role === 4" class="tag">主持人</div>
		</div>
		<video ref="saber" class="video-js vjs-default-skin" autoplay>
			<source :src="data.url" type="rtmp/mp4" />
		</video>
	</div>
</template>

<script lang="ts">
export default {
	props: ["data"],
	data() {
		return {
			player: null
		};
	},
	watch: {
		data(data) {
			this.player.paused();
			this.player = null;
			this.$nextTick(() => {
				this.player = window["videojs"](this.$refs.saber, {
					techOrder: ["flash"]
				});
				this.player.src(data.url)
			})
		}
	},
	created() {
		this.$nextTick(() => {
			this.player = window["videojs"](this.$refs.saber, {
				techOrder: ["flash"],
				aspectRatio: "16:9"
			});
			this.player.src(this.data.url)
		});
	},
	beforeDestroy() {
		this.player.paused();
		this.player = null
	}
};
</script>

<style lang="less" scoped>
@import "../common/common";
.playerBox {
	width: 33%;
	height: 33%;
	background-color: bisque;
	position: relative;
	.ctrlMiddle {
		padding: 0 10px;
		height: 40px;
		line-height: 40px;
		color: #fff;
		font-size: 16px;
		position: absolute;
		left: 0;
		top: 50px;
		background-color: rgba(0, 0, 0, 0.6);
		border-radius: 0 20px 20px 0;
		z-index: 9999;
		.flex(center, center);
		svg {
			margin-left: 5px;
		}
		.icon-mic {
			color: #fff;
			font-size: 24px;
		}
		.tag {
			.fontStyle(10px, #fff);
			width: 50px;
			height: 20px;
			line-height: 23px;
			text-align: center;
			background-color: #118BFB;
			border-radius: 4px;
			margin-left: 5px;
		}
	}
}
.video-js {
	width: 100%;
	height: 100%;
}
</style>

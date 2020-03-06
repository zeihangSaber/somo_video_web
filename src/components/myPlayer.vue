<template>
    <div :style="data.os === 2 && isShare ? `width: ${ratioIos * 100}%; height: 100%;` : `width: ${isShare ? 100 : ratio * 100}%; height: ${isShare ? 100 : ratio * 100}%;`" class="vjs-playing" ref="player">
        <object>
            <embed
                src="./PlayerOne.swf"
                width="480"
                :height="isShare ? 270 : 360"
                quality="high"
                bgcolor="#444444"
                type="application/x-shockwave-flash"
                allowScriptAccess="always"
                ref="embed"
            />
        </object>
    </div>
</template>

<script>
    import rtmpStreamer from 'rtmp-zeihang';
    import {registerPlayer} from "zeihang_saber";
    import once from "../utils/once";
    import fiveSec from "../utils/fiveSec";
    import antiquity from "../utils/Antiquity";
    export default {
        props: {
            data: {
                default() {
                    return {
                        mic: 0,
                        name: "wait",
                        role: -1,
                        camera: 1,
                        url: "rtmp://58.200.131.2:1935/livetv/hunantv",
                        dt: 0
                    }
                },
            },
            isShare: false,
            ratio: Number,
            ratioIos: Number,
        },
        data() {
            let playing = once(() => {
                console.log("拿到数据 开始播放");
                this.$emit("handleIsPlay", true);
            });
            let errorReset = fiveSec(() => {
                // this.resetNew();
                this.$emit("handleReset");
            });
            return {
                player: null,
                ref: `embed_${new Date().getTime()}`,
                timers: [null, null],
                bufferTime: 1,
                playing: playing,
                errorReset: errorReset,
                uid: 0
            }
        },
        async mounted() {
            if (this.data.dt === 4) {
                this.bufferTime = 3;
            }
            if (this.isShare) {
                this.bufferTime = 3;
                if (this.data.dt === 4) {
                    this.bufferTime = 3;
                }
            }
            await this.$nextTick();
            await this.$nextTick();
            await this.$nextTick();
            this.timers[0] = setTimeout(() => {
                this.resetNew();
            }, 300);
        },
        computed: {
            src() {
                const url = this.isShare ? this.data.shareUrl : this.data.url;
                console.log(url);
                return url;
            }
        },
        watch: {
            src() {
                // this.resetNew();
                this.$emit("handleReset");
                alert(333)
            }
        },
        methods: {
            async resetNew() {
                await this.$nextTick();
                await this.$nextTick();
                await this.$nextTick();
                console.log("创建播发器~~~~~~~~~~~~~~~~~~~~~~~~~~~");
                this.$emit("handleIsPlay", false);
                this.playing = once(() => {
                    console.log("拿到数据 开始播放");
                    this.$emit("handleIsPlay", true);
                    this.player = null;
                });
                this.player = new rtmpStreamer(this.$refs.embed);
                this.player.register(`${this.data.mid}U${this.data.uid}`, registerPlayer, this.handleEvent);
                await this.$nextTick();
                await this.$nextTick();
                await this.$nextTick();
                try {
                    this.fitPlayer();
                } catch (e) {
                    setTimeout(() => {
                        this.fitPlayer();
                    }, 300);
                }
            },
            handleEvent(msg) {
                switch (msg) {
                    case "NetStream.Video.DimensionChange":
                        this.playing();
                        break;
                    case "NetStream.Buffer.Full":
                        this.$emit("handleIsPlay", true);
                        this.errorReset(false);
                        break;
                    case "NetStream.Buffer.Empty":
                        this.errorReset(true);
                        break;
                    case "NetStream.Play.Start":
                        this.errorReset(true);
                        break;
                }
            },
            fitPlayer() {
                clearTimeout(this.timers[1]);
                this.timers[1] = setTimeout(async () => {
                    await this.$nextTick();
                    await this.$nextTick();
                    await this.$nextTick();
                    if (this.isShare) {
                        this.player.setScreenSize(480 * 1.39 , 270 * 1.39);
                    } else {
                        this.player.setScreenSize(480 * 1.05, 360 * 1.05);
                    }
                    if (this.isShare) {
                        this.player.setScreenPosition(-84, 0);
                    } else {
                        this.player.setScreenPosition(0, 0);
                    }
                    if (this.data.os === 2 && this.isShare) {
                        this.player.setScreenSize(270 * 1.85 , 480 * 1.85);
                        this.player.setScreenPosition(0, -258);
                    }
                    this.player.setBufferTime(this.bufferTime);
                    this.$refs.embed.setAttribute("width", "100%");
                    this.$refs.embed.setAttribute("height", "100%");
                    await this.$nextTick();
                    await this.$nextTick();
                    await this.$nextTick();
                    console.log("创建链接~~~~~~~~~~~~~~~~~~~", this.src);
                    if (this.isShare) {
                        let src = this.src.split("/ppt/");
                        this.player.play(`${src[0]}/ppt/`, src[1]);
                    } else {
                        let src = this.src.split("/video/");
                        this.player.play(`${src[0]}/video/`, src[1]);
                    }
                    if (this.src.includes("null")) window.location.reload();
                }, 300)
            }
        },
        destroyed() {
            this.timers.forEach((timer) => {
                clearTimeout(timer);
            });
        }
    }
</script>

<style lang="less" scoped>
    embed {
        transform: translateZ(0) !important;
    }
</style>

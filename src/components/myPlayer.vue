<template>
    <div class="vjs-playing" ref="player">
        <object>
            <embed
                src="./Player.swf"
                width="480"
                height="360"
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
            isShare: false
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
                timers: [],
                bufferTime: 1,
                playing: playing,
                errorReset: errorReset
            }
        },
        computed: {
            src() {
                // if (this.isShare) {
                //     let src = this.src.split("/ppt/");
                //     this.player.play(`${src[0]}/ppt/`, src[1])
                // } else {
                //     let src = this.src.split("/video/");
                //     this.player.play(`${src[0]}/video/`, src[1])
                // }
                return this.isShare ? this.data.shareUrl : this.data.url
            }
        },
        watch: {
            src() {
                console.log(`流地址发生变化了`, this.src);
                // this.resetNew();
                this.$emit("handleReset");
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
            // this.timers[0] = setTimeout(() => {
            //     console.log("创建播发器");
            //     this.resetNew();
            // }, 500);
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
                this.timers[1] = setTimeout(async () => {
                    await this.$nextTick();
                    await this.$nextTick();
                    await this.$nextTick();
                    this.player.setScreenSize(480 * 1.05, 360 * 1.05);
                    this.player.setScreenPosition(0, 0);
                    this.player.setBufferTime(this.bufferTime);
                    this.$refs.embed.setAttribute("width", "100%");
                    this.$refs.embed.setAttribute("height", "100%");
                    await this.$nextTick();
                    await this.$nextTick();
                    await this.$nextTick();
                    console.log("创建链接~~~~~~~~~~~~~~~~~~~", this.src);
                    if (this.isShare) {
                        let src = this.src.split("/ppt/");
                        this.player.play(`${src[0]}/ppt/`, src[1])
                    } else {
                        let src = this.src.split("/video/");
                        this.player.play(`${src[0]}/video/`, src[1])
                    }
                    // this.player.play(`rtmp://58.200.131.2:1935/livetv/`, 'hunantv');
                    // this.$emit("handleIsPlay", true);
                }, 300)
            },
            reset() {
                console.log("重置播发器");
                this.$emit("handleIsPlay", false);
                this.playing = once(() => {
                    console.log("拿到数据 开始播放");
                    this.$emit("handleIsPlay", true);
                });
                let object, embed;
                this.player = null;
                this.$refs.player.innerHTML = "";
                this.timers[4] = setTimeout(() => {
                    object = document.createElement("object");
                    embed = document.createElement("embed");
                    embed.setAttribute("src", "./Player.swf");
                    embed.setAttribute("width", 480);
                    embed.setAttribute("height", 360);
                    embed.setAttribute("type", "application/x-shockwave-flash");
                    embed.setAttribute("quality", "high");
                    embed.setAttribute("bgcolor", "#444444");
                    embed.setAttribute("allowScriptAccess", "always");
                    object.appendChild(embed);
                    this.$refs.player.append(object);
                    const fn = () => {
                        console.log("有走吗~~~~~~~~~~~~~~~~~~~~~", this.src);
                        this.player = new rtmpStreamer(embed);
                        this.player.register(`${this.data.mid}U${this.data.uid}`, registerPlayer, this.handleEvent);
                        this.timers[1] = setTimeout(() => {
                            try {
                                this.player.setScreenSize(480 * 1.05, 360 * 1.05);
                                this.player.setScreenPosition(0, 0);
                                this.player.setBufferTime(this.bufferTime);
                                embed.setAttribute("width", "100%");
                                embed.setAttribute("height", "100%");
                                this.timers[2] = setTimeout(() => {
                                    if (this.isShare) {
                                        let src = this.src.split("/ppt/");
                                        this.player.play(`${src[0]}/ppt/`, src[1])
                                    } else {
                                        let src = this.src.split("/video/");
                                        this.player.play(`${src[0]}/video/`, src[1])
                                    }
                                }, 50);
                            } catch (e) {
                                this.timers[6] = setTimeout(() => {
                                    console.log("一二三四 再来一次");
                                    fn();
                                }, 300);
                            }
                        }, 50);
                    };
                    this.timers[5] = setTimeout(fn, 300);
                }, 50);
            },
            handleEvent(msg) {
                console.log('handleEvent~~~~~~~~~~~~~~~~~', msg);
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

<template>
    <div class="vjs-playing" ref="player"></div>
</template>

<script>
    import rtmpStreamer from 'rtmp-zeihang';
    const timers = [null, null, null, null];
    let bufferTime = 1;
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
            return {
                player: null,
                ref: `embed_${new Date().getTime()}`,
                timers: []
            }
        },
        computed: {
            src() {
                console.log(`~~~~~~~~~~~~~~~, 流地址发生变化`);
                return this.isShare ? this.data.shareUrl : this.data.url
            }
        },
        watch: {
            src() {
                this.reset();
            }
        },
        mounted() {
            if (this.data.dt === 4) {
                bufferTime = 2;
            }
            timers[0] = setTimeout(() => {
                this.reset();
            }, 100)
        },
        methods: {
            reset() {
                this.$emit("handleIsPlay", false);
                let object, embed;
                this.player = null;
                this.$refs.player.innerHTML = "";
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
                this.player = new rtmpStreamer(embed);
                this.$refs.player.append(object);
                timers[1] = setTimeout(() => {
                    try {
                        this.player.setScreenSize(480 * 1.05, 360 * 1.05);
                        this.player.setScreenPosition(0, 0);
                        this.player.setBufferTime(bufferTime);
                        embed.setAttribute("width", "100%");
                        embed.setAttribute("height", "100%");
                        timers[2] = setTimeout(() => {
                            if (this.isShare) {
                                let src = this.src.split("/ppt/");
                                this.player.play(`${src[0]}/ppt/`, src[1])
                            } else {
                                let src = this.src.split("/video/");
                                this.player.play(`${src[0]}/video/`, src[1])
                            }
                            timers[3] = setTimeout(() => {
                                this.$emit("handleIsPlay", true);
                            }, bufferTime * 1000 + 300)
                        }, 100);
                    } catch (e) {
                        this.reset()
                    }
                }, 100);
            }
        },
        destroyed() {
            timers.forEach((timer) => {
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

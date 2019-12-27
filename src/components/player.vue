<template>
    <div
        class="playerBox"
        ref="playerBox"
        v-if="data.uid !== meetingInfo.mine.uid"
        :id="data.uid === meetingInfo.mine.uid ? 'mine' : ''"
    >
        <player-status :data="data"></player-status>
        <div class="grail">
            <div :id="`player_${data.uid}_tc`" class="vjs-tech"></div>
            <div :id="`player_${data.uid}_ali`" ref="ali" class="vjs-tech"></div>
        </div>
        <div :class="`${data.camera === 0 ? 'hasCamera' : 'noCamera'}`">
            <i class="font_family icon-camera-none"></i>
        </div>
		<!-- <player-status v-if="mineFlag !== 'two'" :data="{name:data.name}"></player-status> -->
        <div class="holder"></div>
    </div>
</template>

<script>
    import playerStatus from "./playerStatus";
    export default {
        props: {
            data: {
                default() {
                    return {
                        mic: 0,
                        name: "wait",
                        role: -1,
                        url: "rtmp://58.200.131.2:1935/livetv/hunantv"
                    }
                },
            },
            meetingInfo: {},
            howMany: "zero",
            isShare: false,
            mineFlag: false
        },
        data() {
            return {
                player: null,
                count: 0
            };
        },
        components: {
            playerStatus
        },
        watch: {
            src() {
                this.reset()
            }
        },
        computed: {
            src() {
                console.log(`~~~~~~~~~~~~~~~, 流地址发生变化`);
                return this.isShare ? this.data.shareUrl : this.data.url
            }
        },
        mounted() {
            this.$nextTick(() => {
                // this.tcPlayer();
                this.Aliplayer();
            });
        },
        methods: {
            reset() {
                if (this.data.uid === this.meetingInfo.mine.uid) return;
                this.player && this.player.dispose();
                if (!this.$refs.playerBox) return;
                clearTimeout(this.timer);
                this.timer = setTimeout(() => {
                    this.Aliplayer();
                }, 300);
            },
            createVideo() {
                if (this.data.uid === this.meetingInfo.mine.uid) return;
                let dom = document.createElement("video");
                dom.className = "video-js vjs-default-skin";
                this.$refs.playerBox.append(dom);
                this.$nextTick(() => {
                    this.player = window["videojs"](dom, {
                        techOrder: ["flash"],
                        aspectRatio: "16:9",
                        preload: "none",
                        autoplay: true,
                        flash: {
                            swf: "https://cdn.bootcss.com/videojs-swf/5.4.2/video-js.swf"
                        },
                        notSupportedMessage: '重置中，请稍后',
                        poster: 'https://182.61.17.228/common/poster.png',
                        techCanOverridePoster: 'https://182.61.17.228/common/poster.png'
                    }, () => {
                        this.player.pause();
                        this.src && this.player.src(this.src);
                        this.src && this.player.replay();
                    });
                });
            },
            Aliplayer() {
                this.$nextTick(() => {
                    if (this.$refs.ali) {
                        console.log(this.$refs.ali);
                        this.player = new Aliplayer({
                            "id": `player_${this.data.uid}_ali`,
                            "source": this.src,
                            // "width": `800px`,
                            // "height": `450px`,
                            "width": `${100 *16 / 12}%`,
                            "height": `${100 *16 / 12}%`,
                            // "rtmpBufferLength": 0,
                            "autoplay": true,
                            "isLive": true,
                            "useFlashPrism": true,
                            "definition": "FD",
                            "autoPlayDelay": 0,
                            "controlBarVisibility": "click",
                            "liveRetry": 10
                        });
                        this.player.on("liveStreamStop", () => {
                            if (this.count === 2) {
                                this.count = 0;
                                this.reset();
                                console.log('error~~~~~~~~~~~~~~~~~~~, 重置播放器')
                            } else {
                                console.log("error~~~~~~~~~~~~~~~~~~~, 没有取到播放源");
                                ++this.count;
                                this.player.pause();
                                this.player.play();
                            }
                        })
                    } else {
                        clearTimeout(this.timer);
                        this.timer = setTimeout(() => {
                            this.Aliplayer();
                        }, 300)
                    }
                });
            },
            tcPlayer() {
                this.player = new TcPlayer(`player_${this.data.uid}_tc`, {
                    "rtmp": this.src, //请替换成实际可用的播放地址
                    "autoplay" : true,
                    "live": true,
                    "poster" : "http://www.test.com/myimage.jpg",
                    "width" :  `800`,
                    "height" : `450`
                });
            }
        },
        beforeDestroy() {
            clearTimeout(this.timer);
            this.data.uid !== this.meetingInfo.mine.uid && this.player && this.player.dispose();
        }
    };
</script>

<style lang="less" scoped>
    @import "../common/common";
    .playerBox {
        position: relative;
        .ctrlMiddle {
            padding: 0 16px 0 12px;
            height: 32px;
            line-height: 32px;
            color: #fff;
            font-size: 18px;
            position: absolute;
            left: 0;
            top: 0px;
            background-color: rgba(0, 0, 0, 0.6);
            border-radius: 0 20px 20px 0;
            z-index: 500;
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
                width: 48px;
                height: 20px;
                line-height: 23px;
                text-align: center;
                background-color: #118BFB;
                border-radius: 4px;
                margin-left: 5px;
            }
        }
        .holder {
            padding-bottom: 56.25%;
            width: 0;
        }
    }
    .vjs-tech {
        background-color: #444;
    }
    .hasCamera {
        display: none;
    }
    .noCamera {
        position: absolute;
        top: 0;
        left: 0;
        z-index: 2;
        background-color: #444;
        width: 100%;
        height: 100%;
        .flex(center, center);
        .icon-camera-none {
            font-size: 80px;
            color: #666;
        }
    }
    .grail {
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        background-color: #444;
        .flex(center, center);
        overflow: hidden;
    }
</style>

<template>
    <div
        class="playerBox"
        v-if="data.uid !== meetingInfo.mine.uid"
        :id="data.uid === meetingInfo.mine.uid ? 'mine' : ''"
    >
        <player-status :data="data" :isShare="isShare"></player-status>
        <div class="grail" ref="grail">
            <div :id="`player_${data.uid}_tc`" class="vjs-tech"></div>
            <div :id="`player_${data.uid}_ali`" ref="ali" class="vjs-tech"></div>
            <video :id="`player_${data.uid}_ks`" ref="ks"></video>
        </div>
        <div :class="`${(data.camera === 0 && isPlay) ? 'hasCamera' : 'noCamera'} ${(isShare || !isPlay) && data.camera !== 1 ? 'deepBg' : ''}`">
            <img v-if="(isShare || !isPlay) && data.camera !== 1" src="https://182.61.17.228/common/logoGif.gif">
            <i v-if="data.camera === 1" class="font_family icon-camera-none" :class="`${(data.camera === 0 && isPlay) || isShare ? 'hasCamera' : '_noCamera'}`"></i>
        </div>
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
                        camera: 1,
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
                isPlay: false,
                count: 0,
                timer: null
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
                // this.Aliplayer();
                // this.createVideo();
                this.ksPlayer();
                console.log('================', this.src)
            });
        },
        methods: {
            reset() {
                if (this.data.uid === this.meetingInfo.mine.uid) return;
                this.player && this.player.reset();
                this.isPlay = false;
                this.ksInit();
            },
            createVideo() {
                if (this.data.uid === this.meetingInfo.mine.uid) return;
                let dom = document.createElement("video");
                dom.className = "video-js vjs-default-skin";
                this.$refs.grail.append(dom);
                this.$nextTick(() => {
                    this.player = window["videojs"](dom, {
                        techOrder: ["flash"],
                        aspectRatio: "16:9",
                        preload: "none",
                        width: 480,
                        height: 360,
                        showBuffer: false,
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
                            controls: false,
                            // "width": `${100 *16 / 12}%`,
                            // "height": `${100 *16 / 12}%`,
                            "width": `480px`,
                            "height": `360px`,
                            "autoplay": true,
                            "isLive": true,
                            "useFlashPrism": true,
                            "definition": "FD",
                            "autoPlayDelay": 0,
                            "controlBarVisibility": "click",
                            "showBuffer": false,
                            "liveRetry": 10
                        });
                        this.player.on("liveStreamStop", () => {
                            if (this.count === 1) {
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
                    "rtmp_sd": this.src, //请替换成实际可用的播放地址
                    "autoplay" : true,
                    "live": true,
                    "poster" : "http://www.test.com/myimage.jpg",
                    "width" :  `480`,
                    "height" : `360`
                });
            },
            ksPlayer() {
                setTimeout(() => {

                    this.player = window['ksplayer'](`player_${this.data.uid}_ks`, {
                        controls: false,
                        autoplay: true,
                        preload: "auto",
                        MediaLoader: false,
                        ErrorDisplay: false,
                        poster: 'https://182.61.17.228/common/poster.png'
                    }, () => {
                        console.log('播放器准备完毕~~~~~~~~~~~~~~~~~~');
                        this.ksInit();
                    });

                }, 300);
            },
            ksInit() {

                // this.player.src({type: 'rtmp/flv', src: this.src});
                // this.player.src("https://media.w3.org/2010/05/sintel/trailer.mp4");
                // this.player.src("https://cn-zjwz-dx-v-09.bilivideo.com/upgcxcode/97/10/141021097/141021097-1-30015.m4s?expires=1578556200&platform=pc&ssig=v6lhFBsGPf8SP9a_SqnVLQ&oi=463103465&trid=fd5ecde82b964961b6adb2c3f5bf2c1eu&nfc=1&nfb=maPYqpoel5MI3qOUX6YpRA==&mid=17946327");

                clearTimeout(this.timer);

                this.handleNet();

                this.timer = setTimeout(() => {
                    console.log('没有取到播放源~~~~~~~~~~~~~~~~~');
                    this.reset();
                }, 5000);

                this.player.on("loadeddata", () => {
                    clearTimeout(this.timer);
                    console.log('获取到第一帧~~~~~~~~~~~~~~~~');
                    // this.$nextTick(() => {
                    //     this.player.bufferTimeMax(3);
                    // });
                    this.isPlay = true;
                    this.player.play();
                });

                this.player.on("error", () => {
                    console.log('播放器报错，重置~~~~~~~~~~~~~~~~');
                    this.isPlay = false;
                    this.reset()
                });

                // this.player.on("waiting", (...res) => {
                //     console.log("waiting~~~~~~~~~~~~~~~~~~~~~~~", res);
                // });
                //
                // this.player.on("seeking", (...res) => {
                //     console.log("seeking~~~~~~~~~~~~~~~~~~~~~~~", res);
                // });
                //
                // this.player.on("durationchange", (...res) => {
                //     console.log("durationchange~~~~~~~~~~~~~~~~~~~~~~~", res);
                // });
                //
                // this.player.on("timeupdate", (...res) => {
                //     // console.log("timeupdate~~~~~~~~~~~~~~~~~~~~~~~", res);
                // });

            },
            handleNet() {
                clearInterval(this.interval);
                this.interval = setInterval(() => {
                    const res = this.player.networkState();
                    const State = this.player.readyState();
                    console.log('player readyState networkState~~~~~~~~~~~~~~~', State, res);
                    console.log('player networkState~~~~~~~~~~~~~~~', State);
                    console.log('player buffered~~~~~~~~~~~~~~~', this.player.buffered().end(0));
                    console.log('player bufferedEnd~~~~~~~~~~~~~~~', this.player.bufferedEnd());
                    console.log('player bufferedPercent~~~~~~~~~~~~~~~', this.player.bufferedPercent());
                    if (res === 3) {
                        console.log('~~~~~~~~~~~~~~~~~~~~hei hei');
                        this.reset();
                    }
                }, 1000);
            }
        },
        beforeDestroy() {
            clearInterval(this.interval);
            clearTimeout(this.timer);
            this.player && this.player.dispose();
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
	._noCamera{
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
    .noCamera {
        &.deepBg {
            background-color: #343D4F;
        }
        position: absolute;
        top: 0;
        left: 0;
        z-index: 2;
        background-color: #343D4F;
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
    .vcp-video {
        object {
            transform: translateZ(0)!important;
        }
    }
    .vjs-playing {
        width: 100%;
        height: 100%;
    }
</style>

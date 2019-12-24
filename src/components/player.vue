<template>
    <div
            class="playerBox"
            ref="playerBox"
            v-if="data.uid !== meetingInfo.mine.uid"
            :id="data.uid === meetingInfo.mine.uid ? 'mine' : ''"
    >
        <player-status :data="data"></player-status>
        <div :class="`${data.camera === 0 ? 'hasCamera' : 'noCamera'}`">
            <i class="font_family icon-camera-none"></i>
        </div>
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
            isShare: false
        },
        data() {
            return {
                player: null
            };
        },
        components: {
            playerStatus
        },
        watch: {
            data() {
                if (this.data.uid === this.meetingInfo.mine.uid) return;
                this.player && this.player.dispose();
                if (!this.$refs.playerBox) return;
                this.createVideo();
            }
        },
        computed: {
            src() {
                return this.isShare ? this.data.shareUrl : this.data.url
            }
        },
        mounted() {
            this.$nextTick(() => {
                this.createVideo()
            });
        },
        methods: {
            paused() {
                console.log('本该停止的');
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
                        poster: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1577103508780&di=beca8334ab9b7281d07c64b77addd67d&imgtype=0&src=http%3A%2F%2Fe.hiphotos.baidu.com%2Fimage%2Fpic%2Fitem%2F4610b912c8fcc3cef70d70409845d688d53f20f7.jpg',
                        techCanOverridePoster: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1577103508780&di=beca8334ab9b7281d07c64b77addd67d&imgtype=0&src=http%3A%2F%2Fe.hiphotos.baidu.com%2Fimage%2Fpic%2Fitem%2F4610b912c8fcc3cef70d70409845d688d53f20f7.jpg'
                    }, () => {
                        this.player.pause();
                        this.src && this.player.src(this.src);
                        this.src && this.player.play();
                    });
                });
            }
        },
        beforeDestroy() {
            this.data.uid !== this.meetingInfo.mine.uid && this.player.dispose();
        }
    };
</script>

<style lang="less" scoped>
    @import "../common/common";
    .playerBox {
        width: 33.3%;
        height: 33.3%;
        background-color: bisque;
        position: relative;
        .ctrlMiddle {
            padding: 0 10px;
            height: 40px;
            line-height: 40px;
            color: #fff;
            font-size: 18px;
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
        width: 100% !important;
        height: 100% !important;
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
</style>

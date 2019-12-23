<template>
    <div
            class="playerBox"
            ref="playerBox"
            v-if="data.uid !== meetingInfo.mine.uid"
            :id="data.uid === meetingInfo.mine.uid ? 'mine' : ''"
    >
        <div class="ctrlMiddle">
            {{data.name ? data.name : "没有名字哦"}}
            <i class="font_family icon-mic" v-if="data.mic === 0"></i>
            <svg v-else class="icon" aria-hidden="true">
                <use xlink:href="#icon-mic-no"></use>
            </svg>
            <div v-if="data.role === 4" class="tag">主持人</div>
        </div>
        <video ref="saber" class="video-js vjs-default-skin saber">
            <source :src="data.url" type="rtmp/mp4" />
        </video>
        <div :class="`${data.camera === 0 ? 'hasCamera' : 'noCamera'}`">
            <i class="font_family icon-camera-none"></i>
        </div>
    </div>
</template>

<script lang="ts">
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
                }
            },
            meetingInfo: {},
            howMany: "zero"
        },
        data() {
            return {
                player: null
            };
        },
        watch: {
            data(data) {
                if (this.data.uid === this.meetingInfo.mine.uid) return;
                this.player && this.player.pause();
                this.$nextTick(() => {
                    this.player && this.player.pause();
                    this.player && this.player.reset();
                    this.data.url && this.player && this.player.src(data.url);
                    this.data.url && this.player && this.player.load();
                    this.data.url && this.player && this.player.play();
                });
            }
        },
        mounted() {
            this.$nextTick(() => {
                if (this.data.uid === this.meetingInfo.mine.uid) return;
                this.player = window["videojs"](this.$refs.saber, {
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
                    this.data.url && this.player.src(this.data.url);
                    this.data.url && this.player.play();
                });
            });
        },
        methods: {
            paused() {
                console.log('本该停止的');
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

<template>
    <div
        class="playerBox"
        v-if="data.uid !== myUid"
    >
        <player-status :data="data" :isShare="isShare"></player-status>
        <div class="grail" ref="grail">
            <my-player
                v-if="showFlag && playState.humanState && playState.netState"
                :data="this.data"
                :isShare="isShare"
                @handleReset="reset"
                @handleIsPlay="(arg) => this.isPlay = arg"
                :ratio="ratio"
                :ratioIos="ratioIos"
            ></my-player>
        </div>
        <div v-if="!isShare" :class="`${(data.camera === 0 && isPlay) ? 'hasCamera' : 'noCamera'}`">
            <img style="width: 100px; height: 100px;" v-if="(isShare || !isPlay) && data.camera !== 1" src="https://test.video.somo.tech/common/logoGif.gif">
            <i v-if="data.camera === 1" :class="`font_family icon-camera-none ${(data.camera === 0 && isPlay) || isShare ? 'hasCamera' : '_noCamera'}`"></i>
        </div>
        <div v-if="!playState.humanState" class="noCamera">
            <div class="reloadBtn" @click="playState.humanState = true">显示此视频</div>
        </div>
        <div v-if="!playState.netState" class="noCamera">
            <div class="reloadBtn" @click="playState.netState = true">重新加载此视频</div>
        </div>
        <div :class="isShare ? 'holderWidth' : 'holder'"></div>
        <div class="more" @click="showMore = true">
            ...
            <div class="menu" v-if="showMore" @mouseleave="showMore = false">
                <div @click="playState.humanState = false">不显示视频</div>
            </div>
        </div>
    </div>
</template>

<script>
    import playerStatus from "./playerStatus";
    import myPlayer from "./myPlayer";
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
                        isShare: false
                    }
                },
            },
            myUid: 0,
            howMany: "zero",
            isShare: false,
            mineFlag: false,
            ratio: Number,
            ratioIos: Number
        },
        data() {
            return {
                player: null,
                isPlay: false,
                count: 0,
                timer: null,
                showFlag: true,
                playState: {
                    humanState: true,
                    netState: true
                },
                showMore: false,
                noShow: false
            };
        },
        created() {
            console.log('uid', this.data.uid);
            this.playState = antiquity.getPlayerState(this.data.uid);
            console.log('playState', this.playState);
        },
        components: {
            playerStatus,
            myPlayer
        },
        watch: {
            src() {
                this.reset()
            },
            howMany() {
                // this.reset()
            },
            isShare() {
                console.log("isShare~~~~~~~~~~~~~~~~~~~~~~~~~~~");
                this.reset()
            }
        },
        computed: {
            src() {
                return this.isShare ? this.data.shareUrl : this.data.url
            }
        },
        mounted() {
            this.$nextTick(() => {
                antiquity.addMsg({
                    name: this.data.name,
                    text: '临时信息：' + this.src,
                    uid: this.data.uid,
                    time: antiquity.moment().format('hh:mm:ss')
                });
            });
        },
        methods: {
            async reset() {
                this.showFlag = false;
                await this.$nextTick();
                await this.$nextTick();
                await this.$nextTick();
                this.timer = setTimeout(() => {
                    this.showFlag = true;
                    console.log("打架");
                }, 300);
            },
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
        .holder {
            padding-bottom: 75%;
            width: 0;
        }
        .holderWidth {
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
		    font-size: 60px;
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
            font-size: 60px;
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
        width: 150%;
        height: 150%;
    }
    .more {
        position: absolute;
        right: 5px;
        top: 5px;
        width: 40px;
        height: 26px;
        background: #118BFB;
        border-radius: 4px;
        text-align: center;
        font-size: 20px;
        color: white;
        cursor: pointer;
        line-height: 16px;
        .menu {
            width: 120px;
            padding: 8px;
            background: #fff;
            color: #333;
            font-size: 14px;
            position: absolute;
            right: 0px;
            top: 31px;
            border-radius: 4px;
        }
    }
    .reloadBtn {
        cursor: pointer;
        background: #8F8F8F;
        padding: 5px 16px;
        border-radius: 4px;
        line-height: 30px;
        font-size: 14px;
    }
</style>

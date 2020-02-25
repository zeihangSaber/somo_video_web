<template>
    <div id="app" :class="`${changeScreen ? 'full':''}`">
        <div class="content" @mousemove="Enter($event)" ref="content">
            <!-- 30分钟 -->
            <div v-if="endMeeting" class="timeUseUP_box">
                <div class="timeUseUP">
                    <div>30分钟免费限时会议已结束</div>
                    <div class="timeUseUP_btn" @click="LeaveMeeting()">退出会议</div>
                </div>
            </div>
            <div class="breakLine" v-if="breakLine">
                您的网络已断开，请检查网络设置
            </div>
            <ctrl
                :data="meetingInfo"
                :sliderCount="sliderCount"
                :filtrationBtn="filtrationBtn"
                :showSide="isShowSide"
                :changeScreen="changeScreen"
                @handleSide="isShowSide = !isShowSide"
                @handleScreen="(flag) => changeScreen = flag"
                @handleCount="(num) => sliderCount = num"
                @handleFiltration="() => filtrationBtn = !filtrationBtn"
                @LeaveMeeting="LeaveMeeting"
            ></ctrl>
            <div :class="`playerBigBox ${howMany}`">
                <swiper
                    :sliderCount="sliderCount"
                    :showSide="isShowSide"
                    :changeScreen="changeScreen"
                    @handleSide="(flag) => isShowSide = flag"
                    @handleRatio="(num) => ratio = num"
                    @handleScreen="(flag) => changeScreen = flag"
                >
                    <player-status v-if="peopleNum !== 2" :data="meetingInfo.mine" :isShare="false"></player-status>
                    <div class="grail">
                        <div :style="`width: ${ratio * 100}%; height: ${ratio * 100}%;`" class="draggable" ref="draggable">
                            <div class="noCamera" v-if="meetingInfo.mine && meetingInfo.mine.camera === 1">
                                <i class="font_family icon-camera-none"></i>
                            </div>
                        </div>
                    </div>
                    <div class="holder"></div>
                </swiper>
            </div>
        </div>
        <SideBox
            :showSide="isShowSide"
            :meetingInfo="{locked: meetingInfo.locked, control: meetingInfo.control, muteAll: meetingInfo.muteAll, mid:meetingInfo.id, uid: meetingInfo.mine.uid, name: meetingInfo.mine.name}"
        ></SideBox>
        <div class="mask_app" v-if="!meetingShow">
            <div class="mask_content">
                <img src="https://test.video.somo.tech/common/somo_log.png">
                <div class="text">当前浏览器无法使用flash插件<br>建议使用Google Chrome 65.0及以上版本的浏览器</div>
            </div>
        </div>
    </div>
</template>

<script>
    import animate from 'animate.css';
    import Player from './components/player';
    import Ctrl from './components/controls';
    import SideBox from './components/side';
    import swiper from './components/swiper';
    import playerStatus from "./components/playerStatus";
    import antiquity, {myDevice, myCookie, myMid, Password, MeetingStatus, myCamera, myMic} from './utils/Antiquity';

    export default {
        name: 'app',
        components: {
            Player,
            Ctrl,
            SideBox,
            playerStatus,
            swiper
        },
        data() {
            return {
                // 会议信息
                meetingInfo: {
                    mine: {
                        speaker: 0,
                        camera: 0,
                        uid: 0,
                        name: ''
                    }
                },
                // 权限
                penetrate: false,
                // 过滤
                filtrationBtn: true,
                // 浏览器是否可用
                meetingShow: true,
                // 控制台
                isShowCtrl: true,
                // 显示控制台得时间
                showCtrlTime: 3000,
                // 全屏
                changeScreen: false,
                // 侧边
                isShowSide: true,
                // 信息
                isShowMessage: true,
                // 参会列表
                isShowParty: true,
                // 分享
                isShowShare: false,
                // 界面初始化
                waiting: true,
                // 是否断网
                breakLine: false,
                // 几分屏
                sliderCount: 4,
                // 宽高比
                ratio: 1.5,
                peopleNum: 0,
                timer: '',
                time: '',
                joinStatus: 1,
                screenStatus: 0,
                destroy_timer: '',
                endMeeting: 0,
                countDown: 0,
                NOtenTimer: 0,
            };
        },
        computed: {
            howMany() {
                if (this.sliderCount === 4) return 'four';
                if (this.sliderCount === 9) return 'nine';
                return 'fir'
            }
        },
        beforeCreate() {
            if (Boolean(antiquity.getBrowserInfo.match(/safari/gi)) && sessionStorage.getItem('safari') != 1) {
                sessionStorage.setItem('safari', 1);
                window.onload = () => {
                    history.go(0);
                };
            }
            // safari
            if (Boolean(antiquity.getBrowserInfo.match(/firefox/gi)) || Boolean(antiquity.getBrowserInfo.match(/msie/gi)) || Boolean(antiquity.getBrowserInfo.match(/opera/gi))) {
                this.meetingShow = false;
            }
        },
        created() {
            antiquity.on("permission", (msg) => {
                this.penetrate = true
            });
            antiquity.on('getMidInfo', meetingInfo => {
                this.meetingInfo = meetingInfo;
                if (!this.meetingInfo.mine) {
                    this.meetingInfo.mine = {
                        uid: 0,
                        name: '',
                        camera: 0
                    }
                }
            });
            antiquity.on('line', flag => {
                this.breakLine = !flag;
            });
            antiquity.on('getMembers', () => {
                const { peopleNum } = antiquity.getPeopleNum();
                this.peopleNum = peopleNum;
            });
            antiquity.on('countDown', msg => {
                if (msg == 2008) {//还剩10分钟会议结束
                    this.countDown = antiquity.getLostTime();
                    if (this.countDown >= 0) {
                        if (this.NOtenTimer == 0) {
                            this.tenFENTimer = setInterval(() => {
                                this.countDown--;
                                if (this.countDown <= 0) {
                                    this.countDown = 0
                                }
                            }, 1000)
                        }
                        this.NOtenTimer = 1;
                    }

                }
                // }
            });
            this.$nextTick(() => {
                antiquity.on('getToast', msg => {
                    if (msg == "会议结束了" || msg == "管理员关闭了该会议室" || msg == "余额不足，会议室已关闭") {//30分钟体验时间到了，关闭会议室
                        this.endMeeting = 1;
                        clearInterval(this.tenFENTimer);
                        setTimeout(() => {
                            this.LeaveMeeting()
                        }, 10000)
                    } else {
                        this.$Toast.success({message: msg});
                    }
                });
            })
        },
        async mounted() {
            this.$nextTick(() => {
                this.init();
            });
            this.showCtrlTime = setTimeout(() => {
                this.isShowCtrl = false
            }, 3000);
        },
        methods: {
            meeting_time(share) {
                clearTimeout(this.destroy_timer_);
                clearTimeout(this.destroy_timer);
                if (this.meetingInfo.start != 0) {
                    this.destroy_timer = setInterval(() => {
                        let timestamp = (new Date()).getTime();//当前时间戳
                        this.time = timestamp - this.meetingInfo.start;
                        this.timer = this.formatDuring(this.time);
                    }, 1000)
                } else if (this.meetingInfo.start == 0) {
                    this.destroy_timer_ = setInterval(() => {
                        this.myTime = this.myTime + 1000;
                        this.timer = this.formatDuring(this.myTime);
                    }, 1000)
                }
            },
            // 结束主讲
            setSpeaker(item) {
                const data = {
                    admin: this.meetingInfo.mine.uid,
                    uid: this.meetingInfo.mine.uid,
                    dt: this.meetingInfo.mine.dt,
                    device: this.meetingInfo.mine.device,
                    speaker: 0,
                    cookie: myCookie,
                };
                antiquity.ajax.speakerSet(data).then(res => {
                    console.log(res);
                });
            },
            handleSide() {
                if (this.changeScreen) {
                    // 非全屏
                    if (document.exitFullscreen) {
                        document.exitFullscreen();
                    } else if (document.msExitFullscreen) {
                        document.msExitFullscreen();
                    } else if (document.mozCancelFullScreen) {
                        document.mozCancelFullScreen();
                    } else if (document.webkitCancelFullScreen) {
                        document.webkitCancelFullScreen();
                    }
                    this.changeScreen = false;
                } else {
                    // 全屏
                    this.changeScreen = true;
                    const el = document.documentElement;
                    const rfs = el.requestFullscreen || el.webkitRequestFullscreen || el.mozRequestFullScreen || el.msRequestFullScreen;
                    if (typeof rfs !== "undefined" && rfs) {
                        rfs.call(el);
                        this.isShowParty = false;
                        this.isShowMessage = false
                    }
                }
            },
            handleMessage() {
                this.isShowMessage = !this.isShowMessage;
                if (!this.isShowSide) {
                    this.isShowSide = true;
                    this.isShowMessage = true;
                }
            },
            handleParty() {
                this.isShowParty = !this.isShowParty;
                if (!this.isShowSide) {
                    this.isShowSide = true;
                    this.isShowParty = true;
                }
            },
            prevSlide() {
                this.slideCount !== 1 && --this.slideCount;
            },
            nextSlide() {
                this.slideCount !== this.maxSlide && ++this.slideCount;
            },
            Enter(e) {
                clearTimeout(this.showCtrlTime);
                this.isShowCtrl = true;
                this.showCtrlTime = setTimeout(() => {
                    this.isShowCtrl = false
                }, 3000)
            },
            Leave(e) {
                clearTimeout(this.showCtrlTime);
                this.showCtrlTime = setTimeout(() => {
                    this.isShowCtrl = false
                }, 3000)
            },
            LeaveMeeting() {
                antiquity.leaveMeeting();
                this.$Toast.success({message: '正在离开会议....'});
                antiquity.toOfficial();
            },
            async init() {
                await this.$nextTick();
                this.shareData = {
                    mid: myMid,
                    password: Password,
                };
                const { vmt: { video_url } } = await antiquity
                    .joinMeeting({
                        code: myMid,
                        password: Password,
                        width: 480,
                        height: 360,
                        dom: this.$refs.draggable
                    })
                    .then(res => {
                        if (res.code == 1) {
                            this.joinStatus = 0
                            this.$Toast.success({message: '会议号不存在,请重新输入'});
                            return
                        }
                        this.waiting = false;
                        return res
                    });
                console.log(video_url, "video_url~~~~~~~~~~~~~~~~~~")

                const {hasCam, hasMic} = await antiquity.hasCm();
                antiquity.publish(video_url, myCamera && hasCam, myMic && hasMic);
            },
        },
        destroyed() {
            clearInterval(this.destroy_timer);
            clearInterval(this.destroy_timer_);
            clearInterval(this.tenFENTimer)
        },
    }
</script>

<style lang="less">
    @import "./common/base";
    @import "./common/common";
    .boxOut {
        position: absolute;
        width: 360px;
        height: 240px;
        z-index: -200;
    }
    .boxIn {
        position: absolute;
        overflow: hidden;
        width: 360px;
        height: 240px;
        z-index: 200;
        .flex(center, center);
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
        .holder {
            padding-bottom: 75%;
            width: 0;
        }
        &.twoPeople {
            border: 2px solid #666;
            border-radius: 4px;
        }

    }

    .penetrate {
        width: 100%;
        height: 100%;
        // background: rgba(0,0,0,0.5);
        position: absolute;
        z-index: 10;
    }

    .end_speaker > i {
        margin-right: 4px;
    }

    .end_speaker {
        cursor: pointer;
        width: 100px;
        height: 32px;
        background: rgba(255, 255, 255, 1);
        box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.5);
        border-radius: 4px;
        position: absolute;
        top: 20px;
        right: 20px;
        z-index: 100;
        font-size: 14px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: rgba(255, 96, 89, 1);
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .timeUseUP_btn {
        width: 160px;
        height: 32px;
        margin: 0 auto;
        background: linear-gradient(180deg, rgba(255, 114, 97, 1) 0%, rgba(255, 82, 69, 1) 100%);
        border-radius: 24px;
        margin-top: 24px;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 16px;
        font-weight: 400;
        color: rgba(255, 255, 255, 1);
    }

    .timeUseUP_box {
        width: 100%;
        height: 100vh;
        position: absolute;
        top: 0;
        left: 0;
        z-index: 10000;
        // background: red;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .timeUseUP {
        width: 284px;
        height: 168px;
        background: rgba(255, 255, 255, 1);
        border-radius: 8px;
        font-size: 18px;
        font-weight: 500;
        color: rgba(51, 51, 51, 1);
        padding: 40px 32px;
        box-sizing: border-box;
    }

    .my_plugFlow {
        width: 133.33%;
        height: 133.33%;
    }

    .set_myBox {
        position: absolute;
        top: 0px;
        left: 0px;
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        overflow: hidden;
    }

    .set_height {
        width: 0;
        padding-bottom: 56.25%;
    }

    .leftBig_box {
        width: 100%;
        height: calc(100vh - 36px);
        margin: 0 auto;
        margin-top: 36px;
        background: #000000;
        display: flex;
        justify-content: center;
        align-items: center;
        padding-top: 36px;
        box-sizing: border-box;
        position: relative;
    }

    .videoBox {
        width: 100%;
        height: 100%;
        background: #000000;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .playerBigBox_act {
        width: 100%;
        height: calc(100vh - 72px);
        background: #000000;
        padding-bottom: 56.25%;
        position: relative;
        overflow: hidden;
        background: yellow;
        .flex(flex-start, flex-start);
        align-content: flex-start;
        flex-wrap: wrap;
    }

    .playerBigBox {
        width: 100%;
        height: 100%;
        background: #2E2E2E;
        position: relative;

        &.fir {
            .playerBox {
                width: 0;
                height: 0;
                position: absolute;
            }

            .dragBox {
                width: 100%;
                height: 99.5%;
            }
        }

        &.one {
            .playerBox {
                width: 100%;
            }
        }

        &.two {
            .playerBox {
                width: 100%;
            }

            .dragBox {
                width: 410px;
                height: 232px;
                border: 2px solid #2E2E2E;
                position: absolute;
                z-index: 5;
                top: 0px;
                right: 0px;
            }
        }

        &.four {
            .playerBox {
                width: 49.8%;
                height: 49.8%;
                margin: 0.1%;
                position: relative;
            }

            .dragBox {
                width: 49.8%;
                // height: 49.8%;
            }
        }

        &.nine {
            .playerBox {
                width: 33.133%;
                height: 33.133%;
                margin: 0.1%;
            }
            .dragBox {
                width: 33.133%;
                // height: 33.133%;
            }
        }

        .playerBox {
            width: 50%;
            .flex(center, center);
            overflow: hidden;
            background-color: #444;
            position: relative;
            &.space {
                background-color: #ccc;
            }
        }

        .drag {
            background-color: #444;
            width: 100%;
            height: 100%;
            position: relative;

            .dragNoCamera {
                display: none;
            }

            .dragHasCamera {
                position: absolute;
                width: 100%;
                height: 100%;
                top: 0;
                left: 0;
                z-index: 5;
                background-color: #343D4F;
                .flex(center, center);

                .icon-camera-none {
                    font-size: 60px;
                    color: #666;
                }
            }
        }

        .waiting {
            position: absolute;
            width: 100%;
            height: 100%;
            top: 0;
            left: 0;
            z-index: 10;
            background-color: #444;
            .flex(center, center);

            .icon-camera-none {
                font-size: 80px;
                color: #666;
            }
        }
    }

    .icon {
        width: 1em;
        height: 1em;
        vertical-align: -0.15em;
        fill: currentColor;
        overflow: hidden;
    }

    object {
        transform: translateZ(0) !important;
    }

    button,
    .icon-close {
        cursor: pointer;
        color: #999999;
        &:disabled {
            cursor: not-allowed;
            color: #ccc !important;
            border-color: #ccc !important;

            i {
                color: #ccc !important;
            }
        }
    }

    #app {
        height: 100%;
        width: 100%;
        min-height: 600px;
        position: relative;
        .flex(flex-start, flex-start);
        overflow: hidden;
		padding: 12px;
		box-sizing: border-box;
		background: #EEEEEE;
        .content {
            min-width: 1080px;
            min-height: 720px;
            position: relative;
            height: 100%;
            flex: 1;
            background-color: #000000;
			overflow: hidden;
            padding: 36px 0 52px;
        };
        &.full {
            padding: 0;
            .content {
                padding: 0;
            }
        }
    }

    .mineOut {
        position: fixed;
        right: -100%;
        top: 0;
    }

    .caster {
        left: -500px;
    }

    .superFaster {
        transition-duration: 0.02s;
    }

    .video-js {
        width: 100% !important;
        height: 100% !important;
        transform: translateZ(0) !important;
    }

    .mask_app {
        z-index: 10000;
        background-color: #2E2E2E;
        position: fixed;
        height: 100%;
        width: 100%;
        left: 0;
        top: 0;
        // .flex(center, center);
        .mask_content {
            position: absolute;
            top: 20%;
            left: 50%;
            transform: translateX(-50%);
            flex-direction: column;
            .flex(center, center);

            img {
                width: 148px;
                height: 39px;
            }

            .text {
                margin-top: 172px;
                text-align: center;
                font-size: 18px;
                font-weight: 400;
                color: rgba(255, 255, 255, 1);
                line-height: 30px;
            }
        }
    }

    .breakLine {
        position: absolute;
        top: 38px;
        left: 50%;
        transform: translateX(-50%);
        width: 310px;
        height: 44px;
        background: rgba(255, 255, 255, 1);
        border-radius: 0px 0px 6px 6px;
        font-size: 18px;
        font-weight: 400;
        color: rgba(255, 96, 89, 1);
        line-height: 44px;
        text-align: center;
        z-index: 1000;
    }

    .noCamera{
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
    body {
        min-width: 1080px;
        min-height: 720px;
        overflow: auto;
    }
    .draggable {
        width: 200%;
        height: 200%;
    }
</style>

<template>
    <div :class="`ctrlBox ${changeScreen ? 'full' : ''}`">
        <template v-if="!changeScreen || fullShow">
            <!-- 顶部 -->
            <div class="ctrlHeader">
                <p class="showHelp" @click="showHelp = !showHelp">
                    <span>?</span>
                    帮助手册
                </p>
                <div class="center">
                    <span class="bigSpan">会议号：{{this.midInfo.code}}</span>
                    <span class="bigSpan" v-if="password != ''">密码：{{password}}</span>
                    <span class="bigSpan" v-if="this.midInfo.locked">
					<i class="font_family icon-lock"></i>
				</span>
                    <span v-show="this.midInfo.name">
					{{ this.midInfo.name }}
				</span>
                    <span>
					<i class="font_family icon-people-num"></i>
					{{ this.peopleNum }}
				</span>
                    <span v-if="this.midInfo.muteAll">全体静音</span>
                    <span>
					<i class="font_family icon-noMute"></i>
					{{ this.micNum }}
				</span>
                </div>
                <img @click="fullScreen" :src="`./${ changeScreen ? 'noFullScreen' : 'fullScreen'}.png`" />
            </div>
            <div class="ctrlRight" @click="$emit('handleSide')">
                <i :class="`font_family icon-${showSide ? 'right' : 'left'}`"></i>
            </div>
            <!-- 底部 -->
            <div class="ctrlFooter">
                <div>{{time ? time : '00:00:00'}}</div>
                <div>
                    <div class="center">
                        <button @click="handleMic">
                            <i :class="`font_family ${midInfo.mine && midInfo.mine.mic === 1 ? 'icon-mic-no' : 'icon-mic'}`"></i>
                            <!-- 静音 -->
                        </button>
                        <button @click="handleCamera">
                            <i :class="`font_family ${midInfo.mine && midInfo.mine.camera === 1 ? 'icon-camera-no' : 'icon-camera'}`"></i>
                            <!-- 视频 -->
                        </button>
                        <button
                            v-clipboard:copy="sysAppIds"
                            v-clipboard:success="() => this.$Toast.success({ message: '邀请链接已复制到剪贴板' })"
                            v-clipboard:error="() => this.$Toast.success({ message: '复制失败' })"
                        >
                            <i class="font_family icon-sharing"></i>
                            <!-- 邀请 -->
                        </button>
                        <button @click="() => showSetting = !showSetting">
                            <i :class="`font_family icon-setting ${showSetting ? 'active' : ''}`"></i>
                            <!-- 设置 -->
                        </button>
                        <button @click="$emit('LeaveMeeting')">
                            <i style="color:#FF5245" class="font_family icon-tuichu-normal "></i>
                            <!-- 离开 -->
                        </button>
                    </div>
                </div>
            </div>
            <transition enter-active-class="animated flipInY fast" leave-active-class="animated flipOutY fast">
                <div class="set_box" v-if="showSetting">
                    <div class="set_title">
                        <div>设置</div>
                        <i class="font_family icon-close " @click="() => showSetting = !showSetting"></i>
                    </div>
                    <div class="set_main">
                        <div class="set_main_box">
                            <div class="set_main_title">弹幕消息:</div>
                            <div class="set_fun">
                                <div @click="() => barrage = !barrage" class="barrage_">
                                    <svg class="icon" aria-hidden="true">
                                        <use :xlink:href="`${barrage ? '#iconfuxuan-xuanzhongx' : '#iconbianzubeifenx'}`"></use>
                                    </svg>
                                    <span style="margin-left: 4px;">开启</span>
                                </div>
                            </div>
                        </div>
                        <div class="set_main_box">
                            <div class="set_main_title">无视频过滤:</div>
                            <div class="set_fun">
                                <div @click="() => $emit('handleFiltration')" class="barrage_">
                                    <svg class="icon" aria-hidden="true">
                                        <use :xlink:href="`${filtrationBtn ? '#iconfuxuan-xuanzhongx' : '#iconbianzubeifenx'}`"></use>
                                    </svg>
                                    <span style="margin-left: 4px;">开启</span>
                                </div>
                            </div>
                        </div>
                        <div class="set_main_box">
                            <div class="set_main_title">视频清晰度:</div>
                            <div class="set_fun">
                                <div @click="setDef()">
                                    <svg class="icon" aria-hidden="true">
                                        <use :xlink:href="`${def ? '#iconfuxuan-xuanzhongx' : '#iconbianzubeifenx'}`"></use>
                                    </svg>
                                    <span>高清</span>
                                </div>
                            </div>
                        </div>
                        <div class="set_main_box">
                            <div class="set_main_title">视频布局:</div>
                            <div class="set_fun">
                                <div @click="() => $emit('handleCount', 4)">
                                    <svg class="icon" aria-hidden="true">
                                        <use :xlink:href="`${sliderCount === 4 ? '#icon-select' : '#icon-unselect'}`"></use>
                                    </svg>
                                    <span>四分屏</span>
                                </div>
                                <div @click="() => $emit('handleCount', 9)">
                                    <svg class="icon" aria-hidden="true">
                                        <use :xlink:href="`${sliderCount === 9 ? '#icon-select' : '#icon-unselect'}`"></use>
                                    </svg>
                                    <span>九分屏</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </transition>
        </template>
        <bullet-screen v-if="barrage"></bullet-screen>
        <help @handleHelp="showHelp = false" v-if="showHelp"></help>
        <div v-if="isFir" class="isFir">
            <img class="notebook" src="https://test.video.somo.tech/common/notebook.png">
            <img @click="isFir = false" class="guidance" src="https://test.video.somo.tech/common/guidance.png">
        </div>
    </div>
</template>

<script>
    import antiquity,{ Password } from "../utils/Antiquity";
    import bulletScreen from "./bulletScreen";
    import help from "./help";
    import {fullScreen, noFullScreen} from "../utils/fullScreen";
    import once from "../utils/once";
    let interval;
    export default {
        name: "app",
        props: [
            "sliderCount",
            "filtrationBtn",
            "showSide",
            "changeScreen",
        ],
        data() {
            const mouseMove = antiquity.debounce(() => {
                this.secThd();
            });
            const timeSet = once(() => {
                if (!this.midInfo.start3) {
                    this.midInfo.start3 = new Date().getTime();
                }
                this.timeReset();
            });
            return {
                midInfo: {},
                mouseMove: mouseMove,
                isFir: false,
                showHelp: false,
                fullShow: true,
                barrage: false,
                showSetting: false,
                def: false,
                time: "",
                password:'',
                myMic:'',
                myCamera:'',
                // 麦克风数量
                micNum: 0,
                // 会议人数
                peopleNum: 0,
                startThd: 0,
                // 定时器
                timeThd: null,
                timeSet: timeSet
            };
        },
        computed: {
            sysAppIds() {
                return `
                    您好：蓝猫微会视频会议正在进行中，特邀请您参加。
                    会议号：${this.midInfo.code}。
                    会议链接：https://182.61.17.228/sharePage?invite_code=${this.midInfo.code}&verification_code=${Password}
                    您可以直接输入会议号加入会议， 也可以点击会议链接直接入会。
                `;
            }
        },
        beforeCreate() {
            this.midInfo = antiquity.getMidInfo();
            antiquity.on('getMembers', () => {
                const { peopleNum, micNum } = antiquity.getPeopleNum();
                this.peopleNum = peopleNum;
                this.micNum = micNum;
                if (peopleNum >= 2) this.timeSet();
                this.timeReset();
            });
            antiquity.on('getMidInfo', () => {
                this.midInfo = antiquity.getMidInfo();
            })
        },
        created() {
            this.myMic = this.midInfo.hasMic;
            this.myCamera = this.midInfo.hasCam;
            antiquity.on("permission", (msg) => {
                if(msg == false) {//点击了拒绝按钮
                    antiquity.muteAudio();
                    antiquity.muteVideo()
                }
                this.myMic = msg;
                this.myCamera = msg
            });
        },
        async mounted() {
            this.password = Password;
            await this.$nextTick();
            await this.$nextTick();
            await this.$nextTick();
            window.addEventListener('mousemove', this.mouseMove, false);
            this.isFir = !window.localStorage.getItem('isFir');
        },
        watch:{
            midInfo() {
                this.myMic = this.midInfo.hasMic;
                this.myCamera = this.midInfo.hasCam;
                this.timeReset();
            },
        },
        methods: {
            setDef() {
                this.def = !this.def;
                antiquity.setDef(this.def ? 720 : 480);
            },
            // 复制成功
            onCopy() {
                this.$Toast.success({ message: "邀请链接已复制到剪贴板" });
            },
            // 复制失败
            onError() {
                this.$Toast.success({ message: "复制失败" });
            },
            handleMic() {
                this.midInfo.mine.mic === 0
                    ? antiquity.muteAudio()
                    : antiquity.unmuteAudio();
            },
            handleCamera() {
                if (!this.midInfo.hasCam) {
                    return this.$Toast.success({ message: "请安装摄像头" });
                }
                this.midInfo.mine.camera === 0
                    ? antiquity.muteVideo()
                    : antiquity.unmuteVideo(this.midInfo.video_url);
            },
            fullScreen() {
                if (!this.changeScreen) {
                    fullScreen();
                    this.secThd();
                    this.$emit("handleSide", false);
                    this.$emit("handleScreen", true);
                } else {
                    noFullScreen();
                    this.$emit("handleSide", true);
                    this.$emit("handleScreen", false);
                }
            },
            secThd() {
                this.fullShow = true;
                clearTimeout(this.timeThd);
                this.timeThd = setTimeout(() => {
                    this.fullShow = false
                }, 3000)
            },
            // 三人计时
            timeReset() {
                if (this.midInfo.start3) {
                    this.startThd = (new Date().getTime() - this.midInfo.start3);
                    const time = antiquity.moment(this.startThd).format("hh:mm:ss").split(":");
                    this.time = `${String(time[0] - 8).padStart(2, '0')}:${time[1]}:${time[2]}`;
                    clearInterval(interval);
                    interval = setInterval(() => {
                        this.startThd = this.startThd + 1000;
                        const time = antiquity.moment(this.startThd).format("hh:mm:ss").split(":");
                        this.time = `${String(time[0] - 8).padStart(2, '0')}:${time[1]}:${time[2]}`;
                    }, 1000);
                }
            }
        },
        destroyed() {
            clearInterval(interval);
            clearTimeout(this.timeThd);
        },
        components: {
            bulletScreen,
            help
        },
    };
</script>

<style lang="less" scoped>
    @import "../common/common";
    .tenMinute{
        width: 150px;
        height: 36px;
        padding: 8px 12px;
        box-sizing: border-box;
        background: rgba(0,0,0,0.6);
        position: absolute;
        top: -45px;
        left: 0px;
        font-size:14px;
        color:rgba(255,255,255,1);
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .barrage_{
        margin-left: 0;
    }
    .invite_hint_icon{
        font-size: 160px;
    }
    .invite_hint{
        width: 100px;
        height: 100px;
        position: absolute;
        top: -107px;
        right: 25.5%;
    }
    .set_icon{
        font-size: 16px !important;
        color: #DDDDDD;
    }
    .set_box{
        width: 230px;
        height: 222px;
        background:#FFFFFF;
        border-radius:8px;
        position: absolute;
        bottom: 70px;
        right: 1%;
        z-index: 110000;
        .set_main{
            padding: 0 48px 0 32px;
            font-size:14px;
            font-weight:400;
            color:rgba(153,153,153,1);
            .icon{
                font-size: 16px;
            }
            .set_main_box{
                // width: 60%;
                display: flex;
                justify-content: center;
                align-items: flex-start;
                // margin: 0 auto 16px;
                .set_main_title{
                    width: 80px;
                    font-size:14px;
                    font-weight:400;
                    color:rgba(102,102,102,1);
                    text-align: right;
                }
                .set_fun{
                    width: 50%;
                    & div{
                        margin-bottom: 12px;
                        margin-left: 8px;
                    }
                    & div>span{
                        margin-left: 4px;
                    }
                }
            }
        }
        .set_title{
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 16px 20px 24px 24px;
            // border-bottom: 1px solid #333333;
            font-size:18px;
            font-weight:600;
            color:rgba(51,51,51,1);
            & i{
                color: #C5C6C8;
            }
        }
    }
    .ctrlBox {
        width: 100%;
        .ctrlHeader {
            padding: 0 20px;
            height: 36px;
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            background-color: #FFFFFF;
            z-index: 9999;
            color: #444444;
            line-height: 36px;
            .flex(space-between, center);
            text-align: center;
            .bigSpan {
                font-weight: 400;
            }
            .center {
                flex: 1;
                span {
                    margin: 0 8px;
                    i{
                        color: #999999;
                    }
                }
            }
            .showHelp {
                font-size: 14px;
                color: #0F8BFB;
                cursor: pointer;
                span {
                    font-size: 10px;
                    height: 16px;
                    width: 16px;
                    line-height: 16px;
                    border-radius: 8px;
                    border: 1px solid #0F8BFB;
                    display: inline-block;
                }
            }
        }
        .disable_ {
            opacity: 0;
        }
        .invite:hover {
            color: #118bfb;
        }
        .ctrlPoint {
            position: absolute;
            z-index: 9999;
            bottom: 100px;
            left: 50%;
            height: 15px;
            background-color: rgba(0, 0, 0, 0.4);
            border-radius: 8px;
            padding: 0 3px;
            transform: translateX(-50%);
            color: #fff;
        }
        .ctrlRight {
            position: absolute;
            z-index: 9999;
            right: 0;
            top: 50%;
            width:12px;
            height:88px;
            margin-top: -44px;
            border-radius: 20px 0 0 20px;
            background:rgba(255,255,255,1);
            text-align: center;
            line-height: 88px;
            .icon-right, .icon-left {
                font-size: 14px;
            }
        }
        .ctrlFooter_{
            background: rgba(0,0,0,0) !important;
        }
        .ctrlFooter {
            padding: 0 20px;
            width: 100%;
            height: 52px;
            position: absolute;
            left: 0;
            bottom: 0;
            // background: pink;
            background-color: #2D2F33;
            z-index: 9999;
            color: #fff;
            line-height: 80px;
            .flex(space-between, center);
            .center {
                flex: 1;
                text-align: center;
                .flex(space-between, center);
                // padding-bottom: 5px;
                button {
                    background-color: transparent;
                    outline: none;
                    border: none;
                    color: #DDDDDD;
                    font-size: 16px;
                    font-weight: normal;
                    // margin: 0 20px;
                    i {
                        display: block;
                        font-size: 36px;
                    }
                    .cs{
                        color: #FFFFFF !important;
                    }
                    .icon-camera-no,
                    .icon-mic-no {
                        color: #ff6b6f;
                    }
                }
            }
            .zoomIn_yc {
                background-color: transparent;
                outline: none;
                border: 2px solid #fff;
                border-radius: 4px;
                color: #fff;
                font-size: 16px;
                width: 32px;
                height: 32px;
                overflow: hidden;
                position: absolute;
                bottom: 13px;
                right: 13px;
                i {
                    font-size: 38px;
                    position: relative;
                    left: -10px;
                    top: -8px;
                }
            }
            .zoomIn {
                background-color: transparent;
                outline: none;
                border: 2px solid #fff;
                border-radius: 4px;
                color: #fff;
                font-size: 16px;
                width: 32px;
                height: 32px;
                overflow: hidden;
                position: absolute;
                top: -45px;
                right: 13px;
                i {
                    font-size: 38px;
                    position: relative;
                    left: -10px;
                    top: -8px;
                }
            }
        }
        &.full {
            .ctrlHeader {
                background-color:rgba(45,47,51,.9);
                color: #fff;
                .showHelp {
                    color: #fff;
                }
            }
            .ctrlFooter {
                background-color:rgba(45,47,51,.9);
            }
        }
    }
    .active {
        color: #118bfb;
    }
    .font_family {
        font-size: 20px;
    }
    .font_family:hover {
        cursor: pointer;
        // color: #DDDDDD;
    }
    .isFir {
        position: fixed;
        width: 100%;
        height: 100%;
        z-index: 10000;
        top: 0;
        left: 0;
        background: rgba(0,0,0,.5);
        .notebook {
            position: absolute;
            top: 16px;
            left: 30px;
        }
        .guidance {
            position: absolute;
            top: 40px;
            left: 130px;
        }
    }
</style>

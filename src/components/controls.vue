<template>
    <div v-if="!changeScreen || fullShow" :class="`ctrlBox ${changeScreen ? 'full' : ''}`">
        <!-- 顶部 -->
        <div class="ctrlHeader">
            <span></span>
            <div class="center">
                <span class="bigSpan">会议号：{{this.data.code}}</span>
                <span class="bigSpan" v-if="password != ''">密码：{{password}}</span>
                <span class="bigSpan" v-if="this.data.locked">
					<i class="font_family icon-lock"></i>
				</span>
                <span v-show="this.data.name">
					{{ this.data.name }}
				</span>
                <span>
					<i class="font_family icon-people-num"></i>
					{{ this.peopleNum }}
				</span>
                <span v-if="this.data.muteAll">全体静音</span>
                <span>
					<i class="font_family icon-noMute"></i>
					{{ this.micNum }}
				</span>
            </div>
            <img @click="fullScreen" :src="`./${ changeScreen ? 'noFullScreen' : 'fullScreen'}.png`" />
        </div>
        <!--分页器-->
        <div class="ctrlPoint" v-if="maxSlide > 1">
            <p>{{slideCount + '/' + maxSlide}}</p>
        </div>
        <div class="ctrlRight" @click="$emit('handleSide')">
            <i :class="`font_family icon-${showSide ? 'right' : 'left'}`"></i>
        </div>
        <!-- 底部 -->
        <div class="ctrlFooter">
            <div v-if="countDownshow" class="tenMinute">会议剩余时长:{{tentime}}</div>
            <div>{{time}}</div>
            <div>
                <div class="center">
                    <button @click="handleMic">
                        <i :class="`font_family ${data.mine && data.mine.mic === 1 ? 'icon-mic-no' : 'icon-mic'}`"></i>
                        <!-- 静音 -->
                    </button>
                    <button @click="handleCamera">
                        <i :class="`font_family ${data.mine && data.mine.camera === 1 ? 'icon-camera-no' : 'icon-camera'}`"></i>
                        <!-- 视频 -->
                    </button>
                    <button v-clipboard:copy="sysAppIds"
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
                        <div class="set_gongneng">
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
                        <div class="set_gongneng">
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
                        <div class="set_gongneng">
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
                        <div class="set_gongneng">
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
        <bullet-screen v-if="barrage"></bullet-screen>
    </div>
</template>

<script>
    import antiquity,{ Password } from "../utils/Antiquity";
    import bulletScreen from "./bulletScreen";
    import {fullScreen, noFullScreen} from "../utils/fullScreen";
    let interval;
    export default {
        name: "app",
        props: [
            "sliderCount",
            "filtrationBtn",
            "countDown",
            "howMany",
            "isShowCtrl",
            "inviteHint",
            "data",
            "showSide",
            "changeScreen",
            "showMessage",
            "showParty",
            "playerNum",
            "ShowShare",
            "maxSlide",
            "slideCount",
            "shareData",
            "timer",
            "speaker",
            "msgBox",
            "message"
        ],
        data() {
            const mouseMove = antiquity.debounce(() => {
                this.secThd();
            });
            return {
                mouseMove: mouseMove,
                fullShow: true,
                barrage: false,
                showSetting: false,
                def: false,
                time: "",
                time_meeting: "",
                not_time: 1000,
                password:'',
                new_playerNum:'',
                setDef_:1,
                tentime:'',
                myMic:'',
                myCamera:'',
                CameraStatus:'',
                MicStatus:1,
                MicTitle:'',
                CameraTitle:'',
                countDownshow:0,
                micNum: 0,
                peopleNum: 0,
                startThd: 0,
                timeThd: null
            };
        },
        computed: {
            sysAppIds() {
                let data =
                    "您好：" +
                    "\n" +
                    "蓝猫微会视频会议正在进行中，特邀请您参加。" +
                    "\n" +
                    "会议号：" +
                    this.data.mid +
                    "\n" +
                    "会议链接：https://182.61.17.228/sharePage?invite_code=" +
                    this.data.mid + '&verification_code=' + this.password +
                    "\n" +
                    "您可以直接输入会议号加入会议， 也可以点击会议链接直接入会。";
                return data;
            }
        },
        beforeCreate() {
            antiquity.on('getMembers', () => {
                const { peopleNum, micNum } = antiquity.getPeopleNum();
                this.peopleNum = peopleNum;
                this.micNum = micNum;
            })
        },
        created() {
            this.myMic = this.data.hasMic;
            this.myCamera = this.data.hasCam;
            antiquity.on("permission", (msg) => {
                console.log(msg)
                if(msg == false){//点击了拒绝按钮
                    this.CameraStatus = 1;
                    antiquity.muteAudio();
                    antiquity.muteVideo()
                }
                this.myMic = msg
                this.myCamera = msg
            });
        },
        async mounted() {
            this.new_playerNum = this.playerNum;
            if(this.new_playerNum == 6){
                this.new_playerNum = 4
            }
            this.password = Password;
            await this.$nextTick();
            await this.$nextTick();
            await this.$nextTick();
            window.addEventListener('mousemove', this.mouseMove, false);
        },
        watch:{
            countDown:function(){
                // console.log(this.countDown)
                if(this.countDown>0){
                    this.countDownshow = 1
                }else if(this.countDown<=0){
                    this.countDownshow = 0
                }

                let time1 = parseInt(this.countDown / 60);
                let time2= this.countDown % 60;
                if(time1<10){
                    time1 = '0' + time1
                }
                if(time2<10){
                    time2 = '0' + time2
                }
                this.tentime = time1 + ':' + time2
                // this.countDown = parseInt(this.countDown/60) + ':' + this.countDown - parseInt(this.countDown/60)*60
            },
            data:function(){
                console.log(this.data);
                this.myMic = this.data.hasMic;
                this.myCamera = this.data.hasCam;
                if(!this.data.hasMic){
                    this.MicStatus = 1;
                    this.MicTitle = '当前无法检测到摄像头设备'
                }
                if(!this.data.hasCam){
                    this.CameraStatus = 2;
                    this.CameraTitle = '当前无法检测到麦克风设备'
                }
                if (this.data.start3) {
                    this.startThd = new Date().getTime() - this.data.start3;
                    this.time = antiquity.moment(this.startThd).format("hh:mm:ss");
                    clearInterval(interval);
                    interval = setInterval(() => {
                        this.startThd = this.startThd + 1000;
                        this.time = antiquity.moment(this.startThd).format("hh:mm:ss");
                    }, 1000);
                }
            },
            playerNum:function(){
                this.new_playerNum = this.playerNum
            },
        },
        methods: {
            setDef(){
                this.def = !this.def;
                antiquity.setDef(this.def ? 720 : 480);
            },
            set_meetingTime(type) {
                if (type == 1) {
                    setInterval(() => {
                        let timestamp = new Date().getTime(); //当前时间戳
                        this.time = timestamp - this.data.start;
                        this.time_meeting = this.formatDuring(this.time);
                    }, 1000);
                } else if (type == 0) {
                    setInterval(() => {
                        this.not_time = this.not_time + 1000;
                        this.time_meeting = this.formatDuring(this.not_time);
                    }, 1000);
                }
            },
            // 复制成功
            onCopy(e) {
                this.$Toast.success({ message: "邀请链接已复制到剪贴板" });
            },
            // 复制失败
            onError(e) {
                this.$Toast.success({ message: "复制失败" });
            },
            formatDuring(mss) {
                let days = parseInt(mss / (1000 * 60 * 60 * 24));
                let hours =
                    parseInt((mss % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)) + days * 24;
                let minutes = parseInt((mss % (1000 * 60 * 60)) / (1000 * 60));
                let seconds = parseInt((mss % (1000 * 60)) / 1000);
                if (hours < 10) {
                    hours = "0" + hours;
                }
                if (minutes < 10) {
                    minutes = "0" + minutes;
                }
                if (seconds < 10) {
                    seconds = "0" + seconds;
                }
                return hours + ":" + minutes + ":" + seconds;
            },
            handleMic(e) {
                if(e != 1){
                    // this.myMic = !this.myMic
                    this.data.mine.mic === 0
                        ? antiquity.muteAudio()
                        : antiquity.unmuteAudio();
                }

            },
            handleCamera(e) {
                if (!this.data.hasCam) {
                    return this.$Toast.success({ message: "请安装摄像头" });
                }
                if(e == 1){
                    history.go(0)
                }else if(e == 2){

                }else{
                    this.data.mine.camera === 0
                        ? antiquity.muteVideo()
                        : antiquity.unmuteVideo(this.data.video_url);
                }

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
            }
        },
        destroyed() {
            clearInterval(interval);
            clearTimeout(this.timeThd);
        },
        components: {
            bulletScreen
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
                .set_gongneng{
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
</style>

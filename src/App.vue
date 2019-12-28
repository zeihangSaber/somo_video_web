<template>
    <div id="app">
        <div class="content" @mouseenter="Enter($event)" @mouseleave="Leave($event)" ref="content">
           <transition enter-active-class="animated fadeIn faster" leave-active-class="animated fadeOut faster">
            <ctrl
                v-show="isShowCtrl"
                @handleSide="handleSide"
				:timer="timer"
                :data="meetingInfo"
                :peopleNum="peopleNum"
                :micNum="micNum"
                :showSide="isShowSide"
                :changeScreen="changeScreen"
                :showMessage="isShowMessage"
                :ShowShare="isShowShare"
                :showParty="isShowParty"
                :playerNum="playerNum"
                :barrage="barrage"
                :maxSlide="maxSlide"
                :shareData="shareData"
                :slideCount="slideCount"
                @handleMessage="handleMessage"
                @ShowShare="ShowShare"
                @handleParty="handleParty"
                @prevSlide="prevSlide"
                @nextSlide="nextSlide"
                @LeaveMeeting="LeaveMeeting"
                @selectNine="() => (playerNum = 9)"
                @selectFour="() => (playerNum = 4)"
                @barrageTrue="() => (barrage = true)"
                @barrageFalse="() => (barrage = false)"
                @selectSlide="(num) => slideCount = num"
                ></ctrl>
           </transition>
			<div class="leftBig_box">
					<div :class="`playerBigBox ${howMany} `" ref="playerBigBox">
						<!-- 自己的推流 -->
					    <div :class="`dragBox ${mineFlag}`"style="display: flex;position: relative;" v-if="members.length <= 2">
							<div style="width: 0;padding-bottom: 56%;"></div>
							<div style="position: absolute;top: 0;left: 0;z-index: 1000;width: 100%;height: 100%;display: flex;justify-content: center;align-items: center;overflow: hidden;">
								<player-status v-if="mineFlag !== 'two'" :data="meetingInfo.mine"></player-status>
								<div style="width: 133.33%;height: 133.33%;">
									<div class="drag" ref="draggable">
										<div v-if="meetingInfo.mine.camera === 1" :class="`${meetingInfo.mine.camera === 1 ? '' : 'dragHasCamera'}`">
											<img src="https://182.61.17.228/common/logoGif.gif">
										</div>
									</div>
								</div>
							</div>
						</div>
						<div :class="`dragBox ${mineFlag}`"style="display: flex;position: relative;" v-if="members.length > 2">
							<div style="width: 0;padding-bottom: 56%;"></div>
							<div style="position: absolute;top: 0;left: 0;width: 100%;height: 100%;display: flex;justify-content: center;align-items: center;overflow: hidden;">
								<player-status v-if="mineFlag !== 'two'" :data="meetingInfo.mine"></player-status>
								<div style="width: 133.33%;height: 133.33%;">
									<div class="drag" ref="draggable">
										<div v-if="meetingInfo.mine.camera === 1" :class="`${meetingInfo.mine.camera === 1 ? 'dragHasCamera' : ''}`">
											<img src="https://182.61.17.228/common/logoGif.gif">
										</div>
									</div>
								</div>
							</div>
						</div>
						<!-- <div style="position: absolute;top: 0;left: 0;width: 100px;height: 100px;background: #FFFFFF;z-index: 1111111;">{{howMany}}</div> -->
						<!-- 他人的 -->
					    <player
					            v-if="!(speakFlag || shareFlag)"
					            v-for="item in nowPlayerNum"
					            ref="players"
					            :key="members[playerNum * (realCount - 1) + item - 1].uid"
					            :meetingInfo="meetingInfo"
					            :hawMany="howMany"
					            :data="members[playerNum * (realCount - 1) + item - 1]">
					    </player>
						<div class="space playerBox" v-if="!(speakFlag || shareFlag)" v-for="item of playerNum - nowPlayerNum"></div>
						<!-- 主讲人 -->
						<template v-if="meetingInfo.mine.speaker !== 1">
						    <player v-if="speakFlag && !shareFlag" :data="speaker" :meetingInfo="meetingInfo"></player>
						    <player v-if="shareFlag" :data="sharer" :meetingInfo="meetingInfo" :isShare="true"></player>
						</template>
					</div>
                <div v-if="waiting" class="waiting"><i class="font_family icon-camera-none"></i></div>
            </div>
            <share :isShowShare_="isShowShare_" :shareData="shareData" @share_status="share_status"></share>
        </div>
        <transition enter-active-class="animated slideInRight faster" leave-active-class="animated slideOutRight faster">
            <side-box
                    :data="meetingInfo"
                    :members="speaker ? [speaker, ...members] : members"
                    :showMessage="isShowMessage"
                    :showParty="isShowParty"
                    :barrage="barrage"
                    :message="message"
                    @handleMessage="handleMessage"
                    @handleParty="handleParty"
            ></side-box>
        </transition>
    </div>
</template>

<script>
    import animate from 'animate.css';
    import Player from './components/player';
    import Ctrl from './components/controls';
    import SideBox from './components/side';
    import share from './components/share';
    import playerStatus from "./components/playerStatus";
    import antiquity, {myMid, Password, MeetingStatus, myCamera, myMic} from './utils/Antiquity';

    export default {
        name: 'app',
        components: {
            Player,
            Ctrl,
            SideBox,
            share,
            playerStatus
        },
        data() {
            return {
                meetingInfo: {
                    mine: {
                        speaker: 0
                    }
                },
                members: [],
                peopleNum: 0,
                micNum: 0,
                isShowCtrl: true,
                showCtrlTime:"",
                changeScreen: false,
                isShowSide: true,
                isShowMessage: true,
                isShowParty: true,
                isShowShare: false,
                isShowShare_: false,
                speaker: null,
                sharer: null,
                playerNum: 4,
                slideCount: 1,
                barrage: false,
                shareData: {},
                timer: '',
				time:'',
				not_time:1000,
                test: false,
                waiting: true,
                message: [],
				joinStatus:1,
				screenStatus:0,
            };
        },
        beforeCreate() {
			if(this.joinStatus == 1){
				window.onbeforeunload = (e) => {
					e.returnValue = ("确定离开当前页面吗？");
				};
			}

        },
        created() {
            antiquity.on("getMsg", (msg) => {
				console.log(msg)
				msg.time = this._time()
                this.message.push(msg)
            });
            antiquity.on('getMidInfo', meetingInfo => {
				console.log('xxxxxx',meetingInfo)
                this.meetingInfo = meetingInfo;
            });
            antiquity.on('getMembers', members => {
                this.members = members;
                this.peopleNum = members.length;
                this.micNum = members.filter(item => {
                    if (item.mic === 0) {
                        return item;
                    }
                }).length;
            });
            antiquity.on('getShareUrl', sharer => {
                this.sharer = sharer;
            });
            antiquity.on('getSpeaker', speaker => {
                this.speaker = speaker;
            });
			antiquity.on('countDown', msg => {
			    console.log(mas.code)
				if(mas.code == 2008){
					
				}
			});
            this.$nextTick(() => {
                antiquity.on('getToast', msg => {
                    this.$Toast.success({message: msg});
                });
            })

        },
        async mounted() {

			window.onresize = function(){
			    // alert(document.getElementById('playerBigBox').offsetTop);
				console.log(document.getElementById('playerBigBox'))
				console.log(document.getElementById('playerBigBox').offsetTop)
				if(document.getElementById('playerBigBox').offsetTop < 36){
					this.screenStatus = 1
				}else if(document.getElementById('playerBigBox').offsetTop >= 36){
					this.screenStatus = 0
				}
			};

            window.addEventListener('offline', () => {
                //网络由正常常到异常时触发
                this.$Toast.success({message: '您的网络已断开，请检查网络设置。'})
            });
            window.addEventListener('online', () => {
                //从异常到正常时触发
                this.$Toast.success({message: '正常尝试连接网络中，请稍等~'})
            });
            this.$nextTick(() => {
                this.init();
            });
            this.showCtrlTime = setTimeout(()=>{
                this.isShowCtrl = false
            },3000);
        },
        computed: {
            maxSlide() {
                let maxSlide = Math.max(Math.ceil(this.members.length / this.playerNum), 1);
                (this.speaker || this.sharer) && ++maxSlide;
                return maxSlide;
            },
            speakFlag() {
                if (this.meetingInfo.mine.speaker === 1 && this.slideCount === 1) return true;
                return this.speaker && this.slideCount === 1 && !this.sharer;
            },
            shareFlag() {
                return this.sharer && this.slideCount === 1;
            },
            membersNum() {
                if (this.meetingInfo.mine.speaker) return this.members.length + 1;
                if (this.speaker || this.sharer) return this.members.length + 1;
                return this.members.length
            },
            howMany() {
                if (this.membersNum === 1) return 'fir';
                if ((this.shareFlag || this.speakFlag) && this.slideCount === 1) return 'one';
                if (!(this.sharer || this.speaker) && this.membersNum === 2) return 'two';
                if (this.playerNum === 4) return 'four';
                if (this.playerNum === 9) return 'nine';
                return 'fir'
            },
            realCount() {
                let realCount = 0;
                if (this.speaker || this.sharer) realCount = -1;
                return Math.max(this.slideCount + realCount, 0);
            },
            mineFlag() {
                if (this.sharer && this.meetingInfo.mine.speaker) return 'boxOut';
                if (this.slideCount !== 1 && this.meetingInfo.mine.speaker) return 'boxOut';
                if (this.meetingInfo.mine.speaker) return 'playerBox';
                if ((this.speaker || this.sharer) && this.slideCount === 2) return 'playerBox';
                if (!this.speaker && !this.sharer && this.slideCount === 1) return 'playerBox';
                return 'boxOut';
            },
            nowPlayerNum() {
                return Math.min(this.members.length - this.playerNum * (this.realCount - 1), this.playerNum)
            },
        },
        methods: {
			// 实时获取当前电脑时间
			_time() {
			    // setInterval(() => {
			        let t = new Date();
			        let hour = t.getHours(); //得到小时
			        let minu = t.getMinutes(); //得到分钟
			        let sec = t.getSeconds(); //得到秒
			        if (minu < 10) {
			            minu = '0' + minu
			        }
			        if (sec < 10) {
			            sec = '0' + sec
			        }
			        return hour + ':' + minu + ':' + sec
			    // }, 1000)
			},
            share_status() {
                this.isShowShare_ = false
            },
            ShowShare() {
            },
            handleSide() {
                if (this.changeScreen) {
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
					this.changeScreen = true;
					const el = document.documentElement;
                    const rfs = el.requestFullscreen || el.webkitRequestFullScreen || el.mozRequestFullScreen || el.msRequestFullScreen;
                    if(typeof rfs !== "undefined" && rfs){
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
            Enter(e){
                clearTimeout(this.showCtrlTime)
                this.isShowCtrl = true
            },
            Leave(e){
                this.showCtrlTime = setTimeout(()=>{
                    this.isShowCtrl = false
                },3000)
            },
            LeaveMeeting(){
                antiquity.leaveMeeting()
                console.log('离开会议',antiquity)
                window.location.href = 'https://182.61.17.228/joinConference';
            },
			formatDuring(mss) {
					let days = parseInt(mss / (1000 * 60 * 60 * 24));
					let hours = parseInt((mss % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)) + days * 24;
					let minutes = parseInt((mss % (1000 * 60 * 60)) / (1000 * 60));
					let seconds = parseInt((mss % (1000 * 60)) / 1000);
					if(hours<10){
						hours = '0' + hours
					}
					if(minutes<10){
						minutes = '0' + minutes
					}
					if(seconds<10){
						seconds = '0' + seconds
					}
					return hours + ":" + minutes + ":" + seconds;
			},
            init() {
                this.$nextTick(async () => {
                    this.shareData = {
                        mid: myMid,
                        password: Password,
                    };
                    this.isShowShare_ = MeetingStatus;
                    await antiquity
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
                                this.$Toast.success({message: '会议号错误'});
                                setTimeout(() => {
                                    window.location.href = 'https://http://182.61.17.228/joinConference';
                                }, 2000);
                                return
                            } else if (res.code == 2011) {
								this.joinStatus = 0
                                this.$Toast.success({message: '会议密码输入错误'});
                                setTimeout(() => {
                                    window.location.href = 'https://http://182.61.17.228/joinConference';
                                }, 2000);
                                return
                            }
                            this.waiting = false;
							if(this.meetingInfo.start){
								setInterval(() => {
										let timestamp = (new Date()).getTime();//当前时间戳
										this.time =  timestamp - this.meetingInfo.start;
										this.timer = this.formatDuring(this.time)
								}, 1000)
							}else if(!this.meetingInfo.start){
								setInterval(() => {
										this.not_time = this.not_time + 1000
										this.timer = this.formatDuring(this.not_time)
								}, 1000)
							}





                        });
                    antiquity.publish(this.meetingInfo.video_url, myCamera, myMic);
                });
            }
        }
    };
</script>

<style lang="less">
    @import "./common/base";
    @import "./common/common";
	.leftBig_box{
		 width: 100%;
		 height: 100vh;
		 background: #000000;
		 display: flex;
		 justify-content: center;
		 align-items: center;
		 padding-top: 36rpx;
		 box-sizing: border-box;
	}
	.videoBox{
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
		height: 0;
		background: #2E2E2E;
		padding-bottom: 56.25%;
		position: relative;
        overflow: hidden;
        .flex(flex-start, flex-start);
        align-content: flex-start;
        flex-wrap: wrap;

        &.fir {
            .playerBox {
                width: 0;
                height: 0;
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
                margin: 0.1%;
            }

            .dragBox {
                width: 49.8%;
                // height: 49.8%;
            }
        }

        &.nine {
            .playerBox {
                width: 33.133%;
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
                    font-size: 80px;
                    color: #666;
                }
            }
        }

        .boxOut {
            position: absolute;
            z-index: -200;
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

    .vjs-tech>object {
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

        .content {
            min-width: 1080px;
            position: relative;
            height: 100%;
            flex: 1;
            background-color: #91949c;
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
    }

</style>

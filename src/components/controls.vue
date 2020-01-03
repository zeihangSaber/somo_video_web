<template>
	<div class="ctrlBox">
		<div class="ctrlHeader" v-show="isShowCtrl">
			<i></i>
			<div class="center">
				<span class="bigSpan">会议号：{{this.data.code}}</span>
				<span class="bigSpan" v-if="password != ''">密码：{{password}}</span>
				<span class="bigSpan">
					<i v-if="this.data.locked" class="font_family icon-lock"></i>
				</span>
				<span v-show="this.data.name">
					{{ this.data.name }}
				</span>
				<span>
					<i class="font_family icon-people-num"></i>
					{{this.speaker ? this.peopleNum + 1 : this.peopleNum}}
				</span>
				<span v-if="this.data.muteAll">全体静音</span>
				<span>
					<i class="font_family icon-noMute"></i>
					{{this.speaker && this.speaker.mic === 0 ? this.micNum + 1 : this.micNum}}
				</span>
				<span>
					<i class="font_family icon-time"></i>
					{{timer || '00:00:00'}}
				</span>
			</div>
			<i class="font_family icon-wifi-high" style="font-size: 16px !important;"></i>
		</div>
		<div v-show="isShowCtrl" :class="`ctrlLeft ${slideCount === 0 ? 'disable' : ''}`" @click="$emit('prevSlide')" v-if="maxSlide > 1"><i class="font_family icon-left"></i></div>
		<div v-show="isShowCtrl" :class="`ctrlRight ${slideCount === maxSlide ? 'disable' : ''}`" @click="$emit('nextSlide')" v-if="maxSlide > 1"><i class="font_family icon-right"></i></div>
		<div v-show="isShowCtrl" class="ctrlPoint" v-if="maxSlide > 1">
			<div :class="`point ${index === slideCount ? 'active' : ''}`" v-for="index of maxSlide" @click="() => $emit('selectSlide', index)"></div>
		</div>
		<div v-show="isShowCtrl" class="ctrlFooter">
			<i></i>
			<div class="center">
				<button @click="handleMic">
					<i :class="`font_family ${data.mine && data.mine.mic === 0 ? 'icon-mic' : 'icon-mic-no'}`"></i>
					静音
				</button>
				<button @click="handleCamera">
					<i :class="`font_family ${data.mine && data.mine.camera === 0 ? 'icon-camera' : 'icon-camera-no'}`"></i>
					视频
				</button>
				<button style="margin: 0;position: relative;">
					<!--${ShowShare ? 'active' : ''}-->
					<button class="ml10" type="text" size="medium"
					        v-clipboard:copy="sysAppIds"
					        v-clipboard:success="onCopy"
					        v-clipboard:error="onError">
							<i :class="`font_family icon-sharing`"></i>邀请
					</button>
					<div class="invite_hint" v-if="inviteHint">
						<svg  class="icon invite_hint_icon" aria-hidden="true">
						    <use xlink:href="#iconhuiyiyaoqingmax"></use>
						</svg>
					</div>
				</button>
				<button @click="$emit('handleMessage')">
					<i :class="`font_family icon-barrage ${showSide && showMessage ? 'active' : ''}`"></i>消息
				</button>
				<button @click="$emit('handleParty')">
					<i :class="`font_family icon-members ${showSide && showParty ? 'active' : ''}`"></i>参会方
				</button>
				<button @click="() => showSetting = !showSetting">
					<i :class="`font_family icon-setting ${showSetting ? 'active' : ''}`"></i>设置
				</button>
				<button @click="$emit('LeaveMeeting')">
					<i style="color:#FF5245" class="font_family icon-tuichu-normal "></i>离开
				</button>
			</div>
			<button class="zoomIn" @click="$emit('handleSide')">
				<i :class="`font_family ${changeScreen ? 'icon-zoomOut' : 'icon-zoomIn'}`" style="font-size: 37px;"></i>
			</button>
		</div>
		<transition v-show="isShowCtrl" enter-active-class="animated flipInY fast" leave-active-class="animated flipOutY fast">
			<div class="set_box" v-if="showSetting">
				<div class="set_title">
					<div>设置</div>
					<i class="font_family icon-close " @click="() => showSetting = !showSetting"></i>
				</div>
				<div class="set_main">
					<div class="set_main_box">
						<div class="set_main_title">视频布局:</div>
						<div class="set_gongneng">
							<div @click="$emit('selectFour')">
								<svg class="icon" aria-hidden="true" v-if="playerNum === 4">
									<use xlink:href="#icon-select"></use>
								</svg>
								<i class="font_family set_icon icon-select-no" v-else></i>
								<span>四分屏</span>
							</div>
							<div @click="$emit('selectNine')">
								<svg class="icon" aria-hidden="true" v-if="playerNum === 9">
									<use xlink:href="#icon-select"></use>
								</svg>
								<i class="font_family set_icon icon-select-no" v-else></i>
								<span>九分屏</span>
							</div>
						</div>
					</div>
					<div class="set_main_box" style="margin-top: 10px;">
						<div class="set_main_title">弹幕消息:</div>
						<div class="set_gongneng">
							<div @click="$emit('barrageTrue')">
								<svg class="icon" aria-hidden="true" v-if="barrage">
									<use xlink:href="#icon-select"></use>
								</svg>
								<i class="font_family set_icon icon-select-no" v-else></i>
								<span>开启</span>
							</div>
							<div @click="$emit('barrageFalse')">
								<svg class="icon" aria-hidden="true" v-if="!barrage">
									<use xlink:href="#icon-select"></use>
								</svg>
								<i class="font_family set_icon icon-select-no" v-else></i>
								<span>关闭</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		</transition>
		<bullet-screen v-if="barrage" :msgBox="msgBox"></bullet-screen>
	</div>
</template>

<script>
	import antiquity,{ Password } from "../utils/Antiquity";
	import bulletScreen from "./bulletScreen";
	let interval;
	export default {
	  name: "app",
	  data() {
		return {
		  showSetting: false,
		  time: "",
		  time_meeting: "",
		  not_time: 1000,
		  password:''
		  // sysAppIds:''
		};
	  },
	  props: [
		"isShowCtrl",
		"inviteHint",
		"data",
		"peopleNum",
		"micNum",
		"showSide",
		"changeScreen",
		"showMessage",
		"showParty",
		"playerNum",
		"barrage",
		"ShowShare",
		"maxSlide",
		"slideCount",
		"shareData",
		"timer",
		"speaker",
		"msgBox",
		"message"
	  ],
	  components: {
		  bulletScreen
	  },
	  computed: {
		sysAppIds() {
		  let data =
			"您好：" +
			"\n" +
			"蓝猫微会视频会议正在进行中，特邀请您参加。" +
			"\n" +
			"会议号：" +
			this.shareData.mid +
			"\n" +
			"会议链接：https://182.61.17.228/sharePage?invite_code=" +
			this.shareData.mid + '&verification_code=' + this.password + 
			"\n" +
			"您可以直接输入会议号加入会议， 也可以点击会议链接直接入会。";
		  return data;
		}
	  },
	  mounted() {
		  console.log(55555,this.inviteHint)
		  this.password = Password
	  },
	  methods: {
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
		handleMic() {
		  this.data.mine.mic === 0
			? antiquity.muteAudio()
			: antiquity.unmuteAudio();
		},
		handleCamera() {
		  this.data.mine.camera === 0
			? antiquity.muteVideo()
			: antiquity.unmuteVideo(this.data.video_url);
		}
	  },
	  destroyed() {
		clearInterval(interval);
	  }
	};
</script>

<style lang="less" scoped>
@import "../common/common";
.invite_hint_icon{
	font-size: 160px;
}
.invite_hint{
	width: 100px;
	height: 100px;
	position: absolute;
	top: -100px;
	left: -27.5%;
}
.set_icon{
	font-size: 16px !important;
	color: #DDDDDD;
}
.set_box{
	width: 230px;
	height: 206px;
	background:#FFFFFF;
	border-radius:8px;
	position: absolute;
	bottom: 115px;
	left: 55%;
	z-index: 110000;
	.set_main{
		padding: 0 48px 0 32px;
		font-size:16px;
		font-weight:400;
		color:rgba(153,153,153,1);
		.set_main_box{
			// width: 60%;
			display: flex;
			justify-content: center;
			align-items: flex-start;
			// margin: 0 auto 16px;
			.set_main_title{
				width: 80px;
				font-size:16px;
				font-weight:400;
				color:rgba(102,102,102,1);
			}
			.set_gongneng{
				width: 50%;
				& div{
					margin-bottom: 6px;
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
    background-color: rgba(0, 0, 0, 1);
    z-index: 9999;
    color: #fff;
    line-height: 36px;
    .flex(space-between, center);
    text-align: center;
    .bigSpan {
      font-weight: bolder;
    }
    .center {
      flex: 1;
      span {
        margin: 0 20px;
      }
    }
  }
  .ctrlLeft {
    position: absolute;
    left: 0;
    bottom: 50%;
    color: rgba(255, 255, 255, 0.7);
    background-color: rgba(0, 0, 0, 0.6);
    border-radius: 0 27px 27px 0;
    z-index: 999;
    .disable {
      background-color: rgba(0, 0, 0, 0.4);
      color: rgba(255, 255, 255, 0.5);
    }
    .icon-left {
      font-size: 50px;
      cursor: pointer;
    }
  }
  .ctrlRight {
    position: absolute;
    right: 0;
    bottom: 50%;
    color: rgba(255, 255, 255, 0.7);
    background-color: rgba(0, 0, 0, 0.6);
    border-radius: 27px 0 0 27px;
    z-index: 999;
    .disable {
      background-color: rgba(0, 0, 0, 0.4);
      color: rgba(255, 255, 255, 0.5);
    }
    .icon-right {
      font-size: 50px;
      cursor: pointer;
    }
  }
  .invite:hover {
    color: #118bfb;
  }
  .ctrlPoint {
    position: absolute;
    z-index: 9999;
    top: 90%;
    left: 50%;
    height: 15px;
    background-color: rgba(0, 0, 0, 0.4);
    border-radius: 8px;
    padding: 0 3px;
    transform: translateX(-50%);
    .flex(space-around, center);
    .point {
      height: 8px;
      width: 8px;
      margin: 0 2px;
      border-radius: 50%;
      background-color: rgba(216, 216, 216, 0.4);
      &.active {
        background-color: rgba(216, 216, 216);
      }
    }
  }
  .ctrlFooter {
    padding: 0 20px;
    height: 80px;
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    background-color: rgba(0, 0, 0, 0.6);
    z-index: 9999;
    color: #fff;
    line-height: 80px;
    .flex(space-between, center);
    .center {
      flex: 1;
      text-align: center;
      .flex(center, center);
      padding-bottom: 5px;
      button {
        background-color: transparent;
        outline: none;
        border: none;
        color: #fff;
        font-size: 16px;
        font-weight: normal;
        margin: 0 20px;
        i {
          display: block;
          font-size: 44px;
        }
        .icon-camera-no,
        .icon-mic-no {
          color: #ff6b6f;
        }
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
      i {
        font-size: 38px;
        position: relative;
        left: -10px;
        top: -8px;
      }
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

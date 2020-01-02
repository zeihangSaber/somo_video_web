<template>
  <div class="bigBox">
    <div class="title">
      <p class="p" v-if="search_show == 0">参会方(<span>{{ members.length }}</span>)</p>
	  <input v-if="search_show == 1" type="text" placeholder="搜索账号名称" v-model="search" @input="search_member" class="searchInput"/>
	  <div>
		  <i :class="search_show == 1?'font_family icon-chazhaoanniu search_act':'font_family icon-chazhaoanniu search'" @click="searchShow()"></i>
		  <i class="font_family icon-close" @click="$emit('handleParty')"></i>
	  </div>
    </div>
    <div class="box">
      <transition-group class="top" name="list-complete" tag="div">
        <div key="search" class="input">
          <div class="member">
            <div
              v-if="search == ''"
              class="item"
              v-for="item of members"
              :key="item.uid"
              @mouseenter="enter($event)"
              @mouseleave="leave($event)"
            >
              <img :src="item.avarter? item.avarter : 'https://182.61.17.228/common/defaultHead.png' " />
              <p>
                <span>{{ item.name }}</span>
				<svg v-if="item.role === 4" class="icon" aria-hidden="true" style="font-size: 34px;margin-left: 2px;">
				    <use xlink:href="#iconzhuchiren" style="font-size: 42px;"></use>
				</svg>
				<svg v-if="item.speaker === 1" class="icon" aria-hidden="true" style="font-size: 28px;margin-left: 2px;">
				    <use xlink:href="#iconzhujiang" style="font-size: 32px;"></use>
				</svg>
				
                <!-- <span v-if="item.speaker === 1" class="speaker">主讲</span> -->
              </p>
              <!-- <button
                v-if="item.role !== 4"
                class="permissionBtn"
                @click="setMic(item)"
              >
              </button> -->
              <button class="permissionBtn more" @click="more(item)">
                更多
                <div v-if="permissionShow" class="permission">
                  <span class="permission_header"></span>
                  <div class="permission_content">
                    <div @click="setMic(item)" v-if="item.role !== 4">
                      {{ item.mic === 1 ? "取消静音" : "静音" }}
                    </div>
                    <div
                      v-if="permissionType.setSpeaker"
                      @click="setSpeaker(item)"
                    >
                      {{ item.speaker === 1 ? "结束主讲" : "设为主讲" }}
                    </div>
                    <div v-if="permissionType.setRole" @click="setRole(item)">
                      设为主持人
                    </div>
                    <div
                      v-if="permissionType.setCamera"
                      @click="setCamera(item)"
                    >
                      {{ item.camera === 1 ? "开启摄像头" : "关闭摄像头" }}
                    </div>
                    <div v-if="permissionType.setKick" @click="setKick(item)">
                      移除
                    </div>
                  </div>
                </div>
              </button>
              <div class="noPermissionBtn">
                <i :class=" `font_family  ${item.camera === 0? 'icon-camera-user':'icon-camera-user-no'}`"></i>
               </div>
               <div class="noPermissionBtn">
                    <i :class=" `font_family ${item.mic === 0 ? 'icon-user-mic' : 'icon-user-mic-no'}`"></i>
                </div>
            </div>
                        <div
                                v-if="search !== ''"
                                class="item"
                                v-for="item of s_members"
                                :key="item.uid"
                                @mouseenter="enter($event)"
                                @mouseleave="leave($event)"
                        >
                            <img :src="item.avarter"/>
                            <p>
                                <span>{{ item.name }}</span>
                                <span v-if="item.role === 4" class="handle">主持人</span>
								
                                <span v-if="item.speaker === 1" class="speaker">主讲</span>
                            </p>
                            <!-- <button
                                    v-if="item.role !== 4"
                                    class="permissionBtn"
                                    @click="setMic(item)"
                            >
                                {{ item.mic === 1 ? "取消静音" : "静音" }}
                            </button> -->
                            <button class="permissionBtn more" @click="more(item)">
                                更多
                                <div v-if="permissionShow" class="permission">
                                    <span class="permission_header"></span>
                                    <div class="permission_content">
                                        <div @click="setMic(item)">
                                          {{ item.mic === 1 ? "取消静音" : "静音" }}
                                        </div>
                                        <div
                                            v-if="permissionType.setSpeaker"
                                            @click="setSpeaker(item)"
                                        >
                                            {{ item.speaker === 1 ? "结束主讲" : "设为主讲" }}
                                        </div>
                                        <div v-if="permissionType.setRole" @click="setRole(item)">
                                            设为主持人
                                        </div>
                                        <div
                                            v-if="permissionType.setCamera && item.dt!==8"
                                            @click="setCamera(item)"
                                        >
                                            {{ item.camera === 1 ? "开启摄像头" : "关闭摄像头" }}
                                        </div>
                                        <div v-if="permissionType.setKick" @click="setKick(item)">
                                            移除
                                        </div>
                                    </div>
                                </div>
                            </button>

                            <div class="noPermissionBtn">
                                <i
                                        class=""
                                        :class="
                    `font_family  ${
                      item.camera === 0
                        ? 'icon-camera-user'
                        : 'icon-camera-user-no'
                    }`
                  "
                                ></i>
                            </div>
                            <div class="noPermissionBtn">
                                <i
                                        :class="
                    `font_family ${
                      item.mic === 0 ? 'icon-user-mic' : 'icon-user-mic-no'
                    }`
                  "
                                ></i>
                            </div>
                        </div>
                    </div>
                </div>
            </transition-group>
            <div class="line" v-if="hasControl"></div>
            <div class="bottom" v-if="hasControl" >
                <button :disabled="!hasControl" @click="() => ( micAll = true )" :class="data.muteAll?'lockMeeting':''">全体静音</button>
                <button :disabled="!hasControl" @click="handleRemoveMicAllOn" style="width:108px;">
                    解除全体静音
                </button>
                <button :disabled="!hasControl" @click="handleLock" :class="data.locked ?'lockMeeting':'lockMeeting noLockMeeting'">{{data.locked ?'解锁会议':'锁定会议'}}</button>
            </div>
        </div>
      </transition-group>
      <div class="allMute" v-if="micAll">
        <h3>全体静音</h3>
        <h4>操作全体静音后，全体成员包括新参会者都会被静音</h4>
        <div class="allMute_btn">
          <button @click="() => (micAll = false)">取消</button>
          <button class="affirm" @click="setMicAllOff">确认</button>
        </div>
      </div>
    </div>
</template>
<script>
	import antiquity from "../utils/Antiquity";
	export default {
	  name: "party",
	  props: ["members", "hasControl", "data"],
	  data() {
		return {
		  search_show:0,
		  s_members: [],
      search: "",
      micAll:false,
		  permissionShow: false,
		  permissionType: {
        setSpeaker: true,
        setRole: true,
        setCamera: true,
        setKick: true,
		  }
		};
	  },
	  computed: {},
	  methods: {
		searchShow(){
			this.search_show = !this.search_show
		},
		search_member() {
		  this.s_members = [];
		  if (this.search != "") {
			this.members.forEach(item => {
			  if (item.name.indexOf(this.search) >= 0) {
				console.log(item);
				this.s_members.push(item);
			  }
			});
			// console.log(this.members)
		  }
		},
		enter(event) {
		  // event.target.className = "item itemMouse";
		  if (this.hasControl) {
			event.target.className = "item itemMouse";
		  }
		},
		leave(event) {
		  event.target.className = "item";
		  this.permissionShow = false;
		  if (this.hasControl) {//不是主持人的时候
			this.permissionShow = false;
			event.target.className = "item";
		  }
		},
		more(item) {
			console.log("xxxx",item)
		  this.permissionType = {
        setSpeaker: true,
        setRole: true,
        setCamera: true,
        setKick: true
		  };
		  if (item.uid === antiquity.uid) {
			this.permissionType = {
			  setSpeaker: true,
			  setRole: false,
			  setCamera: false,
			  setKick: false
			};
			this.permissionShow = true;
			return;
		  }
		  if (item.dt === 3) {
			this.permissionType = {
			  setSpeaker: false,
			  setRole: true,
			  setCamera: false,
			  setKick: true
			};
		  }
		  this.permissionShow = true;
		},
		setMic(item) {
		  const micState = item.mic;
		  const value = `[${item.uid}]`;
		  console.log(micState, value);
		  antiquity.ajax
			.ruleSet({
			  admin: antiquity.uid,
			  rule: Boolean(micState) ? 1012 : 1011,
			  value
			})
			.then(res => {
			  console.log(res);
			});
		  //   console.log(antiquity);
		},
		setSpeaker(item) {
		  const speaker = item.speaker === 1 ? 0 : 1;
		  const data = {
        admin: antiquity.uid,
        uid: item.uid,
        dt: item.dt,
        device: item.device,
        speaker
		  };
		  antiquity.ajax.speakerSet(data).then(res => {
			console.log(res);
		  });
		  console.log(antiquity.ajax);
		},
		setRole(item) {
		  const data = {
        admin: antiquity.uid,
        uid: item.uid,
        dt: item.dt,
        device: item.device,
        role: 4
		  };
		  antiquity.ajax.roleSet(data).then(res => {
			console.log("主持人设置", res);
		  });
		  console.log(item);
		},
		setCamera(item) {
		  const cameraState = item.camera;
		  const value = `[${item.uid}]`;
		  antiquity.ajax
			.ruleSet({
			  admin: antiquity.uid,
			  rule: Boolean(cameraState) ? 2012 : 2011,
			  value
			})
			.then(res => {
			  console.log(res);
			});
		  console.log(item);
		},
		setKick(item) {
		  const data = {
        admin: antiquity.uid,
        uid: item.uid,
        dt: item.dt,
        device: item.device
		  };
		  antiquity.ajax.kick(data).then(res => {
			console.log(res);
		  });
		  console.log(item);
		},
		setMicAllOff() {
		  const data = {
        admin: antiquity.uid,
        rule: 1001,
        value: "2"
		  };
		  antiquity.ajax.ruleSet(data).then(res => {
        this.micAll = false;
      });
		},
		handleRemoveMicAllOn() {
		  const data = {
        admin: antiquity.uid,
        rule: 1001,
        value: "0"
		  };
		  antiquity.ajax.ruleSet(data).then(res => {
			console.log(res);
		  });
		},
		handleLock() {
		  if (this.data.locked) {
			antiquity.ajax.unlock().then(res => {
			  console.log(res);
			});
		  } else {
			antiquity.ajax.lock().then(res => {
			  console.log(res);
			});
		  }
		}
	  }
	};
</script>
<style lang="less" scoped>
@import "../common/common";
.title {
	height: 48px;
	padding-right: 8px;
	box-sizing: border-box;
	.search_act{
		color: #118BFB;
		margin-right: 8px;
	}
	.search{
		color: #c5c6c8;
		margin-right: 8px;
	}
	.searchInput{
		width:236px;
		height:32px;
		background:rgba(255,255,255,1);
		border-radius:16px;
		font-size:14px;
		font-family:PingFangSC-Regular,PingFang SC;
		font-weight:400;
		color:rgba(187,187,187,1);
		margin-left: 16px;
		text-align: center;
		outline: none;
	}
	.flex(space-between, center);

	.p {
		padding-left: 16px;
		.fontStyle(18px, #000, blod);
		flex: 1;
	}

	.icon-close {
		color: #c5c6c8;
	}
}

.box {
  height: 0;
  border-radius: 6px;
  background-color: #fff;
  flex: 1;
  .flex();
  flex-direction: column;
  .top {
    height: calc(100% - 60px);
    flex: 1;
    .input {
      height: 100%;
      input {
        background-color: #f4f4f4;
        border-radius: 16px;
        width: 100%;
        height: 32px;
        text-align: center;
        outline: none;
        margin-bottom: 5px;
      }
      .member {
        height: calc(100% - 32px);
        overflow-y: auto;
		padding: 16px 0;
		box-sizing: border-box;
        .item {
          position: relative;
          .flex(flex-start, center);
          padding: 0 16px;
		  box-sizing: border-box;
		  margin-bottom: 16px;
          border-radius: 4px;

          img {
            width: 28px;
            height: 28px;
            margin-right: 10px;
            border: 0;
            border-radius: 20px;
          }

          p {
            flex: 1;
            .flex(flex-start, center);

            span {
              max-width: 125px;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
              margin-left: 4px;
			  font-size:14px;
			  font-family:PingFangSC-Regular,PingFang SC !important;
			  font-weight:400;
			  color:rgba(30,33,38,1);
            }
          }

          i {
            margin-left: 4px;
          }

          .icon-camera-user,
          .icon-user-mic {
            color: #c5c6c8;
            font-size: 20px;
          }

          .icon-camera-user-no,
          .icon-user-mic-no {
            color: #ff6b6f;
            font-size: 20px;
          }

          .permissionBtn {
            z-index: 10;
            display: none;
            margin-left: 8px;
            border: 0;
            height: 24px;
            background: rgba(255, 107, 111, 1);
            border-radius: 4px;
            font-size: 12px;
            color: #fff;
            line-height: 16px;
            padding: 4px 8px;
            outline: none;
          }

          .more {
            background-color: #118bfb;
          }

          .permission {
            position: absolute;
            right: 12px;
            top: 15px;
            .permission_header {
              border-radius: 1px;
              position: relative;
              top: 7px;
              left: 27%;
              display: inline-block;
              width: 6px;
              height: 6px;
              background-color: #666666;
              transform: rotate(45deg);
            }

            .permission_content {
              border-radius: 6px;
              min-width: 90px;
              background-color: #666666;
              padding: 10px;

              div {
                font-size: 10px;
                color: rgba(255, 255, 255, 1);
                line-height: 14px;
                margin-top: 10px;
              }

              :first-child {
                margin-top: 0px;
              }
            }
          }

          .speaker {
            background-color: #ff9802;
            padding: 3px 6px;
            font-size: 8px;
            color: rgba(255, 255, 255, 1);
            border-radius: 2px;
          }

          .handle {
            padding: 3px 5px;
            background-color: rgba(18, 139, 251, 1);
            border-radius: 2px;
            font-size: 8px;
            color: rgba(255, 255, 255, 1);
            border-radius: 2px;
          }
        }
      }
      .myScroll(member);
    }

    .itemMouse {
      background-color: #f4f4f4;

      .noPermissionBtn {
        display: none !important;
      }

      .permissionBtn {
        display: block !important;
      }
    }
  }
  .line {
    border-bottom: 2px solid #f4f4f4;
  }
  .bottom {
    height: 52px !important;
    .flex(space-between);
    padding: 10px 10px;
    .lockMeeting{
      width: 27.5%;
      background:rgba(17,139,251,1);
      border-radius:16px;
      font-size:14px;
      font-weight:400;
      color:rgba(255,255,255,1) !important;
    }
    .noLockMeeting{
      color: #118bfb !important;
      background-color: #fff !important;
    }
    button {
      border-radius:16px;
      border:1px solid rgba(17,139,251,1) !important;
      padding: 0;
      background-color: #fff;
      height:32px;
      // width: 30%;
      min-width: 90px;
      font-size:14px;
      font-weight:400;
      color:rgba(17,139,251,1) !important;
      outline: none;  
    }
  }

}

button {
  background-color: #fff;
  border: none;
}

.allMute{
  padding: 0 32px;
  z-index: 1000;
  position: fixed;
  left: 40%;
  top: 50%;
  transform: translate(-40%,-50%);
  width:290px;
  height:174px;
  background:rgba(255,255,255,1);
  border-radius:8px;
  flex-direction: column;
  .flex(flex-start,center);
  h3{
    margin: 20px 0 12px 0;
    font-size:20px;
    font-weight:500;
    color:rgba(51,51,51,1);
  }
  h4{
    font-size:16px;
    font-weight:400;
    color:rgba(102,102,102,1);
  }
  .allMute_btn{
    margin-top: 16px;
    button{
      margin-left: 12px;
      width:100px;
      height:32px;
      border-radius:24px;
      border:1px solid rgba(17,139,251,1);
      color:rgba(17,139,251,1);
      outline: none;    
    }
    .affirm{
      color:rgba(255,255,255,1);
      background:linear-gradient(180deg,rgba(47,184,255,1) 0%,rgba(17,139,251,1) 100%);
    }
  }
  
}

.list-complete-item {
  transition: all 0.3s;
  display: inline-block;
  margin-right: 10px;
}
.list-complete-enter,
.list-complete-leave-to {
  opacity: 0;
  transform: translateX(350px);
}
.list-complete-leave-active {
  position: absolute;
}
input::-webkit-input-placeholder{
	  color:#BBBBBB;
	}
	input::-moz-placeholder{
	  color:#BBBBBB;
	}
	input:-moz-placeholder{
	  color:#BBBBBB;
	}
	input:-ms-input-placeholder{
	  color:#BBBBBB;
	}
</style>

<template>
    <div class="bigBox">
        <div class="title">
            <p class="p" v-if="search_show == 0">
                参会方 ({{ members.length }})<!---->
            </p>
            <input v-if="search_show == 1" type="text" placeholder="搜索账号名称" v-model="search" @input="search_member" class="searchInput"/>
        </div>
        <div class="box">
            <div class="top">
                <div class="input">
                    <div class="member">
                        <div
                            :class="`item ${activeItemIndex === index && meetingInfo.mine.role === 4 ? 'itemMouse' : ''}`"
                            v-for="(item, index) of search ? s_members : members" :key="item.uid"
                            @mouseenter="activeItemIndex = index"
                            @mouseleave="activeItemIndex = -2"
                        >
                            <img :src="item.avarter ? item.avarter : 'https://182.61.17.228/common/defaultHead.png'"/>
                            <p>
                                <span>{{ item.name ? item.name : item.uid }}</span>
                                <svg v-if="item.role === 4" class="icon" aria-hidden="true" style="font-size: 34px;margin-left: 2px;">
                                    <use xlink:href="#iconzhuchiren" style="font-size: 42px;" />
                                </svg>
                                <svg v-if="item.speaker === 1" class="icon" aria-hidden="true" style="font-size: 28px;margin-left: 2px;">
                                    <use xlink:href="#iconzhujiang" style="font-size: 32px;" />
                                </svg>
                            </p>
                            <button class="permissionBtn more" @click="more($event, item)">
                                更多
                            </button>
                            <div class="noPermissionBtn">
                                <i :class="`font_family ${item.camera === 0 ? 'icon-camera-user' : 'icon-camera-user-no'}`"></i>
                            </div>
                            <div class="noPermissionBtn">
                                <i :class="`font_family ${item.mic === 0 ? 'icon-user-mic' : 'icon-user-mic-no'}`"></i>
                            </div>
                        </div>
                        <div
                            :style="`top: ${permissionTop}px;`"
                            v-if="permissionShow"
                            class="permission"
                            @mouseleave="permissionShow = false">
                            <div class="permission_content">
                                <div @click="setMic(selectItem)" v-if="selectItem.role !== 4">
                                    {{ selectItem.mic === 1 ? "取消静音" : "静音" }}
                                </div>
                                <div v-if="permissionType.setSpeaker" @click="setSpeaker(selectItem)">
                                    {{ selectItem.speaker === 1 ? "结束主讲" : "设为主讲" }}
                                </div>
                                <div v-if="permissionType.setRole" @click="()=>(roleShow = true)">
                                    设为主持人
                                </div>
                                <div v-if="permissionType.setCamera" @click="setCamera(selectItem)">
                                    {{ selectItem.camera === 1 ? "请求开启摄像头" : "关闭摄像头" }}
                                </div>
                                <div v-if="permissionType.setKick" @click="()=>(kickShow = true)">
                                    移除
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="line" v-if="meetingInfo.control"></div>
            <div class="bottom" v-if="meetingInfo.control">
                <button :disabled="!meetingInfo.control" @click="() => (micAll = true)" :class="data.muteAll ? 'lockMeeting' : ''">
                    全体静音
                </button>
                <button :disabled="!meetingInfo.control" @click="handleRemoveMicAllOn" style="width:108px;">
                    解除全体静音
                </button>
                <button :disabled="!meetingInfo.control" @click="handleLock" :class="data.locked ? 'lockMeeting' : 'lockMeeting noLockMeeting'">
                    {{ data.locked ? "解锁会议" : "锁定会议" }}
                </button>
            </div>
        </div>
        <Confirm v-if="roleShow" :item="selectItem" :confirmTitle="'设为主持人'" :confirmText="`确认将【${selectItem.name}】设为主持人？`" v-on:cancel="() => (roleShow = false)" v-on:affirm="setRole"></Confirm>
        <Confirm v-if="kickShow" :item="selectItem" :confirmTitle="'移除'" :confirmText="`确认要移除【${selectItem.name}】？`" v-on:cancel="() => (kickShow = false)" v-on:affirm="setKick"></Confirm>
        <Confirm v-if="micAll" :item="''" :confirmTitle="'全体静音'" :confirmText="'操作全体静音后，全体成员包括新参会者都会被静音'" v-on:cancel="() => (micAll = false)" v-on:affirm="setMicAllOff"></Confirm>
    </div>
</template>
<script>
    import Confirm from "./confirm";
    import antiquity from "../utils/Antiquity";
    export default {
        name: "party",
        components: { Confirm },
        props: ["data"],
        data() {
            return {
                // 会议信息
                meetingInfo: {
                    control: false
                },
                members: [],
                search_show: 0,
                s_members: [],
                search: "",
                // 被选中
                selectItem:"", 
                micAll: false,
                kickShow:false,
                lockedShow: false,
                roleShow:false,
                // 是否显示菜单
                permissionShow: false,
                // 菜单初始化
                permissionType: {
                    setSpeaker: true,
                    setRole: true,
                    setCamera: true,
                    setKick: true
                },
                // 选中的索引
                activeItemIndex: -2,
                // 定位用
                permissionTop: 0
            };
        },
        beforeCreate() {
            antiquity.on("getMembers", () => {
                this.members = antiquity.getList();
            });
            antiquity.on('getMidInfo', meetingInfo => {
                this.meetingInfo = meetingInfo;
            });

        },
        mounted() {
            this.members = antiquity.getList();
            this.meetingInfo = antiquity.getMidInfo();
        },
        methods: {
            search_member() {
                this.s_members = [];
                if (this.search != "") {
                    this.members.forEach(item => {
                        if (item.name.indexOf(this.search) >= 0) {
                            this.s_members.push(item);
                        }
                    });
                }
            },
            more($event, item) {
                this.permissionTop = $event.target.parentNode.offsetTop + 40;
                this.selectItem = item;
                this.permissionType = {
                    setSpeaker: true,
                    setRole: item.uid !== antiquity.uid && item.dt !== 3,
                    setCamera: item.uid !== antiquity.uid && item.dt !== 3,
                    setKick: item.uid !== antiquity.uid
                };
                this.permissionShow = true;
            },
            setMic(item) {
                const micState = item.mic;
                const value = `[${item.uid}]`;
                antiquity.ajax
                    .ruleSet({
                        admin: antiquity.uid,
                        rule: Boolean(micState) ? 1012 : 1011,
                        value
                    })
                    .then(res => {
                        console.log(res);
                    });
            },
            setSpeaker(item) {
                const speaker = item.speaker === 1 ? 0 : 1;
                const data = {
                    admin: antiquity.uid,
                    uid: item.uid,
                    dt: item.dt,
                    speaker
                };
                antiquity.ajax.speakerSet(data).then(res => {
                    console.log('主讲更换成功');
                });
            },
            setRole(item) {
                const data = {
                    admin: antiquity.uid,
                    uid: item.uid,
                    dt: item.dt,
                    role: 4
                };
                antiquity.ajax.roleSet(data).then(res => {
                    this.roleShow = false
                });
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
            },
            setKick(item) {
                const data = {
                    admin: antiquity.uid,
                    uid: item.uid,
                    dt: item.dt,
                };
                antiquity.ajax.kick(data).then(res => {
                    this.kickShow = false
                });
            },
            setMicAllOff() {
                const data = {
                    admin: antiquity.uid,
                    rule: 1001,
                    value: "2"
                };
                antiquity.ajax.ruleSet(data).then(res => {
                    this.members.forEach((item)=>{
                        this.$Toast.success({message:"全体包括新参会方已被静音"})
                    });
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
        .search_act {
            color: #118bfb;
            margin-right: 8px;
        }
        .search {
            color: #c5c6c8;
            margin-right: 8px;
        }
        .searchInput {
            width: 236px;
            height: 32px;
            background: rgba(255, 255, 255, 1);
            border-radius: 16px;
            font-size: 14px;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: rgba(187, 187, 187, 1);
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
                position: relative;
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
                        height: 44px;
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
                                font-size: 14px;
                                font-family: PingFangSC-Regular, PingFang SC !important;
                                font-weight: 400;
                                color: rgba(30, 33, 38, 1);
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
                }
                .myScroll(member);
            }

            .itemMouse {
                background-color: #f4f4f4;
                width: 100%;

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
            .lockMeeting {
                width: 27.5%;
                background: rgba(17, 139, 251, 1);
                border-radius: 16px;
                font-size: 14px;
                font-weight: 400;
                color: rgba(255, 255, 255, 1) !important;
            }
            .noLockMeeting {
                color: #118bfb !important;
                background-color: #fff !important;
            }
            button {
                border-radius: 16px;
                border: 1px solid rgba(17, 139, 251, 1) !important;
                padding: 0;
                background-color: #fff;
                height: 32px;
                // width: 30%;
                min-width: 90px;
                font-size: 14px;
                font-weight: 400;
                color: rgba(17, 139, 251, 1) !important;
                outline: none;
            }
        }
    }

    button {
        background-color: #fff;
        border: none;
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
    input::-webkit-input-placeholder {
        color: #bbbbbb;
    }
    input::-moz-placeholder {
        color: #bbbbbb;
    }
    input:-moz-placeholder {
        color: #bbbbbb;
    }
    input:-ms-input-placeholder {
        color: #bbbbbb;
    }
</style>

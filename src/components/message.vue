<template>
    <div class="bigBox">
        <div class="title">
            <p class="p">消息(<span>{{message.length}}</span>)</p>
            <i class="font_family icon-close" @click="$emit('handleMessage')"></i>
        </div>
        <div class="box">
            <div class="top">
                <div class="time">{{time}}</div>
                <div class="topBox" ref="topBox">
                    <div ref="topBox_">
                        <div class="msgBox" v-for="itme in message">
                            <div v-if="itme.uid != meetingInfo.mine.uid" class="msg">
                                <div class="msgBox-name">{{itme.name}}</div>
                                <div class="msgBox-content">{{itme.text}}</div>
                            </div>
                            <div v-if="itme.uid == meetingInfo.mine.uid" class="ME-msg msg">
                                <div class="msgBox-name">{{itme.name}}</div>
                                <div class="msgBox-content">{{itme.text}}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="line"></div>
            <div class="bottom" @keydown.enter="send_msg">
                <textarea maxlength="30" placeholder="在此处输入消息…" rows="3" v-model="msgContent"></textarea>
                <button :disabled=disabled @click="send_msg()">发送</button>
            </div>
        </div>
        <div class="bulletScreen" v-if="barrage">
            <div v-for="item in arr" class="bulletScreen-msg">
                <span class="bulletScreen-name">{{item.name}}：</span>
                <span class="bulletScreen-main">{{item.text}}</span>
            </div>
        </div>
    </div>
</template>
<script>
    import antiquity from "../utils/Antiquity";
    export default {
        props: ["barrage", "meetingInfo"],
        data() {
            return {
                message: [],
                time: '',
                msgContent: ''
            }
        },
        created() {
            antiquity.on("getMsg", (msg) => {
                this.message.push(msg)
            });
        },
        mounted() {
            this._time()
        },
        computed: {
            disabled() {
                let disabled;
                if (this.msgContent === '') {
                    disabled = true
                } else {
                    disabled = false
                }
                return disabled
            },
            arr() {
                let newArr = [];
                if (this.message.length > 3) {
                    newArr = [
                        this.message[this.message.length - 3],
                        this.message[this.message.length - 2],
                        this.message[this.message.length - 1]
                    ];
                    this.Talk()
                } else {
                    newArr = this.message;
                    this.Talk()
                }
                return newArr
            }
        },
        methods: {
            Talk() {
                setTimeout(() => {
                    this.$refs.topBox.scrollTop = this.$refs.topBox_.offsetHeight;
                }, 100)
            },
            send_msg() {
                this.Talk();
                antiquity.ajax.broadcast({
                    "mid": this.meetingInfo.mid,
                    "text": Base64.encode(this.msgContent)
                }).then((res) => {
                    this.message.push({
                        name: this.meetingInfo.mine.name,
                        text: this.msgContent,
                        uid: this.meetingInfo.mine.uid
                    });
                    this.msgContent = ''
                })
            },
            // 实时获取当前电脑时间
            _time() {
                setInterval(() => {
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
                    this.time = hour + ':' + minu + ':' + sec
                }, 1000)
            },
        }
    }
</script>
<style lang="less" scoped>
    @import "../common/common";
    .bulletScreen {
        width: 360px;
        position: fixed;
        bottom: 100px;
        left: 30px;
        z-index: 500;
        display: flex;
        align-items: flex-start;
        flex-direction: column;
        .bulletScreen-msg {
            min-height: 44px;
            background: rgba(0, 0, 0, .5);
            border-radius: 6px;
            margin-bottom: 10px;
            padding: 10px 22px;
            box-sizing: border-box;
            width: auto;
            max-width: 360px;
            display: block;
            .bulletScreen-name {
                text-align: right;
                color: rgba(105, 183, 255, 1);
            }
            .bulletScreen-main {
                max-width: 352px;
                word-break: normal;
                color: #ffffff;
            }
        }
    }
    .title {
        padding-bottom: 10px;
        .flex(space-between, center);
        .p {
            .fontStyle(18px, #000, blod);
            padding-left: 10px;
            flex: 1;
        }
        .icon-close {
            color: #c5c6c8;
        }
    }
    .box {
        border-radius: 6px;
        background-color: #fff;
        flex: 1;
        .flex();
        flex-direction: column;
        .top,
        .bottom {
            padding: 14px 20px;
            padding-right: 0px;
            box-sizing: border-box;
        }
        .top {
            height: 0;
            flex: 1;
            .time {
                font-size: 14px;
                font-weight: 400;
                color: rgba(153, 153, 153, 1);
                text-align: center;
                margin-bottom: 12px;
            }
            .topBox {
                height: 85%;
                overflow-y: overlay;
                padding-right: 20px;
                box-sizing: border-box;

            }
            .myScroll(topBox)
        }
        .msgBox {
            .ME-msg {
                text-align: right;
                padding-right: 10px;
                box-sizing: border-box;
            }
            .msg {
                margin-bottom: 16px;
            }
            .msgBox-name {
                font-size: 14px;
                font-weight: 400;
                color: rgba(153, 153, 153, 1);
            }
            .msgBox-content {
                font-size: 16px;
                word-wrap: break-word;
                font-weight: 400;
                color: rgba(24, 24, 24, 1);
                margin-top: 4px;
            }
        }
        .line {
            border-bottom: 2px solid #f4f4f4;
        }
        .bottom {
            height: 136px;
            padding-right: 20px;
            box-sizing: border-box;
            .flex(flex-start, flex-end);
            flex-direction: column;
            textarea {
                border: none;
                resize: none;
                width: 100%;
                outline: none;
                flex: 1;
                margin-bottom: 5px;
            }
            button {
                background-color: #118BFB;
                border-radius: 4px;
                border: none;
                width: 70px;
                height: 30px;
                color: #fff;
            }
        }
    }
</style>

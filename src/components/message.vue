<template>
    <div class="bigBox">
        <div class="title">
            <p class="p">消息(<span>{{message.length}}</span>)</p>
            <i class="font_family icon-close" @click="$emit('handleMessage')"></i>
        </div>
        <div class="box">
            <div class="top">
                <!-- <div class="time">{{time}}</div> -->
                <div class="topBox" ref="topBox">
                    <div ref="topBox_">
                        <div class="msgBox" v-for="itme in message">
                            <div v-if="itme.uid != meetingInfo.mine.uid" class="msg rests_msg">
								<div class="user_name-time">
									<div class="msgBox-name">{{itme.name}}</div>
									<span class="msg_time">{{itme.time}}</span>
								</div>

                                <div class="msgBox-content others_content">{{itme.text}}</div>
                            </div>
                            <div v-if="itme.uid == meetingInfo.mine.uid" class="ME-msg msg">
                                <div class="msgBox-name"><span class="msg_time my_time">{{itme.time}}</span>{{itme.name}}</div>
                                <div class="msgBox-content my_content">{{itme.text}}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="line"></div>
            <div class="bottom" @keydown.enter="send_msg">
				<div class="send_box">
					<div class="textarea_box"><textarea class="textarea" wrap="virtual" maxlength="70" placeholder="在此处输入消息…" rows="3" v-model="msgContent"></textarea></div>
					<button :disabled=disabled @click="send_msg()">
						<i class="font_family icon-fasong" ></i><br>
						{{msgContent.length}}/70
					</button>
				</div>
            </div>
        </div>
    </div>
</template>
<script>
    import antiquity from "../utils/Antiquity";
    export default {
        props: ["barrage", "meetingInfo", "message"],
        data() {
            return {
                time: '',
                msgContent: '',
				height:''
            }
        },
        mounted() {
            this._time()
        },
		watch:{
			message: function () {
			    this.Talk(2)
                const newArr = [
                    this.message[this.message.length - 3],
                    this.message[this.message.length - 2],
                    this.message[this.message.length - 1]
                ];
                this.$emit('handleMsg', newArr)
            }
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
            }
        },
        methods: {
            Talk(type) {
				this.height = parseInt(this.$refs.topBox.scrollTop + this.$refs.topBox.clientHeight)
                // 自己发消息时触发
				if (type == 1){
					setTimeout(() => {
					    this.$refs.topBox.scrollTop = this.$refs.topBox_.offsetHeight;
					}, 100)
				}else if(type == 2 && this.$refs.topBox.scrollHeight == this.height){
					setTimeout(() => {
					    this.$refs.topBox.scrollTop = this.$refs.topBox_.offsetHeight;
					}, 100)
				}
            },
            send_msg() {
                this.Talk(1);
				event.preventDefault()
				if(!Base64.encode(this.msgContent)){
					return
				}
                antiquity.ajax.broadcast({
                    "mid": this.meetingInfo.id,
                    "text": Base64.encode(this.msgContent)
                }).then((res) => {
                    this.message.push({
                        name: this.meetingInfo.mine.name,
                        text: this.msgContent,
                        uid: this.meetingInfo.mine.uid,
						time:this._time()
                    });
                    this.msgContent = ''
                })
            },
            // 实时获取当前电脑时间
            _time() {
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
            },
        }
    }
</script>
<style lang="less" scoped>
    @import "../common/common";
	.rests_msg{
		padding-left: 16px;
		padding-right: 40px;
		box-sizing: border-box;
		letter-spacing: 1px;
	}
	.my_time{
		margin-right: 8px;
	}
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
		height: 48px;
		padding-right: 8px;
		box-sizing: border-box;
        .flex(space-between, center);
        .p {
			cursor:pointer;
            .fontStyle(18px, #000, blod);
            padding-left: 16px;
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
            padding: 20px 0;
            padding-right: 0px;
            box-sizing: border-box;
        }
        .top {
            height: 0;
			min-height: 88px;
            flex: 1;
            .time {
				padding-right: 20px;
				box-sizing: border-box;
                font-size: 14px;
                font-weight: 400;
                color: rgba(153, 153, 153, 1);
                text-align: center;
                margin-bottom: 12px;
            }
            .topBox {
                height: 100%;
                overflow-y: overlay;
                // padding-right: 20px;
                // box-sizing: border-box;

            }
            .myScroll(topBox)
        }
        .msgBox {
			.msg_time{
				color: #BBBBBB;
				margin-left: 10px;
				font-size: 12px;
				font-weight: 400;
			}
            .ME-msg {
                text-align: right;
                padding-right: 16px;
				padding-left: 40px;
                box-sizing: border-box;
            }
            .msg {
                margin-bottom: 16px;
				box-sizing: border-box;
            }
			.user_name-time{
				display: flex;
				justify-content: flex-start;
				align-items: center;
			}
            .msgBox-name {
				font-size:12px;
				font-weight:600;
				color:#555555;
				// border: 1px solid red;
				white-space: nowrap;
				overflow: hidden;
				text-overflow: ellipsis;
            }
            .msgBox-content {
                font-size: 16px;
                word-wrap: break-word;
                font-weight: 400;
                color: rgba(24, 24, 24, 1);
                margin-top: 4px;
				white-space:normal;
				word-break:break-all;
            }
			.others_content{
				background:rgba(244,244,244,1);
				border-radius:4px;
				padding: 8px 12px;
				box-sizing: border-box;
				font-size:13px;
				font-weight:400;
				color:rgba(68,68,68,1);
				display: inline-block;
			}
			.my_content{
				text-align: left;
				// height:36px;
				background:rgba(17,165,251,1);
				border-radius:4px !important;
				font-size:13px;
				font-weight:400;
				color:rgba(255,255,255,1);
				display: inline-block;
				padding: 8px 12px;
				box-sizing: border-box;
				line-height: 20px;
				letter-spacing: 1px;
			}
        }
        .line {
            border-bottom: 2px solid #f4f4f4;
        }
        .bottom {
            height: 84px;
			padding: 8px;
            box-sizing: border-box;
            .flex(flex-start, flex-end);
            flex-direction: column;
			.send_box{
				width: 100%;
				height: 100%;
				display: flex;
				justify-content: flex-end;
				align-items:center;
				border-radius:5px;
				overflow: hidden;
				.textarea_box{
					width: 256px;
					height: 100%;
					background: #F0F0F0;
					border-radius:5px 0 0 5px;
					padding: 5px 12px;
					box-sizing: border-box;
					// border:1px solid rgba(17,139,251,1);
				}
			}
            textarea {
				width: 100%;
				height: 100%;
				background: #F0F0F0;
                border: none;
                resize: none;
                outline: none;
				overflow: hidden;
				overflow-y: hidden;
				font-size:14px;
				font-family:PingFangSC-Regular,PingFang SC;
				font-weight:400;
				color:rgba(51,51,51,1);
                // flex: 1;
            }
            button {
				width: 48px;
				height: 100%;
				background:linear-gradient(180deg,rgba(47,184,255,1) 0%,rgba(17,139,251,1) 100%);
                border: none;
                color: #fff;
            }
        }
    }
	textarea::-webkit-input-placeholder{
	  color:#BBBBBB;
	}
	textarea::-moz-placeholder{
	  color:#BBBBBB;
	}
	textarea:-moz-placeholder{
	  color:#BBBBBB;
	}
	textarea:-ms-input-placeholder{
	  color:#BBBBBB;
	}
	button:disabled i{
		color: #70b9fc !important;
	}
	button[disabled] {
	  color: #70b9fc !important;
	  cursor:default;
	}
</style>

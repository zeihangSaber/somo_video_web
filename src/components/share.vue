<template>
    <div class="big-box" v-if="isShowShare_">
        <div class="share-pop-up">
			<div class="close" @click="$emit('share_status')"><i class="font_family icon-close"></i></div>
            <div class="title">会议邀请码</div>
            <div :class="shareData.password?'num-password':'num-password-act'">
				<div class="meeting-num">{{ shareData.mid }}</div>
				<div class="meeting-password" v-if="shareData.password">会议密码：{{ shareData.password }}</div>
				
			</div>
            <div class="foot_box">
				<button class="ml10 invite-btn" type="text" size="medium"
				           v-clipboard:copy="sysAppIds"
				           v-clipboard:success="onCopy"
				           v-clipboard:error="onError">邀请
				</button>
                <div class="hint">复制并分享邀请码，其他人可通过邀请码加入会议</div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                // sysAppIds:''
				status:''
            };
        },
		computed:{
			// http://www.somo.tech/openApp
			sysAppIds(){
				let data = '您好：' + '\n'
                + '蓝猫微会视频会议正在进行中，特邀请您参加。' + '\n'
                + '会议号：' + this.shareData.mid +  '\n'
                + '会议链接：https://182.61.17.228/sharePage?invite_code=' + this.shareData.mid +  '\n'
                + '您可以直接输入会议号加入会议， 也可以点击会议链接直接入会。'
				return data
			}
		},
        props: ['shareData','isShowShare_'],
        methods: {
			_close(){
				this.$emit('status',false)
				// this.status = false
			},
            // 复制成功
            onCopy(e){
                this.$Toast.success({message: '邀请链接已复制到剪贴板'});
            },
            // 复制失败
            onError(e){
                this.$Toast.success({message: '复制失败'});
            },
        }
    };
</script>

<style scoped>
	.num-password-act{
		height: 65px;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.num-password{
		height: 65px;
	}
	.close{
		color: #FFFFFF;
		position: absolute;
		top: 20px;
		right: 20px;
	}
    .foot_box{
        width: 100%;
        position: absolute;
        bottom: 15px;
    }
    .hint {
        margin-top: 24px;
        margin-bottom: 32px;
        font-size:12px;
        font-weight:400;
        color:rgba(153,153,153,1);
    }
    .meeting-password {
        font-size:16px;
        font-weight:400;
        color:rgba(102,102,102,1);
        margin-top: 4px;
    }
    .meeting-num {
        font-size:32px;
        font-weight:600;
        color:rgba(17,139,251,1);
    }
    .title {
        font-size:20px;
        font-weight:500;
        color:rgba(51,51,51,1);
        margin-bottom: 12px;
    }
    .invite-btn {
		width:200px;
		height:32px;
		background:linear-gradient(180deg,rgba(47,184,255,1) 0%,rgba(17,139,251,1) 100%);
		border-radius:24px;
		font-size:16px;
		font-family:PingFangSC-Regular,PingFang SC;
		font-weight:400;
		color:rgba(255,255,255,1);
        outline: none;
        border: none;
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 0 auto;
    }
    .share-pop-up {
        width:379px;
        height:285px;
        background: #FFFFFF;
        border-radius: 8px;
        text-align: center;
        padding: 48px 0;
        box-sizing: border-box;
        position: relative;
		z-index: 1000;
    }
    .big-box {
        width: 100%;
        height: 100%;
        /* background: pink; */
        position: absolute;
        top: 0;
        left: 0;
        display: flex;
        justify-content: center;
        align-items: center;
    }
</style>

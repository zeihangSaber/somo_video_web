<template>
    <div class="big-box">
        <div class="share-pop-up">
            <div class="title">会议邀请码：</div>
            <div class="meeting-num">{{ shareData.mid }}</div>
            <div class="meeting-password" v-if="shareData.password">会议密码：{{ shareData.password }}</div>
            <div class="foot_box">
                <div class="hint">复制并分享邀请码，其他人可通过邀请码加入会议</div>
                <button class="ml10 invite-btn" type="text" size="medium"
                           v-clipboard:copy="sysAppIds"
                           v-clipboard:success="onCopy"
                           v-clipboard:error="onError">邀请
                </button>
            </div>
        </div>
    </div>
</template>

<script>

    export default {
        data() {
            return {
                sysAppIds:''
            };
        },
        mounted() {
            this.sysAppIds = '您好：' + '\n'
                + '蓝猫微会视频会议正在进行中，特邀请您参加。' + '\n'
                + '会议号：' + this.shareData.mid +  '\n'
                + '会议链接：http://www.somo.tech/openApp?invite_code=' + this.shareData.mid +  '\n'
                + '您可以直接输入会议号加入会议， 也可以点击会议链接直接入会。'
        },
        props: ['shareData'],
        methods: {
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
    .foot_box{
        width: 100%;
        position: absolute;
        bottom: 48px;
    }
    .hint {
        margin-top: 24px;
        margin-bottom: 32px;
        font-size: 16px;

        font-weight: 400;
        color: rgba(221, 221, 221, 1);
    }
    .meeting-password {
        font-size: 24px;

        font-weight: 400;
        color: rgba(255, 255, 255, 1);
        margin-top: 8px;
    }
    .meeting-num {
        font-size: 54px;
        font-family: PingFangSC-Semibold, PingFang SC;
        font-weight: 600;
        color: rgba(255, 255, 255, 1);
    }
    .title {
        font-size: 24px;
        font-weight: 400;
        color: rgba(255, 255, 255, 1);
        margin-bottom: 24px;
    }
    .invite-btn {
        width: 155px;
        height: 48px;
        background: rgba(17, 139, 251, 1);
        border-radius: 4px;
        font-size: 20px;
        outline: none;
        border: none;
        font-weight: 400;
        color: rgba(255, 255, 255, 1);
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 0 auto;
    }
    .share-pop-up {
        width: 556px;
        height: 390px;
        background: rgba(0, 0, 0, 0.79);
        border-radius: 8px;
        text-align: center;
        padding: 48px 0;
        box-sizing: border-box;
        position: relative;
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

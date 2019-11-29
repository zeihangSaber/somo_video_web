<template>
    <div>
        <div class="join">
            <div class="join_box">
                <div class="left_img"></div>
                <div class="right_box">
                    <div class="join_title">加入一场会议</div>
                    <div class="conference_num">
                        <img src="../assets/JoinConference/2.png" />
                        <input
                            id="conference_num"
                            v-model="conference_num"
                            type=""
                            name=""
                            value=""
                            placeholder="请输入会议号"
                        />
                        <span class="required">*必填</span>
                    </div>
                    <div
                        class="conference_num"
                        style="justify-content: flex-start;"
                    >
                        <img
                            style="width: 30px;height: 30px;"
                            src="../assets/JoinConference/3.png"
                        />
                        <div class="conference_password">
                            <input
                                id="conference_password"
                                v-model="conference_password"
                                type=""
                                name=""
                                value=""
                                placeholder="请输入会议密码"
                            />
                            <div>未加密则无需输入</div>
                        </div>
                    </div>
                    <div class="conference_num">
                        <img
                            style="width: 30px;height: 30px;"
                            src="../assets/JoinConference/4.png"
                        />
                        <input
                            id="conference_name"
                            v-model="conference_name"
                            type=""
                            name=""
                            value=""
                            placeholder="请输入会议中的昵称"
                        />
                        <span class="required">*必填</span>
                    </div>
                    <div class="hint">
                        所有错误提示具体文案详见产品文档，样式见此
                    </div>
                    <div class="join_btn" @click="JoinConference_btn()">
                        加入会议
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Somo_ajax from "../utils/ajax";
import { State } from "vuex-class";
@Component
export default class JoinConference extends Vue {
    private conference_num = "";
    private conference_password = "";
    private conference_name = "";
    @State login_status: boolean;
    $md5: (str: string) => string;
    created() {
        console.log("vue=", this.$md5);
    }
    JoinConference_btn() {
        if (this.login_status) {
            console.log("可以加入");
        } else {
            alert("请先登录");
        }
    }
}
</script>

<style lang="less" scoped>
.join_btn {
    height: 68px;
    background: linear-gradient(
        141deg,
        rgba(96, 177, 255, 1) 0%,
        rgba(24, 115, 255, 1) 88%,
        rgba(23, 114, 255, 1) 100%
    );
    border-radius: 4px;
    font-size: 24px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: rgba(255, 255, 255, 1);
    line-height: 68px;
    text-align: center;
}

.right_box {
    width: 894px;
    height: 100%;
    padding: 0 195px;
    box-sizing: border-box;
    text-align: center;

    .join_title {
        font-size: 36px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: rgba(48, 131, 251, 1);
        margin-top: 80px;
        margin-bottom: 70px;
    }

    .hint {
        font-size: 16px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: rgba(255, 96, 89, 1);
        margin-top: 20px;
        margin-bottom: 36px;
    }
}

.join_box {
    width: 1292px;
    height: 770px;
    background: #ffffff;
    margin-top: 80px;
    margin-bottom: 121px;
    display: flex;
    justify-content: flex-start;
    align-items: center;

    .left_img {
        width: 398px;
        height: 100%;
        background-image: url(../assets/JoinConference/1.png);
        background-repeat: no-repeat;
        background-size: 100% 100%;
    }

    .conference_num > input {
        width: 380px;
        padding-bottom: 12px;
        box-sizing: border-box;
        border-bottom: 1px solid #cccccc;
        margin: 0 25px;
        font-size: 22px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
    }

    .conference_num > img {
        width: 23px;
        height: 15px;
    }

    .conference_num {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 45px;

        .required {
            font-size: 16px;
            font-family: PingFangSC-Medium, PingFang SC;
            font-weight: 500;
            color: rgba(204, 204, 204, 1);
        }

        .conference_password > div {
            font-size: 16px;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: rgba(153, 153, 153, 1);
        }

        .conference_password > input {
            width: 100%;
            padding-bottom: 12px;
            box-sizing: border-box;
            border-bottom: 1px solid #cccccc;
            font-size: 22px;
            font-family: PingFangSC-Medium, PingFang SC;
            font-weight: 500;
        }

        .conference_password {
            width: 380px;
            margin: 0 25px;
            text-align: left;
        }
    }
}

.join {
    width: 100%;
    background: #f5f5f5;
    display: flex;
    justify-content: center;
    align-items: center;
}

input {
    outline: none;
}
</style>

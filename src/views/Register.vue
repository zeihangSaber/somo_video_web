<template>
    <div id="register">
        <div id="somo-title">
            <div class="register_title">
                <img src="../assets/register/register_title.png" />
            </div>
            <div class="resign">
                <img src="../assets/register/resign.png" />
                <span>注册后方可发起会议</span>
            </div>
        </div>
        <div id="somo-form" action="" method="POST">
            <div class="form-option">
                <p>姓名</p>
                <label for="name">
                    <input
                        class="required-label"
                        name="name"
                        type="text"
                        autocomplete="off"
                        placeholder="请输入中文、英文和数字"
                        v-model="name"
                    />
                </label>
            </div>
            <div class="form-option">
                <p>手机号/邮箱</p>
                <label for="account">
                    <input
                        class="required-label"
                        name="account"
                        type="text"
                        autocomplete="off"
                        placeholder="请输入手机号码或者邮箱"
                        v-model="account"
                    />
                </label>
            </div>
            <div class="form-option">
                <p>验证码</p>
                <div class="get-code">
                    <label for="code" style="width: 156px">
                        <input
                            class="required-label"
                            name="code"
                            type="text"
                            autocomplete="off"
                            placeholder="验证码"
                            v-model="code"
                        />
                    </label>
                    <button
                        id="get-code"
                        class="get-codeBtn"
                        @click="getCode($event)"
                        v-text="getCodeText"
                        :class="countdown < 60 ? 'countdown' : ''"
                    ></button>
                </div>
            </div>
            <a id="commit" @click="register">
                立即试用
                <img src="../assets/register/right.png" />
            </a>
            <a id="clause" href="view/clause.html" style="color:#666666; ">
                <p class="tk">注册即代表同意隐私条款</p>
            </a>
        </div>
    </div>
</template>

<script lang="ts">
import Somo_ajax from "@/utils/ajax";
import { Component, Vue } from "vue-property-decorator";
@Component
export default class Register extends Vue {
    private name: string = "";
    private account: any = "";
    private code: string = "";
    //账号类型(手机或邮箱)
    private accountKid: string = "";
    private getCodeText: string = "获取验证码";
    private countdown: number = 60;
    private countDownTime: number = 0;

    //账号验证
    accoutReg(account: any) {
        if (account == "" || account == undefined) {
            alert("手机号码或者邮箱不能为空！");
            return false;
        }
        if (account.indexOf("@") >= 0 || !account.match(/^\d/)) {
            if (!account.match(/^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/)) {
                alert("邮箱格式有错！");
                return false;
            }
            this.accountKid = "email";
            console.log("邮箱");
        } else {
            if (
                !account.match(/^\d{11}$/) &&
                !account.match(/^[0-9]{4}'\-'?[0-9]{7}$/) &&
                !account.match(/^[0-9]{3}'\-'?[0-9]{8}$/)
            ) {
                alert("手机号不正确！");
                return false;
            } else {
                this.accountKid = "mobile";
            }
        }
    }
    //获取验证码
    getCode(e: any): void {
        this.accoutReg(this.account);
        if (this.accountKid === "email") {
            Somo_ajax.regCode({
                email: this.account
            })
                .then((res: object): void => {
                    alert("验证码已发送成功！");
                    this.countDown(e);
                })
                .catch((): void => {
                    alert("验证码发送失败，请重新发送");
                });
        } else if (this.accountKid === "mobile") {
            Somo_ajax.regCode({
                mobile: this.account
            })
                .then((res: object): void => {
                    alert("验证码已发送成功！");
                    this.countDown(e);
                })
                .catch((): void => {
                    alert("验证码发送失败，请重新发送");
                });
        }
    }
    //注册
    register() {
        if (this.name == "" || this.name == undefined) {
            alert("姓名不能为空！");
            return false;
        }
        if (this.account == "" || this.account == undefined) {
            alert("手机号或邮箱不能为空！");
            return false;
        }
        if (this.code == "" || this.code == undefined) {
            alert("验证码不能为空！");
            return false;
        }
        if (this.accountKid === "email") {
            Somo_ajax.register({
                name: this.name,
                email: this.account,
                code: this.code
            })
                .then((res: object): void => {
                    alert("注册成功！");
                    console.log(res);
                })
                .catch(() => {
                    alert("验证码错误或已过期");
                });
        } else if (this.accountKid === "mobile") {
            Somo_ajax.register({
                name: this.name,
                mobile: this.account,
                code: this.code
            })
                .then((res: object): void => {
                    alert("注册成功！");
                    console.log(res);
                })
                .catch(() => {
                    alert("验证码错误或已过期");
                });
        }
    }
    //倒计时
    countDown(e: any): void {
        this.getCodeText = "59s";
        --this.countdown;
        e.target.disabled = true;
        this.countDownTime = setInterval((): void => {
            if (this.countdown === 1) {
                this.getCodeText = "获取验证码";
                this.countdown = 60;
                e.target.disabled = false;
                clearInterval(this.countDownTime);
            } else {
                --this.countdown;
                this.getCodeText = `${this.countdown}s`;
            }
        }, 1000);
    }
    destroyed() {
        clearInterval(this.countDownTime);
    }
}
</script>

<style lang="less" scoped>
@import "../common/common.less";
#register {
    width: 692px;
    margin: 0 auto;
    padding: 115px 0;
    .flex-option(column, flex-start, center);
    #somo-title {
        .register_title {
            width: 148px;
            margin: 0 auto;
            border-bottom: 1px solid #dedede;
            padding-bottom: 8px;
            margin-bottom: 32px;
            img {
                margin: 0 auto;
                display: block;
            }
        }
        .resign {
            text-align: center;
            font-size: 12px;
            color: #666666;
            margin-bottom: 17px;
            img {
                display: block;
                margin: 0 auto;
                margin-bottom: 10px;
            }
        }
    }
    #somo-form {
        .flex-option(column, center, center);
        .form-option {
            width: 250px;
            margin-bottom: 15px;
            p {
                font-weight: normal;
                font-size: 12px;
                margin-bottom: 10px;
            }
            .required-label {
                width: 100%;
                height: 38px;
                border: 1px solid #ccc;
                padding-left: 10px;
            }
            .get-code {
                .flex-option(row, space-between, center);
                width: 100%;
                .get-codeBtn {
                    cursor: pointer;
                    outline: none;
                    border: 0;
                    width: 87px;
                    height: 40px;
                    background-color: #f5a00f;
                    text-align: center;
                    color: #fff;
                    line-height: 40px;
                    font-size: 12px;
                }
            }
        }
        #commit {
            cursor: pointer;
            width: 190px;
            height: 45px;
            background-image: linear-gradient(#2f84fb, #2f84fb), linear-gradient(#009aff, #009aff);
            background-blend-mode: normal, normal;
            border-radius: 10px;
            line-height: 45px;
            color: #fff;
            font-size: 18px;
            display: flex;
            margin: 0 auto;
            align-items: center;
            justify-content: center;
            margin-top: 32px;
            margin-bottom: 20px;
            img {
                margin-left: 10px;
            }
        }
        .tk {
            font-size: 12px;
            color: #666666;
            margin-bottom: 58px;
            text-align: center;
        }
    }
}

.locked {
    overflow: hidden;
}

input::-ms-clear {
    display: none;
}

.visiable {
    opacity: 1 !important;
}

.countdown {
    background-color: #ccc !important;
    color: #000 !important;
}
</style>

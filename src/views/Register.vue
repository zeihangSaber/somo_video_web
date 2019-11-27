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
                        />
                    </label>
                    <button id="get-code" class="get-codeBtn">
                        获取验证码
                    </button>
                </div>
            </div>
            <a id="commit">
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
import { Component, Vue } from "vue-property-decorator";
@Component
export default class Register extends Vue {}
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
            width: 190px;
            height: 45px;
            background-image: linear-gradient(#2f84fb, #2f84fb),
                linear-gradient(#009aff, #009aff);
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

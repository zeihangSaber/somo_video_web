<template>
    <div class="home-page">
        <section class="banner">
            <div class="h2">蓝猫微会，新一代视频会议</div>
            <div class="h3">
                简单易用，稳定可靠，价格厚道的视频会议产品
            </div>
            <button type="button" class="btn">
                立即注册，免费试用
            </button>
        </section>

        <section class="first_column">
            <div class="con">
                <div class="first_content">
                    <h2>支持全平台的云会议室</h2>
                    <p>
                        支持手机、iPad、电脑、电视、小程序等多终端接入 <br />
                        帮助您随时随地用任何终端开一场视频会议
                    </p>
                </div>
            </div>
        </section>

        <section class="second_column">
            <div class="con">
                <div class="second_content">
                    <h2>高品质的硬件</h2>
                    <p>
                        视频会议主机和摄像头集成，无需拉专线 <br />
                        智能检测与升级，自助式安装部署<br />
                        1080P全高清视频画质，智能网络自适应<br />
                        AEC/AGC/LPF语音技术，确保高质量音频传输<br />
                        抗30%网络丢包
                    </p>
                </div>
            </div>
        </section>

        <section class="thirdly_column">
            <div class="con">
                <div class="thirdly_content">
                    <h2>极简的使用体验</h2>
                    <p>
                        从开箱到开会5分钟 <br />
                        一键发起和参加会议<br />
                        无需专人维护
                    </p>
                </div>
            </div>
        </section>

        <section class="fourthly_column">
            <h2>为什么选择蓝猫微会</h2>
            <ul>
                <li>
                    <div class="img">
                        <img src="../assets/home/fourthly_column_1.png" />
                    </div>
                    <span>厚道的价格</span>
                </li>
                <li>
                    <div class="img">
                        <img src="../assets/home/fourthly_column_2.png" />
                    </div>
                    <span>稳定可靠的音视频质量</span>
                </li>
                <li>
                    <div class="img">
                        <img src="../assets/home/fourthly_column_3.png" />
                    </div>
                    <span>极简的使用体验</span>
                </li>
            </ul>
        </section>

        <section class="fifth_column">
            <h2 class="wow fadeInDown">马上体验，发起一场视频会议</h2>
            <button type="button wow fadeInUp" class="btn" id="go-register2">
                立即注册，免费试用
            </button>
        </section>
    </div>
</template>

<script lang="ts">
// @ is an alias to /src
import HeaderTab from "@/components/HeaderTab.vue";
import Vue from "vue";
import { Component } from "vue-property-decorator";
@Component
export default class Home extends Vue {
    name: string = "home";
    created() {
        // this.$somo.actList();
        // console.log(this.$somo);
        // this.$somo.join();
    }
}
</script>

<style lang="less" scoped>
@import "../common/common.less";
.home-page {
    .banner {
        height: 615px;
        background: url(../assets/home/home_header.jpg) no-repeat;
        background-size: cover;
        background-position: center;
        background-attachment: fixed;
        .flex-option(column, center, center);
        height: 615px;
        text-align: center;
        background-attachment: fixed;
        .h2 {
            color: #fff;
            font-size: 64px;
        }
        .h3 {
            font-size: 24px;
            color: #fff;
            margin-top: 46px;
            margin-bottom: 72px;
        }
    }
    .first_column {
        .con {
            padding: 111px 0;
            background: url(../assets/home/first_column.jpg) no-repeat;
            background-position: right 111px;
            height: 703px;
            .first_content {
                h2 {
                    font-size: 36px;
                    color: #333;
                    font-weight: normal;
                    margin-bottom: 35px;
                }
                p {
                    color: #666;
                    font-size: 18px;
                    line-height: 40px;
                }
            }
        }
    }
    .second_column {
        background: url(../assets/home/second_column_Bg.jpg) no-repeat;
        background-size: cover;
        background-position: center;
        .con {
            height: 703px;
            background: url(../assets/home/second_column.png) no-repeat;
            background-position: -252px -401px;
            position: relative;
            .second_content {
                position: absolute;
                right: 0;
                top: 124px;
                text-align: right;
                h2 {
                    font-size: 36px;
                    color: #333;
                    font-weight: normal;
                    margin-bottom: 35px;
                }
                p {
                    color: #666;
                    font-size: 18px;
                    line-height: 40px;
                }
            }
        }
    }
    .thirdly_column {
        .con {
            padding: 111px 0;
            background: url(../assets/home/thirdly_column.jpg) no-repeat;
            background-position: right 111px;
            height: 703px;
            .thirdly_content {
                h2 {
                    font-size: 36px;
                    color: #333;
                    font-weight: normal;
                    margin-bottom: 35px;
                }
                p {
                    color: #666;
                    font-size: 18px;
                    line-height: 40px;
                }
            }
        }
    }
    .fourthly_column {
        background: #e6eef8;
        padding: 78px 0;
        text-align: center;
        h2 {
            color: #333333;
            font-size: 36px;
            margin-bottom: 78px;
            font-weight: normal;
            text-align: center;
        }
        ul {
            display: flex;
            justify-content: center;

            li {
                margin: 0 100px;
                list-style: none;
                .img {
                    margin-bottom: 28px;
                    margin: 0 auto;
                    margin-bottom: 34px;
                    height: 77px;
                    text-align: center;
                    img {
                        margin: 0 auto;
                    }
                }
                span {
                    font-size: 18px;
                    color: #333;
                }
            }
        }
    }
    .fifth_column {
        height: 318px;
        background: url(../assets/home/fifth_column.jpg) no-repeat;
        background-size: cover;
        background-position: center;
        text-align: center;
        display: flex;
        align-items: center;
        flex-direction: column;
        justify-content: center;

        h2 {
            font-size: 36px;
            font-weight: normal;
            color: #fff;
            margin-bottom: 43px;
        }
    }
    .btn {
        width: 366px;
        height: 58px;
        background: #f5a00e;
        border-radius: 30px;
        text-align: center;
        font-size: 30px;
        color: #fff;
        line-height: 58px;
        transition: 0.3s;
        border: 0px;
        text-decoration: none;
    }
    .btn:hover {
        background: #f58b0e;
        transition: 0.3s;
    }
}
</style>

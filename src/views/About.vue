<template>
    <div>
        <div id="about">
            <div class="lbanner"></div>
            <div class="con ab">
                <h2 class="title">
                    关于我们
                    <span>ABOUT US</span>
                </h2>
                <div class="txt">
                    厦门未来信通科技有限公司（蓝猫微会）是新一代视频会议服务商，源自美团、YY语音团队，致力于彻底解决企业的视频会议需求。<br />
                    基于十年实时音视频核心技术的积累，蓝猫微会将致力于研发稳定可靠的视频会议产品，用厚道的价格和极简的使用体验，帮助客户轻松召开远程会议，提高效率和降低成本。<br />
                    蓝猫微会核心技术团队在实时音视频领域具有近10年的技术和运营经验，能够支撑千万级并发和百亿级日均消息量，是国内掌握实时音视频核心技术的极少数团队之一。<br />
                    蓝猫微会创立于2019年3月，获得红杉资本中国基金和字节跳动的天使投资，8月获得真格基金领投、九合创投跟投的PRE-A轮投资。
                </div>
                <div class="contact">
                    <p>热线：400-692-0206</p>
                    <p>邮箱：sales#somo.tech（将#换成@）</p>
                    <p>微信公众号：蓝猫微会</p>
                    <p>
                        公司地址：福建省厦门市思明区软件园二期望海路65号之一701-3
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
@Component
export default class About extends Vue {}
</script>

<style lang="less" scoped>
@mixin inTheMiddle {
    left: 50%;
    transform: translate(-50%, 0);
}

html,
body,
.openapp-page {
    height: 100%;
}

body {
    font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB",
        "Heiti SC", "Microsoft YaHei", "微软雅黑", "San francisco", Arial,
        sans-serif;
    -webkit-font-smoothing: antialiased;
    overflow-x: hidden;
}

* {
    margin: 0;
    padding: 0;
}

#about {
    .lbanner {
        background: url(../assets/we/q.png) no-repeat;
        height: 233px;
        background-position: center center;
        background-size: cover;
    }
    .con {
        width: 1200px;
    }
    .ab {
        margin: 0 auto;
        margin: 68px auto;
        margin-bottom: 100px;
        .title {
            color: #2f84fb;
            font-weight: normal;
            margin-bottom: 50px;
            font-size: 36px;
            span {
                color: #a0a1a2;
                font-size: 14px;
                position: relative;
                top: 3px;
                margin-left: 11px;
            }
        }
        .txt {
            font-size: 14px;
            font-weight: normal;
            font-stretch: normal;
            line-height: 2;
            letter-spacing: 1px;
            color: #666666;
        }
        .contact {
            font-size: 12px;
            margin-top: 30px;
            font-weight: normal;
            font-stretch: normal;
            color: #666666;
            height: 85px;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            background: url(../assets/we/ewm.png) no-repeat;
            background-position: left center;
            padding-left: 100px;
        }
    }
}
</style>

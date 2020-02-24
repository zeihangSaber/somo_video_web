<template>
    <div class="myAside" v-if="showSide">
        <div class="foot">
            <transition enter-active-class="animated slideInRight faster" leave-active-class="animated slideOutRight faster">
                <party :data="meetingInfo"></party>
            </transition>
            <transition enter-active-class="animated slideInRight faster" leave-active-class="animated slideOutRight faster">
                <message :meetingInfo="meetingInfo"></message>
            </transition>
        </div>
    </div>
</template>
<script>
import Message from "./message"
import Party from "./party"
export default {
    name: "side",
    props: {
        meetingInfo: {
            default() {
                return {
                    control: false
                }
            }
        },
        showSide: Boolean
    },
    components: { Message, Party },
    data() {
        return {

        }
    }
}
</script>
<style lang="less" scoped>
@import "../common/common";
.myAside {
    width: 320px !important;
    background-color: #f4f4f4;
    height: 100%;
	margin-left: 12px;
    .flex(space-around, flex-start);
    flex-direction: column;
    .head {
		display: none !important;
        height: 100px;
        width: 100%;
        padding: 20px;
        background-color: #fff;
        .flex(flex-start, flex-start);
        .volce {
            flex: 1;
            height: 100%;
            .flex(space-around, flex-start);
            flex-direction: column;
            .name {
				font-size:22px;
				font-family:PingFangSC-Medium,PingFang SC;
				font-weight:500;
				color:rgba(0,0,0,1);
                padding-right: 20px;
            }
            .info {
				font-size:14px !important;
				font-family:PingFangSC-Medium,PingFang SC;
				font-weight:500 !important;
				color:rgba(0,0,0,1) !important;
                .fontStyle(14px, #000, blod);
                .code {
                    padding-right: 20px;
                }
            }
        }
        .myImg {
            width: 90px;
            height: 60px;
            border-radius: 4px;
            background-size: cover;
        }
    }
    .foot {
        height: 100%;
        // padding: 15px 16px;
        width: 100%;
        overflow: hidden;
        .flex();
        flex-direction: column;
        .bigBox {
            flex: 1;
            .flex();
            flex-direction: column;
        }
    }
}
</style>

<template>
    <div class="myAside">
        <div class="head">
            <div class="volce">
                <p class="name" v-show="this.data.name">{{ this.data.name }}</p>
                <p class="info">
                    <span class="code">会议号：{{this.data.code}}</span>
                    <span v-if="data.pwd">密码：{{this.data.pwd}}</span>
                </p>
            </div>
            <!-- <div class="myImg" :style="`background-image: url(${data.avarter ? data.avarter : ''});`"></div> -->
        </div>
        <div class="foot">
            <transition enter-active-class="animated bounceInRight faster" leave-active-class="animated bounceOutRight faster">
                <party v-if="showParty" :data="data" @handleParty="() => $emit('handleParty')" :members="members" :hasControl="data.control"></party>
            </transition>
            <transition enter-active-class="animated bounceInUp faster" leave-active-class="animated bounceOutDown faster">
                <message v-if="showMessage" @handleMessage="() => $emit('handleMessage')" :barrage="barrage" :meetingInfo="data" :message="message"></message>
            </transition>
        </div>
    </div>
</template>
<script>
import Message from "./message"
import Party from "./party"
export default {
    name: "side",
    props: ["data", "members", "showMessage", "showParty", "barrage", "message"],
    components: {Message, Party},
    data() {
        return {

        }
    }
}
</script>
<style lang="less" scoped>
@import "../common/common";
.myAside {
    width: 400px !important;
    background-color: #f4f4f4;
    height: 100%;
    .flex(space-around, flex-start);
    flex-direction: column;
    .head {
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
        padding: 15px 16px;
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

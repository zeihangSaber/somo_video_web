<template>
    <div class="myAside">
        <div class="head">
            <div class="volce">
                <p class="name">{{this.data.name ? this.data.name : "没有名字哦"}}</p>
                <p class="info">
                    <span class="code">会议号：{{this.data.code}}</span>
                    <span v-if="data.pwd">密码：{{this.data.pwd}}</span>
                </p>
            </div>
            <div class="myImg" :style="`background-image: url(${data.avarter ? data.avarter : 'http://somo-video-image.oss-cn-beijing.aliyuncs.com/10000562-1565754341192.png'});`"></div>
        </div>
        <div class="foot">
            <transition enter-active-class="animated bounceInRight faster" leave-active-class="animated bounceOutRight faster">
                <party v-if="showParty" :data="data" @handleParty="() => $emit('handleParty')" :members="members" :hasControl="data.control"></party>
            </transition>
            <transition enter-active-class="animated bounceInUp faster" leave-active-class="animated bounceOutDown faster">
                <message v-if="showMessage" @handleMessage="() => $emit('handleMessage')" :barrage="barrage" :meetingInfo="data"></message>
            </transition>
        </div>
    </div>
</template>
<script>
import Message from "./message"
import Party from "./party"
export default {
    name: "side",
    props: ["data", "members", "showMessage", "showParty", "barrage"],
    components: {Message, Party},
    data() {
        return {

        }
    },
	mounted() {
		console.log(this.data)
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
        height: 108px;
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
                padding-right: 20px;
            }
            .info {
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
        padding: 15px 20px;
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

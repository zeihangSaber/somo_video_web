<template>
    <div class="myAside">
        <div class="head">
            <div class="volce">
                <p class="name">{{this.data.name}}</p>
                <p class="info">
                    <span class="code">会议号：{{this.data.code}}</span>
                    <span v-if="data.pwd">密码：{{this.data.pwd}}</span>
                </p>
            </div>
            <img :src="data.avarter">
        </div>
        <div class="foot">
            <party v-if="showParty" :data="data" @handleParty="() => $emit('handleParty')" :members="members" :hasControl="data.control"></party>
            <message :data='data' v-if="showMessage" @handleMessage="() => $emit('handleMessage')" :barrage="barrage"></message>
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
    width: 400px;
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
        img {
            width: 90px;
            height: 60px;
            border-radius: 4px;
        }
    }
    .foot {
        height: 100%;
        padding: 15px 20px;
        width: 100%;
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

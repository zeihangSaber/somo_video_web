<template>
    <div class="aside">
        <div class="head">
            <div class="volce">
                <p class="name">{{name}}</p>
                <p class="info">
                    <span class="code">会议号：{{code}}</span>
                    <span>密码：{{pwd}}</span>
                </p>
            </div>
            <img :src="avarter">
        </div>
        <div class="foot">
            <party></party>
            <message></message>
        </div>
    </div>
</template>
<script>
import Message from "./message"
import Party from "./party"
export default {
    name: "aside",
    props: ["code", "pwd", "avarter", "name"],
    components: {Message, Party},
    data() {
        return {

        }
    },
}
</script>
<style lang="less" scoped>
@import "../common/common";
.aside {
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
            height: 68px;
            border-radius: 4px;
        }
    }
    .foot {
        height: 100%;
        padding: 20px;
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

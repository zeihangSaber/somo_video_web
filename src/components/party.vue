<template>
    <div class="bigBox">
        <div class="title">
            <p class="p">参会方(<span>{{members.length}}</span>)</p>
            <i class="font_family icon-close" @click="$emit('handleParty')"></i>
        </div>
        <div class="box">
            <div class="top">
                <input type="text" placeholder="搜索账号名称">
                <div class="item" v-for="item of members" :key="item.uid">
                    <img :src="item.avarter" />
                    <p>{{item.name}}</p>
                    <button :disabled="!hasControl">
                        <i :class="`font_family icon-camera-user ${item.camera ? '' : 'active'}`"></i>
                    </button>
                    <button :disabled="!hasControl">
                        <i :class="`font_family icon-user-mic ${item.mic ? '' : 'active'}`"></i>
                    </button>
                </div>
            </div>
            <div class="line"></div>
            <div class="bottom">
                <button :disabled="!hasControl">全体静音</button>
                <button :disabled="!hasControl">解除全体静音</button>
                <button :disabled="!hasControl">锁定会议</button>
            </div>
        </div>
    </div>
</template>
<script>export default {
    name: "party",
    props: ["members", "hasControl"],
    data() {
        return {
        }
    },
}
</script>
<style lang="less" scoped>
    @import "../common/common";
    .title {
        padding-bottom: 10px;
        .flex(space-between, center);
        .p {
            padding-left: 10px;
            .fontStyle(18px, #000, blod);
            flex: 1;
        }
        .icon-close {
            color: #c5c6c8;
        }
    }
    .box {
        border-radius: 6px;
        background-color: #fff;
        flex: 1;
        .flex();
        flex-direction: column;
        .top, .bottom {
            padding: 14px 20px;
        }
        .top {
            flex: 1;
            input {
                background-color: #f4f4f4;
                border-radius: 16px;
                width: 100%;
                height: 32px;
                text-align: center;
                outline: none;
                margin-bottom: 5px;
            }
            .item {
                .flex(flex-start, center);
                padding: 8px 0;
                img {
                    width: 36px;
                    height: 36px;
                    margin-right: 15px;
                }
                p {
                    flex: 1;
                }
                .icon-camera-user, .icon-user-mic {
                    color: #FF6B6F;
                    font-size: 20px;
                    &.active {
                        color: #C5C6C8;
                    }
                }
            }
        }
        .line {
            border-bottom: 2px solid #f4f4f4;
        }
        .bottom {
            height: 60px;
            .flex(space-between);
            button {
                background-color: #fff;
                border-radius: 4px;
                border: 1px solid #118BFB;
                height: 100%;
                width: 100px;
                color: #118BFB;
                font-size: 14px;
            }
        }
        margin-bottom: 10px;
    }
    button {
        background-color: #fff;
        border: none;
    }
</style>

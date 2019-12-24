<template>
    <div class="ctrlMiddle" >
        {{data.name ? data.name : data.uid}}
        <i class="font_family icon-mic" v-if="data.mic === 0"></i>
        <svg v-else class="icon" aria-hidden="true">
            <use xlink:href="#icon-mic-no"></use>
        </svg>
        <div v-if="data.role === 4" class="tag">主持人</div>
    </div>
</template>

<script>
    export default {
        props: ['data']
    };
</script>

<style lang="less" scoped>
    @import "../common/common";
    .ctrlMiddle {
        padding: 0 10px;
        height: 40px;
        line-height: 40px;
        color: #fff;
        font-size: 16px;
        position: absolute;
        left: 0;
        top: 50px;
        background-color: rgba(0, 0, 0, 0.6);
        border-radius: 0 20px 20px 0;
        z-index: 9999;
        .flex(center, center);
        svg {
            margin-left: 5px;
        }
        .icon-mic {
            color: #fff;
            font-size: 24px;
        }
        .tag {
            .fontStyle(10px, #fff);
            width: 50px;
            height: 20px;
            line-height: 23px;
            text-align: center;
            background-color: #118BFB;
            border-radius: 4px;
            margin-left: 5px;
        }
    }
</style>

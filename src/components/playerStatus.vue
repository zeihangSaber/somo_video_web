<template>
    <div class="ctrlMiddle">
        <div class="ctrlMiddleName" >{{data.name ? data.name : data.uid}}</div>
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
	.ctrlMiddleName{
		max-width: 200px;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
    .ctrlMiddle {
        padding: 0 16px 0 12px;
        height: 32px;
        line-height: 32px;
        color: #fff;
        font-size: 16px;
        position: absolute;
        left: 0;
        top: 0px;
        background-color: rgba(0, 0, 0, 0.6);
        border-radius: 0 20px 20px 0;
        z-index: 500;
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
            width: 48px;
            height: 20px;
            line-height: 23px;
            text-align: center;
            background-color: #118BFB;
            border-radius: 4px;
            margin-left: 5px;
        }
    }
</style>

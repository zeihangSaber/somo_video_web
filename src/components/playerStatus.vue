<template>
    <div class="ctrlMiddle" >
        <div class="ctrlMiddleName" v-if="!isShare">{{data.name == null ? data.uid : data.name}}</div>
		<div v-if="data.role === 4" class="tag">(主持人)</div>
		<div  v-if="isShare">{{data.name ? data.name : data.uid}}<span>-屏幕共享中</span></div>
        <i v-if="data.mic === 0" class="font_family icon-mic" ></i>
        <svg v-else class="icon" aria-hidden="true">
            <use xlink:href="#icon-mic-no"></use>
        </svg>
		<svg v-if="data.speaker == 1" class="icon speaker_icon" aria-hidden="true">
		    <use xlink:href="#iconzhujiang"></use>
		</svg>
    </div>
</template>

<script>
    export default {
		data(){
			return{

			}
		},
        props: {
            data: null,
            isShare: false,
        },
		mounted() {
			console.log(this.data)
		}
    };
</script>

<style lang="less" scoped>
    @import "../common/common";
	.speaker_icon{
		font-size: 40px;
	}
	.ctrlMiddleName{
		max-width: 200px;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		display: inline-block;
		vertical-align: top;
	}
    .ctrlMiddle {
		display: none;
        padding: 0 16px 0 12px;
        height: 32px;
        line-height: 32px;
        color: #fff;
        font-size: 16px;
        position: absolute;
        left: 12px;
        top: 12px;
        background-color: rgba(0, 0, 0, 0.2);
        border-radius: 17px;
        z-index: 500;
        .flex(center, center);
        svg {
            margin-left: 5px;
        }
        .icon-mic {
            color: #fff;
			margin-left: 5px;
            font-size: 20px;
        }
		.icon{
			font-size: 20px;
		}
        .tag {
            .fontStyle(16px, #fff);
            // width: 48px;
            // height: 20px;
            line-height: 23px;
            text-align: center;
            // background-color: #118BFB;
            // border-radius: 4px;
            margin-left: 5px;
        }
    }
</style>

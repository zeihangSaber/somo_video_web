<template>
		<div class="bulletScreenZ" >
		    <div v-for="item in message" class="bulletScreen-msg">
		        <span class="bulletScreen-name">{{item.name}}：</span>
		        <span class="bulletScreen-main">{{item.text}}</span>
		    </div>
		</div>
</template>

<script>
	import antiquity from "../utils/Antiquity";

	export default{
		data(){
			return{
				message: []
			}
		},
		beforeCreate() {
			antiquity.on("getMsg", () => {
				this.message = antiquity.getMsg(3);
			});
		}
	}
</script>

<style lang="less" scoped>
	@import "../common/common";
	.bulletScreenZ {
	    width: 360px;
	    position: fixed;
	    bottom: 100px;
	    left: 30px;
	    z-index: 500;
	    display: flex;
	    align-items: flex-start;
	    flex-direction: column;
	    .bulletScreen-msg {
	        min-height: 44px;
	        background: rgba(0, 0, 0, .5);
	        border-radius: 6px;
	        margin-bottom: 10px;
	        padding: 10px 22px;
	        box-sizing: border-box;
	        width: auto;
	        max-width: 360px;
	        display: block;
	        .bulletScreen-name {
	            text-align: right;
	            color: rgba(105, 183, 255, 1);
	        }
	        .bulletScreen-main {
	            max-width: 352px;
	            word-break: normal;
	            color: #ffffff;
	        }
	    }
	}
</style>

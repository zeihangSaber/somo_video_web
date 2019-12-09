<template>
	<div class="content">
		<div class="aside">
			<el-avatar :size="80" :src="avatarUrl" icon="el-icon-user-solid"></el-avatar>
			<p class="nickName">{{ userName }}</p>
			<p class="account">{{ uid }}</p>
			<el-menu text-color="#333" router style="border-right:0px">
				<el-menu-item
					class="item"
					v-for="item in menuList"
					:index="item.name"
					:key="item.name"
					:route="item.url"
				>
					<i :class="item.icon"></i>
					<span class="menuTitle" slot="title">{{ item.title }}</span>
				</el-menu-item>
			</el-menu>
		</div>
		<div class="matter">
			<router-view></router-view>
		</div>
	</div>
</template>
<script lang="ts">
import { State } from "vuex-class";
import { Component, Vue } from "vue-property-decorator";
const needFooter = ["home", "price", "about", "download", "product"];
@Component
export default class ManageAct extends Vue {
	private avatarUrl: string = "";
	private account: string = "ddd";
	@State uid: string;
	@State userName: string;
	private menuList = [
		{
			icon: "el-icon-s-management",
			title: "活动管理",
			name: "management",
			url: {
				path: "/manageAct/create"
			}
		},
		{
			icon: "el-icon-goods",
			title: "已购买",
			name: "goods",
			url: {
				path: "/manageAct/paidActivity"
			}
		},
		{
			icon: "el-icon-s-order",
			title: "历史订单",
			name: "order",
			url: {
				path: "/manageAct/history"
			}
		}
	];
	created() {
		console.log("xxxx", this.uid);
		console.log("xxxx", this.userName);
	}
}
</script>
<style lang="less">
@import "../common/common";
.content {
	width: 1200px;
	margin: 0 auto;
	padding: 50px 0;
	height: 100%;
	.flex(space-between);
}
.aside {
	background: @fa;
	width: 256px;
	padding-top: 33px;
	text-align: center;
	.el-avatar {
		border: 2px #ccc solid;
	}
	.nickName {
		.fontStyle(20px);
		margin-top: 20px;
		line-height: 28px;
	}
	.account {
		font-size: 16px;
		line-height: 24px;
		margin-bottom: 28px;
	}
	.el-menu-item {
		background-color: #fafafa;
		.menuTitle {
			width: 56px;
			display: inline-block;
			text-align: left;
		}
	}
}
.matter {
	min-height: 800px;
	.myScroll(matter);
	flex: 1;
	background: @fa;
	margin-left: 20px;
	position: relative;
}
.myScroll(matter);
.item {
	.flex-option();
	align-items: center;
}
</style>

<template>
	<div>
		<div class="smallTitle">
			<span class="titleAct">活动管理</span>
			<router-link to="./create">
				<el-button class="issueBtn" type="primary" icon="el-icon-circle-plus-outline">
					创建活动
				</el-button>
			</router-link>
		</div>
		<el-radio-group v-model="status">
			<el-radio-button class="statueAct_btn" :label="1">已上架</el-radio-button>
			<el-radio-button class="statueAct_btn" :label="2">已下架</el-radio-button>
			<el-radio-button class="statueAct_btn" :label="3">已失效</el-radio-button>
		</el-radio-group>
		<el-table :data="tableData" stripe style="width: 100%">
			<el-table-column prop="status" label="活动状态"></el-table-column>
			<el-table-column prop="img" label="主图">
				<template slot-scope="scope">
					<img :src="scope.row.img" />
				</template>
			</el-table-column>
			<el-table-column prop="subject" label="标题"></el-table-column>
			<el-table-column prop="time" label="时间"></el-table-column>
			<el-table-column prop="money" label="定价"></el-table-column>
			<el-table-column prop="handle" label="操作">
				<template>
					<div class="btnGroup">
						<el-button type="text">内容修改</el-button>
						<el-button type="text">活动下架</el-button>
						<el-button type="text">活动上架</el-button>
						<el-button type="text">统计信息</el-button>
					</div>
				</template>
			</el-table-column>
			<el-table-column prop="info" label="会议信息">
				<template slot-scope="scope">
					<p>会议号</p>
					<p>{{ scope.row.info }}</p>
					<el-button type="text">加入会议</el-button>
				</template>
			</el-table-column>
		</el-table>
	</div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { State, Action } from "vuex-class";
const StatusText = {
	1: "已上架",
	2: "已下架",
	3: "已失效"
};
@Component
export default class StatusAct extends Vue {
	private status: number = 1;
	private tableData = [
		{
			status: "1",
			img: "123",
			subject: "123",
			time: "123",
			money: "123",
			handle: "123",
			info: "123"
		},
		{
			status: "1",
			img: "123",
			subject: "123",
			time: "123",
			money: "123",
			handle: "123",
			info: "123"
		}
	];
}
</script>

<style lang="less" scoped>
@import "../../common/common";
.smallTitle {
	.flex(space-between, center);
	width: 100%;
	padding: 0 40px;
	.titleAct {
		.fontStyle(20px, #000, bolder);
	}
	.issueBtn {
		.fontStyle(14px, #fff);
	}
}
.el-radio-group {
	width: 100%;
}
.btnGroup {
	display: flex;
}
</style>

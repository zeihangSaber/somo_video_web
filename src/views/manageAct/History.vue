<template>
	<div>
		<div class="head">
			<div class="title">历史订单</div>
			<div class="head_box">
				<div class="search_box">
					<input class="search_input" type="text" placeholder="订单号或会议名称" />
					<div class="confirm">确定</div>
				</div>
				<div class="search_box">
					<el-date-picker
						class="share_date"
						size="large"
						v-model="date"
						type="date"
						placeholder="日期"
						style="height: 25px;font-size: 11px;"
					>
					</el-date-picker>
					<div class="confirm">确定</div>
				</div>
			</div>
		</div>
		<div class="table">
			<el-table
				max-height="500"
				:data="tableData"
				stripe
				style="width: 100%;border: 1px solid #e6e6e6;"
				class="share_table"
			>
				<el-table-column prop="date" label="序号"> </el-table-column>
				<el-table-column prop="name" label="订单号"> </el-table-column>
				<el-table-column prop="address" label="支付时间"> </el-table-column>
				<el-table-column prop="date" label="项目名称"> </el-table-column>
				<el-table-column prop="name" label="支付金额"> </el-table-column>
				<el-table-column prop="address" label="支付方式"> </el-table-column>
			</el-table>
		</div>
		<!-- <div class="paging">
			<el-pagination :background="true" layout="prev, pager, next" :total="1000"></el-pagination>
		</div> -->
	</div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { State, Action } from "vuex-class";
@Component
export default class History extends Vue {
	private date = "";
	private tableData = [
		{
			date: "01",
			name: "王小虎",
			address: "上海市普陀区金沙"
		},
		{
			date: "01",
			name: "王小虎",
			address: "上海市普陀区金沙"
		},
		{
			date: "01",
			name: "王小虎",
			address: "上海市普陀区金沙"
		},
		{
			date: "01",
			name: "王小虎",
			address: "上海市普陀区金沙"
		},
		{
			date: "01",
			name: "王小虎",
			address: "上海市普陀区金沙"
		},
		{
			date: "01",
			name: "王小虎",
			address: "上海市普陀区金沙"
		}
	];
	mounted() {
		// let that = this;
		// that.size(document.body.clientHeight);
		// window.onresize = function() {
		// 	that.size(document.body.clientHeight);
		// };
		// console.log(document.body.clientHeight);
	}

	// size(presentHeight: any) {
	// 	this.height = presentHeight * 0.4;
	// 	console.log(this.height);
	// }
}
</script>

<style lang="less" scoped>
input::-webkit-input-placeholder {
	/* WebKit browsers */
	color: #cccccc;
}
.el-input__inner {
	color: red;
}
.paging {
	position: absolute;
	right: 60px;
	bottom: 42px;
}

.table {
	padding: 0 20px;
	box-sizing: border-box;
	.share_table {
		border-radius: 8px;
	}
}

.head_box {
	display: flex;
	justify-content: flex-start;
	align-items: center;
	margin-bottom: 20px;
}

.date {
	width: 127px;
	height: 100%;
}

.confirm {
	width: 52px;
	height: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
	border-left: 1px solid #d9d9d9;
	color: #cccccc;
	font-size: 13px;
	font-weight: 500;
}

.search_input {
	width: 127px;
	height: 100%;
	background: #fafafa;
	padding-left: 5px;
	box-sizing: border-box;
	outline: none;
}

.search_box {
	width: 180px;
	height: 32px;
	margin-right: 30px;
	display: flex;
	justify-content: flex-start;
	align-items: center;
	border: 1px solid #d9d9d9;
}

.title {
	font-size: 20px;
	font-family: PingFangSC-Medium, PingFang SC;
	font-weight: 500;
	color: rgba(0, 0, 0, 1);
	margin-bottom: 34px;
}

.head {
	padding-top: 34px;
	padding-left: 40px;
	box-sizing: border-box;
}
</style>

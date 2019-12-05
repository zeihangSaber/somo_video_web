<template>
	<div class="constant">
		<div class="smallTitle">
			<span class="titleAct">活动管理</span>
			<el-button class="issueBtn" @click="toCreate(-1)" type="primary" icon="el-icon-circle-plus-outline">
				创建活动
			</el-button>
		</div>
		<el-radio-group v-model="status">
			<el-radio-button class="statueAct_btn" :label="1">已上架</el-radio-button>
			<el-radio-button class="statueAct_btn" :label="2">已下架</el-radio-button>
			<el-radio-button class="statueAct_btn" :label="0">已失效</el-radio-button>
		</el-radio-group>
		<div class="tableBox">
			<el-table
				:data="myList[status]"
				stripe
				style="width: 100%"
				:cell-style="cellStyle"
				:header-cell-style="headCellStyle"
			>
				<el-table-column prop="status" label="活动状态">
					<template slot-scope="scope">
						<p>{{ scope.row.statusText }}</p>
					</template>
				</el-table-column>
				<el-table-column prop="img" label="主图">
					<template slot-scope="scope">
						<img class="poster" :src="scope.row.img" />
					</template>
				</el-table-column>
				<el-table-column prop="subject" label="标题">
					<template slot-scope="scope">
						<p>{{ scope.row.subject }}</p>
					</template>
				</el-table-column>
				<el-table-column prop="time" label="时间"></el-table-column>
				<el-table-column prop="money" label="定价">
					<template slot-scope="scope">
						<p class="price">￥{{ scope.row.money | getNum }}</p>
					</template>
				</el-table-column>
				<el-table-column prop="handle" label="操作" :width="180">
					<template slot-scope="scope">
						<div class="btnGroup">
							<el-button @click="toCreate(scope.row.index)" v-if="scope.row.handle[0]" type="text"
								>内容修改</el-button
							>
							<el-button
								v-if="scope.row.handle[1]"
								@click="changeStatus(scope.row.id, 2, scope.row.index)"
								type="text"
								>活动下架</el-button
							>
							<el-button
								v-if="scope.row.handle[2]"
								@click="changeStatus(scope.row.id, 1, scope.row.index)"
								type="text"
								>活动上架</el-button
							>
							<el-button type="text">统计信息</el-button>
						</div>
					</template>
				</el-table-column>
				<el-table-column prop="info" label="会议信息">
					<template slot-scope="scope">
						<p class="midTitle">会议号</p>
						<p>{{ scope.row.info }}</p>
						<el-button type="text">加入会议</el-button>
					</template>
				</el-table-column>
			</el-table>
		</div>
	</div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { State, Getter, Action, Mutation, namespace } from "vuex-class";
import { actItem, actList } from "@/Types";
import moment from "moment";
import ajax from "@/utils/ajax";
import { changeStatus } from "@/common/common";

const StatusText = ["已失效", "已上架", "已下架"];
@Component
export default class StatusAct extends Vue {
	@State private myCreateActList: actList;
	@Mutation private setMyCreateActList: (arr: actList) => void;
	@Action private ActivityList: () => void;
	private status: number = 1;
	private headCellStyle = {
		backgroundColor: "#f3f3f3",
		color: "#666",
		textAlign: "center"
	};
	private cellStyle = {
		textAlign: "center",
		fontSize: "12px"
	};
	created() {
		ajax.setTenant(14);
		this.ActivityList();
	}
	get myList() {
		return this.myCreateActList.reduce(
			(a: any[], b, index) => {
				const { subject, status, start, end, money, id, desc } = b;
				const { banner } = JSON.parse(desc);
				const myStatus = changeStatus(status, end);
				const obj = {
					id,
					index,
					// @ts-ignore
					statusText: StatusText[myStatus],
					img: banner,
					subject,
					time: `${format(start)} - ${format(end)}`,
					money,
					handle: [myStatus === 2, myStatus === 1, myStatus === 2],
					info: ""
				};
				a[myStatus].push(obj);
				return a;
			},
			[[], [], []]
		);
	}
	changeStatus(actid: number, status: number, index: number) {
		ajax.setAct({
			actid,
			status
		}).then((res: actItem) => {
			this.$message.success("修改成功");
			let arr = [...this.myCreateActList];
			arr[index] = res;
			this.setMyCreateActList(arr);
		});
	}
	toCreate(actIndex: any) {
		this.$router.push({ path: "./create", query: { actIndex } });
	}
}
function format(v: number) {
	return moment(v).format("MM/DD HH:mm");
}
</script>

<style lang="less" scoped>
@import "../../common/common";
.constant {
	padding: 30px 0;
	height: 100%;
	display: flex;
	flex-direction: column;
}
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
	padding: 30px 40px 20px;
}
.btnGroup {
	display: flex;
	justify-content: space-around;
}
.tableBox {
	padding: 0 40px;
	flex: 1;
	height: 0;
	overflow-y: auto;
	.poster {
		width: 90px;
		height: 67px;
		border-radius: 4px;
	}
	.price {
		.fontStyle(14px, #d5b45c);
	}
	.el-button {
		font-size: 12px;
	}
}
.midTitle {
	.fontStyle(10px, #999);
}
.myScroll(tableBox);
</style>

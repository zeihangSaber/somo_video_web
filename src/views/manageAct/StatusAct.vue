<template>
	<div class="constant">
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
		<div class="tableBox">
			<el-table :data="myList[status]" stripe style="width: 100%" :header-cell-style="headCellStyle">
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
	</div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { State, Getter, Action, Mutation, namespace } from "vuex-class";
import { actList } from "@/Types";
import moment from "moment";

const StatusText = {
	1: "已上架",
	2: "已下架",
	3: "已失效"
};
@Component
export default class StatusAct extends Vue {
	@State private myCreateActList: actList;
	@Action private activityList: () => void;
	private status: number = 1;
	private headCellStyle = {
		backgroundColor: "#f3f3f3",
		color: "#666"
	};
	created() {
		this.activityList();
	}
	get myList() {
		let arr = this.myCreateActList.map(item => {
			const { subject, status, start, end, money, id, desc } = item;
			const { banner } = JSON.parse(desc);
			const obj = {
				status,
				img: banner,
				subject,
				time: `${format(start)}-${format(end)}`,
				money,
				handle: "",
				info: ""
			};
			return obj;
		});
		return arr.reduce(
			(a: any[], b) => {
				a[b.status].push(b);
				return a;
			},
			[[], [], [], []]
		);
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
}
.tableBox {
	padding: 0 40px;
	flex: 1;
	height: 0;
	overflow-y: auto;
}
.myScroll(tableBox);
</style>

<template>
	<div>
		<div>
			<div class="content">
				<h1>
					云会议室
					<span class="rightText">CLOUD CONFERENCE ROOM</span>
				</h1>
				<el-table
					:cell-style="cellStyle"
					:header-cell-style="headerCellStyle"
					:data="tableData"
					stripe
					border
					style="width: 100%"
				>
					<el-table-column class-name="items" prop="items" label="特权项目">
						<template slot-scope="scope">
							<h2>{{ scope.row.items }}</h2>
						</template>
					</el-table-column>
					<el-table-column prop="free" label="免费版">
						<template slot-scope="scope">
							<i v-if="scope.row.free === 'check'" class=" el-icon-check"></i>
							<div v-else-if="scope.row.free[0] === '$'" v-html="scope.row.free.substr(1)"></div>
							<span v-else>{{ scope.row.free }}</span>
						</template>
					</el-table-column>
					<el-table-column prop="ten" label="10方">
						<template slot-scope="scope">
							<i v-if="scope.row.ten === 'check'" class=" el-icon-check"></i>
							<div v-else-if="scope.row.ten[0] === '$'" v-html="scope.row.ten.substr(1)"></div>
							<span v-else>{{ scope.row.ten }}</span>
						</template>
					</el-table-column>
					<el-table-column prop="twentyFive" label="25方">
						<template slot-scope="scope">
							<i v-if="scope.row.twentyFive === 'check'" class=" el-icon-check"></i>
							<div
								v-else-if="scope.row.twentyFive[0] === '$'"
								v-html="scope.row.twentyFive.substr(1)"
							></div>
							<span v-else>{{ scope.row.twentyFive }}</span>
						</template>
					</el-table-column>
					<el-table-column prop="fifty" label="50方">
						<template slot-scope="scope">
							<i v-if="scope.row.fifty === 'check'" class=" el-icon-check"></i>
							<div v-else-if="scope.row.fifty[0] === '$'" v-html="scope.row.fifty.substr(1)"></div>
							<span v-else>{{ scope.row.fifty }}</span>
						</template>
					</el-table-column>
					<el-table-column prop="hundred" label="100方">
						<template slot-scope="scope">
							<i v-if="scope.row.hundred === 'check'" class=" el-icon-check"></i>
							<div v-else-if="scope.row.hundred[0] === '$'" v-html="scope.row.hundred.substr(1)"></div>
							<span v-else>{{ scope.row.hundred }}</span>
						</template>
					</el-table-column>
				</el-table>
				<div class="remarkBox">
					<div>备注：</div>
					<div>
						<p class="remark">1、注册即送120分钟100方会议时长；</p>
						<p class="remark">
							2、120分钟免费时长用完后，每次可免费开30分钟100方会议。
						</p>
					</div>
				</div>
			</div>
		</div>
		<div class="hardware">
			<div class="content">
				<h1>
					硬件产品
					<span class="rightText">HARDWARE PRODUCTS</span>
				</h1>
				<div class="proDad">
					<div class="proBox">
						<p class="blue">中小会议室之选</p>
						<p class="big">智能一体机</p>
						<p class="price">6999 <span>元/台</span></p>
						<img src="" alt="pro" />
						<br />
						<p class="hot">热线：400-692-0206</p>
						<div class="boxText">
							<p>支持有线和WIFI联网</p>
							<p>普通行政人员5分钟可以完成安装部署</p>
							<p>
								搭配基于安卓7.1.2系统定制的SOMO智能视频会议操作系统软件
							</p>
							<p>
								内置ROCKCHIP高性能、高扩展、全能型的旗舰芯片RK3399
							</p>
						</div>
					</div>
					<div class="proBox">
						<p class="blue">8米拾音距离</p>
						<p class="big">全向麦克风</p>
						<p class="price">1599 <span>元/台</span></p>
						<img src="" alt="pro" />
						<br />
						<p class="hot">热线：400-692-0206</p>
						<div class="boxText">
							<p>8米高清拾音，适应10-30平米会议室使用</p>
							<p>内置NS、AEC算法，有效抑制环境噪音，回声消除</p>
							<p>自动增益控制，随意走动，音质如一</p>
							<p>
								无驱兼容Windows&Mac平台主机，与SOMO主机搭配体验更佳
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
@Component
export default class Price extends Vue {
	tableData: any = [
		{
			items: "价格",
			free: `$<p style="color: #2f84fb;font-size: 18px;font-weight: bolder;">￥0</p>`,
			ten: `$<p style="color: #2f84fb;font-size: 18px;font-weight: bolder;">￥120/月</p><p style="color: #2f84fb;font-size: 18px;font-weight: bolder;">￥1200/年</p>`,
			twentyFive: `$<p style="color: #2f84fb;font-size: 18px;font-weight: bolder;">￥4800/年</p>`,
			fifty: `$<p style="color: #999">咨询热线</p><p style="color: #2f84fb;font-size: 18px;font-weight: bolder;">400-692-0206</p>`,
			hundred: `$<p style="color: #999">咨询热线</p><p style="color: #2f84fb;font-size: 18px;font-weight: bolder;">400-692-0206</p>`
		},
		{
			items: "付费方式",
			free: "-",
			ten: "年付/月付",
			twentyFive: "年付",
			fifty: "年付",
			hundred: "年付"
		},
		{
			items: "适用会议场景",
			free: "1对1会议",
			ten: "小型会议",
			twentyFive: `$<p>中小型会议/</p><p>同时开多个会议</p>`,
			fifty: `$<p>中小型会议/</p><p>同时开多个会议</p>`,
			hundred: `$<p>大型会议/同时开多个会议</p><p>/线上小型市场活动</p>`
		},
		{
			items: "单会议最大支持终端数",
			free: "2方",
			ten: "10方",
			twentyFive: "25方",
			fifty: "50方",
			hundred: "100方"
		},
		{
			items: "最大支持会议数",
			free: "1个",
			ten: "1个",
			twentyFive: "5个",
			fifty: "10个",
			hundred: "不限会议数"
		},
		{
			items: "主持人权限",
			free: "个人独享",
			ten: "同租户共享",
			twentyFive: "同租户共享",
			fifty: "同租户共享",
			hundred: "同租户共享"
		},
		{
			items: "屏幕共享",
			free: "check",
			ten: "check",
			twentyFive: "check",
			fifty: "check",
			hundred: "check"
		},
		{
			items: "无线投屏",
			free: "check",
			ten: "check",
			twentyFive: "check",
			fifty: "check",
			hundred: "check"
		},
		{
			items: "会议IM",
			free: "check",
			ten: "check",
			twentyFive: "check",
			fifty: "check",
			hundred: "check"
		},
		{
			items: "画面模式调整",
			free: "check",
			ten: "check",
			twentyFive: "check",
			fifty: "check",
			hundred: "check"
		},
		{
			items: "主讲人模式",
			free: "check",
			ten: "check",
			twentyFive: "check",
			fifty: "check",
			hundred: "check"
		},
		{
			items: "麦克风/摄像头控制",
			free: "check",
			ten: "check",
			twentyFive: "check",
			fifty: "check",
			hundred: "check"
		},
		{
			items: "企业通讯录",
			free: "check",
			ten: "check",
			twentyFive: "check",
			fifty: "check",
			hundred: "check"
		},
		{
			items: "会议锁定",
			free: "check",
			ten: "check",
			twentyFive: "check",
			fifty: "check",
			hundred: "check"
		},
		{
			items: "小程序开会",
			free: "check",
			ten: "check",
			twentyFive: "check",
			fifty: "check",
			hundred: "check"
		},
		{
			items: "会议录制",
			free: "本地音频录制",
			ten: "本地音频录制",
			twentyFive: "本地音频录制",
			fifty: "本地音频录制",
			hundred: "本地音频录制"
		}
	];
	cellStyle = {
		textAlign: "center",
		color: "#000"
	};
	headerCellStyle = {
		textAlign: "center",
		fontSize: "20px",
		fontWeight: "bolder",
		backgroundColor: "#f6f8fb",
		color: "#000"
	};
	mounted() {
		const doms: any = document.getElementsByClassName("items");
		this.$nextTick(() => {
			[...doms].forEach(dom => {
				dom.style.background = "#f6f8fb";
			});
		});
	}
}
</script>

<style lang="less" scoped>
@import "../common/common";
.content {
	width: 1200px;
	margin: 0 auto;
}
h1 {
	.fontStyle(36px, #2f84fb);
	span {
		.fontStyle(14px, #333);
	}
	margin-bottom: 40px;
	padding-top: 30px;
}
h2 {
	/*background: #f1f4fa;*/
	font-size: 14px;
}
.rightText {
	.fontStyle(14px #a0a1a2);
}
.el-icon-check {
	.fontStyle(24px, #21b75a, bolder);
}
.remarkBox {
	.flex();
	margin-left: 50px;
	margin-top: 20px;
	margin-bottom: 30px;
}
.remark {
	.fontStyle(16px, #666);
}
.hardware {
	background-color: #f7f7f7;
	.proDad {
		.flex(center);
		.proBox {
			width: 595px;
			background-color: #fff;
			text-align: center;
			.fontStyle(18px, #333);
			margin: 0 10px 150px;
			padding: 50px 30px;
			img {
				margin-bottom: 20px;
			}
			.blue {
				.fontStyle(22px, #fff);
				.radius(19px, 38px, 189px, #2f84fb);
				margin-bottom: 30px;
			}
			.big {
				.fontStyle(46px, #262a33, bolder);
				margin-bottom: 30px;
			}
			.price {
				.fontStyle(46px, #2f84fb, bolder);
				span {
					.fontStyle(18px, #666);
				}
				margin-bottom: 20px;
			}
			.hot {
				.fontStyle(20px, #fff);
				.radius(12px, 52px, 219px, #f5a00e);
				margin-bottom: 30px;
			}
			.boxText {
				text-align: left;
				line-height: 30px;
			}
		}
	}
}
</style>

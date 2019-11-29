<template>
	<div>
		<div class="personage">
			<div class="personal_information">
				<img class="head_img" src="../assets/personal_center/icon_management.png" />
				<div>白羽</div>
				<div class="personal_number">1211561655</div>
				<div class="personage_tab">
					<img src="../assets/personal_center/icon_management.png" alt="" />
					<span>活动管理</span>
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
@Component
export default class PersonalCenter extends Vue {}
</script>

<style lang="less" scoped>
.personage {
	width: 1200px;
	border: 1px solid red;
	margin: 0 auto;
	.personage_tab {
		height: 46px;
		padding-left: 14px;
		box-sizing: border-box;
		font-size: 11px;
		color: rgba(99, 99, 99, 1);
		img {
			width: 16px;
			height: 13px;
		}
	}

	.personal_number {
		font-size: 16px;
		margin-bottom: 26px;
	}

	.head_img {
		width: 80px;
		height: 80px;
		border-radius: 50%;
		margin-top: 32px;
		margin-bottom: 14px;
	}

	.personal_information {
		width: 256px;
		height: 946px;
		background: #fafafa;
		text-align: center;
		font-size: 20px;
		font-family: PingFangSC-Medium, PingFang SC;
		font-weight: 500;
		color: rgba(0, 0, 0, 1);
	}
}
</style>

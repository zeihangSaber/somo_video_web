<template>
	<div class="footer">
		<img src="../assets/footer/footer.jpg" />
		<p>厦门未来信通科技有限公司 版权所有 闽ICP备18020137号</p>
	</div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
@Component
export default class Footer extends Vue {}
</script>

<style lang="less" scoped>
.footer {
	height: 150px;
	align-items: center;
	color: #fff;
	text-align: center;
	background: #142b54;
	display: flex;
	flex-direction: column;
	justify-content: center;
	img {
		margin-bottom: 17px;
	}
	p {
		font-size: 12px;
	}
}
</style>

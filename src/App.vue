<template>
	<el-container direction="vertical">
		<el-header height="89px">
			<HeaderTab />
		</el-header>
		<el-main>
			<router-view />
			<Footer v-if="footShow" height="150px" />
		</el-main>
	</el-container>
</template>
<script lang="ts">
import ajax from "@/utils/ajax";
import HeaderTab from "@/components/HeaderTab.vue";
import Footer from "@/components/Footer.vue";
import { Component, Vue } from "vue-property-decorator";
import { State } from "vuex-class";
const needFooter = ["home", "price", "about", "download", "product"];
@Component({
	components: {
		HeaderTab,
		Footer
	}
})
export default class App extends Vue {
	@State loginShow: boolean;
	footShow: boolean = true;
	beforeCreate() {
		ajax.setUid(JSON.parse(localStorage.getItem("vuex")).uid as string);
		ajax.setCookie(JSON.parse(localStorage.getItem("vuex")).cookie as string);
		this.$router.beforeEach((to, from, next) => {
			console.log("登录状态", this.loginShow);
			this.footShow = needFooter.includes(to.name as string);
			next();
		});
	}
	created() {
		this.footShow = needFooter.includes(this.$route.name as string);
	}
	mounted() {}
}
</script>
<style lang="less">
@import "./common/base";
@import "./common/common";
.myScroll(el-main);
</style>

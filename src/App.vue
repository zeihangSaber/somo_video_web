<template>
	<el-container direction="vertical">
		<el-header height="89px">
			<HeaderTab />
		</el-header>
		<el-main ref="elMain" id="elMain" :class="elMain">
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
const needFooter = ["home", "price", "about", "download", "product", "activitys", "joinConference"];
import { State } from "vuex-class";
@Component({
	components: {
		HeaderTab,
		Footer
	}
})
export default class App extends Vue {
	footShow: boolean = true;
	elMain = "active";
	@State uid: number;
	@State cookie: string;
	beforeCreate() {
		this.$router.beforeEach((to, from, next) => {
			this.footShow = needFooter.includes(to.name as string);
			this.elMain = to.name === "home" ? "active" : "";
			next();
		});
	}
	created() {
		this.footShow = needFooter.includes(this.$route.name as string);
		this.elMain = this.$route.name === "home" ? "active" : "";
		ajax.setUid(this.uid as number);
		ajax.setCookie(this.cookie as string);
	}
}
</script>
<style lang="less">
@import "./common/base";
@import "./common/common";
.myScroll(el-main);
.el-main.active {
	overflow: inherit !important;
}
</style>

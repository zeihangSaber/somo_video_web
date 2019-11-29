<template>
    <el-container direction="vertical">
        <el-header height="89px">
            <HeaderTab />
        </el-header>
        <el-main ref="elMain" id="elMain">
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
const needFooter = ["home", "price", "about", "download", "product"];
@Component({
    components: {
        HeaderTab,
        Footer
    }
})
export default class App extends Vue {
    footShow: boolean = true;
    beforeCreate() {
        this.$router.beforeEach((to, from, next) => {
            this.footShow = needFooter.includes(to.name as string);
            console.log(this.footShow);
            next();
        });
    }
    created() {
        this.footShow = needFooter.includes(this.$route.name as string);
    }
}
</script>
<style lang="less">
@import "./common/base";
@import "./common/common";
.myScroll(el-main);
.el-main {
    overflow: inherit !important;
}
</style>

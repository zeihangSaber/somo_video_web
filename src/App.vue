<template>
    <div id="app">
        <el-container>
            <el-header height="89px"><HeaderTab /></el-header>
            <el-main class="main"><router-view /></el-main>
            <el-footer class="footer" height="150px"><Footer /></el-footer>
        </el-container>
    </div>
</template>
<script lang="ts">
import ajax from "@/utils/ajax";
import HeaderTab from "@/components/HeaderTab.vue";
import Footer from "@/components/Footer.vue";
import { Component, Vue } from "vue-property-decorator";
// import "@/common/common.less";
@Component({
    components: {
        HeaderTab,
        Footer
    }
})
export default class App extends Vue {}
</script>
<style lang="less">
@import "./common/base";
</style>

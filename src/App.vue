<template>
    <div id="app">
        <el-container>
            <el-header><HeaderTab /></el-header>
            <el-main><router-view /></el-main>
            <el-footer></el-footer>
        </el-container>
    </div>
</template>
<script lang="ts">
import ajax from "@/utils/ajax";
import HeaderTab from "@/components/HeaderTab.vue";
import { Component, Vue } from "vue-property-decorator";
// import "@/common/common.less";
@Component({
    components: {
        HeaderTab
    }
})
export default class App extends Vue {}
</script>
<style lang="less"></style>

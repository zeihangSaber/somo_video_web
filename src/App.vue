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
@Component({
    components: {
        HeaderTab
    }
})
export default class App extends Vue {}
</script>
<style lang="less">
@import "./common/common";
#app {
    background-color: @red;
}
.saber {
    color: red;
}
</style>

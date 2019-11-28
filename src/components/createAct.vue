<template>
    <div>
        <el-button type="text" icon="el-icon-arrow-left">返回</el-button>
        <el-button class="issueBtn" type="primary" icon="el-icon-position">
            主要按钮
        </el-button>
        <span class="titleAct">创建活动</span>
        <el-divider></el-divider>
    </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { State, Action } from "vuex-class";
@Component
export default class HeaderTab extends Vue {}
</script>
<style lang="less" scoped>
@import "../common/common";
.titleAct {
    .fontStyle(20px, #000, bolder);
}
.issueBtn {
    .fontStyle(14px, #fff);
}
</style>

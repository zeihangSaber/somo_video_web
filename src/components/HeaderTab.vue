<template>
    <div id="headerTab">
        <el-menu
            class="tab_menu"
            :default-active="activeIndex"
            mode="horizontal"
            @select="handleSelect"
            text-color="#f8f8f8"
            active-text-color="#f8f8f8"
        >
            <el-menu-item index="home">首页</el-menu-item>
            <el-menu-item index="activity">产品</el-menu-item>
            <el-menu-item index="price">价格</el-menu-item>
            <el-menu-item index="download">下载</el-menu-item>
            <el-menu-item index="about">我们</el-menu-item>
        </el-menu>
    </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { State, Action } from "vuex-class";
@Component
export default class HeaderTab extends Vue {
    @State activeIndex: string;
    @Action setActiveIndex: (value: string) => void;
    created() {
        console.log(this.activeIndex);
    }
    handleSelect(key: string, path: any): void {
        if (key !== this.activeIndex) {
            this.$router.push({ name: key });
        }
        this.setActiveIndex(key);
    }
}
</script>
<style lang="less" scoped>
#headerTab {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 10;
    width: 100%;
    .tab_menu {
        background: rgba(4, 88, 204, 0.8);
        .el-menu-item {
            border: 0;
        }
        .el-menu-item:hover {
            background-color: #033f95;
        }
        .el-menu-item.is-active {
            background-color: #033f95;
        }
    }
}
</style>

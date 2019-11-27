<template>
    <div id="headerTab">
        <div class="con">
            <div class="logo"><img src="../assets/headerTab/logo.png" /></div>
            <el-menu
                class="tab_menu con"
                :default-active="activeIndex"
                mode="horizontal"
                @select="handleSelect"
                text-color="#f8f8f8"
                active-text-color="#f8f8f8"
            >
                <el-menu-item class="tab_menu_item" index="home"
                    >首页</el-menu-item
                >
                <el-menu-item class="tab_menu_item" index="product"
                    >产品</el-menu-item
                >
                <el-menu-item class="tab_menu_item" index="price"
                    >价格</el-menu-item
                >
                <el-menu-item class="tab_menu_item" index="download"
                    >下载</el-menu-item
                >
                <el-menu-item class="tab_menu_item" index="about"
                    >我们</el-menu-item
                >
                <!-- <el-menu-item class="tab_menu_item" index="personalCenter"
                    >个人中心</el-menu-item
                > -->
            </el-menu>
            <div class="tel">热线：<span>400-692-0206</span></div>
        </div>
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
        const activeIndex: string = this.$route.name ? this.$route.name : "";
        this.setActiveIndex(activeIndex);
    }
    mounted() {
        if (this.$route.name === "product") {
            window.scroll({
                top: 600,
                behavior: "smooth"
            });
        }
    }
    handleSelect(key: string, path: any): void {
        if (key === "product") {
            if (this.$route.name === "home") {
                window.scroll({
                    top: 600,
                    behavior: "smooth"
                });
            } else {
                window.location.pathname = `${key}`;
            }
        } else {
            window.location.pathname = `${key}`;
        }
        this.setActiveIndex(key);
    }
}
</script>
<style lang="less" scoped>
@import "../common/common.less";
#headerTab {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 10;
    width: 100%;
    background: rgba(4, 88, 204, 0.8);
    .con {
        .flex-option(row, flex-start, flex-end);
        .logo {
            margin-right: 119px;
            padding-bottom: 17px;
        }
        .tab_menu {
            background: rgba(4, 88, 204, 0);
            display: flex;
            flex: 1;
            .el-menu-item {
                background: rgba(4, 88, 204, 0);
                border: 0;
            }
            .el-menu-item:hover {
                background: #033f95;
                transition: 0.3s;
            }
            .el-menu-item.is-active {
                background-color: #033f95;
            }
            .tab_menu_item {
                .flex-option(row, center, flex-end);
                font-size: 20px;
                color: #f8f8f8;
                flex: 1;
                height: 89px;
                transition: 0.3s;
                box-sizing: border-box;
            }
        }
        .tel {
            font-size: 20px;
            color: #f8f8f8;
            padding-bottom: 14px;
            margin-left: 80px;
            span {
                font-weight: bold;
                color: #f5a00e;
                font-size: 30px;
            }
        }
    }
}
.el-menu.el-menu--horizontal {
    border-bottom: 0;
}
</style>

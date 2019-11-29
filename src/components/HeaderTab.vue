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
            <div class="jionMetting" @click="joinConference">
                <span>加入一场会议</span>
            </div>
            <div class="tel">热线：<span>400-692-0206</span></div>
            <div class="loginBtn" v-show="!login_status" @click="login">
                登录
            </div>
            <div class="loginSuccess" v-show="login_status">
                <span class="loginName">{{ userName }}</span>
                <span class="tryToExit" id="loginOut">退出</span>
            </div>
            <Login />
        </div>
    </div>
</template>
<script lang="ts">
import Login from "./Login.vue";
import { Component, Vue } from "vue-property-decorator";
import { State, Action } from "vuex-class";
@Component({
    components: {
        Login
    }
})
export default class HeaderTab extends Vue {
    @State activeIndex: string;
    @State login_status: boolean;
    @State userName: string;
    @Action setActiveIndex: (value: string) => void;
    @Action setLoginShow: (value: boolean) => void;
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
                this.$router.push({ name: key });
                // window.location.pathname = `${key}`;
            }
        } else {
            this.$router.push({ name: key });
            // window.location.pathname = `${key}`;
        }
        this.setActiveIndex(key);
    }
    login() {
        this.setLoginShow(true);
    }
    joinConference() {
        this.$router.push({ name: "joinConference" });
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
        width: 1400px;
        .flex-option(row, flex-start, flex-end);
        .logo {
            margin-right: 50px;
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
        .jionMetting {
            cursor: pointer;
            margin: 0 60px 11px 30px;
            border: 1px solid rgba(255, 255, 255, 1);
            border-radius: 18px;
            width: 140px;
            height: 36px;
            text-align: left;
            span {
                display: inline-block;
                font-size: 16px;
                line-height: 36px;
                font-family: Microsoft YaHei;
                font-weight: 400;
                color: rgba(248, 248, 248, 1);
                position: relative;
                left: 50%;
                transform: translateX(-50%);
            }
        }
        .tel {
            font-size: 20px;
            color: #f8f8f8;
            padding-bottom: 14px;
            margin-right: 65px;
            span {
                font-weight: bold;
                color: #f5a00e;
                font-size: 30px;
            }
        }
        .loginBtn {
            cursor: pointer;
            margin-bottom: 19px;
            font-size: 18px;
            font-weight: 400;
            color: rgba(248, 248, 248, 1);
        }
        .loginSuccess {
            margin-bottom: 19px;
            .loginName {
                margin-right: 19px;
                font-size: 18px;
                font-weight: 400;
                color: rgba(248, 248, 248, 1);
            }
            .tryToExit {
                cursor: pointer;
                font-size: 18px;
                font-weight: 400;
                color: rgba(248, 248, 248, 1);
                opacity: 0.5;
            }
        }
    }
}
.el-menu.el-menu--horizontal {
    border-bottom: 0;
}
</style>

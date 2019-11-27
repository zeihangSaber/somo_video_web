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
import "@/common/common.less";
@Component({
    components: {
        HeaderTab
    }
})
export default class App extends Vue {}
</script>
<style lang="less">
html,
body,
div,
span,
iframe,
input,
select,
map,
font,
img,
a img,
samp,
strong,
hr,
h1,
h2,
h3,
h4,
h5,
h6,
b,
p,
blockquote,
a,
address,
code,
dl,
dt,
dd,
ol,
ul,
li,
form,
label,
table,
tr,
td,
th {
    padding: 0;
    margin: 0;
    border: 0;
    box-sizing: border-box;
    font-family: "Microsoft YaHei", Arial, Helvetica, sans-serif;
}
//定义宽高
.box(@width, @height) {
    width: @width;
    height: @height;
}
//定义背景图片
.backgroundImg(@url) {
    background: url(@url) no-repeat;
    background-position: center center;
    background-size: 100% 100%;
}
//定义flex布局
.flex-option(@flex-direction,@justify-content,@align-items) {
    display: flex;
    flex-direction: @flex-direction;
    justify-content: @justify-content;
    align-items: @align-items;
}
.con {
    width: 1200px;
    margin: 0 auto;
}
</style>

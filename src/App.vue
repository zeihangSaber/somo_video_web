<template>
    <div id="app">
        <el-container>
            <el-header height="89px"><HeaderTab /></el-header>
            <el-main class="main"><router-view /></el-main>
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
}
.con {
    width: 1200px;
    margin: 0 auto;
}
.main {
    padding: 0px !important;
}
</style>

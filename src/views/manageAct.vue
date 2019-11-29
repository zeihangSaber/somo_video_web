<template>
    <div class="content"></div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
const needFooter = ["home", "price", "about", "download", "product"];
@Component
export default class ManageAct extends Vue {}
</script>
<style lang="less">
@import "../common/common";
.content {
    width: 1200px;
    margin: 0 auto;
}
</style>

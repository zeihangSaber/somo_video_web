<template>
    <div>
        <HeaderTab />
        <h2>活动页面</h2>
    </div>
</template>

<script lang="ts">
import HeaderTab from "@/components/HeaderTab.vue";
import { Component, Vue } from "vue-property-decorator";
@Component({
    components: {
        HeaderTab
    }
})
export default class Activity extends Vue {}
</script>

<style lang="less" scoped></style>

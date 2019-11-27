<template>
    <div>
        <HeaderTab />
        download页面
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
export default class Download extends Vue {}
</script>

<style lang="less" scoped></style>

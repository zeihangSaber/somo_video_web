<template>
    <div>
        <HeaderTab />
        Pirce页面
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
export default class Price extends Vue {}
</script>

<style lang="less" scoped></style>

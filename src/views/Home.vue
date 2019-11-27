<template>
    <div>
        Hello world
    </div>
</template>

<script lang="ts">
// @ is an alias to /src
import HeaderTab from "@/components/HeaderTab.vue";
import Vue from "vue";
import { Component } from "vue-property-decorator";
@Component
export default class Home extends Vue {
    name: string = "home";
    created() {
        // this.$somo.actList();
        // console.log(this.$somo);
        // this.$somo.join();
    }
}
</script>

<style lang="less" scoped></style>

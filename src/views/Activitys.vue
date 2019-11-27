<template>
    <div>
        <h2>活动页面</h2>
    </div>
</template>

<script lang="ts">
import Somo_ajax from "@/utils/ajax";
import { Component, Vue } from "vue-property-decorator";
@Component
export default class Activitys extends Vue {
    created() {
        Somo_ajax.actList({
            tenant: 0,
            start: new Date().getTime() - 3600 * 1000 * 24 * 30,
            end: new Date().getTime() + 3600 * 1000 * 24 * 30
        }).then((res: string[]) => {
            console.log("获取全部活动数据列表", res);
        });
    }
}
</script>

<style lang="less" scoped></style>

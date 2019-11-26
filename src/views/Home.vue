<template>
  <div>
    {{ msg }}
    Hello world
  </div>
</template>

<script lang="ts">
// @ is an alias to /src
// import HeaderTab from "@/components/HeaderTab.vue";
// import Vue from "vue";
// import { Component } from "vue-property-decorator";
// @Component({
//   components: {
//     HeaderTab
//   }
// })
// export default class Home extends Vue {
//   name: string = "home";
//   inject =
//   created() {
//     console.log(this);
//     // this.$somo.join();
//   }
// }
export default {
  inject: ["somo"]
};
</script>

<style lang="less" scoped></style>

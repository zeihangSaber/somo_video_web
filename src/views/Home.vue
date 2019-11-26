<template>
  <div>
    {{ msg }}
    Hello world
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
@Component
export default class Home extends Vue {
  // 初始化数据
  msg: number = 123;

  // 声明周期钩子
  mounted() {
    this.greet();
  }

  // 计算属性
  get computedMsg() {
    return "computed " + this.msg;
  }

  // 方法
  greet() {
    console.log("greeting: " + this.msg);
  }
}
</script>

<style lang="less" scoped></style>

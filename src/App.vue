<template>
  <div id="app">
    <router-view />
  </div>
</template>
<script lang="ts">
import ajax from "@/utils/ajax";
const obj: any = {
  name: "App",
  created() {
    console.log(ajax);
    ajax.actList();
  }
};
export default obj;
</script>
<style lang="less"></style>

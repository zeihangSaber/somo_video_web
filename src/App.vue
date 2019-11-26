<template>
  <div id="app">
    <router-view />
  </div>
</template>
<script lang="ts">
import Somo from "somo-fir";
import Vue from "vue";

// Vue.prototype.$somo = new Somo(1, 2);
// console.log(Somo.send);
export default {
  name: "App"
};
</script>
<style lang="less"></style>

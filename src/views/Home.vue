<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js App" />
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";
import somo from "somo-fir";
import vue from "vue";
vue.$somo = somo;
console.log(somo);
export default {
  name: "home",
  components: {
    HelloWorld
  },
  created() {
    console.log(this.$somo);
  }
};
</script>

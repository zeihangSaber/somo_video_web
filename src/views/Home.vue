<template>
  <div>
    {{ msg }}
    Hello world
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from "@/components/HelloWorld.vue";
export default {
  name: "home",
  // components: {
  //   HelloWorld
  // },
  created() {
    console.log(this.$somo);
    this.$somo.join();
  }
};
</script>

<style lang="less" scoped></style>

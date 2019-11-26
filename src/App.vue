<template>
  <div id="app">
    <router-view />
  </div>
</template>
<script lang="ts">
import Somo from "somo-fir";
import md5 from "js-md5";
import post from "./utils/post";
import Vue from "vue";

// Vue.prototype.$somo = new Somo(1, 2);
// console.log(Somo.send);
const obj: any = {
  name: "App",
  created() {
    const { dt, os, osver, model, device, version } = Somo.defaultParameter;
    Somo.send({
      url: "https://udb.video.somo.tech/api/v1/udb/login",
      method: "post",
      data: {
        account: "QAtest030",
        password: md5("123456"),
        dt,
        os,
        osver,
        model,
        device,
        version
      }
    }).then((res: any) => {
      const { cookie, uid } = res;
      Vue.prototype.$somo = new Somo(uid, cookie);
      console.log("App", this.$somo);
      this.$somo.postInit(post);
    });
  }
};
export default obj;
</script>
<style lang="less"></style>

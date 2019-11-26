<template>
  <div id="app">
    <!-- <div id="nav"></div> -->
    <router-view />
  </div>
</template>
<script>
import Somo from "somo-fir";
import md5 from "js-md5";
import post from "./utils/post";
import Vue from "vue";
export default {
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
    }).then(res => {
      const { cookie, uid } = res;
      Vue.prototype.$somo = new Somo(uid, cookie);
      this.$somo.postInit(post);
    });
  }
};
</script>
<style lang="less">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

// #nav {
//   padding: 30px;

//   a {
//     font-weight: bold;
//     color: #2c3e50;

//     &.router-link-exact-active {
//       color: #42b983;
//     }
//   }
// }
</style>

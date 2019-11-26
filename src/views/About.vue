<template>
  <div>
    41
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Somo from "somo-fir";
import md5 from "js-md5";
export default {
  mounted() {
    Somo.send({
      url: "https://udb.video.somo.tech/api/v1/udb/login",
      method: "post",
      data: {
        account: "QAtest030",
        password: md5("123456"),
        dt: 3,
        os: 2,
        osver: "10.2",
        model: "HUAWEI P20",
        device: Somo.uuid(),
        version: "3.0.0"
      }
    }).then(res => {
      let { cookie, uid } = res.data.data;
      console.log(new Somo(uid, cookie).queryMid({ code: 18391 }));
    });
  }
};
</script>

<style lang="less" scoped></style>

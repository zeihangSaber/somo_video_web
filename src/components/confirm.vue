<template>
  <div class="confirm">
    <h3>{{ confirmTitle }}</h3>
    <h4>{{ confirmText }}</h4>
    <div class="confirm_btn">
      <button @click="cancel">取消</button>
      <button class="affirm" @click="affirm">确认</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  props: ["confirmTitle", "confirmText", "item"],
  methods: {
    cancel() {
      this.$emit("cancel");
    },
    affirm() {
      this.$emit("affirm",this.item);
    }
  }
};
</script>

<style lang="less" scoped>
@import "../common/common";
.confirm {
  padding: 0 32px;
  z-index: 1000;
  position: fixed;
  left: 40%;
  top: 50%;
  transform: translate(-40%, -50%);
  width: 290px;
  height: 174px;
  background: rgba(255, 255, 255, 1);
  border-radius: 8px;
  flex-direction: column;
  .flex(flex-start, center);
  h3 {
    margin: 20px 0 12px 0;
    font-size: 20px;
    font-weight: 500;
    color: rgba(51, 51, 51, 1);
  }
  h4 {
    font-size: 16px;
    font-weight: 400;
    color: rgba(102, 102, 102, 1);
  }
  .confirm_btn {
    margin-top: 16px;
    button {
      background-color: #fff;
      margin-left: 12px;
      width: 100px;
      height: 32px;
      border-radius: 24px;
      border: 1px solid rgba(17, 139, 251, 1);
      color: rgba(17, 139, 251, 1);
      outline: none;
    }
    .affirm {
      color: rgba(255, 255, 255, 1);
      background: linear-gradient(
        180deg,
        rgba(47, 184, 255, 1) 0%,
        rgba(17, 139, 251, 1) 100%
      );
    }
  }
}
</style>

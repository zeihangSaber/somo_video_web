<template>
  <div class="bigBox">
    <div class="title">
      <p class="p">
        参会方(<span>{{ members.length }}</span
        >)
      </p>
      <i class="font_family icon-close" @click="$emit('handleParty')"></i>
    </div>
    <div class="box">
      <div class="top">
        <div class="input">
          <input type="text" placeholder="搜索账号名称" />
        </div>
        <div
          class="item"
          v-for="item of members"
          :key="item.uid"
          @mouseenter="enter($event, item)"
          @mouseleave="leave($event)"
        >
          <img :src="item.avarter" />
          <p>{{ item.name }}</p>
          <button class="permissionBtn" @click="setMic(item)">
            {{ item.mic === 1 ? "取消静音" : "静音" }}
          </button>
          <button class="permissionBtn more" @click="more">
            更多
            <div v-show="permissionShow" class="permission">
              <span class="permission_header"></span>
              <div class="permission_content">
                <div>设为主讲</div>
                <div>关闭摄像头</div>
                <div>设为主持人</div>
                <div>移除</div>
              </div>
            </div>
          </button>

          <div class="noPermissionBtn">
            <i
              :class="
                `font_family icon-camera-user ${
                  item.camera === 1 ? '' : 'active'
                }`
              "
            ></i>
          </div>
          <div class="noPermissionBtn">
            <i
              :class="
                `font_family icon-user-mic ${item.mic === 1 ? '' : 'active'}`
              "
            ></i>
          </div>
        </div>
      </div>
      <div class="line"></div>
      <div class="bottom">
        <button :disabled="!hasControl">全体静音</button>
        <button :disabled="!hasControl">解除全体静音</button>
        <button :disabled="!hasControl">锁定会议</button>
      </div>
    </div>
  </div>
</template>
<script>
import antiquity from "../utils/Antiquity";
export default {
  name: "party",
  props: ["members", "hasControl"],
  data() {
    return {
      permissionShow: false
    };
  },
  methods: {
    enter(event, item) {
      console.log(item);
      //   event.target.className = "item itemMouse";
      if (this.hasControl) {
        event.target.className = "item itemMouse";
      }
    },
    leave(event) {
      //   event.target.className = "item";
      //   this.permissionShow = false;
      if (this.hasControl) {
        this.permissionShow = false;
        event.target.className = "item";
      }
    },
    more() {
      this.permissionShow = true;
    },
    setMic(item) {
      const micState = item.mic;
      const value = `[${item.uid}]`;
      console.log(micState, value);
      antiquity.ajax
        .ruleSet({
          admin: antiquity.uid,
          rule: Boolean(micState) ? 1012 : 1011,
          value
        })
        .then(res => {
          console.log(res);
        });
      //   console.log(antiquity);
    }
  }
};
</script>
<style lang="less" scoped>
@import "../common/common";
.title {
  padding-bottom: 10px;
  .flex(space-between, center);
  .p {
    padding-left: 10px;
    .fontStyle(18px, #000, blod);
    flex: 1;
  }
  .icon-close {
    color: #c5c6c8;
  }
}
.box {
  border-radius: 6px;
  background-color: #fff;
  flex: 1;
  .flex();
  flex-direction: column;
  .bottom {
    padding: 14px 20px;
  }
  .top {
    flex: 1;
    padding: 14px 8px;
    .input {
      padding: 0 12px;
      input {
        background-color: #f4f4f4;
        border-radius: 16px;
        width: 100%;
        height: 32px;
        text-align: center;
        outline: none;
        margin-bottom: 5px;
      }
    }

    .item {
      position: relative;
      .flex(flex-start, center);
      padding: 8px 12px;
      border-radius: 4px;
      img {
        width: 36px;
        height: 36px;
        margin-right: 15px;
        border: 0;
        border-radius: 20px;
      }
      p {
        flex: 1;
      }
      .icon-camera-user,
      .icon-user-mic {
        color: #ff6b6f;
        font-size: 20px;
        &.active {
          color: #c5c6c8;
        }
      }
      .permissionBtn {
        z-index: 10;
        display: none;
        margin-left: 8px;
        border: 0;
        height: 24px;
        background: rgba(255, 107, 111, 1);
        border-radius: 4px;
        font-size: 12px;
        color: #fff;
        line-height: 16px;
        padding: 4px 8px;
        outline: none;
      }
      .more {
        background-color: #118bfb;
      }
      .permission {
        position: absolute;
        right: 12px;
        top: 30px;
        .permission_header {
          border-radius: 1px;
          position: relative;
          top: 7px;
          left: 27%;
          display: inline-block;
          width: 6px;
          height: 6px;
          background-color: #666666;
          transform: rotate(45deg);
        }
        .permission_content {
          border-radius: 6px;
          min-width: 90px;
          background-color: #666666;
          padding: 10px;
          div {
            font-size: 10px;
            color: rgba(255, 255, 255, 1);
            line-height: 14px;
            margin-top: 10px;
          }
          :first-child {
            margin-top: 0px;
          }
        }
      }
    }
    .itemMouse {
      background-color: #f4f4f4;
      .noPermissionBtn {
        display: none;
      }
      .permissionBtn {
        display: block;
      }
    }
  }
  .line {
    border-bottom: 2px solid #f4f4f4;
  }
  .bottom {
    height: 60px;
    .flex(space-between);
    button {
      background-color: #fff;
      border-radius: 4px;
      border: 1px solid #118bfb;
      height: 100%;
      width: 100px;
      color: #118bfb;
      font-size: 14px;
    }
  }
  margin-bottom: 10px;
}
button {
  background-color: #fff;
  border: none;
}
</style>

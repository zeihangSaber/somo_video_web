<template>
  <div id="app">
    <div class="content">
      <ctrl
        @handleSide="handleSide"
        :data="meetingInfo"
        :peopleNum="peopleNum"
        :micNum="micNum"
        :showSide="isShowSide"
        :showMessage="isShowMessage"
        :showParty="isShowParty"
        @handleMessage="handleMessage"
        @handleParty="handleParty"
      ></ctrl>
      <div class="playerBigBox">
        <player v-for="item of members" :key="item.uid" :data="item"></player>
        <div id="myStream" class="playerBox"></div>
      </div>
    </div>
    <side-box
      v-if="isShowSide"
      :data="meetingInfo"
      :members="members"
      :showMessage="isShowMessage"
      :showParty="isShowParty"
      @handleMessage="handleMessage"
      @handleParty="handleParty"
    ></side-box>
  </div>
</template>

<script>
import Player from "./components/player";
import Ctrl from "./components/controls";
import SideBox from "./components/side";
import antiquity from "./utils/Antiquity";
export default {
  name: "app",
  components: {
    Player,
    Ctrl,
    SideBox
  },
  data() {
    return {
      meetingInfo: {},
      members: [],
      peopleNum: 0,
      micNum: 0,
      isShowSide: true,
      isShowMessage: true,
      isShowParty: true
    };
  },
  created() {
    antiquity.on("getMidInfo", meetingInfo => {
      this.meetingInfo = meetingInfo;
      console.log("meetingInfo", this.meetingInfo);
    });
    antiquity.on("getMembers", members => {
      this.members = members;
      this.peopleNum = members.length;
      this.micNum = members.filter(item => {
        if (item.mic === 0) {
          return item;
        }
      }).length;
      console.log("members", this.members);
    });
    antiquity.on("getShareUrl", sharer => {
      console.log("sharer", sharer);
    });
    antiquity.on("getSpeaker", speaker => {
      console.log("speaker", speaker);
    });
    window.saber = antiquity;
  },
  mounted() {
    antiquity.joinMeeting({
      code: 66666,
      width: 500,
      height: 500,
      dom: document.getElementById("myStream")
	});
  },
  methods: {
    handleSide() {
      this.isShowSide = !this.isShowSide;
    },
    handleMessage() {
      this.isShowMessage = !this.isShowMessage;
    },
    handleParty() {
      this.isShowParty = !this.isShowParty;
    }
  }
};
</script>

<style lang="less">
@import "./common/base";
@import "./common/common";
.playerBox {
  width: 33%;
  height: 33%;
  background-color: bisque;
}
.playerBigBox {
  height: 100%;
  .flex(space-around, flex-start);
  flex-wrap: wrap;
}
.icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
.vjs-tech {
  transform: translateZ(0);
}
button,
.icon-close {
  cursor: pointer;
  &:disabled {
    cursor: not-allowed;
    color: #ccc !important;
    border-color: #ccc !important;
    i {
      color: #ccc !important;
    }
  }
}
#app {
  height: 100%;
  width: 100%;
  .flex(flex-start, flex-start);
  .content {
    position: relative;
    height: 100%;
    flex: 1;
    background-color: #91949c;
  }
}
</style>

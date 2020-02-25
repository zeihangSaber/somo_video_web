<template>
    <div class="help" @click="$emit('handleHelp')">
        <div class="helpContent" @click.stop>
            <h2>解决浏览器flash禁用设置</h2>
            <div @click="$emit('handleHelp')" class="close">✖</div>
            <div v-if="isWin && name === 'Chrome'">
                <h3>第一步：点击右上方“更多”选项，点击“设置”</h3>
                <img src="https://test.video.somo.tech/common/help/help_win_Chome_1.png">
                <h3>第二步：点击“高级--隐私设置和安全性”，再点击“网站设置”</h3>
                <img src="https://test.video.somo.tech/common/help/help_win_Chome_2.png">
                <h3>第三步：找到“Flash”选项,点击“Flash”</h3>
                <img src="https://test.video.somo.tech/common/help/help_win_Chome_3.png">
                <h3>第四步：将“禁止网站运行flash”打开，关闭“设置”页</h3>
                <img src="https://test.video.somo.tech/common/help/help_win_Chome_4.png">
                <h3>第五步：若结束以上操作后，无法出现图中“点击即可启用Adobe flash player”，请刷新页面</h3>
                <img src="https://test.video.somo.tech/common/help/help_win_Chome_5.png">
            </div>
            <div v-if="isWin && name === 'edge'">
                <h3>第一步：点击右上方“更多”选项，点击“设置”</h3>
                <img src="https://test.video.somo.tech/common/help/help_win_edge_1.png">
                <h3>第二步：在“设置”项内，点击“高级”，将“使用Adobe flash player”设为开启</h3>
                <img src="https://test.video.somo.tech/common/help/help_win_edge_2.png">
                <h3>第三步：若结束以上操作后，无法出现图中“选择以设置Adobe flash player”，请刷新页面</h3>
                <img src="https://test.video.somo.tech/common/help/help_win_edge_3.png">
            </div>
            <div v-if="isMac && name === 'Chrome'">
                <h3>第一步：点击“Chrome--偏好设置”</h3>
                <img src="https://test.video.somo.tech/common/help/help_mac_Chome_1.png">
                <h3>第二步：在“设置”页面内，点击“高级--网站设置”</h3>
                <img src="https://test.video.somo.tech/common/help/help_mac_Chome_2.png">
                <h3>第三步：点击“　Flash”项</h3>
                <img src="https://test.video.somo.tech/common/help/help_mac_Chome_3.png">
                <h3>第四步:  将“禁止网站运行flash”打开，关闭“设置”页</h3>
                <img src="https://test.video.somo.tech/common/help/help_mac_Chome_4.png">
                <h3>第五步：若结束以上操作后，无法出现图中“点击即可启用Adobe flash player”，请刷新页面</h3>
                <img src="https://test.video.somo.tech/common/help/help_mac_Chome_5.png">
            </div>
            <div v-if="isMac && name === 'Safari'">
                <h3>一、Safari浏览器（检查摄像头是否开启）</h3>
                <h3>第一步：点击“Safari浏览器--偏好设置”</h3>
                <img src="https://test.video.somo.tech/common/help/help_mac_Safari_1.png">
                <h3>第二步：点击“网站--Adobe flash player--会议页面网址--允许”，关闭设置框后请刷新页面</h3>
                <img src="https://test.video.somo.tech/common/help/help_mac_Safari_2.png">
            </div>
        </div>
    </div>
</template>

<script>
    import antiquity from "../utils/Antiquity";

    export default {
        name: "help",
        data() {
            return {
                name: 'edge',
                isWin: (navigator.platform == "Win32")
                || (navigator.platform == "Windows"),
                isMac: (navigator.platform == "Mac68K")
                || (navigator.platform == "MacPPC")
                || (navigator.platform == "Macintosh")
                || (navigator.platform == "MacIntel")
            }
        },
        mounted() {
            let agent = navigator.userAgent;
            if (agent.indexOf("Safari")) {
                this.name = "Safari"
            }
            if (agent.indexOf("QQBrowser")) {
                this.name = "QQBrowser"
            }
            if (agent.indexOf("Chrome")) {
                this.name = "Chrome"
            }
        },
        created() {
            window.localStorage.setItem('isFir', 1);
        },
        destroyed() {
            this.$emit('handleHelp');
        }
    }
</script>

<style lang="less" scoped>
    @import "../common/common";
    .help {
        position: fixed;
        z-index: 10000;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,.5);
        top: 0;
        left: 0;
        .flex(center, center);
        .helpContent {
            width: 80%;
            background: #fff;
            max-height: 80%;
            overflow-y: auto;
            text-align: center;
            padding: 20px;
            border-radius: 5px;
            position: relative;
            .close {
                position: absolute;
                top: 20px;
                right: 20px;
                color: #ccc;
                font-size: 24px;
                cursor: pointer;
            }
            img {
                width: 80%;
            }
            h3, p, img {
                padding: 15px 0;
            }
        }
    }
</style>

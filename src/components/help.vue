<template>
    <div class="help" @click="$emit('handleHelp')">
        <div class="helpContent" @click.stop>
            <h2>如果您的浏览器无法正常显示自己的视频或是其他参会方视频，可采取以下操作。</h2>
            <p class="Tt">请您先确认是否有其他的应用程序正在使用摄像头设备，如果有其他应用程序正在使用摄像头设备，请先关闭正在使用摄像头设备的应用程序。</p>
            <div @click="$emit('handleHelp')" class="close">✖</div>
            <div v-if="isWin && name === 'Chrome'">
                <h3>点击右上方“更多”选项，点击“设置”</h3>
                <img src="https://test.video.somo.tech/common/help/help_win_Chome_1.png">
                <h3>点击“高级--隐私设置和安全性”，再点击“网站设置”</h3>
                <img src="https://test.video.somo.tech/common/help/help_win_Chome_2.png">
                <h3>找到“Flash”选项,点击“Flash”</h3>
                <img src="https://test.video.somo.tech/common/help/help_win_Chome_3.png">
                <h3>将“禁止网站运行flash”打开，关闭“设置”页</h3>
                <img src="https://test.video.somo.tech/common/help/help_win_Chome_4.png">
                <h3>点击上方导航栏的锁定按钮，选择并确认摄像头、麦克风、flash、声音状态为【允许】</h3>
                <img src="https://test.video.somo.tech/common/help/help_win_Chome_5.png">
                <h3>若结束以上操作后，无法出现图中“点击即可启用Adobe flash player”，请刷新页面</h3>
                <img src="https://test.video.somo.tech/common/help/help_win_Chome_6.png">
            </div>
            <div v-else-if="isWin && name === 'edge'">
                <h3>点击右上方“更多”选项，点击“设置”</h3>
                <img src="https://test.video.somo.tech/common/help/help_win_edge_1.png">
                <h3>在“设置”项内，点击“高级”，将“使用Adobe flash player”设为开启</h3>
                <img src="https://test.video.somo.tech/common/help/help_win_edge_2.png">
                <h3>若结束以上操作后，无法出现图中“选择以设置Adobe flash player”，请刷新页面</h3>
                <img src="https://test.video.somo.tech/common/help/help_win_edge_3.png">
            </div>
            <div v-else-if="isWin && name === 'QQBrowser'">
                <h3>点击右上方“更多”选项，点击“设置”</h3>
                <img src="https://test.video.somo.tech/common/help/help_win_QQBrowser_1.png">
                <h3>找到“安全与隐私”，点击“内容设置”</h3>
                <img src="https://test.video.somo.tech/common/help/help_win_QQBrowser_2.png">
                <h3>找到“插件”，勾选“运行所有插件内容”</h3>
                <img src="https://test.video.somo.tech/common/help/help_win_QQBrowser_3.png">
                <h3>以上操作完成后，刷新页面，出现flash设置框，点击“允许”即可使用</h3>
                <img src="https://test.video.somo.tech/common/help/help_win_QQBrowser_4.png">
            </div>
            <div v-else-if="isMac && name === 'Chrome'">
                <h2>方法一：</h2>
                <h3>点击“Chrome--偏好设置”</h3>
                <img src="https://test.video.somo.tech/common/help/help_mac_Chome_1.png">
                <h3>在“设置”页面内，点击“高级--网站设置”</h3>
                <img src="https://test.video.somo.tech/common/help/help_mac_Chome_2.png">
                <h3>点击“Flash”项</h3>
                <img src="https://test.video.somo.tech/common/help/help_mac_Chome_3.png">
                <h3>将“禁止网站运行flash”打开，关闭“设置”页</h3>
                <img src="https://test.video.somo.tech/common/help/help_mac_Chome_4.png">
                <h2>方法二：</h2>
                <h3>点击上方导航栏的锁定按钮，选择并确认摄像头、麦克风、flash、声音状态为【允许】</h3>
                <img src="https://test.video.somo.tech/common/help/help_mac_Chome_6.png">
                <h3>若结束以上操作后，无法出现图中“点击即可启用Adobe flash player”，请刷新页面</h3>
                <img src="https://test.video.somo.tech/common/help/help_mac_Chome_5.png">
            </div>
            <div v-else-if="isMac && name === 'Safari'">
                <h3>Safari浏览器（检查摄像头是否开启）</h3>
                <h3>点击“Safari浏览器--偏好设置”</h3>
                <img src="https://test.video.somo.tech/common/help/help_mac_Safari_1.png">
                <h3>点击“网站--Adobe flash player--会议页面网址--允许”，关闭设置框后请刷新页面</h3>
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

            if (agent.includes("Safari")) {
                this.name = "Safari";
                console.log("Safari~~~~~~~~~~~~~~~~~~~~~~~~");
            }
            if (agent.includes("QQBrowser")) {
                this.name = "QQBrowser"
            }
            console.log(agent);
            if (agent.includes("Chrome")) {
                this.name = "Chrome";
                console.log("Chrome~~~~~~~~~~~~~~~~~~~~~~~");
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
        .Tt {
            font-size: 18px;
        };
        .flex(center, center);
        .helpContent {
            width: 1280px;
            background: #fff;
            max-height: 80%;
            overflow-y: auto;
            text-align: left;
            padding: 20px 50px;
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
                width: 100%;
            }
            h3, p, img {
                padding: 15px 0;
            }
        }
    }
</style>

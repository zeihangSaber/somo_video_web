<template>
    <div>
        <object>
            <embed
                src="../Player.swf"
                bgcolor="#999999"
                quality="high"
                ref="embed"
                width="320"
                height="240"
                allowScriptAccess="always"
                type="application/x-shockwave-flash"
            >
            </embed>
        </object>
    </div>
</template>

<script>
    import rtmpStreamer from 'rtmp-streamer'
    export default {
        props: {
            data: {
                default() {
                    return {

                    }
                }
            }
        },
        data() {
            return {
                player: null
            }
        },
        mounted() {
            console.log('~~~~~~~~~~~~~~~~~~~~~~', this.data);
            setTimeout(() => {
                this.player = new rtmpStreamer(this.$refs.embed);
            }, 2000);
            setTimeout(() => {
                this.player.play("rtmp://rtmp2.video.somo.tech/video/", `${this.data.mid}U${this.data.uid}`)
            }, 5000);
        }
    }
</script>

<style lang="less" scoped>
    embed {
        transform: translateZ(0) !important;
    }
</style>

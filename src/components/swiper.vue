<template>
    <div class="swiper">
        <slot></slot>
        <div id="fullPage" ref="fullPage">
            <template>
                <div v-for="slider of sliderList">
                    <player v-for="player of slider" :data="player" :key="player.uid"></player>
                </div>
            </template>
        </div>
    </div>
</template>

<script>
    import antiquity from "../utils/Antiquity"
    import Player from "../components/player"
    import fullPage from "fullpage.js"
    export default {
        data() {
            return {
                sliderList: []
            }
        },
        created() {
            antiquity.on("newSlider", () => {
                this.sliderList = antiquity.getSlides(4);
                console.log("sliderList~~~~~~~~~~~~~~~~~", this.sliderList);
            })
        },
        mounted() {
            this.$nextTick(() => {
                new fullPage(this.$refs.fullPage, {})
            })
        },
        components: {
            Player: Player
        }
    }
</script>

<style lang="less" scoped>
    @import "../common/common";
    .swiper {
        width: 100%;
        height: 100%;
    }
</style>

<template>
    <div class="swiper" ref="swiper">
        <div :class="activeSection === sliderList.isMine ? 'boxIn' : 'boxOut'" :style="`position: absolute; top: ${top}px; left: ${left}px; height: ${Height}px; width: ${Width}px`">
            <slot></slot>
        </div>
        <div id="fullPage" ref="fullPage">
            <template>
                <div class="section" v-for="(slider, index) in sliderList">
                    <div
                        :class="slider.isSpeaker || slider.isSharer || peopleNum < 3 ? 'swiperOne' : 'bigSwiper'"
                        :style="`height: ${height}`"
                    >
                        <div v-if="slider.hasMine" ref="bug" :class="`playerBox ${peopleNum === 2 ? 'sliderTwo' : ''}`"></div>
                        <template v-if="activeSection === index">
                            <player v-for="player of slider" :data="player" :key="player.uid" :myUid="meetingInfo.myUid"></player>
                        </template>
                    </div>
                </div>
            </template>
<!--            <div class="section"></div>-->
<!--            <div class="section"></div>-->
        </div>
    </div>
</template>

<script>
    import antiquity from "../utils/Antiquity"
    import Player from "../components/player"
    import fullPage from "fullpage.js"
    export default {
        props: {
            meetingInfo: {
                default() {
                    return {
                        myUid: 0
                    }
                }
            },
            sliderCount: Number,
            showSide: Boolean
        },
        data() {
            const moveSectionDown = antiquity.debounce((eve) => {
                this.fullPage && this.fullPage.moveSectionDown();
                console.log(eve);

            });
            const moveSectionUp = antiquity.debounce((eve) => {
                this.fullPage && this.fullPage.moveSectionUp();
                console.log(eve);
            });
            return {
                sliderList: [[]],
                fullPage: null,
                height: "100%",
                activeSection: 0,
                peopleNum: 1,
                top: 0,
                left: 0,
                Height: 0,
                Width: 0,
                moveSectionDown: moveSectionDown,
                moveSectionUp: moveSectionUp
            }
        },
        created() {
            antiquity.on("newSlider", async () => {
                this.sliderList = antiquity.getSlides(this.sliderCount);
                const { peopleNum } = antiquity.getPeopleNum();
                this.peopleNum = peopleNum;
                await this.$nextTick();
                await this.$nextTick();
                await this.$nextTick();
                this.left = this.$refs.bug[0].offsetLeft;
                this.top = this.$refs.bug[0].offsetTop;
                this.Height = this.$refs.bug[0].offsetHeight;
                this.Width = this.$refs.bug[0].offsetWidth;
                this.activeSection = this.fullPage.getActiveSection().index;
                this.fullPage && this.fullPage.reBuild();
            })
        },
        async mounted() {
            await this.$nextTick();
            await this.$nextTick();
            await this.$nextTick();
            window.addEventListener('mousewheel', this.handleScroll, false);
            setTimeout(() => {
                this.fullPage = new fullPage(this.$refs.fullPage, {
                    afterLoad: () => {
                        this.height = `${this.$refs.swiper.offsetHeight}px`;
                    },
                    afterResize: (width, height) => {
                        this.height = `${this.$refs.swiper.offsetHeight}px`;
                        this.left = this.$refs.bug[0].offsetLeft;
                        this.top = this.$refs.bug[0].offsetTop;
                        this.Height = this.$refs.bug[0].offsetHeight;
                        this.Width = this.$refs.bug[0].offsetWidth;
                        this.activeSection = this.fullPage.getActiveSection().index
                    }
                })
            }, 2000)
        },
        watch: {
            async sliderList() {
                await this.$nextTick();
                await this.$nextTick();
                await this.$nextTick();
                this.left = this.$refs.bug[0].offsetLeft;
                this.top = this.$refs.bug[0].offsetTop;
                this.Height = this.$refs.bug[0].offsetHeight;
                this.Width = this.$refs.bug[0].offsetWidth;
                this.activeSection = this.fullPage.getActiveSection().index;
                this.fullPage && this.fullPage.reBuild()
            },
            async showSide() {
                await this.$nextTick();
                await this.$nextTick();
                await this.$nextTick();
                if (this.$refs.bug && this.$refs.bug[0]) {
                    this.height = `${this.$refs.swiper.offsetHeight}px`;
                    this.left = this.$refs.bug[0].offsetLeft;
                    this.top = this.$refs.bug[0].offsetTop;
                    this.Height = this.$refs.bug[0].offsetHeight;
                    this.Width = this.$refs.bug[0].offsetWidth;
                    this.activeSection = this.fullPage.getActiveSection().index
                }
            }
        },
        components: {
            Player: Player
        },
        methods: {
            handleScroll(e) {
                // if (e.deltaY > 0) {
                //     this.moveSectionDown(e)
                // } else {
                //     this.moveSectionUp(e)
                // }
            }
        }
    }
</script>

<style lang="less" scoped>
    @import "../common/common";
    .swiper {
        width: 100%;
        height: 100%;
    }
    .bigSwiper {
        .flex(flex-start, flex-start);
        align-content: flex-start;
        flex-wrap: wrap;
    }
</style>

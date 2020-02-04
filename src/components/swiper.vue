<template>
    <div class="swiper" ref="swiper">
        <div :class="sectionIndex === sliderList.isMine ? 'boxIn' : 'boxOut'" :style="`position: absolute; top: ${top}px; left: ${left}px; height: ${Height}px; width: ${Width}px`">
            <slot></slot>
        </div>
        <div :class="`section ${(slider.isSharer || slider.isSpeaker) || (peopleNum === 2 && slider.hasMine) ? 'sliderOne' : ''}`" v-if="sectionIndex === index" v-for="(slider, index) in sliderList">
            <div v-if="slider.hasMine" ref="bug" :class="`playerBox ${peopleNum === 2 ? 'sliderTwo' : ''}`"></div>
            <template v-if="sectionIndex === index">
                <player
                    v-for="player of slider"
                    :isShare="slider.isSharer"
                    :data="player"
                    :key="player.uid"
                    :myUid="meetingInfo.myUid"
                ></player>
            </template>
        </div>
        <div class="pages" v-if="sliderList.length > 1">
            <button :class="`${sectionIndex + 1 > 1 ?'active':''}`">
                <i @click="() => sectionIndex - 1" class="font_family icon-up"></i>
            </button>
            {{sectionIndex + 1}} / {{sliderList.length}}
            <button :class="`${sectionIndex + 1 < sliderList.length ?'active':''}`">
                <i @click="() => sectionIndex + 1" class="font_family icon-down"></i>
            </button>
        </div>
    </div>
</template>

<script>
    import antiquity from "../utils/Antiquity"
    import Player from "../components/player"
    import doubleClick from "../utils/doubleClick";
    import {fullScreen, noFullScreen} from "../utils/fullScreen";
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
            showSide: Boolean,
            changeScreen: Boolean
        },
        data() {
            const moveSectionDown = antiquity.debounce(() => {
                if (this.sectionIndex >= this.sliderList.length - 1) return;
                this.sectionIndex++;
            });
            const moveSectionUp = antiquity.debounce(() => {
                if (this.sectionIndex < 1) return;
                this.sectionIndex--;
            });
            return {
                sliderList: [[]],
                sectionIndex: 0,
                fullScreen: false,
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
                this.resetBugBox();
                console.log("this.sliderList~~~~~~~~~~~~~~~~", this.sliderList);
            })
        },
        async mounted() {
            await this.$nextTick();
            await this.$nextTick();
            await this.$nextTick();
            window.addEventListener('mousewheel', this.scrollFunc, false);
            window.addEventListener('mouseup', doubleClick(async () => {
                if (!this.changeScreen) {
                    fullScreen();
                    this.$emit("handleSide", false);
                    this.$emit("handleScreen", true);
                } else {
                    noFullScreen();
                    this.$emit("handleSide", true);
                    this.$emit("handleScreen", false);
                }
                await this.$nextTick();
                await this.$nextTick();
                await this.$nextTick();
                this.resetBugBox();
            }), false);
            this.resetBugBox();
        },
        watch: {
            showSide() {
                this.resetBugBox();
            }
        },
        components: {
            Player: Player
        },
        methods: {
            async resetBugBox() {
                await this.$nextTick();
                await this.$nextTick();
                await this.$nextTick();
                if (this.$refs.bug && this.$refs.bug[0]) {
                    this.left = this.$refs.bug[0].offsetLeft;
                    this.top = this.$refs.bug[0].offsetTop;
                    this.Width = this.$refs.bug[0].offsetWidth;
                    setTimeout(() => {
                        this.Height = this.$refs.bug[0].offsetHeight;
                    }, 100)
                }
            },
            scrollFunc({ deltaY }) {
                if (deltaY > 0) {
                    this.moveSectionDown()
                } else {
                    this.moveSectionUp()
                }
            }
        }
    }
</script>

<style lang="less" scoped>
    @import "../common/common";
    .swiper {
        width: 100%;
        height: 100%;
        position: relative;
    }
    .bigSwiper {
        .flex(flex-start, flex-start);
        align-content: flex-start;
        flex-wrap: wrap;
    }
    .section {
        width: 100%;
        height: 100%;
        color: #fff;
        display: flex;
        flex-wrap: wrap;
        .sliderTwo {
            position: absolute !important;
            z-index: 100;
            top: 0;
            right: 0;
            width: 480px!important;
            height: 270px!important;
        }
        &.sliderOne {
            .playerBox {
                width: 99.8%;
                height: 99.8%;
            }
        }
    }
    .pages {
        width:98px;
        height:30px;
        background:rgba(0,0,0,.5);
        border-radius:15px;
        position: absolute;
        bottom: 20px;
        left: 50%;
        margin-left: -49px;
        z-index: 300;
        text-align: center;
        line-height: 30px;
        color: #fff;
        button {
            width: 16px;
            line-height: 15px;
            border-radius: 50%;
            background-color: #fff;
            outline: none;
            border: none;
            opacity: .1;
            &.active {
                opacity: .2;
            }
        }
        .icon-up, .icon-down {
            color: #000;
            font-size:8px;
            margin-left: -7.5px;
        }
    }
</style>

<template>
    <div class="swiper" ref="swiper">
        <div
            :class="`${(sectionIndex === sliderList.isMine && !sliderList.set.skrMod) || (sliderList.set.iMSkr && sliderList.set.isSkr === sectionIndex) ? 'boxIn' : 'boxOut'} ${peopleNum === 2 && !sliderList.set.iMSkr ? 'twoPeople' : ''}`"
            :style="`position: absolute; top: ${top}px; left: ${left}px; height: ${Height}px; width: ${Width}px`"
        >
            <slot></slot>
        </div>
        <div
            :class="`section ${((slider.isSharer || slider.isSpeaker) || (peopleNum === 2 && slider.hasMine && !sliderList.set.skrMod) || peopleNum === 1) ? 'sliderOne' : ''}`"
            v-if="sectionIndex === index"
            v-for="(slider, index) in sliderList"
        >
            <div v-if="slider.hasMine && !sliderList.set.skrMod" ref="bug" :class="`playerBox ${peopleNum === 2 && !sliderList.set.skrMod ? 'sliderTwo' : ''}`"></div>
            <div v-if="sliderList.set.iMSkr && sliderList.set.isSkr === sectionIndex" ref="bug" :class="`playerBox saber`"></div>
            <template v-if="sectionIndex === index">
                <player
                    v-for="player of slider"
                    :isShare="slider.isSharer"
                    :data="player"
                    :key="player.uid"
                    :myUid="meetingInfo.mine.uid"
                    :ratio="ratio"
                ></player>
            </template>
        </div>
        <div :style="`${changeScreen ? 'bottom: 60px' : '0'}`" class="pages" v-if="sliderList.length > 1">
            <i @click="changePage(-1)" class="font_family icon-up"></i>
            {{sectionIndex + 1}} / {{sliderList.length}}
            <i @click="changePage(1)" class="font_family icon-down"></i>
        </div>
    </div>
</template>

<script>
    import antiquity from "../utils/Antiquity"
    import Player from "../components/player"
    import doubleClick from "../utils/doubleClick";
    import {fullScreen, noFullScreen, checkFull} from "../utils/fullScreen";
    const arr = [[]];
    arr.set = {
        skrMod: false,
        isSkr: -1,
        iMSkr: false
    };
    export default {
        props: {
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
            const resizeScreen = antiquity.debounce(() => {
                this.resetBugBox();
                this.ratio = this.$refs.swiper.offsetWidth / (this.$refs.swiper.offsetHeight / 3 * 4);
                this.$emit("handleRatio", this.ratio);
                if (!checkFull()) {
                    this.$emit('handleScreen', false);
                }
            });
            return {
                sliderList: arr,
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
                moveSectionUp: moveSectionUp,
                resizeScreen: resizeScreen,
                flash: false,
                ratio: 1.5,
                permission: false,
                meetingInfo: {
                    hasCam: false,
                    mine: {
                        uid: 0,
                        camera: 1
                    }
                }
            }
        },
        created() {
            antiquity.on("newSlider", async () => {
                this.sliderList = antiquity.getSlides(this.sliderCount, this.meetingInfo.mine.uid);
                const { peopleNum } = antiquity.getPeopleNum();
                this.peopleNum = peopleNum;
                this.resetBugBox();
                if (this.sectionIndex + 1 > this.sliderList.length) {
                    this.sectionIndex = this.sliderList.length - 1;
                }
                console.log(this.sliderList, 'sliderList~~~~~~~~~~~~~~')
            });
            antiquity.once("permission", () => {
                this.permission = true
            });
            antiquity.on('getMidInfo', meetingInfo => {
                this.meetingInfo = meetingInfo;
            });
            this.flash = hasUsableFlash();
            function hasUsableFlash () {
                let flashObj;
                if(typeof window.ActiveXObject != "undefined"){
                    flashObj = new  ActiveXObject("ShockwaveFlash.ShockwaveFlash");
                }else{
                    flashObj = navigator.plugins['Shockwave Flash'];
                }
                return flashObj ? true : false;
            }
            console.log('flash', this.flash);
        },
        async mounted() {
            await this.$nextTick();
            await this.$nextTick();
            await this.$nextTick();
            // this.$refs.swiper.addEventListener('mousewheel', this.scrollFunc, false);
            window.addEventListener('resize', this.resizeScreen, false);
            this.$refs.swiper.addEventListener('mouseup', doubleClick(async (e) => {
                await this.$nextTick();
                await this.$nextTick();
                await this.$nextTick();
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
            async showSide() {
                this.resetBugBox();
                await this.$nextTick();
                await this.$nextTick();
                await this.$nextTick();
                await this.$nextTick();
                await this.$nextTick();
                this.ratio = this.$refs.swiper.offsetWidth / (this.$refs.swiper.offsetHeight / 3 * 4);
                this.$emit("handleRatio", this.ratio);
            },
            async sliderCount() {
                this.sliderList = antiquity.getSlides(this.sliderCount);
                if (this.sectionIndex + 1 > this.sliderList.length) {
                    this.sectionIndex = this.sliderList.length - 1;
                }
                await this.$nextTick();
                await this.$nextTick();
                await this.$nextTick();
                this.resetBugBox();
            },
            async changeScreen() {
                await this.$nextTick();
                await this.$nextTick();
                await this.$nextTick();
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
                        if (!(this.$refs.bug && this.$refs.bug[0])) return;
                        this.Height = this.$refs.bug[0].offsetHeight;
                    }, 150)
                }
            },
            scrollFunc({ deltaY }) {
                if (deltaY > 0) {
                    this.moveSectionDown()
                } else {
                    this.moveSectionUp()
                }
            },
            changePage(num) {
                if (this.sectionIndex >= this.sliderList.length - 1 && num > 0) return;
                if (this.sectionIndex < 1 && num < 0) return;
                this.sectionIndex = this.sectionIndex + num;
                this.resetBugBox();
            }
        },
        destroyed() {

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
        align-content: flex-start;
        .sliderTwo {
            position: absolute !important;
            z-index: 100;
            top: 0;
            right: 0;
            width: 300px!important;
            height: 180px!important;
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
        .icon-up, .icon-down {
            color: #fff;
            font-size:12px;
            cursor: pointer;
        }
    }
</style>

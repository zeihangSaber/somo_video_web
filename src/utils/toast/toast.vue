<template>
    <div class="toastBigBox">
        <div v-for="layer of layers" class="toastBox" :key="layer.id">
            {{layer.message}}
        </div>
    </div>
</template>
<script>
    export default {
        name: 'toast',
        data() {
            return {
                layers: [],
                id: 0
            }
        },
        methods: {
            add(options) {
                let obj = {
                    duration: 300,
                    ...options,
                    id: ++this.id
                };
                obj.timer = setTimeout(() => {
                    this.remove(obj);
                }, 1500);
                this.layers.push(obj);
            },
            remove(layer) {
                clearTimeout(layer.timer);
                this.layers = this.layers.filter(item => item.id !== layer.id)
            }
        }
    }
</script>
<style>
    .toastBigBox {
        position: absolute;
        top: 15%;
        left: 50%;
        z-index: 999999999;
        transform: translateX(-50%);
    }
    .toastBox {
        color: #fff;
        font-size: 24px;
        background-color: rgba(0, 0, 0, .4);
        height: 40px;
        border-radius: 5px;
        line-height: 40px;
        padding: 0 10px;
        margin-bottom: 10px;
        text-align: center;
    }
</style>

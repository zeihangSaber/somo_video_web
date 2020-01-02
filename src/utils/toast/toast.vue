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
                id: 0,
                msg: []
            }
        },
        methods: {
            add(options) {
                this.msg = this.layers.map(item => {
                    return item.message
                });

                if (this.msg.includes(options.message)) return;

                let obj = {
                    duration: 300,
                    ...options,
                    id: ++this.id
                };

                obj.timer = setTimeout(() => {
                    this.remove(obj);
                }, 3000);


                if (this.layers.length > 2) {
                    const fir = this.layers.shift();
                    clearTimeout(fir.timer);
                    this.remove(fir);
                }

                this.layers.push(obj);
            },
            remove(layer) {
                clearTimeout(layer.timer);
                this.layers = this.layers.filter(item => item.id !== layer.id);
				console.log(this.layers)
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

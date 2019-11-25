<template>
  <div>sss</div>

</template>

<script>
    import agora from 'agora'
    import Somo from 'somo-client'
    export default {
        name: "agora",
        data() {
            return {
                client: null
            }
        },
        created() {
            let somo = new Somo()
            window.somo = somo
            somo.init()
            this.client = agora.createClient()
        }
    }
</script>

<style scoped>
</style>

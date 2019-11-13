<template>
  <div>sss</div>

</template>

<script>
    import agora from 'agora'
    export default {
        name: "agora",
        data() {
            return {
                client: null
            }
        },
        created() {
            this.client = agora.createClient()
        }
    }
</script>

<style scoped>
</style>

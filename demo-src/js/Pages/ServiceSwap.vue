<script>
    export default{
        data(){
            return {
                service: this.$app.make('ServiceInstance')
            }
        },
        methods:{
            swapImplementation(){
                const swap = this.$app.make('swapper')
                this.service = swap(this.service)
            }
        },
    }
</script>
<template>
    <div class="p-3">
        <h3>Swapable Service Implementation </h3>
        <p class="text-muted">Current Version: {{ service.getVersion() }}</p>
        <textarea class="form-control" v-model="service.content"></textarea>
        <button class="btn btn-primary" @click="swapImplementation">
            Swap Implementation
        </button>
    </div>
</template>
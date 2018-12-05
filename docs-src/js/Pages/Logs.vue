<script>
export default{
    name: 'Dashboard',
    methods:{
        flush(){
            this.$app.logOutput = []
            this.$forceUpdate()
        },
    },
    created(){
        this.$nextTick(()=>{
            if(this.$refs.scrollable){
                this.$refs.scrollable.scrollTop = this.$refs.scrollable.scrollHeight
            }
        })
    }
}
</script>
<template>
    <div class="p-3 w-100">
        <h2 class="text-primary">Dashboard</h2>
        <p>Summary of the application container and loaded services.</p>

        <button @click="flush" class="btn btn-secondary btn-sm float-right">Flush</button>

        <h4>Application Logs</h4>
        <div ref="scrollable" class="list-group scrollable border rounded">
            <div v-if="$app.logOutput.length === 0" class="list-group-item border-left-0 border-right-0" >
                Nothing to show.
            </div>
            <div v-else v-for="(entry, index) in $app.logOutput" class="list-group-item border-left-0 border-right-0">
                {{ entry.toString() }}
            </div>
        </div>
    </div>
</template>
<style lang="sass">
.scrollable
    max-height: calc(100vh - 250px)
    overflow: scroll
    z-index: 100
    padding: 5px 0
    background: #2b2b2b
    .list-group-item
        font-size: 13px
        padding: 2px 10px
        color: aqua !important
        background: transparent
    .list-group-item:first-of-type
        border-top: none
    .list-group-item:last-of-type
        border-bottom: none
</style>

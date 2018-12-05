<script>
export default{
    name: 'Dashboard',
    data(){
        return {
            status: this.getAppStats()
        }
    },
    methods:{
        getAppStats(){
            //NonReactive Properties
            return Object.assign({}, Object.freeze({
                sharedWith: this.$app.sharedWith,
                sharable: this.$app.sharable
            }))
        },
        getRealName(obj){
            const name = this.$app.getName(obj)
            if(name === 'Window'){
                return name.toLowerCase()
            }
            return name
        },
        share(alias){
            this.$app.share(alias).withOthers(window)
            this.$forceUpdate()
        },
        unShare(alias){
            this.$app.unShare(alias)
            this.$forceUpdate()
        }
    }
}
</script>
<template>
    <div class="p-3 w-100">
        <h2 class="text-primary">Sharing API</h2>
        <p>Tracked Shared References to Services.</p>

        <table class="table table-bordered table-striped">
            <thead>
            <tr>
                <th>Alias</th>
                <th>Shared With</th>
                <th width="200">Actions</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(alias, index) in status.sharable">
                <th>{{ alias }}</th>
                <td>
                    <ul>
                        <li v-for="obj in status.sharedWith[alias]">
                            {{ $app.getName(obj) }}:  <code>{{ getRealName(obj) }}.{{ $app.getSharedAliasName(alias) }}()</code>
                        </li>
                    </ul>
                </td>
                <td>
                    <button @click="share(alias)" class="btn btn-secondary btn-sm" v-if="!status.sharedWith[alias]">Share</button>
                    <button @click="unShare(alias)" class="btn btn-secondary btn-sm" v-else>UnShare</button>
                </td>
            </tr>
            </tbody>
        </table>
    </div>
</template>

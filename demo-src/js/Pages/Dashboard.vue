<script>
export default{
    name: 'Dashboard',
    data(){
        return {
            status: this.getAppStats(),
            request: this.$app.make('Request').all()
        }
    },
    methods:{

        getAppStats(){
            //NonReactive Properties
            return Object.assign({}, Object.freeze({
                providers: this.$app.providers,
                bindings: this.$app.bindings,
                resolved: this.$app.resolved,
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
        },
        unShare(alias){
            this.$app.unShare(alias)
        }
    }
}
</script>
<template>
    <div class="p-3 w-100">
        <h2 class="text-primary">Dashboard</h2>
        <p>Summary of the application container and loaded services.</p>

        <hr>

        <h4>Service Providers</h4>
        <table class="table table-bordered table-striped table-sm">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Services</th>
                    <th>Booted</th>
                    <th>Deferred</th>
                </tr>
            </thead>
            <tbody>
            <tr v-for="(provider, name) in status.providers">
                <th>{{ name }}</th>
                <td>{{ provider.provides.join(', ') }}</td>
                <td>{{ provider.booted }}</td>
                <td>{{ provider.deferred }}</td>
            </tr>
            </tbody>
        </table>

        <hr>

        <h4>Service Bindings</h4>
        <table class="table table-bordered table-striped table-sm">
            <thead>
            <tr>
                <th>Alias</th>
                <th>Resolved</th>
                <th>Shared Instance</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(binding, alias) in status.bindings">
                <th>{{ alias }}</th>
                <th>{{ $app.isResolved(alias) }}</th>
                <th>{{ $app.canShare(alias) }}</th>
            </tr>
            </tbody>
        </table>


    </div>
</template>

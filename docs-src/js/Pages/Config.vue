<script>
export default{
    name: 'Dashboard',
    data(){
        return {
            status: this.getAppStats(),
            config: {
                key: '',
                value: null,
            }
        }
    },
    methods:{
        toggleEnv(state){
            this.$app.make('Config').set('env', state)
            this.$app.debug(state !== 'production')
        },
        setConfig(){
            if(!this.config.key || !this.config.value){
                return this.$root.toast({
                    title: 'Whoops',
                    body: `Key / Value Pair not filled.`,
                    type: 'error'
                })
            }
            try{
                this.$app.make('Config').set(this.config.key, JSON.parse(this.config.value))
            }catch (e) {
                this.$app.make('Config').set(this.config.key,this.config.value)
            }
            this.config = {
                key: '',
                value: null,
            }
            this.$root.toast({
                title: 'Config Updated',
                body: `${this.config.key} was set successfully.`,
                type: 'success'
            })

        },
        getAppStats(){
            //NonReactive Properties
            return Object.assign({}, Object.freeze({
                config: (this.$app.isResolved('Config') ? this.$app._resolved['Config'] : this.$app.make('Config')).all(),
            }))
        },
        getButtonClasses(env){
            return {
                'btn-primary': this.status.config.env === env,
                'btn-secondary': this.status.config.env !== env,
            }
        },
    }
}
</script>
<template>
    <div class="p-3 w-100">
        <h2 class="text-primary">Config</h2>
        <p>Summary of the application container and loaded services.</p>

        <div class="btn-group">
            <button
                    class="btn"
                    :class="getButtonClasses('development')"
                    :disabled="status.config.env === 'development'"
                    @click="toggleEnv('development')"
            >Development</button>
            <button
                    class="btn"
                    :class="getButtonClasses('production')"
                    :disabled="status.config.env === 'production'"
                    @click="toggleEnv('production')"
            >Production</button>
        </div>

        <br>
        <br>

        <div class="input-group">
            <input class="form-control mr-2" v-model="config.key" placeholder="dot.syntax.key">
            <input class="form-control" v-model="config.value" placeholder="value">
            <div class="input-group-append">
                <button class="btn btn-secondary" @click="setConfig">Set</button>
            </div>
        </div>
        <hr>
        <table class="table table-bordered table-striped table-sm">
            <thead>
            <tr>
                <th>Key</th>
                <th>Value</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(key, index) in Object.keys(status.config)">
                <th>{{ key }}</th>
                <td>
                    <pre class="border rounded p-3"  style="color: aqua; background: #2b2b2b">{{ status.config[key] }}</pre>
                </td>
            </tr>
            </tbody>
        </table>
    </div>
</template>

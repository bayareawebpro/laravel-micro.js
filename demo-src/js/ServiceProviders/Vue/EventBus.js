export default class EventBus {
    /**
     * Event Bus Service
     */
    constructor(App) {
        this.app = App
        this.vue = this.app.make('Vue')
        this.bus = new this.vue({
            name: 'Events'
        })
    }
    match(args, match){
        return args[0].includes(match)
    }
    $emit(...args){
        const eventName = args[0]
        if(this.match(eventName, ':error')){}
        return this.bus.$emit.apply(this.bus, args)
    }
    $off(...args){
        return this.bus.$off.apply(this.bus, args)
    }
    $on(...args){
        return this.bus.$on.apply(this.bus, args)
    }
}

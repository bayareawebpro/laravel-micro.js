export default class ServiceProvider {

    constructor(App) {
        this.app = App
        this.booted = false
        this.deferred = true
    }

    /**
     * Register any application services
     * @return void
     */
    register() {
        // this.app.bind(alias, () => concrete)
        // this.app.bind(alias, concrete)
    }

    /**
     * Boot any application services
     * @return void
     */
    boot() {
        // const MyClass = this.app.make(alias)
        // MyClass.method()
    }

    /**
     * Declare the aliases for the provided services
     * @return {Array}
     */
    get provides() {
        return ['MyService']
    }

    /**
     * (conditional) Is Provider Deferred
     * @return {Boolean}
     */
    get isDeferred() {
        return (this.deferred === true)
    }

    /**
     * (conditional) Is Provider Bootable
     * @return {Boolean}
     */
    get isBootable() {
        return typeof this.boot === 'function'
    }

    /**
     * (conditional) Is Provider Booted
     * @return {Boolean}
     */
    get isBooted() {
        return (this.booted === true)
    }
    /**
     * (conditional) Is Provider Loaded
     * @return void
     */
    set isBooted(value) {
        this.booted = value
    }

    load(){
        this.isBooted = true
        this.boot()
    }
}


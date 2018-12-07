import IndexedDatabase from "./IndexedDatabase"
import ServiceProvider from "../../Support/ServiceProvider"
export default class QueueServiceProvider extends ServiceProvider {

    constructor(app) {
        super(app)
        this.deferred = true
    }


    /**
     * Register any application services.
     * @return void
     */
    register() {
        this.app.bind('IndexedDatabase', IndexedDatabase)
    }

    /**
     * Boot any application services.
     * @return void
     */
    boot() {}

    /**
     * Declare the aliases for the provided services
     * @return {Array}
     */
    get provides() {
        return ['IndexedDatabase']
    }
}

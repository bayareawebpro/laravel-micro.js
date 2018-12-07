import ServiceProvider from "../../Support/ServiceProvider"
import Console from "./Console"
export default class ConsoleServiceProvider extends ServiceProvider {

    constructor(app) {
        super(app)
        this.deferred = true
    }

    /**
     * Register any application services.
     * @return void
     */
    register() {
       this.app.bind('Console', Console)
    }

    /**
     * Boot any application services.
     * @return void
     */
    boot() {

    }

    /**
     * Declare the aliases for the provided services
     * @return {Array}
     */
    get provides() {
        return ['Console']
    }
}

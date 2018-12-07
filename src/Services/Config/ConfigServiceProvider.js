import Config from './Config'
import ServiceProvider from "../../Support/ServiceProvider"
export default class ConfigServiceProvider extends ServiceProvider {

    constructor(app) {
        super(app)
        this.deferred = true
    }

    /**
     * Register any application services.
     * @return void
     */
    register() {
        this.app.bind('Config', (App) => new Config(App, {
            debug: true
        }))
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
        return ['Config']
    }
}

import Kernel from "./Kernel"
import ServiceProvider from "../../Support/ServiceProvider"

export default class AppServiceProvider extends ServiceProvider {

    constructor(app) {
        super(app)
    }

    /**
     * Register any application services.
     * @return void
     */
    register() {
        // Allow the App to Inject an instance of itself.
        // We don't need to fire injection methods for the kernel, so well inject the app ourselves.
        this.app.bind('App', () => this.app)
        this.app.bind('Kernel', () => new Kernel(this.app), false)
    }

    /**
     * Boot any application services.
     * @return void
     */
    boot() {
        //
    }

    /**
     * Declare the aliases for the provided services.
     * @return {Array}
     */
    get provides() {
        return [
            'App',
            'Kernel'
        ]
    }
}

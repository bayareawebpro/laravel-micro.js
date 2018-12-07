import Cookies from "./Cookies"
import ServiceProvider from "../../Support/ServiceProvider"
export default class CookiesServiceProvider extends ServiceProvider {

    constructor(app) {
        super(app)
        this.shared = true
        this.deferred = true
    }


    /**
     * Register any application services.
     * @return void
     */
    register() {
        this.app.bind('Cookies', Cookies)
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
        return ['Cookies']
    }
}

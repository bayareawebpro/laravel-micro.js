import ServiceProvider from "../../Support/ServiceProvider"
import Artisan from "./Artisan"
export default class ArtisanServiceProvider extends ServiceProvider {

    constructor(app) {
        super(app)
        this.deferred = true
    }

    /**
     * Register any application services
     * @return void
     */
    register() {
        this.app.bind('Artisan', Artisan)
    }

    /**
     * Boot any application services
     * @return void
     */
    boot() {

    }

    /**
     * Declare the aliases for the provided services
     * @return {Array}
     */
    get provides() {
        return ['Artisan']
    }
}

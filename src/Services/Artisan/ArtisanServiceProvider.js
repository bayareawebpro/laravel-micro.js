import ServiceProvider from "../../Framework/Support/ServiceProvider"
import Artisan from "./Artisan"
export default class ArtisanServiceProvider extends ServiceProvider {

    constructor(App) {
        super(App)
        this.shared = true
        this.deferred = true
    }

    /**
     * Register any application services
     * @return void
     */
    register() {
        this.App.bind('$artisan', Artisan)
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
    static get provides() {
        return ['$artisan']
    }
}

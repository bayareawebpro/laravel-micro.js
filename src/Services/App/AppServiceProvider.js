import ServiceProvider from "../../Support/ServiceProvider"
import Kernel from './Kernel'
export default class AppServiceProvider extends ServiceProvider {

    constructor(App) {
        super(App)
        this.deferred = false
    }

    /**
     * Register any application services.
     * @return void
     */
    register() {
        //Allow the App to share an instance of itself.
        this.app.bind('App', () => this.app, true)
        this.app.bind('Kernel', () => new Kernel(this.app), false)
    }

    /**
     * Boot any application services.
     * @return void
     */
    boot() {
        if(this.app.debugging){
            this.app.share(...this.app.sharable).withOthers(window)
        }
    }

    /**
     * Declare the aliases for the provided services
     * @return {Array}
     */
    get provides() {
        return ['App', 'Kernel']
    }
}

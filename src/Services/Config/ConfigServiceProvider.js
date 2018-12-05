import Config from './Config'
import ServiceProvider from "../../Support/ServiceProvider"
export default class ConfigServiceProvider extends ServiceProvider {

    constructor(App) {
        super(App)
        this.shared = true
        this.deferred = true
    }

    register() {
        this.app.bind('Config', (App) => new Config(App, {
            debug: true
        }))
    }

    boot() {

    }

    get provides() {
        return ['Config']
    }
}

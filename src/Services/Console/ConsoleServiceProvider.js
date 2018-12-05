import ServiceProvider from "../ServiceProvider"
import Console from "./Console"
export default class ConsoleServiceProvider extends ServiceProvider {

    constructor(App) {
        super(App)
        this.shared = true
        this.deferred = true
    }

    register() {
       this.App.bind('$console', Console)
        //Binding Classes or Callbacks or Objects
       //this.App.bind('$console', (App) => new Console(App))
    }

    boot() {

    }

    static get provides() {
        return ['$console']
    }
}

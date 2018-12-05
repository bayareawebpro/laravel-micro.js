import ServiceProvider from "../ServiceProvider"
import Cookies from "./Cookies"
export default class CookiesServiceProvider extends ServiceProvider {

    constructor(app) {
        super(app)
        this.shared = true
        this.deferred = true
    }

    register() {
        this.app.bind('$cookies', () => new Cookies(this.app))
    }

    boot() {

    }

    get dependencies() {
        return ['$config']
    }

    get provides() {
        return ['$cookies']
    }
}

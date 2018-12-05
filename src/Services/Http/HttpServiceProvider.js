import HttpResource from "./HttpResource"
import Http from "./Http"
import HttpStatus from "./HttpStatus"
import ServiceProvider from "../../Framework/Support/ServiceProvider"
export default class HttpServiceProvider extends ServiceProvider{

    constructor(App) {
        super(App)
        this.shared = true
        this.deferred = true
    }

    register() {
        this.app.bind('HttpStatus', HttpStatus)
        this.app.bind('Http', () => new Http({
            baseUrl: '/cms/'
        }))
        this.app.bind('PagesResource', () => new HttpResource('pages', 'id', {
            timeout: 4000
        }))
    }

    boot() {

    }

    get provides() {
        return ['HttpStatus', 'Http', 'PagesResource']
    }
}

import ServiceProvider from "../../Support/ServiceProvider"
import Request from './Request'
export default class RequestServiceProvider extends ServiceProvider {

    constructor(app) {
        super(app)
        this.deferred = false
    }

    register() {
        this.app.bind('Request', Request, true)
    }

    boot() {

    }

    get provides() {
        return ['Request']
    }
}

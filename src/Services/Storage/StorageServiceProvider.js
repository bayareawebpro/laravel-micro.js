
import Storage from "./Storage"
import ServiceProvider from "../../../../src/Support/ServiceProvider"
export default class StorageServiceProvider extends ServiceProvider {

    constructor(app) {
        super(app)
        this.shared = true
        this.deferred = true
    }

    register() {

        this.app.bind('LocalStorage', () => new Storage('localStorage'))
        this.app.bind('SessionStorage', () => new Storage('sessionStorage'))
    }

    boot() {

    }

    get provides() {
        return [
            'LocalStorage',
            'SessionStorage',
        ]
    }
}

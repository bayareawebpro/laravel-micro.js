import IndexedDatabase from "./IndexedDatabase"
import ServiceProvider from "../ServiceProvider"
export default class QueueServiceProvider extends ServiceProvider {

    constructor(app) {
        super(app)
        this.shared = true
        this.deferred = true
    }

    register() {
        this.app.bind('IndexedDatabase', IndexedDatabase)
    }

    boot() {
    }

    get provides() {
        return ['IndexedDatabase']
    }
}

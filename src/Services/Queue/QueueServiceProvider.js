import Queue from "./Queue"
import ServiceProvider from "../ServiceProvider"
export default class QueueServiceProvider extends ServiceProvider {

    constructor(app) {
        super(app)
        this.shared = true
        this.deferred = true
    }

    register() {
        this.app.bind('$queue', () => new Queue(this.app))
    }

    boot() {
        this.app.make('$queue')
    }

    get dependencies() {
        return []
    }

    get provides() {
        return ['$queue']
    }
}

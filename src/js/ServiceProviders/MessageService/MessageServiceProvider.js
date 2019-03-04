import {ServiceProvider} from "laravel-micro.js"
export default class MessageServiceProvider extends ServiceProvider {

    constructor(app) {
        super(app)
        this.deferred = true
    }

    register() {

        //this.app.bind('Auth', Auth)
        this.app.bind('artisanMessage', (Router) => {
            return `micro make:${Router.history.pending.path.substring(1) || 'laravel-micro'}`
        }, false)
    }

    boot() {

    }

    get provides() {
        return [
            'artisanMessage'
        ]
    }
}

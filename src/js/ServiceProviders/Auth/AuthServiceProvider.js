import Auth from "./Auth"
import {ServiceProvider} from "laravel-micro.js"
export default class AuthServiceProvider extends ServiceProvider {

    constructor(app) {
        super(app)
        this.deferred = true
    }

    register() {

    }

    boot() {

    }

    get provides() {
        return [
        ]
    }
}

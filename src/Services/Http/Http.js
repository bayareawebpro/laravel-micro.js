import HttpResource from "./HttpResource"

export default class Http{

    /**
     * Http Constructor
     * @param app {Application}
     * @param driver {String}
     */
    constructor(app, driver = 'axios'){
        this.app = app
        this.http = this.app.make(driver)
    }

    /**
     * Resource Constructor
     * @param resourceKey {String}
     * @param primaryKey {String}
     */
    resource(resourceKey, primaryKey){
        return this.request(new HttpResource(resourceKey, primaryKey))
    }

    /**
     * (async) Http Request
     * @param params {Object}
     * @return {Promise}
     */
    async request(params){
        return await this.http.request(params)
    }

    /**
     * (method) Make Action
     * @param defaults {Object}
     * @param params {Object}
     * @return {Promise}
     */
    _toAction(params, defaults = {method: 'post'}){
        return this.http.request(Object.assign(defaults, params))
    }

    /**
     * Test Action
     * @param data {Object}
     * @return {Promise}
     */
    someAction(data = {}){
        const params = {method: 'post', url: '/actions/test-action', ...data}
        return this._toAction(params)
    }

}

import axios from "axios"
export default class Http{

    /**
     * Http Constructor
     * @param axiosConfig {Object}
     */
    constructor(axiosConfig = {}){
        this.http = axios.create(Object.assign({
            timeout: 5000,
        }, axiosConfig))
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

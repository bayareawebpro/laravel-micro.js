import Http from "./Http"
export default class HttpResource{

    /**
     * Http Constructor
     * @param resourceKey {String}
     * @param primaryKey {String}
     */
    constructor(resourceKey, primaryKey = 'id'){
        this.primarykey = primaryKey
        this.resourceKey = resourceKey
    }

    /**
     * Fetch Request
     * @return {Promise}
     */
    route(type = 'index', data = {}){
        if(['edit', 'update', 'destroy'].includes(type) && !this._setKey(data)){
            throw new Error(`HttpService data is missing primary key. Route ${type} cannot be resolved.`)
        }
        return Object.assign(this._routes[type], ...data)
    }

    /**
     * Set Primary Key
     * @param data {Object}
     * @return {Boolean}
     */
    _setKey(data){
        this.key = null
        if(data && data.hasOwnProperty(this.primarykey)){
            this.key = data[this.primarykey]
            return true
        }
        return false
    }

    /**
     * Get Routes
     * @return {Object}
     */
    get _routes() {
        const routes = {
            index:  { method: 'get',  url: `/cms/resources/${this.resourceKey}`  },
            store:  { method: 'post', url: `/cms/resources/${this.resourceKey}` },
            create: { method: 'get',  url: `/cms/resources/${this.resourceKey}/create` },
        }
        if(this.key){
            return Object.assign(routes, {
                edit:    { method: 'get',    url: `/cms/resources/${this.resourceKey}/${this.key}/edit` },
                update:  { method: 'patch',  url: `/cms/resources/${this.resourceKey}/${this.key}` },
                destroy: { method: 'delete', url: `/cms/resources/${this.resourceKey}/${this.key}` },
            })
        }
        return routes
    }
}

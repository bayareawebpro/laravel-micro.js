export default class Request {
    /**
     * Request Service
     * @url https://javascriptplayground.com/url-search-params/
     */
    constructor() {
        this._attributes = {}
    }

    /**
     * Capture New Request
     * @param to {*}
     * @param from {*}
     * @param next {*}
     * @return {Request}
     */
    capture(to = null, from = null, next = null){
        let attributes = {
            to: to,
            from: from,
            next: next,
            href: window.location.href || null,
            host: window.location.host || null,
            hash: window.location.hash || null,
            port: window.location.port || null,
            origin: window.location.origin || null,
            hostname: window.location.hostname || null,
            pathname: window.location.pathname || null,
            protocol: window.location.protocol || null,
            userAgent: window.navigator.userAgent || null,
            queryString: window.location.search || null,
        }
        attributes.searchParams = {}
        const params = this.searchParams.entries()
        for (let [key, value] of params) {
            attributes.searchParams[key] = value
        }
        this._attributes = attributes
        return this
    }

    /**
     * Get all the Attributes
     * @return {Object}
     */
    all(){
        return Object.keys(this._attributes).length > 0 ? this._attributes : null
    }

    /**
     * Get a Value from the Attributes
     * @param  notation {String}
     * @param  fallback {*}
     * @return {*}
     */
    get(notation, fallback = null){
        return notation.split('.').reduce((res, key) => {
            try{
                return res[key]
            }catch (e) {
                return fallback
            }
        }, this._attributes)
    }

    /**
     * Get a new Instance of the URLSearchParams Class when touched.
     * @return {URLSearchParams}
     */
    get searchParams(){
        return this._searchParams || (this._searchParams = new URLSearchParams(window.location.search))
    }

    /**
     * Set a new Instance of the URLSearchParams Class & Query String
     * @param query {*}
     */
    set searchParams(query){
        this._attributes.queryString = query
        this._searchParams = new URLSearchParams(query)
    }

    /**
     * History Methods
     * @return {*}
     */
    get history(){
        return {
            back(){
                window.history.back()
            },
            forward(){
                window.history.forward()
            },
            go(url){
                window.history.go(url)
            },
        }
    }

    /**
     * Utility Methods
     * @return {*}
     */
    get utilities(){
        return {
            decode(value){
                return window.decodeURI(value)
            },
            encode(value){
                return window.encodeURI(value)
            },
            encodeComponent(value){
                return window.encodeURIComponent(value)
            },
            decodeComponent(value){
                return window.decodeURIComponent(value)
            }
        }
    }

    /**
     * Route Methods
     * @return {*}
     */
    get location(){
        return {
            redirect(location){
                window.location.assign(location)
            },
            reload(force = false){
                window.location.reload(force)
            },
            replace(location){
                window.location.replace(location)
            },
        }
    }
}




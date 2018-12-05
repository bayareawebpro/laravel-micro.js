export default class Storage {
	/**
	 * Storage Service
     * @params driver {String} (localStorage, sessionStorage)
	 */
	constructor(driver) {
        if (!driver) {
            throw new Error(`Local Storage Driver not specified.  Must be of types: localStorage, sessionStorage. `)
        }
        if (!driver in window) {
           throw new Error(`Local Storage Driver ${driver} is not supported by this browser.`)
        }
        this.storage = window[driver]

        console.log(`Storage: Driver "${driver}" Initialized.`)
	}

	/**
	 * Get Storage Value
	 * @return {*}
	 **/
	get(key, fallback = null){
        console.log(`Storage: Fetching (Key: ${key} / Fallback: ${fallback})...`)
        const value = this.storage.getItem(key)
        console.log(`Storage: Retrieved (Key: ${key} / Value: ${value}).`)
        try {
            return JSON.parse(value)
        } catch (e) {
            return value || fallback
        }
	}

	/**
	 * Set Storage Value
     * @param key {String}
     * @param value {*}
	 * @return void
	 **/
	set(key, value){
	    if(typeof value === 'object'){
	        if(!Object.keys(value).length){
	            return this.forget(key)
            }
	        value = JSON.stringify(value)
        }
        this.storage.setItem(key, value)
        console.log(`Storage: Set (Key: ${key} / Value: ${value}).`)
	}

    /**
     * Forget Storage Value
     * @param key {String}
     * @return void
     **/
    forget(key){
        this.storage.removeItem(key)
        console.log(`Storage: Forgetting ${key}...`)
    }

}

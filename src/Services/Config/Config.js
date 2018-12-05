export default class Config {
	/**
	 * Config Service
     * @url https://github.com/jonschlinkert/set-value
	 **/
	constructor(app, options = {}) {
		this.app = app
		this._options = Object.assign(options, {
			env: process.env.NODE_ENV,
		})
	}

	/**
	 * Get Value from Config Object
	 * @param keys {String}
	 * @param fallback {*}
	 * @return {*}
	 **/
	get(keys, fallback = null){
        return keys.split('.').reduce((res, key) => {
            try{
                return res[key]
			}catch (e) {
                return fallback
            }
		}, this._options)
	}

	/**
     * Get Value on Config Object
	 * @return mixed
	 **/
	set(keys, value){
		let ref = this._options
		const path = keys.split('.')
		const last = path.length - 1
        path.forEach((key, index)=>{
        	if(typeof ref[key] === 'undefined'){
                ref[key] = {}
			}
            if(index === last) {
                ref[key] = value
            }
            ref = ref[key]
		})
		return ref
	}

    /**
     * Get All
     * @return mixed
     **/
	all(){
	    return this._options
    }

	/**
	 * Set Class Method Names
	 * @return {*}
	 **/
	toConfig(key){
	    const config = this.get(key)
        if(!config || typeof(config) !== 'object'){
            throw new Error(`Config ${key} is not an Object or undefined. Cast toConfig failed.`)
        }
        return new Config(this.get(key))
	}

	/**
	 * Is ENV Dev
	 * @return Boolean
	 **/
	get isDev(){
		return (this._options.env === 'development')
	}

	/**
	 * Is ENV Production
	 * @return Boolean
	 **/
	get isProduction(){
		return this._options.env === 'production' || !['development', 'local'].includes(this._options.env)
	}

}

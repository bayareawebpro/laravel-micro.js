export default class Config {
	/**
	 * Config Service
	 */
	constructor(App, options = {}) {
		this._app = App
		this._options = Object.assign({
			env: process.env.NODE_ENV,
		}, options)
	}

	/**
	 * Get Value
	 * @param syntax {String}
	 * @param fallback {*}
	 * @return {*}
	 **/
	get(syntax, fallback = null) {
		if(!syntax.includes('.')){
			return this._options[syntax] || fallback
		}
		return syntax.split('.').reduce((res, key) => {
			try {
				return res[key]
			} catch (e) {
				return fallback
			}
		}, this._options)
	}

	/**
	 * Set Value
	 * @return mixed
	 **/
	set(keys, value) {
		let ref = this._options
		const path = keys.split('.')
		const last = path.length - 1
		path.forEach((key, index) => {
			if (typeof ref[key] === 'undefined') {
				ref[key] = {}
			}
			if (index === last) {
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
	all() {
		return this._options
	}

	/**
	 * Get Value to New Config Instance
	 * @return {*}
	 **/
	toConfig(key) {
		return new Config(this._app, this._validateType(this.get(key)))
	}

	/**
	 * Set Instance of Options.
	 * @param value
	 */
	setInstance(value){
		this._options = this._validateType(value)
	}

	/**
	 * Validate Object Type.
	 * @param config
	 * @return {Object}
	 * @private
	 */
	_validateType(config){
		if (!config || typeof (config) !== 'object') {
			throw this._app.makeException('Config', `Invalid Object or undefined. Cannot set Config.`)
		}
		return config;
	}

	/**
	 * Is ENV Testing
	 * @return Boolean
	 **/
	get isTesting() {
		return (this._options.env === 'testing')
	}

	/**
	 * Is ENV Development
	 * @return Boolean
	 **/
	get isDevelopment() {
		return (this._options.env === 'development')
	}

	/**
	 * Is ENV Production
	 * @return Boolean
	 **/
	get isProduction() {
		return (this._options.env === 'production')
	}
}

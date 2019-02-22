/**
 * TypeSafe Validator
 * (WIP) Needs Tests
 */
export default class Type {
	/**
	 * Is
	 * @param value
	 * @return {boolean}
	 */
	static isString(value) {
		return typeof value === 'string' || value instanceof String
	}

	/**
	 * Is Number
	 * @param value
	 * @return {boolean}
	 */
	static isNumeric(value) {
		return this.isFloat(value) || this.isInteger(value)
	}

	/**
	 * Is Float
	 * @param value
	 * @return {boolean}
	 */
	static isFloat(value) {
		return value === +value && value !== (value|0);
	}

	/**
	 * Is Integer
	 * @param value
	 * @return {boolean}
	 */
	static isInteger(value) {
		return value === +value && value === (value|0);
	}

	/**
	 * Is Array
	 * @param value
	 * @return {boolean}
	 */
	static isArray(value) {
		return (Array.isArray(value))
	}

	/**
	 * Is Function
	 * @param value
	 * @return {boolean}
	 */
	static isFunction(value) {
		return typeof value === 'function'
	}

	/**
	 * Is Object
	 * @param value
	 * @return {*|boolean}
	 */
	static isObject(value) {
		return value && typeof value === 'object' && value.constructor === Object
	}

	/**
	 * Is Null Object
	 * @param value
	 * @return {boolean}
	 */
	static isNull(value) {
		return value === null
	}

	/**
	 * Is Undefined
	 * @param value
	 * @return {boolean}
	 */
	static isUndefined(value) {
		return typeof value === 'undefined'
	}

	/**
	 * Is Boolean Primitive
	 * @param value
	 * @return {boolean}
	 */
	static isBoolean(value) {
		return typeof value === 'boolean'
	}

	/**
	 * Is RegEx Object
	 * @param value
	 * @return {*|boolean}
	 */
	static isRegExp(value) {
		return value && typeof value === 'object' && value.constructor === RegExp
	}

	/**
	 * Is Error Object
	 * @param value
	 * @return {boolean}
	 */
	static isError(value) {
		return value instanceof Error && typeof value.message !== 'undefined'
	}

	/**
	 * Is Date Object
	 * @param value
	 * @return {boolean}
	 */
	static isDate(value) {
		return value instanceof Date
	}

	/**
	 * Is Symbol
	 * @param value
	 * @return {boolean}
	 */
	static isSymbol(value) {
		return typeof value === 'symbol'
	}
}

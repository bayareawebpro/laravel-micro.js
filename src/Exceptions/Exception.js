export default class Exception extends Error {
	/**
	 * Generic Exception Class
	 */
	constructor() {
		super(...arguments)
		/**
		 * Arguments passed to the exception.
		 * @property args {Array}
		 */
		this.args = arguments

		/**
		 * The name of the Custom Exception.
		 * @property name {String}
		 */
		this.name = 'Exception'
	}
}

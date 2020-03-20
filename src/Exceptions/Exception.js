export default class Exception extends Error {
	/**
	 * Generic Exception Class
	 */
	constructor() {
		super(...arguments)

		/**
		 * The name of the Custom Exception.
		 * @property name {String}
		 */
		this.name = 'Exception'
	}
}

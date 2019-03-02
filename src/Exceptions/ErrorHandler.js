export default class ErrorHandler {
	/**
	 * Exception Handler Class
	 * @param App {App}
	 */
	constructor(App) {
		this.app = App
	}

	/**
	 * Exception Handle Method
	 * @param error {Error|Exception}
	 */
	handle(error) {
		if (typeof error.handle === 'function') {
			try {
				return error.handle(this.app)
			} catch (e) {
				console.error(e)
			}
		}
	}
}

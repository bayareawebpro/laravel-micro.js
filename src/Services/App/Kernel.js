import Pipeline from "../../Support/Pipeline"
export default class Kernel {
	/**
	 * App Kernel Constructor
	 * @param App {Container}
	 * @return void
	 */
	constructor(App) {
		this.middleware = []
		this.pipeline = new Pipeline(App)
	}

	/**
	 * Register Middleware Stack
	 * @param middleware {Array}
	 * @return this
	 */
	setMiddleware(middleware) {
		this.middleware = middleware
		return this
	}

	/**
	 * Register Middleware Stack
	 * @param request {*}
	 * @param then {function|null}
	 * @return {*}
	 */
	handle(request, then = null) {
		return this.pipeline
			.send(request)
			.through(this.middleware.slice())
			.via('handle')
			.then(then)
	}

	/**
	 * Terminate Middleware Stack
	 * @param request {*}
	 * @param then {function|null}
	 * @return {*}
	 */
	terminate(request, then = null){
		return this.pipeline
			.send(request)
			.through(this.middleware.slice().reverse())
			.via('terminate')
			.then(then)
	}
}

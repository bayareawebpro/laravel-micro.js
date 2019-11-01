import Pipeline from "../../Support/Pipeline"
export default class Kernel extends Pipeline{
	/**
	 * App Kernel Constructor
	 * @param App {Container}
	 * @return void
	 */
	constructor(App) {
		super(App)
		this._middleware = []
	}

	/**
	 * Register Middleware Stack
	 * @param middleware {Array}
	 * @return this
	 */
	setMiddleware(middleware) {
		this._middleware = middleware
		return this
	}

	/**
	 * Register Middleware Stack
	 * @param request {*}
	 * @param then {function|null}
	 * @return {*}
	 */
	handle(request, then = null) {
		return this
			.send(request)
			.through(this._middleware.slice())
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
		return this
			.send(request)
			.through(this._middleware.slice().reverse())
			.via('terminate')
			.then(then)
	}
}

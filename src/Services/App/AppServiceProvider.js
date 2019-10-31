import Kernel from "./Kernel"
import ServiceProvider from "../../Support/ServiceProvider"
export default class AppServiceProvider extends ServiceProvider {

	constructor(app) {
		super(app)
		this.deferred = false
	}

	/**
	 * Register any application services.
	 * @return void
	 */
	register() {
		//Allow the App to Inject an instance of itself.
		this.app.bind('App', ()=>this.app)
		this.app.bind('Kernel',Kernel, false)
	}

	/**
	 * Boot any application services.
	 * @return void
	 */
	boot() {}

	/**
	 * Declare the aliases for the provided services.
	 * @return {Array}
	 */
	get provides() {
		return [
			'App',
			'Kernel'
		]
	}
}

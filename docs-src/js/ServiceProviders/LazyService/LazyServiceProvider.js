import {ServiceProvider} from "laravel-micro.js"
export default class LazyServiceProvider extends ServiceProvider {

	/**
	 * Provider Constructor.
	 * @param app {Application}
	 * @return void
	 */
	constructor(app) {
		super(app)
		this.deferred = false
	}

	/**
	 * Register any application services
	 * @return void
	 */
	register() {

		this.app.bind('lazyService', () => {

			//First we import the script.
			return import('./LazyService.js').then((service) => {

					//Then we bind the default export.
					this.app.bind('lazyService', service.default)

					//Then we return a resolved promise that will construct and bind an instance of the service.
					return this.app.rebound('lazyService')
				})
		})
	}

	// /**
	//  * Boot any application services
	//  * @return void
	//  */
	// boot() {
	// 	this.app.make('lazyService').then((service)=>{
	// 		console.log('LAZZZZZYYYYYYYY', service.run())
	// 	})
	// }

	/**
	 * Async Boot any application services
	 * @return void
	 */
	async boot() {
		const service = await this.app.make('lazyService')
		service.run()
		console.log('LAZZZZZYYYYYYYY', this.app.make('lazyService'))
	}

	get provides() {
		return [
			'lazyService'
		]
	}
}

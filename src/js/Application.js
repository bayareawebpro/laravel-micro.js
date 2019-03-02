import LaravelMicro from "laravel-micro.js"
import Authenticate from "./Middleware/Authenticate"
import RandomLoadingText from "./Middleware/RandomLoadingText"

export default class Application extends LaravelMicro {

	/**
	 * Application Constructor
	 * @return void
	 */
	constructor() {
		super()
	}

	/**
	 * Boot the Application Service Providers
	 * @return void
	 */
	boot() {
		this.bootProviders()
	}

	/**
	 * Start the Primary Application Service
	 * @return void
	 */
	start() {
		this.make('VueRoot').$mount('#app')
	}

	/**
	 * Run the Request through the Middleware Kernel
	 * (called before every route)
	 * @return void
	 */
	run(request) {

		//Prevent Navigation
		if (this._kernelRunning) return
		this._kernelRunning = true

		this.log('========= New Request =========')
		this.log('Middleware Processing...', request)

		//Make the Application Kernel instance.
		const kernel = this.make('Kernel')

		//Set Global Middleware on the Kernel.
		kernel.setMiddleware([
			Authenticate,
			RandomLoadingText
		])

		//Get the response from the middleware kernel.
		kernel.handle(request, (finalRequest) => {

			this.log('Middleware Completed!', finalRequest)


			const next = finalRequest.next
			if (this.isCallable(next)) next()

			//Allow Navigation
			this._kernelRunning = false
		})
	}

	/**
	 * (utility) Measure Loading Time.
	 * @return void
	 */
	measure(label = false) {
		if (!label) {
			this._time = performance.now()
		} else {
			this.log(`[Application] ${label} ${performance.now() - this._time} ms`)
		}
	}
}

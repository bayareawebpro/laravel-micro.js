const provider = `

/**
* All Providers are deferred by default. The "boot" method will not 
* be called until the service is resolved the first time.
* To force the provider to boot when the bootProviders method is 
* called, change "deferred" to "false" in the constructor.
*/

import {ServiceProvider} from "laravel-micro.js"
export default class AppServiceProvider extends ServiceProvider {

	/**
	* Provider Constructor.
	* @param app {Application}
	* @return void
	*/
	constructor(app) {
		super(app)
		this.deferred = true  //true by default
	}

	/**
	* Register any application services.
	* @return void
	*/
	register() {
	
		//shared instance once resolved by default
		this.app.bind('MyService', MyImplementation) 
	}

	/**
	* Boot any application services.
	* @return void
	*/
	boot() {
		const instance = this.app.make('MyService')
		instance.serviceMe()
	}

	/**
	* Declare the aliases for the provided services.
	* Used to boot the provider if the service is deferred.
	* @return {Array}
	*/
	get provides() {
		return ['MyService']
	}
}
`
const providerRegister = `

class App extends LaravelMicro { }
const app = new App

app.register(AppServiceProvider)
app.register(AuthServiceProvider)
app.register(VueServiceProvider)
app.register(HttpServiceProvider)
app.register(StoreServiceProvider)
// etc...

// or short and sweet...
import Providers from "./ServiceProviders"
Providers.forEach((provider) => app.register(provider))

/**
* Once all the providers are registered, call the "bootProviders" method:
*/
app.bootProviders()

`


const binding = `

/**
 * The container supports binding common types of objects.
 * Here's a few examples of what you can do:
 */
 
import LaravelMicro from "laravel-micro.js"
const app = new LaravelMicro

app.bind('object', {prop: true})

app.bind('array', ['test'])

app.bind('boolean', true)

app.bind('number', 100)

app.bind('MyClass', MyClass)

app.bind('randomPick',()=>{
	return 'yes!'
})

/**
 * Bindings are shared instances by default.
 * Specify "false" to force a binding to be unsharable.
 * This forces classes and callbacks to be constructed fresh every time they are resolved.
 */
container.bind('MyCallback',()=>{
	return Math.random()
}, false)
`

const injection = `

/** Specify the aliases of needed dependencies in constructors. */

class ClassA{
    constructor(classB, classC){
        this.classB = classB
        this.classC = classC
    }
}
class ClassB{
    constructor(classC){
        this.classC = classC
    }
}
class ClassC{
    constructor(App){
        this.app = App
    }
}


/** Then, import and bind un-instantiated. */

import {ClassA, ClassB} from './MyServices'

const container = new Container

container.bind('classA',ClassA)
container.bind('classB',ClassB)


/** Functions can also specify Dependencies. */

container.bind('myCallback',(classA, classB, classC) => {
	return 'You Bet!'  //Do something with the injections
})

`

const make = `

/**
 * Resolving objects from the container is easy.
 * Call the make method and pass the alias of your binding.
 */
 
const classA = container.make('classA')

const classB = container.make('classB')

const classC = container.make('classC')

const randomPick = container.make('myCallback')
`

const pipeline = `
import Container, {Pipeline} from "laravel-micro.js"

const result = new Pipeline(new Container)
    .send({ state: 0 })
    .through([PipeA, PipeB, PipeC])
    .via('handle')
    .then((obj) => {
        obj.state = (obj.state * 2)
        return obj
    })
    
expect(result.state).toBe(10)

// Pipe Classes
class PipeA{
    constructor(App){}
    handle(thing, next){
        thing.state++
        next(thing)
    }
}
class PipeB{
    constructor(App){}
    handle(thing, next){
        thing.state = (thing.state + 1)
        next(thing)
    }
}
class PipeC{
    constructor(App){}
    handle(thing, next){
        thing.state = (thing.state + 3)
        next(thing)
    }
}
`
const kernel = `
import Pipeline from "laravel-micro.js"
export default class Kernel{
    /**
     * App Kernel Constructor
     * @return void
     */
    constructor(App) {
        this.app = App
        this._middleware = []
        this._pipeline = new Pipeline(App)
    }

    /**
     * Set Middleware Stack
     * @param middleware {Array}
     * @return void
     */
    setMiddleware(middleware){
        this._middleware = middleware
    }

    /**
     * Register Middleware Stack
     * @param request {*}
     * @param then {function}
     * @return {*}
     */
    handle(request, then = (response) => response){
        try{
            return this._pipeline
                .send(request)
                .through(this._middleware)
                .via('handle')
                .then(then)
        }catch (e) {
            this.app.handleError(e)
        }
    }
}
`
const middleware = `
export default class Authenticate {
		
    /**
    * @param app {Application}
    * @param next
    * @return void
    */
     
    constructor(App){
        this.app = App
    }
    
    /**
     * Handle Middleware
     * @param request {Request}
     * @param nextPipe
     * @return void
     */
    handle(request, next) {
    

      //Get parameters from the route request.
      const to = request.get('to')
      const from = request.get('from')
      const routerNext = request.get('next')
      
      //Call the next middleware pipe.
      next(request)
    }
}
`
const router = `
import Routes from "./Routes"
import Root from "./Root"

this.app.bind('Router', () => new VueRouter(Routes))

//Add Root Vue Instance
this.app.bind('VueRoot', (Router, Events) => {

	//Capture a new request instance and run it through the middleware pipeline.
	Router.beforeEach((to, from, next) => {
		this.app.run(this.app.make('Request').capture(to, from, next))
	})

	Root.router = Router
	
	return new Vue(Root)
})
`

const async = `
/**
* We can set the provider to deferred and use a promise when using "app.make"
* Or we can use an async boot method with "deferred = false" 
* so the provider loads the service asynchronously as the app boots.


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

					//Then we re-bind the service as default export.
					this.app.bind('lazyService', service.default)

					//Then we call rebound to destroy this binding and construct the new binding.
					return this.app.rebound('lazyService')
				})
		})
	}


	/**
	 * (Promise Example) Boot any application services
	 * @return void
	 */
	boot() {
		this.app.make('lazyService').then((service)=>{
			console.log('LAZZZZZYYYYYYYY', service.run())
		})
	}
	
	
	/**
	 * (Async Example) Boot any application services
	 * @return void
	 */
	async boot() {
		const service = await this.app.make('lazyService')
		console.log('LAZZZZZYYYYYYYY', service.run())
	}

	
	/**
	 * Declare the aliases for the provided services
	 * @return {Array}
	 */
	get provides() {
		return [
			'lazyService'
		]
	}
}

`
const app = `
import LaravelMicro from "laravel-micro.js"
import Authenticate from "./Middleware/Authenticate"
export default class Application extends LaravelMicro {

	/** Application Constructor */
	constructor() {
		super()
	}

	/** Boot the Application Service Providers */
	boot() {
		this.bootProviders()
	}

	/** Start the Primary Application Service */
	start() {
		this.make('VueRoot').$mount('#app')
	}

	/**
	 * Run the Request through the Middleware Kernel
	 * (called before every route)
	 * @return void
	 */
	run(request) {

		//Make the Application Kernel instance.
		const kernel = this.make('Kernel')

		//Set Global Middleware on the Kernel.
		kernel.setMiddleware([
			Authenticate,
			RandomLoadingText
		])

		//Get the response from the middleware kernel.
		kernel.handle(request, (finalRequest) => {
			const next = finalRequest.get('next')
			if (this.isCallable(next)) next()
		})
	}
}

/**
* Bootstrap the application
*/
import {RequestServiceProvider, ErrorHandler} from "laravel-micro.js"
import ErrorHandler from "./MyErrorHandler"
import Application from "./Application"
import Providers from "./ServiceProviders"

const app = new Application
app.errorHandler(Handler)
app.register(RequestServiceProvider)

Providers.forEach((ServiceProvider)=>{
    app.register(ServiceProvider)
})

app.boot()
app.start()
`
export default {
	app,
	async,
	router,
	make,
	provider,
	injection,
	pipeline,
	middleware,
	providerRegister,
	binding,
	kernel,
}
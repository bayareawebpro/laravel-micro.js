# Service Providers
All Providers are deferred by default. The "boot" method will not 
be called until the service is resolved the first time.
To force the provider to boot when the bootProviders method is 
called, change "deferred" to "false" in the constructor.

## Usage
```javascript
import LaravelMicro, {AppServiceProvider}  from 'laravel-micro.js'
import MyProvider from "./MyProvider"

const app = new LaravelMicro;
app.register(AppServiceProvider)
app.register(MyProvider)
app.bootProviders()
```

## Implementation
```javascript
import MyImplementation from "./MyImplementation"
import {ServiceProvider} from "laravel-micro.js"
export default class AppServiceProvider extends ServiceProvider {

	/**
	* Provider Constructor.
	* @param app {Container}
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
```
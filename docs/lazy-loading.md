# Lazy Loading

Using Dynamic Imports

```javascript
this.app.bind('lazyService', () => {

  //First we import the script.
  return import('./LazyService.js').then((exported) => {

    //Then we re-bind the service as default export.
    this.app.bind('lazyService', exported.default)

    //Then we call rebound to destroy this binding and construct the new binding.
    //Subsequent calls will use the new binding.
    return this.app.rebound('lazyService')
  })
})
```

We can set this.deferred = true in the constructor and use a promise:

```javascript
this.app.make('lazyService').then((service)=>{
  service.run()
})
```

Alternatively we can use an async boot method with this.deferred = false so the 
container fetches and instantiates the services asynchronously as the app boots.

```javascript
async boot() {
  const serviceA = await this.app.make('lazyServiceA')
  const serviceB = await this.app.make('lazyServiceB')
  const serviceC = await this.app.make('lazyServiceC')
  serviceA.init()
  serviceB.init()
  serviceC.init()
}
```


```javascript
import {ServiceProvider} from "laravel-micro.js"
export default class LazyServiceProvider extends ServiceProvider {
    /**
     * Provider Constructor.
     * @param app
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
        this.app.make('lazyService').then((service)=>service.run())
    }
        
        
    /**
     * (Async Example) Boot any application services
     * @return void
     */
    async boot() {
        const service = await this.app.make('lazyService')
        service.run()
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
```
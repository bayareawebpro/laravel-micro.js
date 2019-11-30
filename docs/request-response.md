# Request / Response

The following is an in-depth example of implementing the kernel for 
Request / Response usage in a Single Page Application context with Vue.js & Vue Router.

```javascript
this.app.bind('Request',Request, false)
this.app.bind('Response',Response, false)

this.app.bind('Router', () => {
    const router = new VueRouter(Routes)
    router.beforeEach((to, from, next)  => this.app.dispatch({to, from, next}))
    router.afterEach((to, from)          => this.app.terminate({to, from}))
    return router
})

this.app.bind('VueRoot', (Router, Store) => new Vue({
    store: Store,
    router: Router,
    template: `<router-view/>`
}))
```


### Application extends LaravelMicro
```javascript
class Application extends LaravelMicro{
    constructor() {
        super()
        this.stack = [
            AuthenticateSession,
            RedirectIfAuthenticated,
        ]
    }
    
    /**
     * Dispatch Route Request through Middleware Stack.
     * @return void
     */
    dispatch(routerObj) {
        const request = this.make('Request').capture(routerObj)
        this
            .make('Kernel')
            .setMiddleware(this.stack)
            .handle(request, (result) => {
                if (this.isCallable(result.next)) {
                    result.next()
                }
            })
    }
    
    /**
     * Dispatch Route Request in Reverse Order through Middleware Stack via Terminate.
     * @return void
     */
    terminate(routerObj) {
        const response = this.make('Response').capture(routerObj)
        this
            .make('Kernel')
            .setMiddleware(this.stack)
            .terminate(response, (result) => {
                if (this.isCallable(result.next)) {
                    result.next()
                }
            })
    }
}
```

### Request
```javascript
export default class Request{

    /**
     * Constructor
     * @param Account
     * @return void
     */
    constructor(AccountStore) {
        this.$store = AccountStore
        this.attributes = {}
        this.callback = null
    }

    /**
     * Get Current User
     * @returns {*}
     */
    user(){
        return this.$store.$state.get('user', false)
    }

    /**
     * Capture Router Object
     * @param attributes {to, from, next}
     * @return Request
     */
    capture({to, from, next}){
        this.attributes = {to, from, next}
        this.callback  = next
        return this
    }

    /**
     * Get Route Guards
     * @returns {*|Array}
     */
    get guard(){
        const {middleware} = this.attributes.to.meta
        return middleware || []
    }

    /**
     * Has Guard
     * @param alias
     * @returns {boolean}
     */
    hasGuard(alias){
        return this.guard.includes(alias)
    }

    /**
     * Get Next Route
     * @returns {*|Array}
     */
    get to(){
        return this.attributes.to || false
    }

    /**
     * Get Next Route
     * @returns {*|Array}
     */
    get hasMatchedRoute(){
        return this.to.matched && this.to.matched.length
    }

    /**
     * Get Previous Route
     * @returns {*|Array}
     */
    get from(){
        return this.attributes.from || false
    }

    /**
     * "Next" Callback
     * @return void
     */
    next(){
        this.attributes.next()
    }

    /**
     * Redirect
     * @param path
     * @returns {this}
     */
    redirect(path){
        this.callback(path)
        return this
    }

    /**
     * Redirect to Previous Route
     * @return void
     */
    previous(){
        this.redirect(this.from.fullPath)
    }
}
```


### Response
```javascript
export default class Response{

    /**
     * Constructor
     * @param App
     * @return void
     */
    constructor(App) {
        this.app = App
        this.attributes = {to: null, from: null}
    }

    /**
     * Make Router Response Object
     * @param routerObj
     * @return Response
     */
    capture({to, from}){
        this.attributes = {to,from}
        return this
    }

    /**
     * Get Current Route
     * @returns {*|Array}
     */
    get to(){
        return this.attributes.to || false
    }

    /**
     * Get Previous Route
     * @returns {*|Array}
     */
    get from(){
        return this.attributes.from || false
    }
}
```

### Example Middleware


### AuthenticateSession
```javascript
export default class AuthenticateSession {

	constructor(App) {
	    this.app = App
	}

     /**
     * Handle Next.
     * @param request {Object}
     * @param next function
     * @return {*}
     */
    async handle(request, next) {
        if(request.hasGuard('auth') && !request.user()){
            try{
                await this.app.make('Account').authorize()
            }catch(e){
                return request.redirect({name: 'auth.login'})
            }
        }
        return next(request)
    }

    /**
     * Terminate Next.
     * @param response {Object}
     * @param nextPipe function
     * @return {*}
     */
    terminate(response, nextPipe) {
        return nextPipe(response)
    }
}
```

### RedirectIfAuthenticated
```javascript
export default class RedirectIfAuthenticated {

	constructor(App) {
	    this.app = App
	}

     /**
     * Handle Next.
     * @param request {Object}
     * @param next function
     * @return {*}
     */
    async handle(request, next) {
        if(request.hasGuard('guest') && request.user()){
            return request.redirect({name: 'dashboard'})
        }
        return next(request)
    }

    /**
     * Terminate Next.
     * @param response {Object}
     * @param nextPipe function
     * @return {*}
     */
    terminate(response, nextPipe) {
        return nextPipe(response)
    }
}
```

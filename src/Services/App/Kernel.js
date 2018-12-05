import Pipeline from "../../Support/Pipeline"
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
     * Register Middleware Stack
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

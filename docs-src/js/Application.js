import Laralite from "laravel-micro.js"
import Authenticate from "./Middleware/Authenticate"
export default class Application extends Laralite{

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
    boot(){
        console.time('Application Provider Boot Time')
        this.bootProviders()
        console.timeEnd('Application Provider Boot Time')
    }

    /**
     * Start the Primary Application Service
     * @return void
     */
    start(){
        console.time('Application Mount Time')
        this.make('VueRoot')
        console.timeEnd('Application Mount Time')
    }

    /**
     * Run the Request through the Kernel
     * @return void
     */
    run(request){

        //Make the Application Kernel instance.
        const kernel = this.make('Kernel')

        //Set Global Middleware on the Kernel.
        kernel.setMiddleware([
            Authenticate
        ])

        //Get the response from the middleware kernel.
        kernel.handle(request, (finalRequest) => {
            const next = finalRequest.get('next')
            if(this._isCallable(next)){
                next()
            }
        })

    }
}

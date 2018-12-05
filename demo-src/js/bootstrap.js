import {Handler} from "laralite"
import Application from "./Application"

const app = new Application
app.errorHandler(Handler)
app.debug(true)

/** Register Service Providers **/
import Providers from "./ServiceProviders"
console.time('Application Provider Bindings Time')
Providers.forEach((ServiceProvider)=>{
    app.register(ServiceProvider)
})
console.timeEnd('Application Provider Bindings Time')


/** Boot the Service Providers **/
app.boot()

/** Start the Application **/
app.start()


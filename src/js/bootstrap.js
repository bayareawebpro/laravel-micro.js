import {ErrorHandler} from "laravel-micro.js"
import Application from "./Application"
import Providers from "./ServiceProviders"

const app = new Application
app.errorHandler(ErrorHandler)

//// EARLIEST DEBUGGING POINT ////
app.debug(true)
//// EARLIEST DEBUGGING POINT ////

/** Register Service Providers **/
app.measure()
Providers.forEach((ServiceProvider)=>{
    app.register(ServiceProvider)
})
app.measure(`Provider Registration Time`)


/** Boot the Service Providers **/
//// MEASURE MOUNT TIME ////
app.measure()
app.boot()
app.measure(`Boot Time`)
//// END MEASURE MOUNT TIME ////


/** Start the Application **/
//// MEASURE MOUNT TIME ////
app.measure()
app.start()
app.measure(`Mount Time`)
//// END MEASURE MOUNT TIME ////


/** Bind some stuff! **/
app.bind('DemoBoolValue', true)
app.bind('DemoNumberValue', 1000)
app.bind('DemoArrayValue', [{
    test: 'Hello!'
}])
app.bind('DemoObjectValue', {
    test: 'Hello!'
})

/** Share the shareable services with Window for inspection. **/
if(app.debugging){
    app.share(...app.sharable).withOthers(window)
}


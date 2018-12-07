import {ServiceProvider} from "laravel-micro.js"
import ServiceV1 from "./ServiceV1"
import ServiceV2 from "./ServiceV2"
export default class SwapableServiceProvider extends ServiceProvider {

    constructor(app) {
        super(app)
        this.deferred = true
    }

    register() {
        this.app.bind('Service_V1', ServiceV1, true)
        this.app.bind('Service_V2', ServiceV2, true)
        this.app.bind('ServiceInstance', (Service_V1) => Service_V1, true)
        this.app.bind('swapper', ()=>{
            return (ServiceInstance)=> {
	              let implementation = 'Service_V1'
                const alias = this.app.getName(ServiceInstance)
                if(alias === implementation){
                    implementation = 'Service_V2'
                }
                this.app.destroy(alias)
                const newImplementation = this.app.make(implementation)
                newImplementation.state = ServiceInstance.state
                this.app.setInstance('ServiceInstance', newImplementation)
                return newImplementation
            }
        }, true)
    }

    boot() {

    }

    get provides() {
        return [
            'swapper',
            'ServiceInstance',
            'Service_V1',
            'Service_V2',
        ]
    }
}
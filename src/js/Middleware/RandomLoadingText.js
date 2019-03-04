export default class RandomLoadingText {

    constructor(app){
        this.app = app
    }

    /**
     * Handle Middleware
     * @param request {Request}
     * @param next
     * @return {*}
     */
    handle(request, next){

        let interval = null
        const events = this.app.make('Events')
        const services = Object.entries(this.app.resolved)
        const pluckOne = () => services.shift()[0]
        const timePer = 100
        const intervalTime = services.length * timePer
        const artisanTime = 200
        const makeInterval = () => {
            interval = setInterval(() => events.$emit('app:loading', `micro make:${pluckOne()}`), timePer)
        }

        if(!this.app.isResolved('servicesLoaded')){
            makeInterval()
            this.app.setInstance('servicesLoaded', true)
        }else{
            events.$emit('app:loading', this.app.make('artisanMessage'))
        }

        setTimeout(() => {
            if(interval){
                clearInterval(interval)
                interval = null
            }
            setTimeout(()=>{
                next(request)

            }, 200)
        }, interval ? intervalTime : artisanTime)
    }
}

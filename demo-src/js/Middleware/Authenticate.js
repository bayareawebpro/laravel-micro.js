export default class Authenticate {

    constructor(App){
        this.app = App
    }

    /**
     * Handle Middleware
     * @param request {Request}
     * @param next
     * @return {*}
     */
    handle(request, next){
        // const to = request.get('to')
        // if(to.path.includes('service-swap')){
        //
        // }
        return next(request)
    }
}

export default class Authenticate {

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

        //If there's currentUser bound, then just continue...
        if(this.app.isBound('currentUser')){
            return next(request)
        }

        //Otherwise, let's make a little show for the new user...
        const events = this.app.make('Events')
        events.$emit('app:loading', 'Authorizing...')


        setTimeout(() => {

            //We'll pretend to authorize the user, as we bind the request as the "user" object.
            this.app.bind('currentUser', request.all())
            events.$emit('app:loading', 'Authorization Successful!')

            //Then, after the user get's a chance to see the message update, we'll proceed and kill the loader.
            setTimeout(()=>{
                next(request)
            }, 300)

        }, 900)
    }
}

export default class Pipeline {

    /**
     * Pipeline Constructor
     * @param App {Container}
     */
    constructor(App) {
        this._app = App
        this._pipes = []
        this._obj = null
        this._callback = null
        this._via = 'handle'
    }

    /**
     * Send (Object State)
     * @param obj {*}
     * @return {this}
     */
    send(obj){
        this._obj = obj
        return this
    }

    /**
     * Via (Alternative Method)
     * @param methodName {*}
     * @return {this}
     */
    via(methodName){
        this._via = methodName
        return this
    }

    /**
     * Through Pipes
     * @param pipes {Array}
     * @return {this}
     */
    through(pipes){
        this._pipes = pipes
        return this
    }

    /**
     * Then Callback
     * @param callback {function}
     * @return {*}
     */
    then(callback){
        this._callback = callback

        const next = (state) => {
            if(!this.hasMorePipes()){
                return this._app.isCallable(this._callback) ? this._callback(state) : state
            }
            let response

            const pipe = this._pipes.shift()
            const name = this._app.getName(pipe)

            if(this._app.isBound(name)){
                response = (this._app.make(name))[this._via](state, next)
            }else{
                const pipeInstance = new pipe(this._app)
                response = pipeInstance[this._via](state, next)
            }
            return response
        }

        return  next(this._obj)
    }

    /**
     * (conditional )Pipeline Has Pipes?
     * @return {Boolean}
     */
    hasMorePipes(){
        return this._pipes.length > 0
    }
}

export default class Pipeline {

    /**
     * Pipeline Constructor
     * @param app {Application|Container}
     */
    constructor(app) {
        this.app = app
        this._pipes = []
        this._object = null
        this._callback = null
        this._via = 'handle'
    }

    /**
     * Send (Object State)
     * @param obj {*}
     * @return {this}
     */
    send(obj){
        this._object = obj
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
        while(this._hasPipes()){
            this._handlePipe(this._getPipe(), this._object)
        }
        return this._object
    }

    /**
     * (conditional )Pipeline Has Pipes?
     * @return {Boolean}
     */
    _hasPipes(){
        return this._pipes.length > 0
    }

    /**
     * (method) Get Pipe
     * @return {*}
     */
    _getPipe(){
        const Next = this._pipes.shift()
        const name = this.app.getName(Next)
        if(Next){
            this.app.log(`Pipeline Processing... ${name}`)
            if(this.app.isBound(name)){
                return this.app.make(name)
            }else{
                return new Next(this.app)
            }
        }
        return false
    }

    /**
     * (method) Handle Pipe
     * @return {*}
     */
    _handlePipe(Pipe, Sent){
        let Next = (Sent)=> {
            this._callback(Sent)
        }
        if(this._hasPipes()){
            Next = (Sent)=>{
                this._handlePipe(this._getPipe(), Sent)
            }
        }
        return Pipe[this._via](Sent, Next)
    }
}

import Mixin from "./_Mixin"
export default (instance) => Mixin(instance, {
    /**
     * Log if debugging.
     * @return void
     */
    _log(){
        if(this._debug)
            console.log.apply(this, arguments)
    }
})

import Mixin from "./_Mixin"
export default (instance) => Mixin(instance, {
    /**
     * Create an Alias to this Instance as the property of another Object.
     * @example ParentInstance.alias(window, 'MyService')
     * @return {Array|undefined}
     */
    listMethods(){
        if(!this._debug) return
        let names = [];
        const walkProps = (proto) => Object
            .getOwnPropertyNames(proto)
            .forEach(name => {
                if(
                    !['hasOwnProperty','isPrototypeOf', 'propertyIsEnumerable', 'toString', 'valueOf', 'toLocaleString'].includes(name)
                    &&!name.includes('constructor')
                    && !name.includes('_')
                ) {
                    names.push(name)
                }
            })
        walkProps(instance.prototype)
        walkProps(instance.prototype.__proto__)
        return names
    }
})

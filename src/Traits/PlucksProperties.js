import Mixin from "./_Mixin"
export default (instance) => Mixin(instance, {
    _pluck(o, ...props) {
        props = props.length === 1 && Array.isArray(props[0]) ? props[0] : props
        return props.reduce((a, x) => {
            if(o.hasOwnProperty(x)) a[x] = o[x]
            return a
        }, {})
    }
})

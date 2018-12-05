const interpolateUrlParams = (obj, prefix = false) => {
    const query = Object.keys(obj).map((key) => {
        const value = obj[key]
        //Prefix Array Fields
        if (obj.constructor === Array) {
            key = `${prefix}[]`
        } else if (obj.constructor === Object) {
            key = (prefix ? `${prefix}[${key}]` : key)
        }
        if (typeof value === 'object') {
            return interpolateUrlParams(value, key)
        } else if(typeof value === 'string') {
            return `${key}=${encodeURIComponent(value)}` //${key}`
        }else if(value) {
            return `${key}=${value}` //${key}`
        }
    })
    return [].concat.apply([], query).join('&').replace(/&\s*$/, "")
}
export default interpolateUrlParams

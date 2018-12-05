const DotObject = (notation, data, fallback = null) => {
    return notation.split('.').reduce((res, key) => res[key] || fallback, data)
}
export default DotObject

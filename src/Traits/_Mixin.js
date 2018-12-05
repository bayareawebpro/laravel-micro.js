/**
 * Mix Objects with Other Objects.
 * @param classObject {*}
 * @param Mixin {Object}
 * @return {Object}
 */
export default function(classObject, Mixin) {
    return Object.assign(classObject.prototype, Mixin)
}

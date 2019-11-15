"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = _default;

/**
 * Mix Objects with Other Objects.
 * @param classObject {*}
 * @param Mixin {Object}
 * @return {Object}
 */
function _default(classObject, Mixin) {
  return Object.assign(classObject.prototype, Mixin);
}
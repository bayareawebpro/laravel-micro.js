"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _Mixin = _interopRequireDefault(require("./_Mixin"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _default = function _default(instance) {
  return (0, _Mixin["default"])(instance, {
    _nonReactive: function _nonReactive(obj, prop) {
      Object.defineProperty(obj, prop, {
        configurable: false
      });
    }
  });
};

exports["default"] = _default;
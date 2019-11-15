"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _Pipeline2 = _interopRequireDefault(require("../../Support/Pipeline"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var Kernel =
/*#__PURE__*/
function (_Pipeline) {
  _inherits(Kernel, _Pipeline);

  /**
   * App Kernel Constructor
   * @param App {Container}
   * @return void
   */
  function Kernel(App) {
    var _this;

    _classCallCheck(this, Kernel);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Kernel).call(this, App));
    _this._middleware = [];
    return _this;
  }
  /**
   * Register Middleware Stack
   * @param middleware {Array}
   * @return this
   */


  _createClass(Kernel, [{
    key: "setMiddleware",
    value: function setMiddleware(middleware) {
      this._middleware = middleware;
      return this;
    }
    /**
     * Register Middleware Stack
     * @param request {*}
     * @param then {function|null}
     * @return {*}
     */

  }, {
    key: "handle",
    value: function handle(request) {
      var then = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      return this.send(request).through(this._middleware.slice()).via('handle').then(then);
    }
    /**
     * Terminate Middleware Stack
     * @param request {*}
     * @param then {function|null}
     * @return {*}
     */

  }, {
    key: "terminate",
    value: function terminate(request) {
      var then = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      return this.send(request).through(this._middleware.slice().reverse()).via('terminate').then(then);
    }
  }]);

  return Kernel;
}(_Pipeline2["default"]);

exports["default"] = Kernel;
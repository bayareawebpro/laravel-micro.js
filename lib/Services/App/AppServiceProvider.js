"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _Kernel = _interopRequireDefault(require("./Kernel"));

var _ServiceProvider2 = _interopRequireDefault(require("../../Support/ServiceProvider"));

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

var AppServiceProvider =
/*#__PURE__*/
function (_ServiceProvider) {
  _inherits(AppServiceProvider, _ServiceProvider);

  function AppServiceProvider(app) {
    _classCallCheck(this, AppServiceProvider);

    return _possibleConstructorReturn(this, _getPrototypeOf(AppServiceProvider).call(this, app));
  }
  /**
   * Register any application services.
   * @return void
   */


  _createClass(AppServiceProvider, [{
    key: "register",
    value: function register() {
      var _this = this;

      // Allow the App to Inject an instance of itself.
      // We don't need to fire injection methods for the kernel, so well inject the app ourselves.
      this.app.bind('App', function () {
        return _this.app;
      });
      this.app.bind('Kernel', function () {
        return new _Kernel["default"](_this.app);
      }, false);
    }
    /**
     * Boot any application services.
     * @return void
     */

  }, {
    key: "boot",
    value: function boot() {} //

    /**
     * Declare the aliases for the provided services.
     * @return {Array}
     */

  }, {
    key: "provides",
    get: function get() {
      return ['App', 'Kernel'];
    }
  }]);

  return AppServiceProvider;
}(_ServiceProvider2["default"]);

exports["default"] = AppServiceProvider;
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var ServiceProvider =
/*#__PURE__*/
function () {
  function ServiceProvider(App) {
    _classCallCheck(this, ServiceProvider);

    this.app = App;
    this.booted = false;
    this.deferred = true;
  }
  /**
   * Register any application services
   * @return void
   */


  _createClass(ServiceProvider, [{
    key: "register",
    value: function register() {} // this.app.bind(alias, () => concrete)
    // this.app.bind(alias, concrete)

    /**
     * Boot any application services
     * @return void
     */

  }, {
    key: "boot",
    value: function boot() {} // const MyClass = this.app.make(alias)
    // MyClass.method()

    /**
     * Declare the aliases for the provided services
     * @return {Array}
     */

  }, {
    key: "load",
    value: function load() {
      this.isBooted = true;
      this.boot();
    }
  }, {
    key: "provides",
    get: function get() {
      return ['MyService'];
    }
    /**
     * (conditional) Is Provider Deferred
     * @return {Boolean}
     */

  }, {
    key: "isDeferred",
    get: function get() {
      return this.deferred === true;
    }
    /**
     * (conditional) Is Provider Bootable
     * @return {Boolean}
     */

  }, {
    key: "isBootable",
    get: function get() {
      return typeof this.boot === 'function';
    }
    /**
     * (conditional) Is Provider Booted
     * @return {Boolean}
     */

  }, {
    key: "isBooted",
    get: function get() {
      return this.booted === true;
    }
    /**
     * (conditional) Is Provider Loaded
     * @return void
     */
    ,
    set: function set(value) {
      this.booted = value;
    }
  }]);

  return ServiceProvider;
}();

exports["default"] = ServiceProvider;
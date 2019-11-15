"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _PreventsReactivity = _interopRequireDefault(require("./Traits/PreventsReactivity"));

var _Exception = _interopRequireDefault(require("./Exceptions/Exception"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _construct(Parent, args, Class) { if (isNativeReflectConstruct()) { _construct = Reflect.construct; } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Container =
/*#__PURE__*/
function () {
  /**
   * Container Constructor
   *
   * Optimization Tip:
   * When using Vue within services,
   * Prevent Object watcher pollution by using the NonReactive utility.
   * Log objects to the console to see if there's watchers set on the objects.
   */
  function Container() {
    _classCallCheck(this, Container);

    this._providers = {};
    this._bindings = {};
    this._resolved = {};
    this._injections = [];
    this._shouldShare = [];
    this._sharedWith = {};
    this._sharable = [];
    this._debug = false;
    this._errorHandler = null;
    this._logOutput = []; //Disable Reactive Watchers from Polluting these scopes.

    this._nonReactive(this, '_providers');

    this._nonReactive(this, '_bindings');

    this._nonReactive(this, '_injections');

    this._nonReactive(this, '_resolved');

    this._nonReactive(this, '_sharable');

    this._nonReactive(this, '_sharedWith');

    this._nonReactive(this, '_shouldShare');

    this._nonReactive(this, '_errorHandler');
  }

  _createClass(Container, [{
    key: "getProvider",

    /**
     * Get Service Provider Instance
     * @param providerClassName {String}
     * @return {ServiceProvider}|null
     */
    value: function getProvider(providerClassName) {
      return this._providers[providerClassName] || null;
    }
    /**
     * Toggle Debugging Mode
     * @param state {Boolean}
     * @return void
     */

  }, {
    key: "debug",
    value: function debug(state) {
      this._debug = state;
    }
    /**
     * Toggle Debugging Mode
     * @return {Boolean}
     */

  }, {
    key: "getName",

    /**
     * (method) Get an Objects Name
     * @param obj {*}
     * @return {String}
     */
    value: function getName(obj) {
      var possible = {
        name: obj.name ? obj.name : null,
        proto: obj.prototype ? obj.prototype.name : null,
        construct: obj.constructor ? obj.constructor.name : null,
        type: _typeof(obj) || null
      };
      return possible.name || possible.proto || possible.construct || possible.type;
    }
    /**
     * Set Global Error Handler
     * @param Handler {*}
     * @return this
     */

  }, {
    key: "errorHandler",
    value: function errorHandler(Handler) {
      this._errorHandler = new Handler(this);
      return this;
    }
    /**
     * (method) Handle an Error with the Registered Handler
     * @param error {Error|Exception}
     * @return mixed
     */

  }, {
    key: "handleError",
    value: function handleError(error) {
      if (this._errorHandler && this.isCallable(this._errorHandler.handle)) {
        return this._errorHandler.handle(error);
      }

      throw error;
    }
    /**
     * (conditional) Is the Service Provider Registered?
     * @param providerName {String}
     * @return {Boolean}
     */

  }, {
    key: "isRegistered",
    value: function isRegistered(providerName) {
      return this._isset(this._providers[providerName]);
    }
    /**
     * (conditional) Is the Binding Registered?
     * @param alias {String}
     * @return {Boolean}
     */

  }, {
    key: "isBound",
    value: function isBound(alias) {
      return this._isset(this._bindings[alias]);
    }
    /**
     * (conditional) Is the Binding Resolved?
     * @param alias {String}
     * @return {Boolean}
     */

  }, {
    key: "isResolved",
    value: function isResolved(alias) {
      return this._isset(this._resolved[alias]);
    }
    /**
     * (method) Make Instance
     * @param alias {String}
     * @return {*}
     */

  }, {
    key: "make",
    value: function make(alias) {
      this.log("Making \"".concat(alias, "\"..."));
      return this._resolve(alias);
    }
    /**
     * (method) Bind New Instance
     * @param alias {String}
     * @return {*}
     */

  }, {
    key: "rebound",
    value: function rebound(alias) {
      this.log("Rebound: \"".concat(alias, "\"..."));
      return this._resolve(alias, true);
    }
    /**
     * (method) Register Service Provider
     * @param ServiceProvider {ServiceProvider}
     * @return this
     */

  }, {
    key: "register",
    value: function register(ServiceProvider) {
      var providerName = this.getName(ServiceProvider);
      this._providers[providerName] = new ServiceProvider(this);
      this.log("Registered \"".concat(providerName, "\"..."));
      return this;
    }
    /**
     * (method) Bind Callable Concrete Instance.
     * @param alias {String}
     * @param binding {*}
     * @param shared {Boolean}
     * @return this
     */

  }, {
    key: "bind",
    value: function bind(alias, binding) {
      var shared = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
      this.log("Binding: \"".concat(alias, "\"..."));
      this._bindings[alias] = binding;

      if (shared && !this._sharable.includes(alias)) {
        this._sharable.push(alias);
      }

      return this;
    }
    /**
     * (method) UnBind & DestroyConcrete Instances.
     * @param alias {String}
     * @return this
     */

  }, {
    key: "unBind",
    value: function unBind(alias) {
      this.log("UnBinding: \"".concat(alias, "\"..."));
      this.destroy(alias);

      this._destroyReference(alias, this._bindings);

      if (this._sharable.includes(alias)) {
        this._sharable.splice(this._sharable.indexOf(alias), 1);
      }

      return this;
    }
    /**
     * (method) Set Concrete Instance
     * @param alias {String}
     * @param concrete {*}
     * @param shared {Boolean}
     * @return {*}
     */

  }, {
    key: "setInstance",
    value: function setInstance(alias, concrete) {
      var shared = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
      this.log("Set Instance of \"".concat(alias, "\"."), concrete);
      this._resolved[alias] = concrete;

      if (shared && !this._sharable.includes(alias)) {
        this._sharable.push(alias);
      }

      return concrete;
    }
    /**
     * (method) Destroy Resolved Instance
     * @param alias {String}
     * @return {Boolean}
     */

  }, {
    key: "destroy",
    value: function destroy(alias) {
      if (this.isResolved(alias)) {
        this.unShare(alias);
        this.log("Destroying shared instance of \"".concat(alias, "\"..."));

        this._destroyReference(alias, this._resolved);

        this.log("\"".concat(alias, "\" was destroyed successfully."));
        return true;
      }

      return false;
    }
    /**
     * Collect Sharable Aliases (method chain)
     * @param aliases {String|Array}
     * @return {this}
     */

  }, {
    key: "share",
    value: function share() {
      var _this = this;

      this._shouldShare = [];

      for (var _len = arguments.length, aliases = new Array(_len), _key = 0; _key < _len; _key++) {
        aliases[_key] = arguments[_key];
      }

      aliases.forEach(function (alias, index) {
        if (!_this.isBound(alias)) {
          return _this.handleError(_this.makeException("No binding for ".concat(alias, " available to share.")));
        }

        if (!_this.canShare(alias)) {
          return _this.handleError(_this.makeException("".concat(alias, " is not sharable.")));
        }

        if (!_this._shouldShare.includes(alias)) {
          _this._shouldShare.push(alias);
        }
      });
      return this;
    }
    /**
     * Make Sharable Alias (method chain end)
     * @param alias {String}
     * @return function
     */

  }, {
    key: "_makeSharableAlias",
    value: function _makeSharableAlias(alias) {
      var _this2 = this;

      return function () {
        return _this2.make(alias);
      };
    }
    /**
     * Attach Sharable Alias to Objects  (method chain end)
     * @param instances {*}
     * @return this
     */

  }, {
    key: "withOthers",
    value: function withOthers() {
      var _this3 = this;

      for (var _len2 = arguments.length, instances = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        instances[_key2] = arguments[_key2];
      }

      if (Array.isArray(this._shouldShare) && this._shouldShare.length > 0) {
        this._shouldShare.forEach(function (alias) {
          instances.forEach(function (object) {
            var sharedList = _this3._sharedWith[alias] ? _this3._sharedWith[alias] : _this3._sharedWith[alias] = [];

            if (!sharedList.includes(object)) {
              object[_this3.getSharedAliasName(alias)] = _this3._makeSharableAlias(alias);
              sharedList.push(object);
            }
          });
        });

        this.log("Shared \"".concat(this._shouldShare.join(', '), "\" with ").concat(instances.length, " Objects."));
      }

      this._shouldShare = [];
      return this;
    }
    /**
     * Get Shared Alias Name from Normal Name
     * @param alias {String}
     * @return {String}
     */

  }, {
    key: "getSharedAliasName",
    value: function getSharedAliasName(alias) {
      return "$".concat(alias[0].toLowerCase() + alias.substring(1));
    }
    /**
     * (method) Is the Service Shared?.
     * @param alias {String}
     * @return {Boolean}
     */

  }, {
    key: "isShared",
    value: function isShared(alias) {
      return this._sharedWith.hasOwnProperty(alias) && this._sharedWith[alias].length > 0;
    }
    /**
     * (method) UnShare a Shared Service.
     * @param alias {String}
     * @return void
     */

  }, {
    key: "unShare",
    value: function unShare(alias) {
      var _this4 = this;

      this.log("UnSharing \"".concat(alias, "\"..."));
      if (!this._sharedWith[alias]) return;

      this._sharedWith[alias].forEach(function (object) {
        _this4.log("Destroying shared references of \"".concat(alias, "\"..."));

        _this4._destroyReference(_this4.getSharedAliasName(alias), object);
      });

      delete this._sharedWith[alias];
    }
    /**
     * (conditional) Can Share Instance
     * @param alias {String}
     * @return {Boolean}
     */

  }, {
    key: "canShare",
    value: function canShare(alias) {
      return this._sharable.includes(alias);
    }
    /**
     * (method) Boot Providers
     * @return void
     */

  }, {
    key: "bootProviders",
    value: function bootProviders() {
      var _this5 = this;

      //Register all bindings.
      var providers = Object.keys(this._providers);
      providers.forEach(function (providerName, index) {
        _this5.log("Calling \"".concat(providerName, "\" Registration..."));

        _this5._providers[providerName].register();
      }); //Boot all providers.

      providers.forEach(function (providerName, index) {
        var providerInstance = _this5._providers[providerName];

        if (!providerInstance.isDeferred) {
          _this5._bootProvider(providerInstance);
        }
      });
    }
    /**
     * (method) Boot Service Provider
     * @param ProviderInstance {ServiceProvider}
     * @return void
     */

  }, {
    key: "_bootProvider",
    value: function _bootProvider(ProviderInstance) {
      this.log("Calling \"".concat(this.getName(ProviderInstance), "\" Boot..."));
      return ProviderInstance.load();
    }
    /**
     * (method) Find Service Provider
     * @param alias {String}
     * @return {*|null}
     */

  }, {
    key: "_findProvider",
    value: function _findProvider(alias) {
      this.log("Checking Provider for ".concat(alias, "..."));
      var providers = Object.values(this._providers);
      var result = providers.find(function (providerInstance) {
        return providerInstance.provides.includes(alias);
      });

      if (result) {
        this.log("Located Provider for ".concat(alias, "..."));
      }

      return result;
    }
    /**
     * (method) Resolve Binding
     * @param alias {String}
     * @param rebound {Boolean}
     * @return {*}
     */

  }, {
    key: "_resolve",
    value: function _resolve(alias) {
      var rebound = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

      if (this.isResolved(alias) && this.canShare(alias) && !rebound) {
        return this.getInstance(alias);
      }

      if (rebound) {
        this.destroy(alias);
      }

      if (!this.isBound(alias)) {
        return this.handleError(this.makeException('Binding Exception', "No Binding found for \"".concat(alias, "\".")));
      }

      var providerInstance = this._findProvider(alias);

      if (providerInstance && providerInstance.isDeferred) {
        this.log("Booting Deferred ServiceProvider \"".concat(alias, "\"..."));

        this._bootProvider(providerInstance);
      }

      var instance = this._resolveIfNotResolved(alias);

      if (this.canShare(alias)) {
        this.log("\"".concat(alias, "\" is Sharable."));
        this.setInstance(alias, instance);
      }

      return instance;
    }
    /**
     * (pass-through) Resolve if not resolved.
     * @param alias {*}
     * @return {*}
     */

  }, {
    key: "_resolveIfNotResolved",
    value: function _resolveIfNotResolved(alias) {
      this.log("Resolving Binding for \"".concat(alias, "\"..."));
      var binding = this._bindings[alias];

      if (this.isCallable(binding)) {
        return this._makeConcrete(binding, this._prepareForInjection(alias, binding));
      }

      return binding;
    }
    /**
     * (pass-through) Make Concrete Instance
     * @param binding {*}
     * @param injections {Array}
     * @return {*}
     */

  }, {
    key: "_makeConcrete",
    value: function _makeConcrete(binding, injections) {
      try {
        var construct = Object.create(binding.constructor).bind.apply(binding, [null].concat(injections));
        var concrete;

        if (!this.isClass(binding)) {
          concrete = construct();
        } else {
          concrete = new construct();
        }

        if (typeof concrete === 'undefined') {
          return this.makeException('Binding Exception', "Binding ".concat(binding, " failed, return value is undefined."));
        }

        this.log("Instantiated Concrete Instance of \"".concat(this.getName(concrete), "\" successfully."));
        return concrete;
      } catch (e) {
        return this.handleError(e);
      }
    }
    /**
     * (pass-through) Resolve Dependencies
     * @param alias {*}
     * @param instance {*}
     * @return {Array}
     */

  }, {
    key: "_prepareForInjection",
    value: function _prepareForInjection(alias, instance) {
      var _this6 = this;

      var injections = [];

      if (this.isCallable(instance)) {
        var dependencies = this._readArguments(instance);

        if (dependencies && dependencies.length) {
          dependencies.forEach(function (dependency) {
            //Block Recursive Function
            if (_this6._injections.includes(dependency)) {
              throw _this6.makeException('Circular Dependency Exception', "".concat(alias, " requires ").concat(_this6._injections.join(', ')));
            }

            _this6.log("".concat(alias, " requires dependency \"").concat(dependency, "\""));

            _this6._injections.push(dependency); //Recursive Function


            injections.push(_this6._resolve(dependency));

            _this6._injections.splice(_this6._injections.indexOf(dependency), 1);
          });
        }
      }

      return injections;
    }
    /**
     * (method) Destroy a Shared Reference
     * @param alias {String}
     * @param obj {Object}
     * @return void
     */

  }, {
    key: "_destroyReference",
    value: function _destroyReference(alias, obj) {
      if (obj[alias]) {
        this.log("Cleaning up resolved reference of \"".concat(alias, "\"..."));
        obj[alias] = null;
        delete obj[alias];
      }
    }
    /**
     * Read Arguments
     * Matches everything inside the function argument parens.
     * Split the arguments string into an array comma delimited.
     * Inline comments are skipped and whitespace is trimmed.
     * Undefined values are filtered.
     * @param callable
     * @return {*}
     * @private
     */

  }, {
    key: "_readArguments",
    value: function _readArguments(callable) {
      var args = callable.toString().match(/function.*?\(([^)]*)\)/);

      if (args && args[1]) {
        return args[1].split(',').map(function (arg) {
          return arg.trim();
        }).filter(function (arg) {
          return arg;
        });
      }

      return [];
    }
    /**
     * (conditional) Is Value Callable
     * @param value {*}
     * @return {Boolean}
     */

  }, {
    key: "isCallable",
    value: function isCallable(value) {
      return typeof value === 'function';
    }
    /**
     * (conditional) Is Binding a Class Constructor Type
     * @param abstract {String}
     * @return {Boolean}
     */

  }, {
    key: "isClass",
    value: function isClass(_abstract) {
      if (typeof _abstract === 'string') {
        _abstract = this._bindings[_abstract];
      }

      return !this.isCallable(_abstract) || this.isCallable(_abstract) && this.getName(_abstract) !== 'Function';
    }
    /**
     * (conditional) Is Binding a Concrete Object / Primitive
     * @param alias {String}
     * @return {Boolean}
     */

  }, {
    key: "isConcrete",
    value: function isConcrete(alias) {
      return !this.isCallable(this._bindings[alias]);
    }
    /**
     * (method) Get Instance
     * @param alias {String}
     * @return {*}
     */

  }, {
    key: "getInstance",
    value: function getInstance(alias) {
      this.log("Resolved Shared Instance of \"".concat(alias, "\"."));
      return this._resolved[alias];
    }
    /**
     * (conditional) Is the value set?
     * @param value {*}
     * @return {Boolean}
     */

  }, {
    key: "_isset",
    value: function _isset(value) {
      return ![null, undefined].includes(value);
    }
    /**
     * (method) Log to Console (Debug Mode)
    * @return this
     */

  }, {
    key: "log",
    value: function log() {
      if (this._debug) {
        console.debug.apply(console, arguments);

        this._logOutput.push(arguments[0]);
      }

      return this;
    }
    /**
     * (method) Get Log Output (Debug Mode)
     * @return {Array}
     */

  }, {
    key: "flushLogs",

    /**
     * (method) Get Log Output (Debug Mode)
     * @return this
     */
    value: function flushLogs() {
      this.logOutput = [];
      return this;
    }
    /**
     * (method) Make New Exception
     * @return {Exception}
     */

  }, {
    key: "makeException",
    value: function makeException(name) {
      for (var _len3 = arguments.length, args = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
        args[_key3 - 1] = arguments[_key3];
      }

      var e = _construct(_Exception["default"], args);

      e.name = "".concat(this.getName(this), " ").concat(name);
      return e;
    }
  }, {
    key: "providers",
    get: function get() {
      return this._providers;
    }
  }, {
    key: "bindings",
    get: function get() {
      return this._bindings;
    }
  }, {
    key: "resolved",
    get: function get() {
      return this._resolved;
    }
  }, {
    key: "sharable",
    get: function get() {
      var _this7 = this;

      return this._sharable.filter(function (entry) {
        return _this7.isBound(entry);
      });
    }
  }, {
    key: "sharedWith",
    get: function get() {
      return this._sharedWith;
    }
  }, {
    key: "debugging",
    get: function get() {
      return this._debug === true;
    }
    /**
     * Set Debugging Mode
     * @param state {Boolean}
     * @return void
     */
    ,
    set: function set(state) {
      this._debug = state;
    }
  }, {
    key: "logOutput",
    get: function get() {
      return this._logOutput;
    }
    /**
     * (method) Get Log Output (Debug Mode)
     * @return void
     */
    ,
    set: function set(state) {
      this._logOutput = state;
    }
  }]);

  return Container;
}();
/** Container Traits **/


exports["default"] = Container;
(0, _PreventsReactivity["default"])(Container);
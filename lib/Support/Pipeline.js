"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Pipeline =
/*#__PURE__*/
function () {
  /**
   * Pipeline Constructor
   * @param App {Container}
   */
  function Pipeline(App) {
    _classCallCheck(this, Pipeline);

    this._app = App;
    this._pipes = [];
    this._obj = null;
    this._callback = null;
    this._via = 'handle';
  }
  /**
   * Send (Object State)
   * @param obj {*}
   * @return {this}
   */


  _createClass(Pipeline, [{
    key: "send",
    value: function send(obj) {
      this._obj = obj;
      return this;
    }
    /**
     * Via (Alternative Method)
     * @param methodName {*}
     * @return {this}
     */

  }, {
    key: "via",
    value: function via(methodName) {
      this._via = methodName;
      return this;
    }
    /**
     * Through Pipes
     * @param pipes {Array}
     * @return {this}
     */

  }, {
    key: "through",
    value: function through(pipes) {
      this._pipes = pipes;
      return this;
    }
    /**
     * Then Callback
     * @param callback {function}
     * @return {*}
     */

  }, {
    key: "then",
    value: function then(callback) {
      var _this = this;

      this._callback = callback;

      var next = function next(state) {
        if (!_this.hasMorePipes()) {
          return _this._app.isCallable(_this._callback) ? _this._callback(state) : state;
        }

        var response;

        var pipe = _this._pipes.shift();

        var name = _this._app.getName(pipe);

        if (_this._app.isBound(name)) {
          response = _this._app.make(name)[_this._via](state, next);
        } else {
          var pipeInstance = new pipe(_this._app);
          response = pipeInstance[_this._via](state, next);
        }

        return response;
      };

      return next(this._obj);
    }
    /**
     * (conditional )Pipeline Has Pipes?
     * @return {Boolean}
     */

  }, {
    key: "hasMorePipes",
    value: function hasMorePipes() {
      return this._pipes.length > 0;
    }
  }]);

  return Pipeline;
}();

exports["default"] = Pipeline;
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Validator =
/*#__PURE__*/
function () {
  function Validator() {
    _classCallCheck(this, Validator);

    this.message = null;
    this.exception = null;
    this.messageBag = {};
  }
  /**
   * Make New Instance
   * @param data
   * @return Validator
   */


  _createClass(Validator, [{
    key: "make",
    value: function make() {
      var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      return new Validator(data);
    }
    /**
     * (Method) clearErrors
     * @return void
     */

  }, {
    key: "clear",
    value: function clear() {
      this.message = null;
      this.exception = null;
      this.messageBag = {};
    }
    /**
     * Sync State
     * @param data {Object}
     * @return Validator
     */

  }, {
    key: "sync",
    value: function sync() {
      var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      if (data.message) {
        this.setMessage(data.message);
      }

      if (data.errors) {
        this.setErrors(data.errors);
      }

      if (data.exception) {
        this.exception = data.exception;
      }

      return this;
    }
    /**
     * Set Response Message
     * @param message {String}
     */

  }, {
    key: "setMessage",
    value: function setMessage() {
      var message = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
      this.message = message;
      return this;
    }
    /**
     * Clear Response Message
     */

  }, {
    key: "clearMessage",
    value: function clearMessage() {
      this.message = null;
      return this;
    }
    /**
     * Set Errors
     * @param messageBag
     */

  }, {
    key: "setErrors",
    value: function setErrors() {
      var messageBag = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var messages = {};
      Object.keys(messageBag).map(function (field) {
        if (Array.isArray(messageBag[field])) {
          //Strip Dot Syntax from Field Names in Messages (for nested array fields)
          messageBag[field] = messageBag[field].map(function (value) {
            return value.replace(field.replace(/_/g, ' '), field.replace(/[._]/g, ' '));
          });
        }
      });
      this.messageBag = Object.assign({}, messageBag);
      return this;
    }
    /**
     * (Method) Get First Error Entry
     * @return {String|null}
     */

  }, {
    key: "put",

    /**
     * Put field Error message.
     * @param field {String}
     * @param error {String}
     * return this
     */
    value: function put(field, error) {
      if (Array.isArray(this.messageBag[field])) {
        this.messageBag[field].push(error);
      } else {
        var errors = {};
        errors[field] = [error];
        this.setErrors(Object.assign({}, this.messageBag, errors));
      }

      return this;
    }
    /**
     * Forget field Error message.
     * @param field {String}
     */

  }, {
    key: "forget",
    value: function forget(field) {
      delete this.messageBag[field];
      this.messageBag = Object.assign({}, this.messageBag);
      return this;
    }
    /**
     * Has Error for field.
     * @param field {String}
     * @return {boolean}
     */

  }, {
    key: "has",
    value: function has() {
      var field = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
      return field ? this.messageBag[field] : false;
    }
    /**
     * Get Error for field.
     * @param field {String}
     * @param fallback {*}
     * @return {*}
     */

  }, {
    key: "get",
    value: function get(field) {
      var fallback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
      return this.messageBag[field] ? this.messageBag[field] : fallback ? fallback : null;
    }
    /**
     * Get first Error for field.
     * @param field {String}
     * @param fallback {*}
     * @return {String|null}
     */

  }, {
    key: "first",
    value: function first() {
      var field = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
      var fallback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      return this.messageBag[field] ? this.messageBag[field][0] : fallback ? fallback : null;
    }
    /**
     * Has Errors in fields.
     * @param fields {Array}
     * @return {Boolean}
     */

  }, {
    key: "hasAny",
    value: function hasAny(fields) {
      var _this = this;

      var hasErrors = false;
      fields.some(function (field) {
        return hasErrors = _this.has(field);
      });
      return hasErrors;
    }
    /**
     * Get All Errors.
     * @return {Object}
     */

  }, {
    key: "all",
    value: function all() {
      return this.messageBag;
    }
  }, {
    key: "firstEntry",
    get: function get() {
      var errors = Object.values(this.messageBag).flat(2);
      return errors.length > 0 ? errors[0] : null;
    }
    /**
     * In Invalid.
     * @return {boolean}
     */

  }, {
    key: "isInvalid",
    get: function get() {
      return Object.entries(this.messageBag).length > 0;
    }
  }]);

  return Validator;
}();

exports["default"] = Validator;
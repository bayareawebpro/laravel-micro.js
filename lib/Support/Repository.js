"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Repository =
/*#__PURE__*/
function () {
  /**
   * Repository Constructor
   * @param data {Object}
   */
  function Repository() {
    var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, Repository);

    this._data = data;
  }
  /**
   * Make New Instance
   * @param data
   * @return {Repository}
   */


  _createClass(Repository, [{
    key: "make",
    value: function make() {
      var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      return new Repository(data);
    }
    /**
     * Increment Value
     * @param dotSyntax {String}
     * @param fallback {Number}
     * @return {Repository}
     */

  }, {
    key: "increment",
    value: function increment(dotSyntax) {
      var fallback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
      var value = this.get(dotSyntax, false) || fallback;
      value++;
      this.set(dotSyntax, value);
      return this;
    }
    /**
     * Decrement Value
     * @param dotSyntax {String}
     * @param fallback {Number}
     * @return {Repository}
     */

  }, {
    key: "decrement",
    value: function decrement(dotSyntax) {
      var fallback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
      var value = this.get(dotSyntax, false) || fallback;
      value--;
      this.set(dotSyntax, value);
      return this;
    }
    /**
     * Update Attributes (allows parsing dotSyntax)
     * @param data {Object}
     * @return {Repository}
     */

  }, {
    key: "update",
    value: function update() {
      var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var state = this.make(Object.assign({}, this._data));
      Object.keys(data || {}).forEach(function (key) {
        return state.set(key, data[key], false);
      });
      this.sync(state.all());
      return this;
    }
    /**
     * Sync Attributes
     * @param data {Object}
     * @return {Repository}
     */

  }, {
    key: "sync",
    value: function sync() {
      var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      this._data = Object.assign({}, data);
      return this;
    }
    /**
     * Merge Object Attributes
     * @param dotSyntax
     * @param objValue {Object}
     * @return {Repository}
     */

  }, {
    key: "merge",
    value: function merge(dotSyntax, objValue) {
      var value = this.get(dotSyntax, {});
      this.set(dotSyntax, Object.assign({}, value, objValue));
      return this;
    }
    /**
     * Find Object within Array and Merge Attributes
     * @param dotSyntax
     * @param prop {String}
     * @param objValue {Object}
     * @return {Repository}
     */

  }, {
    key: "mergeWhere",
    value: function mergeWhere(dotSyntax, prop, objValue) {
      var state = this.get(dotSyntax, []);
      var oldObj = state.find(function (entry) {
        return entry[prop] === objValue[prop];
      });
      state.splice(state.indexOf(oldObj), 1, Object.assign({}, oldObj, objValue));
      this.set(dotSyntax, state);
      return this;
    }
    /**
     * Find Object within Array and Merge Attributes
     * @param dotSyntax
     * @param prop {String}
     * @param value {*}
     * @return {*}
     */

  }, {
    key: "firstWhere",
    value: function firstWhere(dotSyntax, prop, value) {
      var state = this.get(dotSyntax, []);
      return state.find(function (entry) {
        return entry[prop] === value;
      });
    }
    /**
     * Attribute Has Value
     * @param dotSyntax {String}
     * @param value {*}
     * @return {boolean}
     */

  }, {
    key: "hasValue",
    value: function hasValue(dotSyntax, value) {
      return this.get(dotSyntax) === value;
    }
    /**
     * Array or Object Attribute Has Entries
     * @param dotSyntax {String}
     * @return {boolean}
     */

  }, {
    key: "hasEntries",
    value: function hasEntries(dotSyntax) {
      var value = this.get(dotSyntax);

      if (value) {
        if (Array.isArray(value)) {
          return value.length > 0;
        }

        if (_typeof(value) === 'object') {
          return Object.keys(value).length > 0;
        }
      }

      return false;
    }
    /**
     * Get Attribute Value
     * @param dotSyntax {String}
     * @param fallback {*}
     * @return {*}
     */

  }, {
    key: "get",
    value: function get(dotSyntax) {
      var fallback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

      if (!dotSyntax.includes('.')) {
        return this._data.hasOwnProperty(dotSyntax) ? this._data[dotSyntax] : fallback;
      }

      var target = this._data;
      dotSyntax.split('.').every(function (key) {
        return target = target.hasOwnProperty(key) ? target[key] : undefined;
      }, this._data);
      return _typeof(target) === undefined ? fallback : target;
    }
    /**
     * Set Attribute Value
     * @param dotSyntax {String}
     * @param value {*}
     * @param fallback {Object|Array}
     * @return {Repository}
     */

  }, {
    key: "set",
    value: function set(dotSyntax, value) {
      var fallback = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

      if (!dotSyntax.includes('.')) {
        this._data[dotSyntax] = value;
      } else {
        var target = this._data;
        var keys = dotSyntax.split('.');
        var depth = keys.length - 1;
        var parentKey = keys[0];
        var parent = target;
        keys.every(function (key, idx, arr) {
          // Assign the target as a found key or new object.
          if (idx < depth) {
            parent = target;
            parentKey = key;
            return target = target[key] || (target[key] = {});
          } //Delete the target key & cleanup the parent if it's an array.
          else if (typeof value === 'undefined') {
              target[key] = null;
              delete target[key];

              if (Array.isArray(target)) {
                parent[parentKey] = target.filter(function (item) {
                  return item;
                });
              } // Update the property.

            } else {
              target[key] = value;
            }

          return false;
        }, this._data);
      }

      this._data = Object.assign({}, this._data);
      return this;
    }
    /**
     * Append Value to Array Attribute
     * @param dotSyntax {String}
     * @param value {*}
     * @return {Repository}
     */

  }, {
    key: "append",
    value: function append(dotSyntax, value) {
      if (this.has(dotSyntax)) {
        this.get(dotSyntax).push(value);
      } else {
        this.set(dotSyntax, [value]);
      }

      return this;
    }
    /**
     * Prepend Value to Array Attribute
     * @param dotSyntax {String}
     * @param value {*}
     * @return {Repository}
     */

  }, {
    key: "prepend",
    value: function prepend(dotSyntax, value) {
      var arrayVal = this.get(dotSyntax, []);
      arrayVal.unshift(value);
      this.set(dotSyntax, arrayVal);
      return this;
    }
    /**
     * Has Attribute
     * @param dotSyntax {String}
     * @return {Boolean}
     */

  }, {
    key: "has",
    value: function has(dotSyntax) {
      var split = dotSyntax.split('.');

      if (split.length > 1) {
        var last = split.pop();
        return this.get(split.join('.'), {}).hasOwnProperty(last);
      }

      return this._data.hasOwnProperty(dotSyntax);
    }
    /**
     * Attribute Value Exists
     * @param dotSyntax {String}
     * @return {boolean}
     */

  }, {
    key: "exists",
    value: function exists(dotSyntax) {
      return ![undefined, null, ''].includes(this.get(dotSyntax));
    }
    /**
     * Put Attribute Value (Alias of Set)
     * @param dotSyntax {String}
     * @param value {*}
     * @return {Repository}
     */

  }, {
    key: "put",
    value: function put(dotSyntax, value) {
      this.set(dotSyntax, value);
      return this;
    }
    /**
     * Pull (Get/Remove) Attribute & Value
     * @param dotSyntax {String}
     * @param fallback {*}
     * @return {*}
     */

  }, {
    key: "pull",
    value: function pull(dotSyntax) {
      var fallback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      var value = this.get(dotSyntax, fallback);
      this.forget(dotSyntax);
      return value;
    }
    /**
     * Reject Entry from Array Attribute
     * @param dotSyntax {String}
     * @param item {*}
     * @return {Repository}
     */

  }, {
    key: "reject",
    value: function reject(dotSyntax, item) {
      var entries = this.get(dotSyntax, []);
      entries.splice(entries.findIndex(function (entry) {
        return entry === item;
      }), 1);
      this.set(dotSyntax, entries);
      return this;
    }
    /**
     * Reject Entry from Array Attribute
     * @param dotSyntax {String}
     * @param prop {String}
     * @param value {*}
     * @return {Repository}
     */

  }, {
    key: "rejectWhere",
    value: function rejectWhere(dotSyntax, prop, value) {
      var entries = this.get(dotSyntax, []);
      entries.splice(entries.findIndex(function (entry) {
        return entry[prop] === value;
      }), 1);
      this.set(dotSyntax, entries);
      return this;
    }
    /**
     * Forget Attribute
     * @param dotSyntax {String}
     * @return {Repository}
     */

  }, {
    key: "forget",
    value: function forget(dotSyntax) {
      this.set(dotSyntax, undefined);
      return this;
    }
    /**
     * All Attributes
     * @return {Object}
     */

  }, {
    key: "all",
    value: function all() {
      return this._data;
    }
  }]);

  return Repository;
}();

exports["default"] = Repository;
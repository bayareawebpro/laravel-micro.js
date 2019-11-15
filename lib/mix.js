"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var mix = require('laravel-mix');

var MicroMix =
/*#__PURE__*/
function () {
  function MicroMix() {
    _classCallCheck(this, MicroMix);
  }

  _createClass(MicroMix, [{
    key: "register",
    value: function register(val) {
      console.log('mix.micro!');
    }
  }, {
    key: "dependencies",
    value: function dependencies() {}
  }, {
    key: "webpackRules",
    value: function webpackRules() {
      return {
        test: /\.js?$/,
        include: [path.resolve(__dirname, "node_modules/laravel-micro.js")],
        use: [{
          loader: 'babel-loader',
          options: mix.config.babel()
        }]
      };
    }
  }, {
    key: "webpackPlugins",
    value: function webpackPlugins() {}
  }]);

  return MicroMix;
}();

mix.extend('micro', new MicroMix());
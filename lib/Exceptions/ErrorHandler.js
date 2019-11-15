"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var ErrorHandler =
/*#__PURE__*/
function () {
  /**
   * Exception Handler Class
   * @param App {App}
   */
  function ErrorHandler(App) {
    _classCallCheck(this, ErrorHandler);

    this.app = App;
  }
  /**
   * Exception Handle Method
   * @param error {Error|Exception}
   */


  _createClass(ErrorHandler, [{
    key: "handle",
    value: function handle(error) {
      if (typeof error.handle === 'function') {
        try {
          return error.handle(this.app);
        } catch (e) {
          console.error(e);
        }
      }
    }
  }]);

  return ErrorHandler;
}();

exports["default"] = ErrorHandler;
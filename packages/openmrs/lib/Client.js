"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.req = req;

var _request = _interopRequireDefault(require("request"));

var _Utils = require("./Utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function req(method, params) {
  var url = params.url,
      headers = params.headers,
      body = params.body,
      formData = params.formData,
      auth = params.auth,
      query = params.query,
      options = params.options,
      rest = params.rest;
  return new Promise(function (resolve, reject) {
    var j = _request["default"].jar();

    (0, _request["default"])(_objectSpread({
      url: url,
      headers: headers,
      auth: auth,
      qs: query,
      method: method,
      json: body,
      formData: formData,
      jar: j,
      options: options
    }, rest), function (error, response, body) {
      error = (0, _Utils.assembleError)({
        error: error,
        response: response,
        params: params
      });

      if (error) {
        reject(error);
      } else {
        console.log("\u2713 ".concat(method, " succeeded."));
        console.log("Server responded with: \n".concat(JSON.stringify(response, null, 2)));
        var resp = (0, _Utils.tryJson)(body);

        if (rest.keepCookie) {
          var __cookie = j.getCookieString(url);

          resolve(_objectSpread({
            __cookie: __cookie,
            __headers: response.headers
          }, resp));
        } else {
          resolve(resp);
        }
      }
    });
  });
}
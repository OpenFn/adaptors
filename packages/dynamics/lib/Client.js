'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.clientPost = clientPost;
exports.getThenPost = getThenPost;

var _request = require('request');

var _request2 = _interopRequireDefault(_request);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function clientPost(_ref) {
  var username = _ref.username;
  var password = _ref.password;
  var body = _ref.body;
  var url = _ref.url;

  return new Promise(function (resolve, reject) {
    _request2.default.post({
      url: url,
      json: body
    }, function (error, response, body) {
      if (error) {
        reject(error);
      } else {
        console.log("POST succeeded.");
        resolve(body);
      }
    });
  });
}

function getThenPost(_ref2) {
  var username = _ref2.username;
  var password = _ref2.password;
  var query = _ref2.query;
  var url = _ref2.url;
  var sendImmediately = _ref2.sendImmediately;
  var postUrl = _ref2.postUrl;


  function assembleError(_ref3) {
    var response = _ref3.response;
    var error = _ref3.error;

    if (response && [200, 201, 202].indexOf(response.statusCode) > -1) return false;
    if (error) return error;
    return new Error('Server responded with ' + response.statusCode);
  }

  return new Promise(function (resolve, reject) {

    (0, _request2.default)({
      url: url, //URL to hit
      qs: query, //Query string data
      method: 'GET', //Specify the method
      'auth': {
        'user': username,
        'pass': password,
        'sendImmediately': sendImmediately
      }
    }, function (error, response, getResponseBody) {
      error = assembleError({ error: error, response: response });
      if (error) {
        console.error("GET failed.");
        console.log(response);
        reject(error);
      } else {
        console.log("GET succeeded.");
        console.log(response);
        console.log(getResponseBody);
        _request2.default.post({
          url: postUrl,
          json: JSON.parse(getResponseBody)
        }, function (error, response, postResponseBody) {
          error = assembleError({ error: error, response: response });
          if (error) {
            console.error("POST failed.");
            reject(error);
          } else {
            console.log("POST succeeded.");
            resolve(getResponseBody);
          }
        });
      }
    });
  });
}

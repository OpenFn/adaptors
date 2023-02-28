'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.del = exports.patch = exports.put = exports.post = exports.get = exports.lastReferenceValue = exports.dataValue = exports.dataPath = exports.merge = exports.each = exports.alterState = exports.sourceValue = exports.fields = exports.field = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.execute = execute;
exports.parse = parse;

var _languageCommon = require('language-common');

Object.defineProperty(exports, 'field', {
  enumerable: true,
  get: function get() {
    return _languageCommon.field;
  }
});
Object.defineProperty(exports, 'fields', {
  enumerable: true,
  get: function get() {
    return _languageCommon.fields;
  }
});
Object.defineProperty(exports, 'sourceValue', {
  enumerable: true,
  get: function get() {
    return _languageCommon.sourceValue;
  }
});
Object.defineProperty(exports, 'alterState', {
  enumerable: true,
  get: function get() {
    return _languageCommon.alterState;
  }
});
Object.defineProperty(exports, 'each', {
  enumerable: true,
  get: function get() {
    return _languageCommon.each;
  }
});
Object.defineProperty(exports, 'merge', {
  enumerable: true,
  get: function get() {
    return _languageCommon.merge;
  }
});
Object.defineProperty(exports, 'dataPath', {
  enumerable: true,
  get: function get() {
    return _languageCommon.dataPath;
  }
});
Object.defineProperty(exports, 'dataValue', {
  enumerable: true,
  get: function get() {
    return _languageCommon.dataValue;
  }
});
Object.defineProperty(exports, 'lastReferenceValue', {
  enumerable: true,
  get: function get() {
    return _languageCommon.lastReferenceValue;
  }
});

var _languageHttp = require('language-http');

Object.defineProperty(exports, 'get', {
  enumerable: true,
  get: function get() {
    return _languageHttp.get;
  }
});
Object.defineProperty(exports, 'post', {
  enumerable: true,
  get: function get() {
    return _languageHttp.post;
  }
});
Object.defineProperty(exports, 'put', {
  enumerable: true,
  get: function get() {
    return _languageHttp.put;
  }
});
Object.defineProperty(exports, 'patch', {
  enumerable: true,
  get: function get() {
    return _languageHttp.patch;
  }
});
Object.defineProperty(exports, 'del', {
  enumerable: true,
  get: function get() {
    return _languageHttp.del;
  }
});

var _request = require('request');

var _request2 = _interopRequireDefault(_request);

var _cheerio = require('cheerio');

var _cheerio2 = _interopRequireDefault(_cheerio);

var _cheerioTableparser = require('cheerio-tableparser');

var _cheerioTableparser2 = _interopRequireDefault(_cheerioTableparser);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/** @module Adaptor */

/**
 * Execute a sequence of operations.
 * Wraps `language-common/execute`, and prepends initial state for http.
 * @example
 * execute(
 *   create('foo'),
 *   delete('bar')
 * )(state)
 * @constructor
 * @param {Operations} operations - Operations to be performed.
 * @returns {Operation}
 */
function execute() {
  for (var _len = arguments.length, operations = Array(_len), _key = 0; _key < _len; _key++) {
    operations[_key] = arguments[_key];
  }

  var initialState = {
    references: [],
    data: null
  };

  return function (state) {
    return _languageCommon.execute.apply(undefined, operations)(_extends({}, initialState, state));
  };
}

/**
 * Parse
 * @example
 *   parse(params)
 * @function
 * @param {object} params - data to write to the row
 * @param {function} script - callback function
 * @returns {Operation}
 */
function parse(params, script) {

  return function (state) {

    // function assembleError({ response, error }) {
    //   if (response && ([200,201,202].indexOf(response.statusCode) > -1)) return false;
    //   if (error) return error;
    //   return new Error(`Server responded with ${response.statusCode}`)
    // }

    var _expandReferences = (0, _languageCommon.expandReferences)(params)(state),
        body = _expandReferences.body;

    var $ = _cheerio2.default.load(body);
    (0, _cheerioTableparser2.default)($);

    if (script) {
      var result = script($);
      try {
        var r = JSON.parse(result);
        return (0, _languageCommon.composeNextState)(state, r);
      } catch (e) {
        return (0, _languageCommon.composeNextState)(state, { body: result });
      }
    } else {
      return (0, _languageCommon.composeNextState)(state, { body: body });
    }
  };
}

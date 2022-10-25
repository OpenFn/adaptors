"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.expandRequestReferences = expandRequestReferences;
exports.get = get;
exports.post = post;
exports.head = head;
exports.put = put;
exports.patch = patch;
exports.options = options;

var _ = require("../");

var _axios = _interopRequireDefault(require("axios"));

var _https = _interopRequireDefault(require("https"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.axios = _axios.default;
/**
 * Recursively resolves objects that have resolvable values (functions), but
 * omits HTTP request specific modules like `FormData`.
 * @public
 * @function
 * @param {object} value - data
 * @returns {<Operation>}
 */

function expandRequestReferences(params) {
  const [toKeep, toExpand] = (0, _.splitKeys)(params || {}, ['agentOptions', 'body', 'data', 'form', 'formData', 'headers', 'options', 'params', 'url']);

  const skipFormData = value => {
    var _value$data;

    // NOTE: no expansion is possible on a `FormData` module w/ streams.
    if (typeof value == 'object' && value !== null && value !== void 0 && (_value$data = value.data) !== null && _value$data !== void 0 && _value$data._streams) return true;
  };

  return state => {
    const expandedParams = (0, _.expandReferences)(toExpand, skipFormData)(state);
    const safelyExpandedParams = { ...toKeep,
      ...expandedParams
    };
    return safelyExpandedParams;
  };
}
/**
 * Creates an https agent for axios from the agentOptions key passed in params.
 * @function
 * @param {object} params - data
 * @returns {<Operation>}
 */


function withAgent(params) {
  const {
    agentOptions
  } = params;
  return { ...params,
    httpsAgent: agentOptions && new _https.default.Agent(agentOptions)
  };
}
/**
 * Make a GET request
 * @public
 * @function
 * @param {object} requestParams - Supports the exact parameters as Axios. See {@link https://github.com/axios/axios#axios-api here}
 * @returns {Operation} - Function which takes state and returns a Promise
 * @example <caption>Get an item with a specified id from state</caption>
 *  get({
 *      url: state => `https://www.example.com/api/items/${state.id},
 *      headers: {"content-type": "application/json"}
 * });
 */


function get(requestParams) {
  return state => {
    const params = expandRequestReferences(requestParams)(state);
    return (0, _axios.default)({
      method: 'get',
      ...withAgent(params)
    });
  };
}
/**
 * Make a POST request
 * @public
 * @function
 * @param {object} requestParams - Supports the exact parameters as Axios. See {@link https://github.com/axios/axios#axios-api here}
 * @example <caption>Sending a payload with data that comes from state</caption>
 * post({
 *   url: "https://example.com",
 *   data: (state) => state.data
 * });
 * @example <caption> Capturing the response for later use in state </caption>
 * alterState((state) => {
 *   return post({
 *     url: "https://example.com",
 *     data: (state) => state.data
 *   })(state).then(({response}) => {
 *    state.responseData = response.data
 *   })
 * });
 * @returns {Operation} - Function which takes state and returns a Promise
 */


function post(requestParams) {
  return state => {
    const params = expandRequestReferences(requestParams)(state);
    return (0, _axios.default)({
      method: 'post',
      ...withAgent(params)
    });
  };
}
/**
 * Make a DELETE request
 * @public
 * @function
 * @param {object} requestParams - Supports the exact parameters as Axios. See {@link https://github.com/axios/axios#axios-api here}
 * @example <caption>Deleting a record with data that comes from state</caption>
 * delete({
 *    url: state => `https://www.example.com/api/items/${state.id}`,
 *  })(state);
 * @returns {Operation} - Function which takes state and returns a Promise
 */


function del(requestParams) {
  return state => {
    const params = expandRequestReferences(requestParams)(state);
    return (0, _axios.default)({
      method: 'delete',
      ...withAgent(params)
    });
  };
}

exports.delete = del;
/**
 * Make a HEAD request
 * @public
 * @function
 * @param {object} requestParams - Supports the exact parameters as Axios. See {@link https://github.com/axios/axios#axios-api here}
 * @example <caption>Gets the headers that would be returned if the HEAD request's URL was instead requested with the HTTP GET method</caption>
 * head({
 *   url: 'https://www.example.com/api/items',
 * });
 * @returns {Operation} - Function which takes state and returns a Promise
 */

function head(requestParams) {
  return state => {
    const params = expandRequestReferences(requestParams)(state);
    return (0, _axios.default)({
      method: 'head',
      ...withAgent(params)
    });
  };
}
/**
 * Make a PUT request
 * @public
 * @function
 * @param {object} requestParams - Supports the exact parameters as Axios. See {@link https://github.com/axios/axios#axios-api here}
 * @example <caption>Creates a new resource or replaces a representation of the target resource with the request payload, with data from state.</caption>
 * put({
 *   url: state => `https://www.example.com/api/items/${state.id}`,
 *   data: state => state.data
 * });
 * @returns {Operation} - Function which takes state and returns a Promise
 */


function put(requestParams) {
  return state => {
    const params = expandRequestReferences(requestParams)(state);
    return (0, _axios.default)({
      method: 'put',
      ...withAgent(params)
    });
  };
}
/**
 * Make a PATCH request
 * @public
 * @function
 * @param {object} requestParams - Supports the exact parameters as Axios. See {@link https://github.com/axios/axios#axios-api here}
 * @example <caption>Applies partial modifications to a resource, with data from state.</caption>
 * patch({
 *   url: state => `https://www.example.com/api/items/${state.id}`,
 *   data: state => state.data
 * });
 * @returns {Operation} - Function which takes state and returns a Promise
 */


function patch(requestParams) {
  return state => {
    const params = expandRequestReferences(requestParams)(state);
    return (0, _axios.default)({
      method: 'patch',
      ...withAgent(params)
    });
  };
}
/**
 * Make a OPTIONS request
 * @public
 * @function
 * @param {object} requestParams - Supports the exact parameters as Axios. See {@link https://github.com/axios/axios#axios-api here}
 * @example <caption>Requests permitted communication options for a given URL or server, with data from state.</caption>
 * options({
 *   url: 'https://www.example.com/api/items',
 * });
 * @returns {Operation} - Function which takes state and returns a Promise
 */


function options(requestParams) {
  return state => {
    const params = expandRequestReferences(requestParams)(state);
    return (0, _axios.default)({
      method: 'options',
      ...withAgent(params)
    });
  };
}
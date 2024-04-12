/**
 * === DEPRECATION NOTICE ===
 *
 * These common HTTP utils have been deprecated in favour of the new functions in util/http.js
 *
 * To ease migration onto the new APIs, these functions will be left in place and will continue to work.
 *
 * ===========================
 */

import { expandReferences, splitKeys } from './Adaptor';
import axios from 'axios';
import https from 'https';

export { axios };

const printDeprecationNotice = name => {
  if (process.env.NODE_ENV !== 'production') {
    console.warn(
      `The common.http.${name} function has been deprecated. This adaptor should migrate to use common.util.http instead.`
    );
  }
};

/**
 * Recursively resolves objects that have resolvable values (functions), but
 * omits HTTP request specific modules like `FormData`.
 * @public
 * @function
 * @param {object} value - data
 * @returns {Operation}
 */
export function expandRequestReferences(params) {
  const [toKeep, toExpand] = splitKeys(params || {}, [
    'agentOptions',
    'body',
    'json',
    'data',
    'form',
    'formData',
    'headers',
    'options',
    'params',
    'url',
  ]);

  const skipFormData = value => {
    // NOTE: no expansion is possible on a `FormData` module w/ streams.
    if (typeof value == 'object' && value?.data?._streams) return true;
  };

  return state => {
    const expandedParams = expandReferences(toExpand, skipFormData)(state);
    const safelyExpandedParams = { ...toKeep, ...expandedParams };

    return safelyExpandedParams;
  };
}

/**
 * Creates an https agent for axios from the agentOptions key passed in params.
 * @function
 * @param {object} params - data
 * @returns {Operation}
 */
function withAgent(params) {
  const { agentOptions } = params;
  return {
    ...params,
    httpsAgent: agentOptions && new https.Agent(agentOptions),
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
export function get(requestParams) {
  return state => {
    printDeprecationNotice('get');
    const params = expandRequestReferences(requestParams)(state);

    return axios({ method: 'get', ...withAgent(params) });
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
export function post(requestParams) {
  return state => {
    printDeprecationNotice('post');
    const params = expandRequestReferences(requestParams)(state);

    return axios({ method: 'post', ...withAgent(params) });
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
    printDeprecationNotice('del');
    const params = expandRequestReferences(requestParams)(state);

    return axios({ method: 'delete', ...withAgent(params) });
  };
}

export { del as delete };

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
export function head(requestParams) {
  return state => {
    printDeprecationNotice('head');
    const params = expandRequestReferences(requestParams)(state);

    return axios({ method: 'head', ...withAgent(params) });
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
export function put(requestParams) {
  return state => {
    printDeprecationNotice('put');
    const params = expandRequestReferences(requestParams)(state);

    return axios({ method: 'put', ...withAgent(params) });
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
export function patch(requestParams) {
  return state => {
    printDeprecationNotice('patch');
    const params = expandRequestReferences(requestParams)(state);

    return axios({ method: 'patch', ...withAgent(params) });
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
export function options(requestParams) {
  return state => {
    printDeprecationNotice('options');
    const params = expandRequestReferences(requestParams)(state);

    return axios({ method: 'options', ...withAgent(params) });
  };
}

import { expandReferences } from '@openfn/language-common/util';
import * as util from './Utils.js';

/**
 * State object
 * @typedef {Object} EsignetState
 * @property data - the parsed response body
 * @property response - the response from the eSignet server, including headers, statusCode, body, etc
 * @property references - an array of all previous data objects used in the Job
 **/

/**
 * Options provided to the HTTP request
 * @typedef {Object} RequestOptions
 * @public
 * @property {object|string} body - body data to append to the request.
 * @property {object} errors - Map of errorCodes -> error messages, ie, `{ 404: 'Resource not found;' }`. Pass `false` to suppress errors for this code.
 * @property {object} query - An object of query parameters to be encoded into the URL.
 * @property {object} headers - An object of headers to append to the request.
 * @property {string} parseAs - Parse the response body as json, text or stream. By default will use the response headers.
 * @property {number} timeout - Request timeout in ms. Default: 300 seconds.
 * @property {object} tls - TLS/SSL authentication options.
 */

/**
 * Fetch citizen identity data from the eSignet UserInfo endpoint.
 *
 * This calls `GET /v1/esignet/oidc/userinfo` using the access token
 * obtained after the citizen approved data sharing via eSignet.
 *
 * The claims returned depend on what scopes and claims were requested
 * during registration and what the citizen consented to.
 * @example <caption>Fetch all approved user claims</caption>
 * getUserInfo();
 * @example <caption>Fetch user info and log the name</caption>
 * getUserInfo();
 * fn(state => {
 *   console.log(state.data.name);
 *   return state;
 * });
 * @function
 * @public
 * @param {RequestOptions} [options] - Optional request options
 * @returns {Operation}
 * @state {EsignetState}
 * @state data - citizen claims (name, gender, birthdate, email, phone_number, etc.)
 */
export function getUserInfo(options = {}) {
  return async state => {
    const [resolvedOptions] = expandReferences(state, options);

    const response = await util.request(
      state.configuration,
      'GET',
      'v1/esignet/oidc/userinfo',
      resolvedOptions
    );

    return util.prepareNextState(state, response);
  };
}

/**
 * Make a GET request to the eSignet server
 * @example
 * get("v1/esignet/oidc/userinfo");
 * @function
 * @public
 * @param {string} path - Path to resource
 * @param {RequestOptions} [options] - Optional request options
 * @returns {Operation}
 * @state {EsignetState}
 */
export function get(path, options) {
  return request('GET', path, null, options);
}

/**
 * Make a POST request to the eSignet server
 * @example
 * post("v1/esignet/linked-authorization/authenticate", { "challengeList": [] });
 * @function
 * @public
 * @param {string} path - Path to resource
 * @param {object} body - Object which will be attached to the POST body
 * @param {RequestOptions} [options] - Optional request options
 * @returns {Operation}
 * @state {EsignetState}
 */
export function post(path, body, options) {
  return request('POST', path, body, options);
}

/**
 * Make a general HTTP request to the eSignet server
 * @example
 * request("GET", "v1/esignet/oidc/userinfo");
 * @function
 * @public
 * @param {string} method - HTTP method to use
 * @param {string} path - Path to resource
 * @param {object} body - Object which will be attached to the request body
 * @param {RequestOptions} [options] - Optional request options
 * @returns {Operation}
 * @state {EsignetState}
 */
export function request(method, path, body, options = {}) {
  return async state => {
    const [resolvedMethod, resolvedPath, resolvedBody, resolvedOptions] =
      expandReferences(state, method, path, body, options);

    const response = await util.request(
      state.configuration,
      resolvedMethod,
      resolvedPath,
      {
        body: resolvedBody,
        ...resolvedOptions,
      }
    );

    return util.prepareNextState(state, response);
  };
}

export {
  as,
  combine,
  cursor,
  dataPath,
  dataValue,
  dateFns,
  each,
  field,
  fields,
  fn,
  fnIf,
  group,
  lastReferenceValue,
  map,
  merge,
  scrubEmojis,
  sourceValue,
  util,
} from '@openfn/language-common';

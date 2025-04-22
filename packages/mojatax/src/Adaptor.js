import { expandReferences } from '@openfn/language-common/util';
import * as util from './Utils';
import { execute as commonExecute } from '@openfn/language-common';

/**
 * State object
 * @typedef {Object} MojataxHttpState
 * @property data - The response body (as JSON)
 * @property response - The HTTP response from the Mojatax server (excluding the body)
 * @property references - An array of all previous data objects used in the Job
 * @private
 **/

/**
 * Options provided to Mojatax HTTP request
 * @typedef {Object} MojataxRequestOptions
 * @public
 * @property {object|string} body - body data to append to the request. JSON will be converted to a string (but a content-type header will not be attached to the request).
 * @property {object} errors - Map of errorCodes -> error messages, ie, `{ 404: 'Resource not found;' }`. Pass `false` to suppress errors for this code.
 * @property {object} query - An object of query parameters to be encoded into the URL.
 * @property {object} headers - An object of headers to append to the request.
 * @property {string} parseAs - Parse the response body as json, text or stream. By default will use the response headers.
 * @property {number} timeout - Request timeout in ms. Default: 300 seconds.
 * @property {object} tls - TLS/SSL authentication options. See https://nodejs.org/api/tls.html#tlscreatesecurecontextoptions
 */

/**
 * Execute a sequence of operations.
 * Wraps `language-common/execute` to make working with this API easier.
 * @example
 * execute(
 *   create('foo'),
 *   delete('bar')
 * )(state)
 * @private
 * @param {Operations} operations - Operations to be performed.
 * @returns {Operation}
 */
export function execute(...operations) {
  const initialState = {
    references: [],
    data: null,
  };

  return state => {
    return commonExecute(
      util.authorize,
      ...operations
    )({
      ...initialState,
      ...state,
    });
  };
}

/**
 * Make a POST request to any Mojatax endpoint.
 * @example <caption>Make a POST request to create an invoice</caption>
 * post("CreateInvoice", {
 * invoice_id: 'PID092',
 * customerId: '102',
 * items: [],
 * });
 * @function
 * @public
 * @param {string} path - Path to resource
 * @param {object} data - Object which will be attached to the request body
 * @param {MojataxRequestOptions} options - Optional request options
 * @param {function} [callback] - Optional callback to handle the response
 * @returns {Operation}
 * @state {MojataxHttpState}
 */
export function post(path, data, options, callback) {
  return request('POST', `/client/${path}`, data, options, callback);
}

/**
 * Make a general HTTP request against the Mojatax server.
 * @example <caption>Make a POST request to create an invoice</caption>
 * request("POST", "/client/CreateInvoice", {
 * invoice_id: 'PID092',
 * customerId: '102',
 * items: [],
 * });
 * @function
 * @public
 * @param {string} method - HTTP method to use
 * @param {string} path - Path to resource
 * @param {object} data - Object which will be attached to the POST body
 * @param {MojataxRequestOptions} options - Optional request options
 * @param {function} [callback] - Optional callback to handle the response
 * @returns {Operation}
 * @state {MojataxHttpState}
 */
export function request(method, path, body, options = {}, callback = s => s) {
  return async state => {
    const [resolvedMethod, resolvedPath, resolvedData, resolvedoptions] =
      expandReferences(state, method, path, body, options);
    const response = await util.request(
      state.configuration,
      resolvedMethod,
      resolvedPath,
      {
        data: resolvedData,
        ...resolvedoptions,
      }
    );

    return util.prepareNextState(state, response, callback);
  };
}

export {
  dataPath,
  dataValue,
  dateFns,
  cursor,
  each,
  field,
  fields,
  fn,
  lastReferenceValue,
  merge,
  sourceValue,
} from '@openfn/language-common';

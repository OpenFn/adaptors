import { expandReferences } from '@openfn/language-common/util';
import * as util from './Utils.js';

/**
 * State object
 * @typedef {Object} HttpState
 * @property data - the parsed response body
 * @property response - the response from the HTTP server, including headers, statusCode, body, etc
 * @property references - an array of all previous data objects used in the Job
 **/

/**
 * Options provided to the HTTP request
 * @typedef {Object} RequestOptions
 * @public
 * @property {object|string} body - body data to append to the request. JSON will be converted to a string (but a content-type header will not be attached to the request).
 * @property {object} errors - Map of errorCodes -> error messages, ie, `{ 404: 'Resource not found;' }`. Pass `false` to suppress errors for this code.
 * @property {object} form - Pass a JSON object to be serialised into a multipart HTML form (as FormData) in the body.
 * @property {object} query - An object of query parameters to be encoded into the URL.
 * @property {object} headers - An object of headers to append to the request.
 * @property {string} parseAs - Parse the response body as json, text or stream. By default will use the response headers.
 * @property {number} timeout - Request timeout in ms. Default: 300 seconds.
 * @property {object} tls - TLS/SSL authentication options. See https://nodejs.org/api/tls.html#tlscreatesecurecontextoptions
 */

/**
 * Make an unsigned GET request
 * @example
 * get("ping");
 * @function
 * @public
 * @param {string} path - Path to resource
 * @param {RequestOptions} options - Optional request options
 * @returns {Operation}
 * @state {HttpState}
 */
export function get(path, options) {
  return request('GET', path, null, options);
}

/**
 * Make a signed POST request. See `request` for how the body is signed.
 * @example
 * post("partner/data_scopes", { header: { action: "data_scopes" }, message: {} });
 * @function
 * @public
 * @param {string} path - Path to resource
 * @param {object} body - Object which will be attached to the POST body
 * @param {RequestOptions} options - Optional request options
 * @returns {Operation}
 * @state {HttpState}
 */
export function post(path, body, options) {
  return request('POST', path, body, options);
}

/**
 * Make a signed HTTP request to an OpenG2P Registry partner API.
 * Any object body is signed with `configuration.privateKey`: a detached JWS
 * over the compact, key-sorted JSON of the body (excluding `signature`) is
 * added as `body.signature`. If the body has a `header`, `sender_id` defaults
 * to `configuration.senderId`.
 * @example <caption>Search the registry by identifier</caption>
 * request("POST", "dci/sync/search", {
 *   header: {
 *     version: "1.0.0",
 *     message_id: "msg-001",
 *     message_ts: new Date().toISOString(),
 *     action: "search",
 *     receiver_id: "openg2p-registry",
 *   },
 *   message: {
 *     transaction_id: "txn-001",
 *     search_request: [
 *       {
 *         reference_id: "ref-001",
 *         search_criteria: {
 *           reg_type: "SOCIAL_REGISTRY",
 *           reg_record_type: "PERSON",
 *           query_type: "idtype-value",
 *           query: { type: "NATIONAL_ID", value: "1234567890" },
 *         },
 *       },
 *     ],
 *   },
 * });
 * @function
 * @public
 * @param {string} method - HTTP method to use
 * @param {string} path - Path to resource
 * @param {object} body - Object which will be attached to the POST body
 * @param {RequestOptions} options - Optional request options
 * @returns {Operation}
 * @state {HttpState}
 */
export function request(method, path, body, options = {}) {
  return async state => {
    const [resolvedMethod, resolvedPath, resolvedBody, resolvedoptions] =
      expandReferences(state, method, path, body, options);

    const response = await util.request(
      state.configuration,
      resolvedMethod,
      resolvedPath,
      {
        body: resolvedBody,
        ...resolvedoptions,
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

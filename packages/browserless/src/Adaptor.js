import { expandReferences } from '@openfn/language-common/util';
import * as util from './Utils.js';
import * as http from './http.js';

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
 * Making a GET request
 * @example
 * get("patients");
 * @function
 * @public
 * @param {string} path 
 * @param {RequestOptions} options
 * @returns {Operation}
 * @state {HttpState}
 */
/**
 * Create a PDF from HTML or URL.
 * Accepts an HTML string or an object `{ html }` / `{ url }`.
 * This operation calls the Browserless `/pdf` endpoint and normalizes PDF
 * responses into `{ pdf: '<base64>' }` by default. To override, call
 * `http.request('POST', 'pdf', { body: {...}, forcePdfBase64: false })`.
 * @public
 * @param {string|object} input - HTML string or `{ html }` / `{ url }` object
 * @param {RequestOptions} options - Optional request options
 * @state {HttpState}
 * @returns {Operation}
 */
export function createPDF(input, options) {
  return async state => {
    const maybeBody = typeof input === 'string' ? { html: input } : input || {};
    const [,, resolvedBody, resolvedOptions] = expandReferences(state, 'POST', 'pdf', maybeBody, options);

    const response = await http.request('POST', 'pdf', { body: resolvedBody, ...(resolvedOptions || {}), forcePdfBase64: true })(state);
   
    return response;
  };
}

export { http };

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

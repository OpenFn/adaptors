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
 */

/**
 * Make a GET request to Ethiopia MFR
 * @example <caption>Get all regions</caption>
 * get('/Location/Regions');
 * @example <caption>Get a facility with id</caption>
 * get('Facility', {
 *   query: {
 *     id: '1071644',
 *   },
 * });
 * @example <caption>Get all facility details with serach options</caption>
 * get('Facility/All', {
 *   query: {
 *     name: '010 Kombolcha Health Post',
 *   },
 * });
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
 * Make a POST request to Ethiopia MFR
 * @example <caption>Retrieve facilities with pagination</caption>
 * post('Facility/GetFacilities', {
 *   pageNumber: 1,
 *   showPerPage: 25,
 * });
 * @example <caption>Retrieve facility details in CSV format</caption>
 * post(
 *   'Facility/ExportCSV',
 *   { name: '010 Kombolcha Health Post' },
 *   { parseAs: 'text' }
 * );
 * @function
 * @public
 * @param {string} path - Path to resource
 * @param {object} body - Object which will be attached to the POST body
 * @param {RequestOptions} options - Optional request options
 * @returns {Operation}
 * @state {HttpState}
 */
export function post(path, body, options) {
  return async state => {
    const [resolvedPath, resolvedBody, resolvedoptions] = expandReferences(
      state,
      path,
      body,
      options
    );

    const results = await util.requestWithPagination(state, {
      resolvedPath,
      resolvedBody,
      resolvedoptions,
    });
    return util.prepareNextState(state, { body: results, response: {} });
  };
}

/**
 * Make a general HTTP request to Ethiopia MFR
 * @example
 * request(
 *   'POST',
 *   'Facility/ExportCSV',
 *   { name: '010 Kombolcha Health Post' },
 *   { parseAs: 'text' }
 * );
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
    const formattedBodyResponse = response?.body?.model
      ? response.body.model
      : response.body;
    return util.prepareNextState(state, {
      ...response,
      body: formattedBodyResponse,
    });
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

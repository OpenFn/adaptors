import { expandReferences } from '@openfn/language-common/util';
import * as util from './Utils.js';
import { execute as commonExecute } from '@openfn/language-common';

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
 * @property {object|string} body - body data to append to the request. JSON will be converted to a string.
 * @property {object} query - An object of query parameters to be encoded into the URL.
 * @property {object} headers - An object of headers to append to the request.
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
      ...operations,
    )({
      ...initialState,
      ...state,
    });
  };
}

/**
 * Make a POST request
 * @example <caption>Update intervention records in PING</caption>
 * post('/api/ingestion/v2/PNR-1363/data', {
 *   "ShippingProcessId": "SHP-2345",
 *   "InteropId": "INT-1234",
 *   "Data": [{
 *     "ExternalId": "id55",
 *     "Fields": [{
 *       "Name": "progres_lpinterventionid",
 *       "Value": "12345-5u3i43f3-3r3f34f-34f34f"
 *     }]
 *   }]
 * });
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
 * Make a general HTTP request
 * @example <caption>Retrieve data with pending interventions from PING</caption>
 * request('POST', 'primes/fetch/paging/v3/retrievedatawithpaging', {
 *   "ShippingProcessId": "SHP-1234",
 *   "PartnerId": "PNR-001",
 *   "InteropID": "INT-1234",
 *   "APIVersion": "V3",
 *   "QueryParameters": []
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
      },
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

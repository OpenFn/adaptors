import {
  execute as commonExecute,
  composeNextState,
} from '@openfn/language-common';
import { expandReferences, post, get } from '@openfn/language-common/util';
import * as util from './Utils';

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
 * Execute a sequence of operations.
 * Wraps `language-common/execute`, and prepends initial state for http.
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
    const shouldAuth =
      state?.configuration?.email && state?.configuration?.password;

    if (shouldAuth) {
      operations.splice(0, 0, login);
    }
    return commonExecute(...operations)({
      ...initialState,
      ...state,
    });
  };
}

/**
 * Logs in to LAMISPlus.
 * @example
 * login(state)
 * @function
 * @private
 * @param {State} state - Runtime state.
 * @returns {State} state - but with a "token" added to the configuration key.
 */
function login(state) {
  const { configuration = {} } = state;
  const { baseUrl, password, email } = configuration;

  const url = `${baseUrl}/core/api/v1/auth/login`;
  const body = {
    email,
    password,
  };
  const headers = {
    'content-type': 'application/json',
  };
  return post(url, body, { headers }).then(response => {
    const auth = { Authorization: `Bearer ${response.body.accessToken}` };
    return { ...state, configuration: { ...configuration, auth } };
  });
}

/**
 * Get Patient resources from LAMISPlus
 * @public
 * @example
 * getPatients()
 * @function
 * @param {string} path - Path to resource
 * @param {object} params - data to create the new resource
 * @returns {Operation}
 */
export function getPatients(params) {
  return async state => {
    const [resolvedParams] = expandReferences(state, params);
    const { baseUrl, auth } = state.configuration;

    const headers = { ...auth };

    let query;
    if (resolvedParams) {
      query = { format: 'json', ...resolvedParams };
    }

    const response = await get('plugin/ehr/api/v1/patient', {
      baseUrl,
      headers,
      query,
    });
    return composeNextState(state, response.body);
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

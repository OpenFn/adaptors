import { execute as commonExecute, composeNextState } from '@openfn/language-common';
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
    const shouldAuth = state?.configuration?.email && state?.configuration?.password && state?.configuration?.baseUrl
    return commonExecute(
      ...(shouldAuth ? [login] : []),
      ...operations,
      ...(shouldAuth ? [cleanupState] : [])
    )({
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
  })
}

/**
 * Get Patient resources from LAMISPlus
 * @public
 * @example
 * getPatients()
 * @function
 * @param {string} path - Path to resource
 * @param {object} params - data to create the new resource
 * @param {function} callback - (Optional) callback function
 * @returns {Operation}
 */
export function getPatients(path, params, callback = s => s) {
  return async state => {
    const [resolvedPath, resolvedParams] = expandReferences(
      state,
      path,
      params
    );
    const { baseUrl, auth } = state.configuration;

    const patientsPath = resolvedPath || 'plugin/ehr/api/v1/patient'

    const url = `${baseUrl}/${patientsPath}`;
    const headers = { ...auth };

    let query;
    if (resolvedParams) {
      query = { format: 'json', ...resolvedParams };
    }

    return get(url, { headers, query }).then(response => {
      const nextState = composeNextState(state, response.body);
      return callback(nextState);
    });
  };
}

/**
 * Make a general HTTP request
 * @example
 * request("POST", "patient", { "name": "Bukayo" });
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

/**
 * Discards the auth token from state.
 * @example
 * cleanupState(state)
 * @function
 * @param {State} state - Runtime state.
 * @returns {State} state - but with a "token" removed from the configuration key.
 */
function cleanupState(state) {
  delete state.configuration.auth;
  return state;
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

import { execute as commonExecute } from '@openfn/language-common';
import { expandReferences } from '@openfn/language-common/util';

import * as util from './Utils';

/**
 * State object
 * @typedef {Object} FHIRHttpState
 * @private
 * @property data - the parsed response body
 * @property response - the response from the FHIR HTTP server (with the body removed)
 * @property references - an array of all the previous data values
 **/

/**
 * Options provided to a HTTP request
 * @typedef {Object} RequestOptions
 * @property {object} headers - Object of headers to append to the request
 * @property {object} body - JSON payload to attach to the request
 * @property {object} query - Query parameters for the request. Will be encoded into the URL
 * @property {object} errors - Map of errorCodes -> error messages, ie, `{ 404: 'Resource not found;' }`. Pass `false` to suppress errors for this code.
 * @property {number} timeout - Request timeout in ms. Default: 300 seconds.
 */

/**
 * Options provided to a GET HTTP request
 * @typedef {Object} GetOptions
 * @property {object} headers - Object of headers to append to the request
 * @property {object} errors - Map of errorCodes -> error messages, ie, `{ 404: 'Resource not found;' }`. Pass `false` to suppress errors for this code.
 * @property {number} timeout - Request timeout in ms. Default: 300 seconds.
 */

/**
 * Execute a sequence of operations.
 * Wraps `language-common/execute`, and prepends initial state for http.
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
    return commonExecute(...operations)({
      ...initialState,
      ...state,
    });
  };
}

/**
 * Send a generic HTTP request to the server
 * @param {string} method - The HTTP method to be used for the request. It defaults to 'GET' if not
 * @param {string} path - The resource path that the request is being made to
 * @param {RequestOptions} [options] - An object containing any additional parameters to be sent with the request, such
 * as query parameters or request body data.
 * @param {function} callback - (Optional) callback function
 * @returns {Operation}
 * @state {FHIRHttpState}
 */
export const request =
  (method, path, options = {}, callback = s => s) =>
  async state => {
    const [resolvedMethod, resolvedPath, resolvedOptions] = expandReferences(
      state,
      method,
      path,
      options
    );

    const response = await util.request(
      state.configuration,
      resolvedMethod,
      resolvedPath,
      resolvedOptions
    );
    return callback(util.prepareNextState(state, response));
  };

/**
 * Send a HTTP POST request
 * @public
 * @function
 * @example <caption>Create bundle</caption>
 * post("Bundle",{
 *   "resourceType": "Bundle"
 * })
 * @param {string} path - Path to resource
 * @param {object} data - JSON data to append to the POST body
 * @param {RequestOptions} options - (Optional) Additional options for the request
 * @param {function} callback - (Optional) callback function
 * @returns {Operation}
 * @state {FHIRHttpState}
 */
export function post(path, data, options = {}, callback = s => s) {
  return request('POST', path, { ...options, body: data }, callback);
}

/**
 * Send a HTTP GET request
 * @public
 * @function
 * @example <caption>Get Patient from FHIR</caption>
 * get('Patient');
 * @example <caption>Get Claim from FHIR with optional query</caption>
 * get("Claim", { _include: "Claim:patient", _sort: "-_lastUpdated", _count: 200 })
 * @param {string} path - Path to resource
 * @param {object} params - (Optional) Parameters to encode into the URL query
 * @param {GetOptions} options - (Optional) Options to control the request
 * @param {function} callback - (Optional) callback function
 * @returns {Operation}
 * @state {FHIRHttpState}
 */
export function get(path, params = {}, options = {}, callback = s => s) {
  return request('GET', path, { ...options, query: params }, callback);
}

/**
 * Creates a resource in a destination system using a POST request
 * @public
 * @function
 * @example
 * create("Patient",{ ... })
 * @param {string} resourceType - The resource type to create
 * @param {object} resource - The resource to create
 * @param {object} params - FHIR parameters to control and configure resource creation
 * @param {function} callback - (Optional) callback function
 * @returns {Operation}
 * @state {FHIRHttpState}
 */
export function create(resourceType, resource, params, callback = s => s) {
  return request(
    'POST',
    resourceType,
    { ...params, body: { ...resource, resourceType } },
    callback
  );
}

/**
 * Creates a transactionBundle for HAPI FHIR
 * @public
 * @example
 * createTransactionBundle([
 *   {
 *     fullUrl: "https://hapi.fhir.org/baseR4/Patient/592442",
 *     resource: {
 *       resourceType: "Patient",
 *       id: "592442",
 *       name: [{ given: "Caleb", family: "Cushing" }],
 *     },
 *     request: {
 *       method: "POST",
 *       url: "Patient",
 *     },
 *   },
 * ]);
 * @function
 * @param {array} entries - array of transactiions
 * @param {object} params - data to create the new transaction
 * @param {function} callback - (Optional) callback function
 * @returns {Operation}
 * @state {FHIRHttpState}
 */
export function createTransactionBundle(entries, params, callback = s => s) {
  return request(
    'POST',
    '/',
    {
      ...params,
      body: {
        resourceType: 'Bundle',
        type: 'transaction',
        entry: entries,
      },
    },
    callback
  );
}

/**
 * Get Claim in a FHIR system
 * @public
 * @function
 * @example
 * getClaim('',{ _include: "Claim:patient", _sort: "-_lastUpdated", _count: 200 });
 * @param {string} claimId - claim id
 * @param {object} params - query parameters
 * @param {function} callback - callback function
 * @returns {Operation}
 * @state {FHIRHttpState}
 */
export function getClaim(claimId, params, callback = s => s) {
  return request(
    'GET',
    claimId ? `Claim/${claimId}` : 'Claim',
    { query: params },
    callback
  );
}

export {
  alterState,
  dataPath,
  dataValue,
  dateFns,
  each,
  field,
  fields,
  fn,
  fnIf,
  lastReferenceValue,
  merge,
  sourceValue,
} from '@openfn/language-common';

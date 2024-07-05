import { execute as commonExecute } from '@openfn/language-common';
import { expandReferences } from '@openfn/language-common/util';

import { handleResponse, request } from './Utils';

/**
 * Options provided to a HTTP request
 * @typedef {Object} RequestParams
 * @property {boolean} [throwOnError=true] - Optional boolean value to throw if the error is status code 400.
 * @property {object} headers - An optional object of headers to append to the request.
 * @property {string} parseAs - An optional field of the data response format.
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
 * Sends a HTTP POST request  to the destination system
 * @public
 * @example
 * post("Bundle",{
 * "resourceType": "Bundle"
 * })
 * @function
 * @param {string} path - Path to resource
 * @param {object} data - Object or JSON which defines data that will be used to create a given resource
 * @param {RequestParams} params - Contains optional headers, parseAs, and throwOnError
 * @param {function} callback - (Optional) callback function
 * @returns {Operation}
 */
export function post(path, data, params, callback) {
  return state => {
    const [resolvedpath, resolvedData, resolvedParams] = expandReferences(
      state,
      path,
      data,
      params
    );
    const { baseUrl, apiPath } = state.configuration;

    const url = `${baseUrl}/${apiPath}/${resolvedpath}`;

    const headers = {
      accept: 'application/fhir+json',
      'Content-Type': 'application/fhir+json',
    };

    if (params?.headers) {
      Object.assign(headers, params.headers);
    }

    const options = {
      headers,
      ...resolvedParams,
      ...resolvedData,
    };
    return request(url, options, 'POST').then(({ response, data }) =>
      handleResponse(response, data, state, callback)
    );
  };
}

/**
 * Creates a resource in a destination system
 * @public
 * @example
 * create("Bundle", {
 *   entry: [
 *     {
 *       fullUrl: "", // Eg: Patient URL
 *       resource: {}, // Resource data
 *       search: {
 *         mode: "match",
 *       },
 *     },
 *   ],
 *   type: "collection",
 * });
 * @function
 * @param {string} path - Path to resource
 * @param {object} data - data to create the new resource
 * @param {function} callback - (Optional) callback function
 * @returns {Operation}
 */
export function create(path, data, callback = s => s) {
  return state => {
    const [resolvedpath, resolvedData] = expandReferences(state, path, data);

    const { baseUrl, apiPath } = state.configuration;

    const url = `${baseUrl}/${apiPath}/${resolvedpath}`;

    const options = {
      headers: {
        accept: 'application/fhir+json',
        'Content-Type': 'application/fhir+json',
      },
      ...resolvedData,
    };

    return request(url, options, 'POST').then(({ data }) =>
      callback({ ...state, data })
    );
  };
}

/**
 * Creates a transactionBundle for HAPI FHIR
 * @public
 * @example
 * createTransactionBundle({
 *   resourceType: "Bundle",
 *   type: "transaction",
 *   entry: [
 *     {
 *       fullUrl: "https://hapi.fhir.org/baseR4/Patient/592442",
 *       resource: {
 *         resourceType: "Patient",
 *         id: "592442",
 *         name: [{ given: "Caleb", family: "Cushing" }],
 *       },
 *       request: {
 *         method: "POST",
 *         url: "Patient",
 *       },
 *     },
 *   ],
 * });
 * @function
 * @param {object} params - data to create the new transaction
 * @param {function} callback - (Optional) callback function
 * @returns {Operation}
 */
export function createTransactionBundle(params, callback) {
  return state => {
    const [resolvedParams] = expandReferences(state, params);

    const { baseUrl, apiPath, authType, token } = state.configuration;

    const url = `${baseUrl}/${apiPath}`;
    const auth = `${authType} ${token}`;

    const options = {
      body: {
        resourceType: 'Bundle',
        type: 'transaction',
        entry: resolvedParams,
      },
      auth,
    };

    return request(url, options, 'POST').then(({ response, data }) =>
      handleResponse(response, data, state, callback)
    );
  };
}

/**
 * Get a resource in a FHIR system
 * @public
 * @example <caption>Get Claim from FHIR with optional query</caption>
 * get("Claim", { _include: "Claim:patient", _sort: "-_lastUpdated", _count: 200 })
 * @example <caption>Get Patient from FHIR</caption>
 * get('Patient');
 * @function
 * @param {string} path - Path to resource
 * @param {object} query - data to get the new resource
 * @param {function} callback - (Optional) callback function
 * @returns {Operation}
 */
export function get(path, query, callback = s => s) {
  return state => {
    const [resolvedPath, resolvedQuery] = expandReferences(state, path, query);

    const { baseUrl, apiPath } = state.configuration;
    const url = `${baseUrl}/${apiPath}/${resolvedPath}`;

    return request(url, { ...resolvedQuery }).then(({ response, data }) =>
      handleResponse(response, data, state, callback)
    );
  };
}

/**
 * Get Claim in a FHIR system
 * @public
 * @example
 * getClaim({ _include: "Claim:patient", _sort: "-_lastUpdated", _count: 200 });
 * @function
 * @param {string} claimId - (optional) claim id
 * @param {object} query - (optinal) query parameters
 * @param {function} callback - (Optional) callback function
 * @returns {Operation}
 */
export function getClaim(claimId, query, callback = s => s) {
  return state => {
    const [resourcedclaimId, resolvedQuery] = expandReferences(
      state,
      claimId,
      query
    );

    const { baseUrl, apiPath } = state.configuration;
    const url = resourcedclaimId
      ? `${baseUrl}/${apiPath}/Claim/${resourcedclaimId}`
      : `${baseUrl}/${apiPath}/Claim`;

    return request(url, { ...resolvedQuery }).then(({ response, data }) =>
      handleResponse(response, data, state, callback)
    );
  };
}
export { request } from './Utils';

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

/**
 * Options provided to a HTTP request
 * @typedef {Object} RequestOptions
 * @property {boolean=true} throwOnError - Set to false to prevent the function throwing for statusCodes greater than 400
 * @property {object} headers - Object of headers to append to the request
 * @property {object} body - JSON payload to attach to the request
 * @property {object} query - Query parameters for the request. Will be encoded into the URL
 */
// Note: parseAs is deliberately excluded here - assume everything is json

/**
 * Send a generic HTTP request to the server
 * @param {string} method - The HTTP method to be used for the request. It defaults to 'GET' if not
 * @param {string} path - The resource path that the request is being made to
 * @param {RequestOptions} [options] - An object containing any additional parameters to be sent with the request, such
 * as query parameters or request body data.
 * @param {string} path - The resource path that the request is being made to.
 * @returns {Operation}
 */
export const request =
  async (method, path, options = {}, callback) =>
  state => ({
    ...state,
    data,
    response,
  });

/**
 * Send a HTTP POST request
 * @public
 * @function
 * @example
 * post("Bundle",{
 *   "resourceType": "Bundle"
 * })
 * @param {string} path - Path to resource
 * @param {object} data - JSON data to append to the POST body
 * @param {RequestOptions} options - Additional options for the request
 * @param {function} callback - (Optional) callback function
 * @returns {Operation}
 */
export const post = (path, data, options, callback) => state => ({
  ...state,
  data,
  response,
});

/**
 * Send a HTTP GET request
 * @public
 * @function
 * @example <caption>Get Patient from FHIR</caption>
 * get('Patient');
 * @example <caption>Get Claim from FHIR with optional query</caption>
 * get("Claim", { _include: "Claim:patient", _sort: "-_lastUpdated", _count: 200 })
 * @param {string} path - Path to resource
 * @param {object} params - Parameters to encode into the URL query
 * @param {RequestOptions} options - Options to control the request
 * @param {function} callback - (Optional) callback function
 * @returns {Operation}
 */
export const get = (path, params, options, callback) => state => ({
  ...state,
  data,
  response,
});


/**
 * Creates a resource in a destination system using a POST request
 * @public
 * @function
 * @example
 * create("Patient",{ ... })
 * @param {string} resource - The resource type to create
 * @param {object} resource - The resource to create
 * @param {object} params - FHIR parameters to control and configure resource creation
 * @param {function} callback - (Optional) callback function
 * @returns {Operation}
 */
// NOTE: the signature takes type and data, and we should post { resourceType, resource } to the server
export const create = (resource, resource, params, callback) = (state) => ({
  ...state,
  data,
  response,
});

/**
 * Creates a transactionBundle for HAPI FHIR
 * @public
 * @example
 * createTransactionBundle([
 *     {
 *       fullUrl: "https://hapi.fhir.org/baseR4/Patient/592442",
 *       resource: {
 *         resourceType: "Patient",
 *         id: "592442",
 *         name: [{ given: "Caleb", family: "Cushing" }],
 *       },
 *       request: {
 *         method: "POST",
 *         url: "Patient",
 *       },
 *     },
 *   ]);
 * @function
 * @param {array} entries - array of transactiions
 * @param {object} params - data to create the new transaction
 * @param {function} callback - (Optional) callback function
 * @returns {Operation}
 */
export const createTransactionBundle = (entries, params, callback) = (state) => ({
  ...state,
  data
})


/**
 * Get Claim in a FHIR system
 * @public
 * @function
 * @example
 * getClaim({ _include: "Claim:patient", _sort: "-_lastUpdated", _count: 200 });
 * @param {string} claimId - claim id
 * @param {object} params - query parameters
 * @param {function} callback - callback function
 * @returns {Operation}
 */
export const getClaim = (claimId, params, callback = s => s)  => (state) => ({
  ...state,
  data
})
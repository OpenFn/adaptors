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

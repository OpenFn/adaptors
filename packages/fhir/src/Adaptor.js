import { execute as commonExecute } from '@openfn/language-common';
import { expandReferences } from '@openfn/language-common/util';

import { handleResponse, request } from './Utils';

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
 * Creates a resource in a destination system using a POST request
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
 * @param {object} params - data to create the new resource
 * @param {function} callback - (Optional) callback function
 * @returns {Operation}
 */
export function create(path, params, callback) {
  return state => {
    const [resolvedpath, resolvedParams] = expandReferences(
      state,
      path,
      params
    );

    const { baseUrl, apiPath } = state.configuration;

    const url = `${baseUrl}/${apiPath}/${resolvedpath}`;

    const options = {
      headers: {
        accept: 'application/fhir+json',
        'Content-Type': 'application/fhir+json',
      },
      ...resolvedParams,
    };

    return request(url, options, 'POST').then(response =>
      handleResponse(response, state, callback)
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

    return request(url, options, 'POST').then(response =>
      handleResponse(response, state, callback)
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

    return request(url, { ...resolvedQuery }).then(response =>
      handleResponse(response, state, callback)
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

    return request(url, { ...resolvedQuery }).then(response =>
      handleResponse(response, state, callback)
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

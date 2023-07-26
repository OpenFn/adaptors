import {
  execute as commonExecute,
  expandReferences,
  http,
} from '@openfn/language-common';
import { handleError, handleResponse } from './Utils';

const { axios } = http;
export { axios };

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
 * create("/endpoint", {"foo": "bar"})
 * @function
 * @param {string} path - Path to resource
 * @param {object} params - data to create the new resource
 * @param {function} callback - (Optional) callback function
 * @returns {Operation}
 */
export function create(path, params, callback) {
  return state => {
    const resolvedpath = expandReferences(path)(state);
    const resolvedParams = expandReferences(params)(state);

    const { baseUrl, apiPath } = state.configuration;

    const url = `${baseUrl}/${apiPath}/${resolvedpath}`;

    const config = {
      url,
      headers: {
        accept: 'application/fhir+json',
        'Content-Type': 'application/fhir+json',
      },
      data: resolvedParams,
    };

    return http
      .post(config)(state)
      .then(response => handleResponse(response, state, callback))
      .catch(handleError);
  };
}

/**
 * Creates a transactionBundle for HAPI FHIR
 * @public
 * @example
 * createTransactionBundle( {"entry": [{...},, {...}]})
 * @function
 * @param {object} params - data to create the new transaction
 * @param {function} callback - (Optional) callback function
 * @returns {Operation}
 */
export function createTransactionBundle(params, callback) {
  return state => {
    const resolvedParams = expandReferences(params)(state);

    const { baseUrl, apiPath, authType, token } = state.configuration;

    const url = `${baseUrl}/${apiPath}`;
    const auth = `${authType} ${token}`;

    const config = {
      url,
      body: {
        resourceType: 'Bundle',
        type: 'transaction',
        entry: resolvedParams,
      },
      auth,
    };

    return http
      .post(config)(state)
      .then(response => handleResponse(response, state, callback))
      .catch(handleError);
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
    const resolvedPath = expandReferences(path)(state);
    const resolvedQuery = expandReferences(query)(state);

    const { baseUrl, apiPath } = state.configuration;
    const url = `${baseUrl}/${apiPath}/${resolvedPath}`;

    const config = {
      url,
      params: resolvedQuery,
    };

    return http
      .get(config)(state)
      .then(response => handleResponse(response, state, callback))
      .catch(handleError);
  };
}

/**
 * Get Claim in a FHIR system
 * @public
 * @example
 * getClaim({ _include: "Claim:patient", _sort: "-_lastUpdated", _count: 200 });
 * @function
 * @param {object} query - (optinal) query parameters
 * @param {function} callback - (Optional) callback function
 * @returns {Operation}
 */
export function getClaim(query, callback = s => s) {
  return state => {
    const resolvedQuery = expandReferences(query)(state);

    const { baseUrl, apiPath } = state.configuration;
    const url = `${baseUrl}/${apiPath}/Claim`;

    const config = {
      url,
      params: resolvedQuery,
    };

    return http
      .get(config)(state)
      .then(response => handleResponse(response, state, callback))
      .catch(handleError);
  };
}

// What functions do you want from the common adaptor?
export {
  alterState,
  dataPath,
  dataValue,
  dateFns,
  each,
  field,
  fields,
  fn,
  http,
  lastReferenceValue,
  merge,
  sourceValue,
} from '@openfn/language-common';

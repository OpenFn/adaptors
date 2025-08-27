import {
  execute as commonExecute,
  composeNextState,
} from '@openfn/language-common';
import { get, post, expandReferences } from '@openfn/language-common/util';

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
    return commonExecute(
      login,
      ...operations,
      cleanupState
    )({
      ...initialState,
      ...state,
    });
  };
}

/**
 * Logs in to OpenIMIS.
 * @example
 * login(state)
 * @function
 * @private
 * @param {State} state - Runtime state.
 * @returns {State} state - but with a "token" added to the configuration key.
 */
function login(state) {
  const { configuration = {} } = state;
  const { baseUrl, username, password } = configuration;

  const url = `${baseUrl}/api/api_fhir_r4/login/`;
  const body = {
    username,
    password,
  };
  const headers = {
    'content-type': 'application/json',
  };
  console.log(url);
  return post(url, body, { headers }).then(response => {
    const auth = { Authorization: `Bearer ${response.body.token}` };
    return { ...state, configuration: { ...configuration, auth } };
  });
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

/**
 * Get FHIR resources from OpenIMIS
 * @public
 * @example
 * getFHIR("Patient")
 * @function
 * @param {string} path - Path to resource
 * @param {object} params - data to create the new resource
 * @param {function} callback - (Optional) callback function
 * @returns {Operation}
 */
export function getFHIR(path, params, callback = s => s) {
  return async state => {
    const [resolvedPath, resolvedParams] = expandReferences(
      state,
      path,
      params
    );
    const { baseUrl, auth } = state.configuration;

    const url = `${baseUrl}/api/api_fhir_r4/${resolvedPath}`;
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
  as,
} from '@openfn/language-common';

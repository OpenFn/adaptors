import {
  execute as commonExecute,
  composeNextState,
  expandReferences,
  http,
} from '@openfn/language-common';

const { axios } = http;

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
 * @param {State} state - Runtime state.
 * @returns {State} state - but with a "token" added to the configuration key.
 */
function login(state) {
  const { configuration } = state;
  const { baseUrl, username, password } = configuration;

  const params = {
    url: `${baseUrl}/api/api_fhir_r4/login/`,
    data: {
      username,
      password,
    },
  };

  return http
    .post(params)(state)
    .then(response => {
      const auth = { Authorization: `Bearer ${response.data.token}` };
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
export function getFHIR(path, params, callback) {
  return state => {
    path = expandReferences(path)(state);
    params = expandReferences(params)(state);

    const { baseUrl, auth } = state.configuration;

    const url = `${baseUrl}/api/api_fhir_r4/${path}/`;

    const config = {
      url,
      headers: { ...auth },
      params: { format: 'json', ...params },
    };

    return http
      .get(config)(state)
      .then(response => {
        const nextState = composeNextState(state, response.data);
        if (callback) return callback(nextState);
        return nextState;
      });
  };
}

export { axios };

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

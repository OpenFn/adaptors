

import {
  execute as commonExecute,
  composeNextState,
  expandReferences,
  http,
} from '@openfn/language-common';

/**
 * Execute a sequence of operations.
 * Wraps `language-common/execute`, and prepends initial state for http.
 * @example
 * execute(
 *   create('foo'),
 *   delete('bar')
 * )(state)
 * @function
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
 * Make a request to get the list of forms
 * @public
 * @example
 * getForms({}, state => {
 *    console.log(state.data);
 *    return state;
 * });
 * @function
 * @param {object} params - Query, Headers and Authentication parameters
 * @param {function} callback - (Optional) Callback function to execute after fetching form list
 * @returns {Operation}
 */
export function getForms(params, callback) {
  return state => {
    params = expandReferences(params)(state);

    const { baseURL, apiVersion, username, password } = state.configuration;

    const url = `${baseURL}/api/${apiVersion}/assets/?format=json`;
    const auth = { username, password };

    const config = {
      url,
      params,
      auth,
    };

    return http
      .get(config)(state)
      .then(response => {
        console.log('✓', response.data.count, 'forms fetched.');
        const nextState = composeNextState(state, response.data);
        if (callback) return callback(nextState);
        return nextState;
      });
  };
}

/**
 * Get submissions for a specific form
 * @example
 * getSubmissions({formId: 'aXecHjmbATuF6iGFmvBLBX'}, state => {
 *   console.log(state.data);
 *   return state;
 * });
 * @function
 * @param {object} params - Form Id and data to make the fetch or filter
 * @param {function} callback - (Optional) Callback function to execute after fetching form submissions
 * @returns {Operation}
 */
export function getSubmissions(params, callback) {
  return state => {
    params = expandReferences(params)(state);

    const { baseURL, apiVersion, username, password } = state.configuration;
    const { formId } = params;

    const url = `${baseURL}/api/${apiVersion}/assets/${formId}/data/?format=json`;
    const auth = { username, password };

    const config = {
      url,
      params: params.query,
      auth,
    };

    return http
      .get(config)(state)
      .then(response => {
        console.log('✓', response.data.count, 'submissions fetched.');

        const nextState = composeNextState(state, response.data);
        if (callback) return callback(nextState);
        return nextState;
      });
  };
}

/**
 * Get deployment information for a specific form
 * @example
 * getDeploymentInfo({formId: 'aXecHjmbATuF6iGFmvBLBX'}, state => {
 *   console.log(state.data);
 *   return state;
 * });
 * @function
 * @param {object} params - Form Id and data to make the fetch or filter
 * @param {function} callback - (Optional) Callback function to execute after fetching form deployment information
 * @returns {Operation}
 */
export function getDeploymentInfo(params, callback) {
  return state => {
    params = expandReferences(params)(state);

    const { baseURL, apiVersion, username, password } = state.configuration;
    const { formId } = params;

    const url = `${baseURL}/api/${apiVersion}/assets/${formId}/deployment/?format=json`;
    const auth = { username, password };

    const config = {
      url,
      params: params.query,
      auth,
    };

    return http
      .get(config)(state)
      .then(response => {
        console.log('✓', 'deployment information fetched.');

        const nextState = composeNextState(state, response.data);
        if (callback) return callback(nextState);
        return nextState;
      });
  };
}

export {
  fn,
  alterState,
  dataPath,
  dataValue,
  each,
  field,
  fields,
  http,
  lastReferenceValue,
  merge,
  sourceValue,
} from '@openfn/language-common';

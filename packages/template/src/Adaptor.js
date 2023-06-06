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
    return commonExecute(...operations)({
      ...initialState,
      ...state,
    });
  };
}

/**
 * Creates a fictional resource in a fictional destination system using a POST request
 * @public
 * @example
 * create("patient", {"foo": "bar"})
 * @function
 * @param {string} path - Path to resource
 * @param {object} params - data to create the new resource
 * @param {function} callback - (Optional) callback function
 * @returns {Operation}
 */
export function create(path, params, callback) {
  return state => {
    path = expandReferences(path)(state);
    params = expandReferences(params)(state);

    const { baseUrl, username, password } = state.configuration;

    const url = `${baseUrl}/${path}`;
    const auth = { username, password };

    const config = {
      url,
      body: params,
    };

    return http
      .post(config)(state)
      .then(response => {
        const nextState = {
          ...composeNextState(state, response.data),
          response,
        };
        if (callback) return callback(nextState);
        return nextState;
      });
  };
}

export { axios };

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

import {
  execute as commonExecute,
  composeNextState,
} from '@openfn/language-common';

import {
  request as commonRequest,
  expandReferences,
} from '@openfn/language-common/util';

import { makeBasicAuth, assertConfiguration } from './Utils';

export function request(method, path, params, callback) {
  return state => {
    const [resolvedPath, resolvedParams] = expandReferences(
      state,
      path,
      params
    );

    const { username, password, baseUrl } = assertConfiguration(
      state.configuration
    );
    // Initialize headers as an empty object
    let headers = {};
    // Check if resolvedParams has headers, and merge them into the headers object
    if (resolvedParams?.headers) {
      headers = resolvedParams.headers;
    }
    // Set the 'content-type' header if it's not already set
    if (!headers['content-type']) {
      headers['content-type'] = 'application/json';
    }

    headers['Authorization'] = makeBasicAuth(username, password);

    const options = {
      ...resolvedParams,
      headers,
      baseUrl,
    };

    return commonRequest(method, resolvedPath, options)
      .then(response => {
        const { method, url, body, code, duration } = response;
        console.log(method, url, '-', code, 'in', duration + 'ms');

        return {
          ...composeNextState(state, body),
          response,
        };
      })
      .then(nextState => callback?.(nextState) ?? nextState);
  };
}
/**
 * Execute a sequence of operations.
 * Wraps `language-common/execute` to make working with this API easier.
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

  // TODO: Add session-based authentication here if your API needs it.
  return state => {
    return commonExecute(...operations)({
      ...initialState,
      ...state,
    });
  };
}

/**
 * Create some resource in some system
 * @public
 * @example
 * create("patient", {"name": "Bukayo"})
 * @function
 * @param {string} resource - The type of entity that will be created
 * @param {object} data - The data to create the new resource
 * @param {function} callback - An optional callback function
 * @returns {Operation}
 */
export function create(resource, data, callback) {
  return request('POST', `/api/${resource}`, { body: data }, callback);
}

// TODO: Decide which functions to publish from @openfn/language-common
export {
  dataPath,
  dataValue,
  dateFns,
  each,
  field,
  fields,
  fn,
  chunk,
  parseCsv,
  lastReferenceValue,
  merge,
  sourceValue,
} from '@openfn/language-common';

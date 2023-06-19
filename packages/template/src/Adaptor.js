import {
  execute as commonExecute,
  composeNextState,
  expandReferences,
} from '@openfn/language-common';

import { request } from './Utils';

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
  return state => {
    const resolvedResource = expandReferences(resource)(state);
    const resolvedData = expandReferences(data)(state);

    const { baseUrl, username, password } = state.configuration;

    const url = `${baseUrl}/api/${resolvedResource}`;
    const auth = { username, password };

    const options = {
      auth,
      body: resolvedData,
      method: 'POST',
    };

    return request(url, options).then(response => {
      const nextState = {
        ...composeNextState(state, response.data),
        response,
      };
      if (callback) return callback(nextState);
      return nextState;
    });
  };
}

export { request } from './Utils';

// TODO: Decide which functions to publish from @openfn/language-common
export {
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

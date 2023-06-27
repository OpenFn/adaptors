import {
  execute as commonExecute,
  expandReferences,
} from '@openfn/language-common';

import { request, setAuth, setUrl, handleResponse } from './Utils';

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
 * Create some resource in msgraph
 * @public
 * @example
 * create("applications", {"displayName": "My App"})
 * @function
 * @param {string} resource - The type of entity that will be created
 * @param {object} data - The data to create the new resource
 * @param {function} callback - An optional callback function
 * @returns {Operation}
 */
export function create(resource, data, callback) {
  return state => {
    // const resolveResource = expandReferences(resource)(state);
    // const resolveData = expandReferences(data)(state);
    const [resolveResource, resolveData] = expandReferences(
      state,
      resource,
      data
    );
    const { accessToken, apiVersion } = state.configuration;

    const url = setUrl({ apiVersion, resolveResource });
    const auth = setAuth(accessToken);

    const options = {
      auth,
      ...resolveData,
    };

    return request(url, options, 'POST').then(response =>
      handleResponse(response, state, callback)
    );
  };
}

/**
 * Make a GET request to msgraph resource
 * @public
 * @example
 *  get('sites/root/lists')
 * @function
 * @param {string} path - Path to resource
 * @param {object} query - Query, Headers and Authentication parameters
 * @param {function} callback - (Optional) Callback function
 * @returns {Operation}
 */
export function get(path, query, callback = false) {
  return state => {
    const resolvePath = expandReferences(path)(state);
    const resolveQuery = expandReferences(query)(state);
    const { accessToken, apiVersion } = state.configuration;

    const url = setUrl({ apiVersion, resolvePath });
    const auth = setAuth(accessToken);

    return request(url, { ...resolveQuery, ...auth }).then(response =>
      handleResponse(response, state, callback)
    );
  };
}

export { request } from './Utils';

export * from './Sharepoint';

// TODO: Decide which functions to publish from @openfn/language-common
export {
  dataPath,
  dataValue,
  dateFns,
  each,
  field,
  fields,
  fn,
  lastReferenceValue,
  merge,
  sourceValue,
  parseCsv,
} from '@openfn/language-common';

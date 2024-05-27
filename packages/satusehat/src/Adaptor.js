import { execute as commonExecute } from '@openfn/language-common';
import { expandReferences } from '@openfn/language-common/util';
import { request, prepareNextState, authorize } from './Utils';

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

  return state => {
    return commonExecute(
      authorize,
      ...operations
    )({
      ...initialState,
      ...state,
    });
  };
}

/**
 * Make a get request to any satusehat endpoint
 * @public
 * @example
 * get("Organization", {"name": "somename"})
 * @function
 * @param {string} path - Path to resource
 * @param {object} params - Optional request params such as name.
 * @param {function} callback - An optional callback to handle the response
 * @returns {Operation}
 */
export function get(path, params = {}, callback = s => s) {
  return async state => {
    const [resolvedPath, resolvedParams] = expandReferences(
      state,
      path,
      params
    );
    try {
      const response = await request(
        state.configuration,
        `/${resolvedPath}`,
        {
          method: 'GET',
          params: resolvedParams,
          contentType: 'application/json',
        }
      );

      return prepareNextState(state, response, callback);
    } catch (e) {
      throw e.body ?? e;
    }
  };
}

/**
 * Make a post request to satusehat
 * @example
 * post(
 *   "Organization",
 *  { "resourceType": "Organization", "active": true,
 *  }
 * );
 * @function
 * @param {string} path - Path to resource
 * @param {object} data - Object or JSON which defines data that will be used to create a given instance of resource
 * @param {Object} params - Optional request params.
 * @param {function} [callback] - Optional callback to handle the response
 * @returns {Operation}
 */
export function post(path, data, params = {}, callback = s => s) {
  return async state => {
    const [resolvedPath, resolvedData, resolvedParams] = expandReferences(
      state,
      path,
      data,
      params
    );

    try {
      const response = await request(
        state.configuration,
        `/${resolvedPath}`,
        {
          method: 'POST',
          data: resolvedData,
          params: resolvedParams,
          contentType: 'application/json',
        }
      );

      return prepareNextState(state, response, callback);
    } catch (e) {
      throw e.body.error ?? e;
    }
  };
}

export {
  fn,
  alterState,
  arrayToString,
  combine,
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

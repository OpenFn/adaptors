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
      const response = await request(state.configuration, `/${resolvedPath}`, {
        method: 'GET',
        params: resolvedParams,
      });

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
      const response = await request(state.configuration, `/${resolvedPath}`, {
        method: 'POST',
        data: resolvedData,
        params: resolvedParams,
      });

      return prepareNextState(state, response, callback);
    } catch (e) {
      throw e.body.error ?? e;
    }
  };
}

/**
 * Make a put request to satusehat
 * @example
 * put(
 *   "Organization/123",
 *  { "resourceType": "Organization", "active": false,
 *  }
 * );
 * @function
 * @param {string} path - Path to resource and exact item to be updated
 * @param {object} data - Object or JSON which defines data that will be used to update a given instance of resource
 * @param {Object} params - Optional request params.
 * @param {function} [callback] - Optional callback to handle the response
 * @returns {Operation}
 */
export function put(path, data, params = {}, callback = s => s) {
  return async state => {
    const [resolvedPath, resolvedData, resolvedParams] = expandReferences(
      state,
      path,
      data,
      params
    );

    try {
      const response = await request(state.configuration, `/${resolvedPath}`, {
        method: 'PUT',
        data: resolvedData,
        params: resolvedParams,
      });

      return prepareNextState(state, response, callback);
    } catch (e) {
      throw e.body.error ?? e;
    }
  };
}

/**
 * Make a patch request to satusehat
 * @example
 * patch(
 *   "Organization/123",
 *    [{
 * "op": "replace", // Operation - `replace` is the only one used to change a specific property or element
 *  "path": "/language", // Path - The name of property/element of resource to be replaced
 *  "value": "id" // Value- The value to be replaced
 *}]
 *
 * );
 * @function
 * @param {string} path - Path to resource and exact item to be partially updated
 * @param {Array} data - An array of objects which defines data that will be used to partially update a given instance of resource
 * @param {Object} params - Optional request params.
 * @param {function} [callback] - Optional callback to handle the response
 * @returns {Operation}
 */
export function patch(path, data, params = {}, callback = s => s) {
  return async state => {
    const [resolvedPath, resolvedData, resolvedParams] = expandReferences(
      state,
      path,
      data,
      params
    );

    try {
      const response = await request(state.configuration, `/${resolvedPath}`, {
        method: 'PATCH',
        data: JSON.stringify(resolvedData),
        params: resolvedParams,
        contentType: 'application/json-patch+json',
      });

      return prepareNextState(state, response, callback);
    } catch (e) {
      throw e.body ?? e;
    }
  };
}

export {
  fn,
  fnIf,
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

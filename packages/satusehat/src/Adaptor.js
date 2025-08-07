import { execute as commonExecute } from '@openfn/language-common';
import { expandReferences } from '@openfn/language-common/util';
import { request, prepareNextState, authorize } from './Utils';

/**
 * State object
 * @typedef {Object} SatusehatHttpState
 * @property data - The response body (as JSON)
 * @property response - The HTTP response from the Satusehat server (excluding the body)
 * @property references - An array of all previous data objects used in the Job
 * @private
 */

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
 * Make a GET request to Satusehat. Use this to fetch resources directly from the Satusehat REST API.
 * You can pass Satusehat query parameters as an object of key value pairs, which will map to parameters
 * in the URL.
 * @public
 * @example  <caption>Get a resource by Id. Equivalent to GET `<baseUrl>/Organization/abcde`</caption>
 * get("Organization/abcde")
 * @example <caption>Get resources with a query. Equivalent to GET `<baseUrl>/Patient?identifier=https://fhir.kemkes.go.id/id/nik|9271060312000001`</caption>
 * get('/Patient', {
 *   identifier:'https://fhir.kemkes.go.id/id/nik|9271060312000001'
 * });
 * @function
 * @param {string} path - Path to resource
 * @param {object} params - Optional object of query parameters to include in the request
 * @param {function} callback - An optional callback to handle the response
 * @returns {Operation}
 * @state {SatusehatHttpState}
 */
export function get(path, params = {}, callback = s => s) {
  return async state => {
    const [resolvedPath, resolvedParams] = expandReferences(
      state,
      path,
      params
    );
    try {
      const response = await request(state.configuration, resolvedPath, {
        method: 'GET',
        params: resolvedParams,
      });

      return prepareNextState(state, response, callback);
    } catch (e) {
      throw e;
    }
  };
}

/**
 * Make a POST request to Satusehat. Use this to send resources directly to Satusehat REST API.
 * You can pass Satusehat body data as a JSON FHIR object.
 * @example <caption>Create an encounter resource. Equivalent to POST `<baseUrl>/Encounter`</caption>
 * post('Encounter', { resourceType: 'Encounter', ...state.data });
 * @function
 * @public
 * @param {string} path - Path to resource
 * @param {object} data - JSON FHIR object to create a resource
 * @param {Object} params - Optional object of query parameters to include in the request
 * @param {function} [callback] - Optional callback to handle the response
 * @returns {Operation}
 * @state {SatusehatHttpState}
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
      const response = await request(state.configuration, resolvedPath, {
        method: 'POST',
        data: resolvedData,
        params: resolvedParams,
      });

      return prepareNextState(state, response, callback);
    } catch (e) {
      throw e;
    }
  };
}

/**
 * Make a PUT request to Satusehat. Use this to directly update resources on Satusehat REST API.
 * You can pass Satusehat body data as a JSON FHIR object. You can also pass Satusehat query parameters as an object of key value pairs, which will map to parameters
 * in the URL.
 * @example <caption>Update a resource. Equivalent to PUT `<baseurl>/Organization/abcde`</caption>
 * put('Organization/abcde', { resourceType: 'Organization', active: false });
 * @function
 * @public
 * @param {string} path - Path to resource and exact item to be updated
 * @param {object} data - JSON FHIR object to update the resource
 * @param {Object} params - Optional object of query parameters to include in the request
 * @param {function} [callback] - Optional callback to handle the response
 * @returns {Operation}
 * @state {SatusehatHttpState}
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
      const response = await request(state.configuration, resolvedPath, {
        method: 'PUT',
        data: resolvedData,
        params: resolvedParams,
      });

      return prepareNextState(state, response, callback);
    } catch (e) {
      throw e;
    }
  };
}

/**
 * Make a PATCH request to Satusehat. Use this to directly update resources on Satusehat REST API.
 * You can pass Satusehat an array of objects which contains `op`, `path`, and `value` as the body. You can also pass Satusehat query parameters as an object of key value pairs, which will map to parameters
 * in the URL.
 * @example <caption>Update a property of a resource. Equivalent to PATCH `<baseurl>/Organization/abcde`</caption>
 * patch('Organization/abcde', [
 * {
 *  op: 'replace',
 *  path: '/language', // Name of property/element of resource to be replaced
 *  value: 'id', // Value to be replaced
 * },
 * ]);
 * @function
 * @public
 * @param {string} path - Path to resource and exact item to be partially updated
 * @param {Array} data - An array of objects which defines data that will be used to partially update a given instance of resource
 * @param {Object} params - Optional object of query parameters to include in the request.
 * @param {function} [callback] - Optional callback to handle the response
 * @returns {Operation}
 * @state {SatusehatHttpState}
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
      const response = await request(state.configuration, resolvedPath, {
        method: 'PATCH',
        data: JSON.stringify(resolvedData),
        params: resolvedParams,
        contentType: 'application/json-patch+json',
      });

      return prepareNextState(state, response, callback);
    } catch (e) {
      throw e;
    }
  };
}

export {
  alterState,
  arrayToString,
  as,
  combine,
  dataPath,
  dataValue,
  each,
  field,
  fields,
  fn,
  fnIf,
  lastReferenceValue,
  map,
  merge,
  sourceValue,
  util,
} from '@openfn/language-common';

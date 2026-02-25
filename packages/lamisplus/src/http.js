import { expandReferences } from "@openfn/language-common/util";
import * as util from './Utils';

/* Make a HTTP GET request to any LAMISPlus endpoint
 * @public
 * @function
 * @example <caption>GET assets resource</caption>
 * http.get('assets')
 * @param {string} path - path to resource
 * @param {HTTPRequestOptions} [options={}] - An object containing query params and headers for the request
 * @state {HttpState}
 * @returns {operation}
 */
export function get(path, options) {
  return async state => {
    const [resolvedPath, resolvedOptions = {}] = expandReferences(
      state,
      path,
      options
    );

    const response = await util.request(
      state.configuration,
      'GET',
      resolvedPath,
      resolvedOptions
    );

    return util.prepareNextState(state, response);
  };
}


/**
 * Make a POST request to a LAMISPlus endpoint
 * @public
 * @function
 * @example <caption>Create a patient</caption>
 * http.post(
 *  '/plugin/ehr/api/v1/patient/',
 *  {
 *   name: 'John doe',
 *  },
 *  );
 * @param {string} path - path to resource
 * @param {any} data - the body data in JSON format
 * @param {HTTPRequestOptions} [options={}] - An object containing query params and headers for the request
 * @state {HttpState}
 * @returns {operation}
 */
export function post(path, data, options) {
  return async state => {
    const [resolvedPath, resolvedData, resolvedOptions = {}] = expandReferences(
      state,
      path,
      data,
      options
    );

    const optionsObject = {
      data: resolvedData,
      ...resolvedOptions,
    };
    const response = await util.request(
      state.configuration,
      'POST',
      resolvedPath,
      optionsObject
    );

    return util.prepareNextState(state, response);
  };
}
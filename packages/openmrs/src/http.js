import { expandReferences } from '@openfn/language-common/util';
import * as util from './Utils';

/**
 * Make a HTTP request to any OpenMRS endpoint
 * @example
 * request("GET",
 *   "/ws/rest/v1/patient/d3f7e1a8-0114-4de6-914b-41a11fc8a1a8", {
 *    query:{ 
 *       limit: 1, 
 *       offset: 20 
 *    },
 *     baseUrl: "http://msf-ocg-openmrs3-dev.westeurope.cloudapp.azure.com/openmrs"
 * });
 * @function
 * @public
 * @param {string} method - HTTP method to use
 * @param {string} path - Path to resource
 * @param {import('./Utils').OpenMRSOptions}  [options={}] - An object containing either query, headers, and body for the request
 * @returns {Operation}
 */
export function request(method, path, options = {}, callback = s => s) {
  return async state => {
    const [resolvedMethod, resolvedPath, resolvedOptions = {}] =
      expandReferences(state, method, path, options);

    const response = await util.request(
      state,
      resolvedMethod,
      resolvedPath,
      resolvedOptions
    );

    return util.prepareNextState(state, response, callback);
  };
}

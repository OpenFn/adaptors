
import { expandReferences } from '@openfn/language-common/util';
import * as http from '@openfn/language-http'

/**
 * State object
 * @typedef {Object} OpenMRSOptions
 * @property {object} query - An object of query parameters to be encoded into the URL
 * @property {object} header - An object of all request headers
 * @property {object} body - The request body (as JSON)
 */



/**
 * Make a HTTP request to any OpenMRS endpoint
 * @example
 * request("GET","http://msf-ocg-openmrs3-dev.westeurope.cloudapp.azure.com/openmrs/ws/rest/v1/patient/d3f7e1a8-0114-4de6-914b-41a11fc8a1a8", {
 *   {query: {
 *   q: "Patient",
 *   limit: 1,
 * }}
 * });
 * @function
 * @public
 * @param {string} method - HTTP method to use
 * @param {string} path - Path to resource
 * @param {OpenMRSOptions}  options - An object containing either query, headers, and body for the request
 * @returns {Operation}
 */
export function request(method, path, options = {}, callback = s => s ) {
  return  async state => {
    const [resolvedMethod, resolvedPath, resolvedOptions = {}] = expandReferences(
      state,
      method,
      path,
      options
    );

   await http.request(resolvedMethod, resolvedPath,resolvedOptions, callback)

  };
}

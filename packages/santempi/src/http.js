import { expandReferences } from '@openfn/language-common/util';
import * as util from './Utils.js';


/**
 * State object
 * @typedef {Object} HttpState
 * @property data - the parsed response body
 * @property response - the response from the HTTP server, including headers, statusCode, body, etc
 * @property references - an array of all previous data objects used in the Job
 **/

/**
 * Options provided to santeMPI HTTP requests
 * @typedef {Object} RequestOptions
 * @public
 * @property {object|string} body - body data to append to the request. JSON will be converted to a string.
 * @property {object} query - An object of query parameters to be encoded into the URL.
 * @property {object} headers - An object of headers to append to the request.
 */

/**
 * Make a GET request
 * @example <caption>Search for a FHIR Patient by identifier</caption>
 * http.get('/fhir/Patient', {
 *   headers: { Accept: 'application/fhir+json' },
 *   query: { identifier: 'http://ohie.org/National_Id|NIN-001-TEST' }
 * });
 * @example <caption>Get an HDSI concept by reference term</caption>
 * http.get('/hdsi/Concept', {
 *   query: {
 *     'referenceTerm.mnemonic': 'id_category',
 *     'referenceTerm.codeSystem.url': 'http://test.ohie.org/'
 *   }
 * });
 * @function
 * @public
 * @param {string} path - Path to resource
 * @param {RequestOptions} options - Optional request options
 * @returns {Operation}
 * @state {HttpState}
 */
export function get(path, options) {
  return request('GET', path, null, options);
}

/**
 * Make a POST request
 * @example <caption>Register a new Patient built with openfn's fhir-4 builders</caption>
 * http.post('/fhir/Patient', state => builders.patient({
 *   identifier: [
 *     builders.identifier({
 *       use: 'official',
 *       system: 'http://ohie.org/National_Id',
 *       value: 'NIN-001-TEST',
 *     }),
 *   ],
 *   name: [{ use: 'official', family: 'Nakamura', given: ['Aiko'] }],
 *   gender: 'female',
 *   birthDate: '1992-04-10',
 * }), {
 *   headers: {
 *     Accept: 'application/fhir+json',
 *     'Content-Type': 'application/fhir+json'
 *   }
 * });
 * @example <caption>Create an Assigning Authority on the AMI surface</caption>
 * http.post('/ami/AssigningAuthority', {
 *   $type: 'AssigningAuthority',
 *   name: 'Test National ID Authority',
 *   domainName: 'TEST-NIN',
 *   oid: '2.16.800.1.113883.3.9999.5.1',
 *   url: 'http://test.ohie.org/National_Id',
 *   isUnique: false,
 * });
 * @function
 * @public
 * @param {string} path - Path to resource
 * @param {object} body - Object which will be attached to the POST body
 * @param {RequestOptions} options - Optional request options
 * @returns {Operation}
 * @state {HttpState}
 */
export function post(path, body, options) {
  return request('POST', path, body, options);
}

/**
 * Make a general HTTP request
 * @example <caption>Match a patient using the FHIR $match operation</caption>
 * http.request('POST', '/fhir/Patient/$match', {
 *   resourceType: 'Parameters',
 *   parameter: [
 *     {
 *       name: 'resource',
 *       resource: {
 *         resourceType: 'Patient',
 *         identifier: [{ system: 'http://ohie.org/National_Id', value: 'NIN-001-TEST' }],
 *         name: [{ family: 'Nakamura', given: ['Aiko'] }],
 *         gender: 'female',
 *         birthDate: '1992-04-10',
 *       }
 *     },
 *     { name: 'count', valueInteger: 5 }
 *   ]
 * }, {
 *   headers: {
 *     Accept: 'application/fhir+json',
 *     'Content-Type': 'application/fhir+json'
 *   }
 * });
 * @example <caption>Get all AMI match configurations</caption>
 * http.request('GET', '/ami/MatchConfiguration');
 * @function
 * @public
 * @param {string} method - HTTP method to use
 * @param {string} path - Path to resource
 * @param {object} body - Object which will be attached to the POST body
 * @param {RequestOptions} options - Optional request options
 * @returns {Operation}
 * @state {HttpState}
 */
export function request(method, path, body, options = {}) {
  return async state => {
    const [resolvedMethod, resolvedPath, resolvedBody, resolvedoptions] =
      expandReferences(state, method, path, body, options);

    const response = await util.request(
      state.configuration,
      resolvedMethod,
      resolvedPath,
      {
        body: resolvedBody,
        ...resolvedoptions,
      }
    );

    return util.prepareNextState(state, response);
  };
}
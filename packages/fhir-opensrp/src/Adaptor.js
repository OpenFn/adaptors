import { expandReferences } from '@openfn/language-common/util';
import * as util from './Utils.js';
import {
  execute as commonExecute,
} from '@openfn/language-common';

/**
 * State object
 * @typedef {Object} OnaFHIRState
 * @property data - the parsed response body
 * @property response - the response from the HTTP server, including headers, statusCode, body, etc
 * @property references - an array of all previous data objects used in the Job
 **/

/**
 * Options provided to Ona fhir request
 * @typedef {Object} RequestOptions
 * @public
 * @property {object} query - An object of query parameters to be encoded into the URL.
 * @property {object} headers - An object of headers to append to the request.

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
      util.authorize,
      ...operations,
    )({
      ...initialState,
      ...state,
    });
  };
}

/**
 * Read a resource
 * @example <caption>Read server metadata</caption>
 * read('metadata');
 * @example <caption>Search for recently updated Patients</caption>
 * read('Patient', {
 *   query: {
 *     '_lastUpdated': 'gt2026-07-01T00:00:00Z',
 *     '_sort': '_lastUpdated',
 *     '_count': 200
 *   }
 * });
 * @function
 * @public
 * @param {string} path - Path to resource
 * @param {RequestOptions} options - Optional request options
 * @returns {Operation}
 * @state {OnaFHIRState}
 */
export function read(path, options) {
  return request('GET', path, null, options);
}

/**
 * Create a resource
 * @example <caption>Create a Patient using builders (see [fhir-4 docs](https://docs.openfn.org/adaptors/packages/fhir-4-docs#functions))</caption>
 * create('Patient', builders.patient({
 *   identifier: [
 *     builders.identifier({
 *       use: 'official',
 *       system: 'http://ohie.org/National_Id',
 *       value: 'NIN-TEST-001',
 *     }),
 *   ],
 *   name: [{ use: 'official', family: 'Nakamura', given: ['Aiko'], text: 'Aiko Nakamura' }],
 *   gender: 'female',
 *   birthDate: '1992-04-10',
 *   active: true,
 *   telecom: [{ system: 'phone', value: '0712345678' }],
 * }));
 * @example <caption>Create a Patient without builders</caption>
 * create('Patient', {
 *   resourceType: 'Patient',
 *   active: true,
 *   identifier: [
 *     { use: 'official', system: 'http://ohie.org/National_Id', value: 'NIN-TEST-001' },
 *   ],
 *   name: [{ use: 'official', family: 'Nakamura', given: ['Aiko'] }],
 *   gender: 'female',
 *   birthDate: '1992-04-10',
 *   telecom: [{ system: 'phone', value: '0712345678' }],
 * });
 * @function
 * @public
 * @param {string} path - Path to resource
 * @param {object} body - Object which will be attached to the POST body
 * @param {RequestOptions} options - Optional request options
 * @returns {Operation}
 * @state {OnaFHIRState}
 */
export function create(path, body, options) {
  return request('POST', path, body, options);
}

/**
 * Update a resource
 * @example <caption>Update a Patient by ID</caption>
 * update('Patient/0181038e-682b-4c7c-a946-e3757d2fa2f7', {
 *   resourceType: 'Patient',
 *   id: '0181038e-682b-4c7c-a946-e3757d2fa2f7',
 *   active: true,
 *   name: [{ use: 'official', family: 'Mathenge', given: ['Monica'] }],
 *   gender: 'female',
 *   birthDate: '1990-07-07',
 *   telecom: [{ system: 'phone', value: '0712010203' }],
 *   managingOrganization: { reference: 'Organization/eb4963c3-3d6e-4ea9-bde8-6a5b638bc4f8' },
 * });
 * @function
 * @public
 * @param {string} path - Path to resource
 * @param {object} body - Object which will be attached to the POST body
 * @param {RequestOptions} options - Optional request options
 * @returns {Operation}
 * @state {OnaFHIRState}
 */
export function update(path, body, options) {
  return request('PUT', path, body, options);
}

/**
 * Delete a resource
 * @example <caption>Delete a Patient by ID</caption>
 * delete('Patient/97597');
 * @function
 * @public
 * @alias delete
 * @param {string} path - Path to resource
 * @param {RequestOptions} options - Optional request options
 * @returns {Operation}
 * @state {OnaFHIRState}
 */
function _delete(path, options) {
  return request('DELETE', path, null, options);
}
export { _delete as delete };

/**
 * Make a general HTTP request
 * @example <caption>Search Observations for a specific patient</caption>
 * request('GET', 'Observation', null, {
 *   query: { 'subject': 'Patient/0181038e-682b-4c7c-a946-e3757d2fa2f7' }
 * });
 * @example <caption>Update a Patient resource</caption>
 * request('PUT', 'Patient/0181038e-682b-4c7c-a946-e3757d2fa2f7', {
 *   resourceType: 'Patient',
 *   id: '0181038e-682b-4c7c-a946-e3757d2fa2f7',
 *   active: false,
 *   name: [{ use: 'official', family: 'Mathenge', given: ['Monica'] }],
 *   gender: 'female',
 *   birthDate: '1990-07-07',
 * });
 * @function
 * @public
 * @param {string} method - HTTP method to use
 * @param {string} path - Path to resource
 * @param {object} body - Object which will be attached to the POST body
 * @param {RequestOptions} options - Optional request options
 * @returns {Operation}
 * @state {OnaFHIRState}
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

export { builders } from '@openfn/language-fhir-4';

export {
  as,
  combine,
  cursor,
  dataPath,
  dataValue,
  dateFns,
  each,
  field,
  fields,
  fn,
  fnIf,
  group,
  lastReferenceValue,
  map,
  merge,
  scrubEmojis,
  sourceValue,
  util,
} from '@openfn/language-common';

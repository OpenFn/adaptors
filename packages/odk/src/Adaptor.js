import { expandReferences } from '@openfn/language-common/util';
import {
  execute as commonExecute,
  composeNextState,
} from '@openfn/language-common';
import * as util from './Utils';

/**
 * State object
 * @typedef {Object} ODKHttpState
 * @private
 * @property data - the parsed response body
 * @property response - the response from the ODK HTTP server (with the body removed)
 * @property references - an array of all the previous data values
 **/

/**
 * Options provided to the HTTP request
 * @typedef {Object} RequestOptions
 * @property {object} query - An object of query parameters to be encoded into the URL.
 * @property {object} headers - An object of headers to append to the request.
 * @property {string} parseAs - Parse the response body as json, text or stream. By default will use the response headers.
 * @property {number} timeout - Request timeout in ms. Default: 300 seconds.
 */

/**
 * Fetch all submissions to a given form.
 * @example Get all submissions to a form called 'patient-follow-up'
 * getSubmissions(22, 'patient-follow-up');
 * @function
 * @public
 * @param {number} projectId - Id of the project the form belongs to
 * @param {string} xmlFormId - Id of the form to fetch submissions for
 * @returns {Operation}
 * @state {ODKHttpState}
 * @state data - array of form submission objects
 */
export function getSubmissions(projectId, xmlFormId) {
  return async state => {
    const [resolvedProjectId, resolvedXmlFormId] = expandReferences(
      state,
      projectId,
      xmlFormId
    );

    const path = `/v1/projects/${resolvedProjectId}/forms/${resolvedXmlFormId}.svc/Submissions`;
    const { body, ...responseWithoutBody } = await util.request(
      state.configuration,
      'GET',
      path
    );

    responseWithoutBody['@odata.context'] = body['@odata.context'];

    return composeNextState(
      {
        ...state,
        response: responseWithoutBody,
      },
      body.value
    );
  };
}

/**
 * Fetch all forms for a project.
 * @example Fetch all forms for project with id 22
 * getForms(22);
 * @function
 * @public
 * @param {number} projectId - Id of the project
 * @returns {Operation}
 * @state {ODKHttpState}
 * @state data - array of form data objects
 */
export function getForms(projectId) {
  return async state => {
    const [resolvedProjectId] = expandReferences(state, projectId);

    const path = `/v1/projects/${resolvedProjectId}/forms`;

    const response = await util.request(state.configuration, 'GET', path);

    return util.prepareNextState(state, response);
  };
}

/**
 * Make a GET request against the base URL.
 * @example Get a list of available projects
 * get("v1/projects");
 * @example Get projects with query parameters
 * get("v1/projects", {
 *  query: { datasets: true }
 * });
 * @function
 * @public
 * @param {string} path - Path to resource
 * @param {RequestOptions} options - Options to configure the HTTP request
 * @returns {Operation}
 * @state {ODKHttpState}
 */
export function get(path, options) {
  return request('GET', path, null, options);
}

/**
 * Make a POST request against the base URL.
 * @example Create a new project
 * post('v1/projects', { name: 'Project Name' });
 * @function
 * @public
 * @param {string} path - Path to resource
 * @param {object} body - Object which will be attached to the POST body
 * @param {RequestOptions} options -  Options to configure the HTTP request
 * @returns {Operation}
 * @state {ODKHttpState}
 */
export function post(path, body, options) {
  return request('POST', path, body, options);
}

/**
 * Make a general HTTP request against the base URL.
 * @example Make a POST request to create a new project
 * request("POST", 'v1/projects', { name: 'Project Name' });
 * @function
 * @public
 * @param {string} method - HTTP method to use
 * @param {string} path - Path to resource
 * @param {object} body - Object which will be attached to the body
 * @param {RequestOptions} options - Optional request params
 * @returns {Operation}
 * @state {ODKHttpState}
 */
export function request(method, path, body, options = {}) {
  return async state => {
    const [resolvedMethod, resolvedPath, resolvedBody, resolvedOptions] =
      expandReferences(state, method, path, body, options);

    const response = await util.request(
      state.configuration,
      resolvedMethod,
      resolvedPath,
      resolvedBody,
      resolvedOptions
    );

    return util.prepareNextState(state, response);
  };
}

/**
 * Execute a sequence of operations.
 * Wraps `language-common/execute`, and prepends initial state for odk.
 * @example
 * execute(
 *   get("v1/projects")
 * )(state)
 * @private
 * @param {Operations} operations - Operations to be performed.
 * @returns {Operation}
 * @state {ODKHttpState}
 */
export function execute(...operations) {
  return state => {
    return commonExecute(util.authorize, ...operations)(state);
  };
}

export {
  dataPath,
  dataValue,
  dateFns,
  cursor,
  each,
  field,
  fields,
  fn,
  fnIf,
  lastReferenceValue,
  merge,
  sourceValue,
} from '@openfn/language-common';

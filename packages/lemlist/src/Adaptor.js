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
 * Options provided to the HTTP request
 * @typedef {Object} RequestOptions
 * @public
 * @property {object|string} body - body data to append to the request. JSON will be converted to a string.
 * @property {object} errors - Map of errorCodes -> error messages, ie, `{ 404: 'Resource not found;' }`. Pass `false` to suppress errors for this code.
 * @property {object} query - An object of query parameters to be encoded into the URL.
 * @property {object} headers - An object of headers to append to the request.
 * @property {string} parseAs - Parse the response body as json, text or stream. By default will use the response headers.
 * @property {number} timeout - Request timeout in ms. Default: 300 seconds.
 */

/**
 * Options for listing activities
 * @typedef {Object} ListActivitiesOptions
 * @public
 * @property {string} type - Activity type to filter by, ie `emailsReplied`, `emailsBounced`, `emailsUnsubscribed`
 * @property {string} campaignId - Only return activities for this campaign
 * @property {string} leadId - Only return activities for this lead
 * @property {boolean} isFirst - Only return the first activity of each type
 * @property {string} minDate - Only return activities created at or after this date (ISO 8601 or unix seconds)
 * @property {string} maxDate - Only return activities created at or before this date (ISO 8601 or unix seconds)
 * @property {number} offset - Number of records to skip
 * @property {number} limit - Number of records to return (max 100)
 */

/**
 * List lemlist activities (emails sent, opened, replied, bounced, etc).
 * Returns an array of activities to `state.data`.
 * @example <caption>List all replies since a given date</caption>
 * listActivities({ type: 'emailsReplied', minDate: '2026-10-01T00:00:00Z' });
 * @example <caption>List activities for a campaign</caption>
 * listActivities({ campaignId: 'cam_abc123', limit: 50 });
 * @function
 * @public
 * @param {ListActivitiesOptions} [options] - Filters and pagination options
 * @returns {Operation}
 * @state {HttpState}
 */
export function listActivities(options = {}) {
  return async state => {
    const [resolvedOptions] = expandReferences(state, options);

    const response = await util.request(
      state.configuration,
      'GET',
      'activities',
      { query: { version: 'v2', ...resolvedOptions } }
    );

    console.log(`Fetched ${response.body?.length ?? 0} lemlist activities`);

    return util.prepareNextState(state, response);
  };
}

/**
 * Make a general HTTP request to the lemlist API
 * @example
 * request('GET', 'campaigns');
 * @function
 * @public
 * @param {string} method - HTTP method to use
 * @param {string} path - Path to resource, relative to https://api.lemlist.com/api
 * @param {object} body - Object which will be attached to the request body
 * @param {RequestOptions} options - Optional request options
 * @returns {Operation}
 * @state {HttpState}
 */
export function request(method, path, body, options = {}) {
  return async state => {
    const [resolvedMethod, resolvedPath, resolvedBody, resolvedOptions] =
      expandReferences(state, method, path, body, options);

    const response = await util.request(
      state.configuration,
      resolvedMethod,
      resolvedPath,
      {
        body: resolvedBody,
        ...resolvedOptions,
      }
    );

    return util.prepareNextState(state, response);
  };
}

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

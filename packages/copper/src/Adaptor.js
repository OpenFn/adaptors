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
 * @property {object} errors - Map of errorCodes -> error messages, ie, `{ 404: 'Resource not found;' }`. Pass `false` to suppress errors for this code.
 * @property {object} query - An object of query parameters to be encoded into the URL.
 * @property {object} headers - An object of headers to append to the request.
 * @property {string} parseAs - Parse the response body as json, text or stream. By default will use the response headers.
 * @property {number} timeout - Request timeout in ms. Default: 300 seconds.
 */

/**
 * Lead match criteria
 * @typedef {Object} LeadMatch
 * @public
 * @property {string} field_name - The field to match on: `email`, `name`, or a custom field
 * @property {string} field_value - The value to match
 */

/**
 * Create or update a Copper lead. If no lead matches, a new lead is created.
 * If exactly one lead matches, it is updated. If several leads match, an error is thrown.
 * By default leads are matched on `properties.email.email`.
 * Writes the created or updated lead to `state.data`.
 * @example <caption>Upsert a lead, matching on email</caption>
 * upsertLead({
 *   name: 'Ada Lovelace',
 *   email: { email: 'ada@example.com', category: 'work' },
 *   company_name: 'Analytical Engines',
 * });
 * @example <caption>Upsert a lead from a lemlist activity</caption>
 * upsertLead($ => ({
 *   name: `${$.data.leadFirstName} ${$.data.leadLastName}`,
 *   email: { email: $.data.leadEmail, category: 'work' },
 *   company_name: $.data.leadCompanyName,
 * }));
 * @example <caption>Upsert a lead, matching on name</caption>
 * upsertLead(
 *   { name: 'Ada Lovelace', title: 'Mathematician' },
 *   { field_name: 'name', field_value: 'Ada Lovelace' }
 * );
 * @function
 * @public
 * @param {object} properties - Lead fields to set, as described in the Copper lead schema
 * @param {LeadMatch} [match] - Match criteria. Defaults to matching on email.
 * @returns {Operation}
 * @state {HttpState}
 */
export function upsertLead(properties, match) {
  return async state => {
    const [resolvedProperties, resolvedMatch] = expandReferences(
      state,
      properties,
      match
    );

    const matchCriteria = resolvedMatch ?? {
      field_name: 'email',
      field_value: resolvedProperties?.email?.email,
    };

    if (!matchCriteria.field_value) {
      throw new Error(
        'upsertLead: no match value. Provide properties.email.email or a match object'
      );
    }

    const response = await util.request(
      state.configuration,
      'PUT',
      'leads/upsert',
      { body: { properties: resolvedProperties, match: matchCriteria } }
    );

    console.log(`Upserted Copper lead ${response.body?.id}`);

    return util.prepareNextState(state, response);
  };
}

/**
 * Make a general HTTP request to the Copper API
 * @example
 * request('POST', 'leads/search', { page_size: 25 });
 * @function
 * @public
 * @param {string} method - HTTP method to use
 * @param {string} path - Path to resource, relative to https://api.copper.com/developer_api/v1
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

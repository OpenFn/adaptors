import { expandReferences } from '@openfn/language-common/util';
import * as util from './Utils';
import { getItemsQueryString, insertOutboundShipmentQuery, upsertOutboundShipmentQuery } from './queryStrings'
import { v4 as uuidv4 } from 'uuid';

/**
 * State object
 * @typedef {Object} HttpState
 * @property data - the parsed response body
 * @property response - the response from the HTTP server, including headers, statusCode, body, etc
 * @property references - an array of all previous data objects used in the Job
 **/


export function getItemsWithStats(options) {
  return async state => {
    const [resolvedOptions] = expandReferences(state, options);

    let opts = {
      ...resolvedOptions,
      body: {
        query: getItemsQueryString,
        variables: {
          ...resolvedOptions.variables
        }
      },
    }
    const response = await util.request(state, opts);
    return util.prepareNextState(state, response)
  }
}

export function insertOutboundShipment(options) {
  return async state => {
    const [resolvedOptions] = expandReferences(state, options);

    let opts = {
      ...resolvedOptions,
      body: {
        query: insertOutboundShipmentQuery,
        variables: {
          id: uuidv4(),
          ...resolvedOptions.variables
        }
      },
    }
    const response = await util.request(state, opts);
    return util.prepareNextState(state, response)
  }
}


export function upsertOutboundShipment(options) {
  return async state => {
    const [resolvedOptions] = expandReferences(state, options);

    let opts = {
      ...resolvedOptions,
      body: {
        query: upsertOutboundShipmentQuery,
        variables: {
          ...resolvedOptions.variables
        }
      },
    }

    const response = await util.request(state, opts);
    return util.prepareNextState(state, response)
  }
}


/**
 * Make a general HTTP request
 * @example
 * request("POST", "patient", { "name": "Bukayo" });
 * @function
 * @public
 * @param {string} method - HTTP method to use
 * @param {string} path - Path to resource
 * @param {object} body - Object which will be attached to the POST body
 * @param {RequestOptions} options - Optional request options
 * @returns {Operation}
 * @state {HttpState}
 */
export function request(options = {}) {
  return async state => {
    const [resolvedOptions] = expandReferences(state, options);

    const response = await util.request(
      state,
      {
        body: {
          query: resolvedOptions.body.query,
          variables: resolvedOptions.body.variables,
        },
        ...resolvedOptions,
      }
    );

    return util.prepareNextState(state, response);
  };
}

export {
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
  merge,
  scrubEmojis,
  sourceValue,
  util,
} from '@openfn/language-common';

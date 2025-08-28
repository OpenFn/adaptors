import { expandReferences } from '@openfn/language-common/util';
import * as util from './Utils';

/**
 * State object
 * @typedef {Object} HttpState
 * @property data - the parsed response body
 * @property response - the response from the HTTP server, including headers, statusCode, body, etc
 * @property references - an array of all previous data objects used in the Job
 **/

/**
 * List items from Stripe
 * @example <caption>List all payment intents</caption>
 * list('payment_intents');
 * @example <caption>List customers with options</caption>
 * list('customers', {limit:3});
 * @function
 * @public
 * @param {string} resource - The API resource to list items from.
 * @param {object} options -  Optional options object. See {@link https://docs.stripe.com/api/payment_intents/list|Stripe API documentation} for more details.
 * @returns {Operation}
 * @state data - an array of items
 */
export function list(resource, options = {}) {
  return async state => {
    const [resolvedResource, resolvedoptions] = expandReferences(
      state,
      resource,
      options
    );

    const response = await util.request(
      state.configuration,
      'GET',
      resolvedResource,
      {
        query: {
          ...resolvedoptions,
        },
      }
    );

    return util.prepareNextState(state, response);
  };
}

/**
 * Get a single resource using its ID
 * @example <caption>Get a payment intent</caption>
 * get('payment_intents','pi_3RxS5EEAUr6ipfDB0aKo3moC');
 * @example <caption>Get a customer</caption>
 * get('customers','cus_SthTl85l20LRJj');
 * @function
 * @public
 * @param {string} resource - The API path to retrieve.
 * @param {string} id - The ID of the resource to retrieve.
 * @returns {Operation}
 * @state data  - The requested resource object
 */
export function get(resource, id) {
  return async state => {
    const [resolvedResource, resolvedId] = expandReferences(
      state,
      resource,
      id
    );

    const response = await util.request(
      state.configuration,
      'GET',
      `${resolvedResource}/${resolvedId}`,
      {}
    );

    return util.prepareNextState(state, response);
  };
}

export {
  as,
  assert,
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

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
 * list('/payment_intents');
 * @example <caption>List customers with options</caption>
 * list('/customers', {limit:3});
 * @function
 * @public
 * @param {string} path - The API path to list items from.
 * @param {object} options -  Optional options object. See {@link https://docs.stripe.com/api/payment_intents/list|Stripe API documentation} for more details.
 * @returns {Operation}
 * @state {HttpState}
 */
export function list(path,options = {}) {
  return async state => {
    const [resolvedPath, resolvedoptions] = expandReferences(state, path, options);

    const response = await util.request(
      state.configuration,
      'GET',
      resolvedPath,
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
 * Get an item from Stripe
 * @example <caption>Get a payment intent</caption>
 * get('/payment_intents/pi_3RxS5EEAUr6ipfDB0aKo3moC');
 * @example <caption>Get a customer</caption>
 * get('/customers/cus_SthTl85l20LRJj');
 * @function
 * @public
 * @param {string} path - The API path to retrieve.
 * @returns {Operation}
 * @state {HttpState}
 */
export function get(path) {
  return async state => {
    const [resolvedPath] = expandReferences(state, path);

    const response = await util.request(
      state.configuration,
      'GET',
      resolvedPath,
      {}
    );

    return util.prepareNextState(state, response);
  };
}

/**
 * Get payments from Stripe
 * @example <caption>List all payment intents</caption>
 * listPaymentIntents();
 * @example <caption>List payment intents with options</caption>
 * listPaymentIntents({limit:3});
 * @function
 * @public
 * @param {object} options -  Payment Intents options object. See {@link https://docs.stripe.com/api/payment_intents/list|Stripe Payment Intents API documentation} for more details.
 * @returns {Operation}
 * @state {HttpState}
 */
export function listPaymentIntents(options = {}) {
  return async state => {
    const [resolvedoptions] = expandReferences(state, options);

    const response = await util.request(
      state.configuration,
      'GET',
      '/payment_intents',
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
 * Get a Stripe payment intent
 * @example
 * getPaymentIntent('pi_3RxS5EEAUr6ipfDB0aKo3moC');
 * @function
 * @public
 * @param {string} paymentIntentId - The ID of the payment intent to retrieve.
 * @returns {Operation}
 * @state {HttpState}
 */
export function getPaymentIntent(paymentIntentId) {
  return async state => {
    const [resolvedPaymentIntentId] = expandReferences(state, paymentIntentId);

    const response = await util.request(
      state.configuration,
      'GET',
      `/payment_intents/${resolvedPaymentIntentId}`,
      {}
    );

    return util.prepareNextState(state, response);
  };
}

/**
 * Get customers from Stripe
 * @example <caption>List all customers</caption>
 * listCustomers();
 * @example <caption>List customers with options</caption>
 * listCustomers({limit:3});
 * @example <caption>List customers with email option</caption>
 * listCustomers({ email: 'cs002@example.com' });
 * @function
 * @public
 * @param {object} options - Customers optional options object. See {@link https://docs.stripe.com/api/customers/list|Stripe Customers API documentation} for more details.
 * @returns {Operation}
 * @state {HttpState}
 */
export function listCustomers(options = {}) {
  return async state => {
    const [resolvedoptions] = expandReferences(state, options);

    const response = await util.request(
      state.configuration,
      'GET',
      '/customers',
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
 * Get a Stripe customer
 * @example
 * getCustomer('cus_SthTl85l20LRJj');
 * @function
 * @public
 * @param {string} customerId - The ID of the customer to retrieve.
 * @returns {Operation}
 * @state {HttpState}
 */
export function getCustomer(customerId) {
  return async state => {
    const [resolvedCustomerId] = expandReferences(state, customerId);

    const response = await util.request(
      state.configuration,
      'GET',
      `/customers/${resolvedCustomerId}`,
      {}
    );

    return util.prepareNextState(state, response);
  };
}

/**
 * List Stripe subscriptions
 * @example <caption>List all subscriptions</caption>
 * listSubscriptions();
 * @example <caption>List subscriptions with options</caption>
 * listSubscriptions({limit:3});
 * @function
 * @public
 * @param {object} options - Subscriptions optional options object. See {@link https://docs.stripe.com/api/subscriptions/list|Stripe Subscriptions API documentation} for more details.
 * @returns {Operation}
 * @state {HttpState}
 */
export function listSubscriptions(options = {}) {
  return async state => {
    const [resolvedoptions] = expandReferences(state, options);

    const response = await util.request(
      state.configuration,
      'GET',
      '/subscriptions',
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
 * Get a Stripe subscription
 * @example
 * getSubscription('sub_1MowQVLkdIwHu7ixeRlqHVzs');
 * @function
 * @public
 * @param {string} subscriptionId - The ID of the subscription to retrieve.
 * @returns {Operation}
 * @state {HttpState}
 */
export function getSubscription(subscriptionId) {
  return async state => {
    const [resolvedSsubscriptionId] = expandReferences(state, subscriptionId);

    const response = await util.request(
      state.configuration,
      'GET',
      `/subscriptions/${resolvedSsubscriptionId}`,
      {}
    );

    return util.prepareNextState(state, response);
  };
}

/**
 * Invoices Options object. See {@link https://docs.stripe.com/api/invoices/list|Stripe invoices API documentation} for more details.
 * @typedef {Object} InvoicesOptions
 * @public
 * @property {string} invoiceId - Id of a specific invoice to retrieve. If provided, only this invoice will be returned.
 * @property {object} created - An object of created fields for filtering the data.
 * @property {string} ending_before - Object string ID that defines your place in the list. Example: `obj_bar` in order to fetch the previous page of the list.
 * @property {string} starting_after - Object string ID that defines your place in the list. Example: `obj_foo` in order to fetch the next page of the list.
 * @property {number} limit - A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 10.
 * @property {string} collection_method - The collection method of the invoice to retrieve. Either `charge_automatically` or `send_invoice`.
 */

/**
 * List Stripe invoices
 * @example <caption>List all invoices</caption>
 * listInvoices();
 * @example <caption>List invoices with options</caption>
 * listInvoices({limit:3});
 * @example <caption>List a specific invoice</caption>
 * listInvoices({ invoiceId: 'in_1RyAGAEAUr6ipfDBTDSAgpj0' });
 * @function
 * @public
 * @param {InvoicesOptions} options - Optional invoice request options
 * @returns {Operation}
 * @state {HttpState}
 */
export function listInvoices(options = {}) {
  return async state => {
    const [resolvedoptions] = expandReferences(state, options);

    const response = await util.request(
      state.configuration,
      'GET',
      '/invoices',
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
 * Get a Stripe invoice
 * @example
 * getInvoice('in_1RyAGAEAUr6ipfDBTDSAgpj0');
 * @function
 * @public
 * @param {string} invoiceId - The ID of the invoice to retrieve.
 * @returns {Operation}
 * @state {HttpState}
 */
export function getInvoice(invoiceId) {
  return async state => {
    const [resolvedInvoiceId] = expandReferences(state, invoiceId);

    const response = await util.request(
      state.configuration,
      'GET',
      `/invoices/${resolvedInvoiceId}`,
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

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
 * Payment Intents Options object. See {@link https://docs.stripe.com/api/payment_intents/list|Stripe Payment Intents API documentation} for more details.
 * @typedef {Object} PaymentIntentsOptions
 * @public
 * @param {string} paymentIntentId - Id of a specific payment intent to retrieve. If provided, only this payment intent will be returned
 * @property {object} created - An object of created fields for filtering the data.
 * @property {string} ending_before - Object string ID that defines your place in the list. Example: `obj_bar` in order to fetch the previous page of the list.
 * @property {string} starting_after - Object string ID that defines your place in the list. Example: `obj_foo` in order to fetch the next page of the list.
 * @property {number} limit - A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 10.
 */

/**
 * Get payments from Stripe
 * @example <caption>List all payment intents</caption>
 * listPaymentIntents();
 * @example <caption>List payment intents with options</caption>
 * listPaymentIntents({limit:3});
 * @example <caption>List a specific payment intent</caption>
 * listPaymentIntents({ paymentIntentId: 'pi_3RxS5EEAUr6ipfDB0aKo3moC' });
 * @function
 * @public
 * @param {PaymentIntentsOptions} options - Optional payment intent request options
 * @returns {Operation}
 * @state {HttpState}
 */
export function listPaymentIntents(options = {}) {
  return async state => {
    const [resolvedoptions] = expandReferences(state, options);

    const { paymentIntentId } = resolvedoptions;
    delete resolvedoptions.paymentIntentId;

    const response = await util.request(
      state.configuration,
      'GET',
      paymentIntentId
        ? `/payment_intents/${paymentIntentId}`
        : '/payment_intents',
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
 * Customers Options object. See {@link https://docs.stripe.com/api/customers/list|Stripe Customers API documentation} for more details.
 * @typedef {Object} CustomersOptions
 * @public
 * @param {string} customerId - Id of a specific customer to retrieve. If provided, only this customer will be returned
 * @property {object} created - An object of created fields for filtering the data.
 * @property {string} ending_before - Object string ID that defines your place in the list. Example: `obj_bar` in order to fetch the previous page of the list.
 * @property {string} starting_after - Object string ID that defines your place in the list. Example: `obj_foo` in order to fetch the next page of the list.
 * @property {number} limit - A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 10.
 * @property {string} test_clock - Provides a list of customers that are associated with the specified test clock.
 * @property {string} email - Filter customers by email address.
 */

/**
 * Get customers from Stripe
 * @example <caption>List all customers</caption>
 * listCustomers();
 * @example <caption>List customers with options</caption>
 * listCustomers({limit:3});
 * @example <caption>List a specific customer</caption>
 * listCustomers({ customerId: 'cus_SthTl85l20LRJj' });
 * @function
 * @public
 * @param {CustomersOptions} options - Optional customer request options
 * @returns {Operation}
 * @state {HttpState}
 */
export function listCustomers(options = {}) {
  return async state => {
    const [resolvedoptions] = expandReferences(state, options);

    const { customerId } = resolvedoptions;
    delete resolvedoptions.customerId;

    const response = await util.request(
      state.configuration,
      'GET',
      customerId ? `/customers/${customerId}` : '/customers',
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
 * Subscriptions Options object. See {@link https://docs.stripe.com/api/subscriptions/list|Stripe Subscriptions API documentation} for more details.
 * @typedef {Object} SubscriptionsOptions
 * @public
 * @param {string} subscriptionId - Id of a specific subscription to retrieve. If provided, only this subscription will be returned
 * @property {object} created - An object of created fields for filtering the data.
 * @property {string} ending_before - Object string ID that defines your place in the list. Example: `obj_bar` in order to fetch the previous page of the list.
 * @property {string} starting_after - Object string ID that defines your place in the list. Example: `obj_foo` in order to fetch the next page of the list.
 * @property {number} limit - A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 10.
 * @property {string} test_clock - Provides a list of subscriptions that are associated with the specified test clock.
 * @property {string} price - Filter for subscriptions that contain this recurring price ID.
 * @property {string} customer - The ID of the customer whose subscriptions will be retrieved.
 */

/**
 * List Stripe subscriptions
 * @example <caption>List all subscriptions</caption>
 * listSubscriptions();
 * @example <caption>List subscriptions with options</caption>
 * listSubscriptions({limit:3});
 * @example <caption>List a specific subscription</caption>
 * listSubscriptions({ subscriptionId: 'sub_1MowQVLkdIwHu7ixeRlqHVzs' });
 * @function
 * @public
 * @param {SubscriptionsOptions} options - Optional subscription request options
 * @returns {Operation}
 * @state {HttpState}
 */
export function listSubscriptions(options = {}) {
  return async state => {
    const [resolvedoptions] = expandReferences(state, options);

    const { subscriptionId } = resolvedoptions;
    delete resolvedoptions.subscriptionId;

    const response = await util.request(
      state.configuration,
      'GET',
      subscriptionId ? `/subscriptions/${subscriptionId}` : '/subscriptions',
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
 * Invoices Options object. See {@link https://docs.stripe.com/api/invoices/list|Stripe invoices API documentation} for more details.
 * @typedef {Object} InvoicesOptions
 * @public
 * @param {string} invoiceId - Id of a specific invoice to retrieve. If provided, only this invoice will be returned.
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

    const { invoiceId } = resolvedoptions;
    delete resolvedoptions.invoiceId;

    const response = await util.request(
      state.configuration,
      'GET',
      invoiceId ? `/invoices/${invoiceId}` : '/invoices',
      {
        query: {
          ...resolvedoptions,
        },
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

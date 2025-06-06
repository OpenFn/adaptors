import { execute as commonExecute } from '@openfn/language-common';
import { post } from './Client';
import { resolve as resolveUrl } from 'url';
import { expandReferences } from '@openfn/language-common/util';

/**
 * Execute a sequence of operations.
 * Wraps `language-common/execute`, and prepends initial state for beyonic.
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
    return commonExecute(...operations)({ ...initialState, ...state });
  };
}

/**
 * Create a payment
 * @example <caption>Create a payment with a reference to a customer</caption>
 * createPayment(data)
 * @public
 * @function
 * @param {object} data - Payload data for the payment
 * @returns {Operation}
 */
export function createPayment(data) {
  return state => {
    const [body] = expandReferences(state, data);

    const { apiUrl, apiToken } = state.configuration;

    const url = resolveUrl(apiUrl + '/', 'payments');

    console.log('Posting payment:');
    console.log(body);

    return post({ apiToken, body, url }).then(result => {
      console.log('Success:', result);
      return { ...state, references: [result, ...state.references] };
    });
  };
}

/**
 * Create a contact
 * @example <caption>Create a contact</caption>
 * createContact(data)
 * @public
 * @function
 * @param {object} data - Payload data for the contact
 * @returns {Operation}
 */
export function createContact(data) {
  return state => {
    const [body] = expandReferences(state, data);

    const { apiUrl, apiToken } = state.configuration;

    const url = resolveUrl(apiUrl + '/', 'contacts');

    console.log('Posting contact:');
    console.log(body);

    return post({ apiToken, body, url }).then(result => {
      console.log('Success:', result);
      return { ...state, references: [result, ...state.references] };
    });
  };
}

/**
 * Create a collection request
 * @example <caption>Create a collection request</caption>
 * createCollectionRequest(data)
 * @public
 * @function
 * @param {object} data - Payload data for the collection request
 * @returns {Operation}
 */
export function createCollectionRequest(data) {
  return state => {
    const [body] = expandReferences(state, data);

    const { apiUrl, apiToken } = state.configuration;

    const url = resolveUrl(apiUrl + '/', 'collectionrequests');

    console.log('Posting collection request:');
    console.log(body);

    return post({ apiToken, body, url }).then(result => {
      console.log('Success:', result);
      return { ...state, references: [result, ...state.references] };
    });
  };
}

export {
  fn,
  fnIf,
  field,
  fields,
  sourceValue,
  merge,
  dataPath,
  dataValue,
  lastReferenceValue,
} from '@openfn/language-common';

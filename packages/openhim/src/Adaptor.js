import { execute as commonExecute } from '@openfn/language-common';
import { expandReferences } from '@openfn/language-common/util';
import { post } from './Client';
import { resolve as resolveUrl } from 'url';
import * as util from './Util';

/**
 * State object
 * @typedef {Object} HttpState
 * @private
 * @property data - the parsed response body
 * @property response - the response from the OpenHIM server, including headers, statusCode, etc
 * @property references - an array of all previous data objects used in the Job
 **/



/**
 * Execute a sequence of operations.
 * Wraps `language-common/execute`, and prepends initial state for openhim.
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
    return commonExecute(...operations)({ ...initialState, ...state });
  };
}

/**
 * Create an encounter
 * @example <caption>Create an encounter</caption
 * encounter(encounterData)
 * @function
 * @param {object} encounterData - Payload data for the encounter
 * @returns {Operation}
 */
export function encounter(encounterData) {
  return state => {
    const [body] = expandReferences(state, encounterData);

    const { username, password, apiUrl } = state.configuration;

    const url = resolveUrl(apiUrl + '/', 'chw/encounter');

    console.log('Posting encounter:');
    console.log(JSON.stringify(body, null, 2));

    return post({ username, password, body, url }).then(result => {
      console.log('Success:', result);
      return { ...state, references: [result, ...state.references] };
    });
  };
}

/**
 * Get transactions query options
 * @typedef {Object} OpenHIMGetTransactionsOptions
 * @public
 * @property {string} transactionId - The ID of the transaction to retrieve. If provided, only this transaction will be returned.
 * @property {number} filterLimit - The maximum number of transactions to return. Defaults to 100.
 * @property {number} filterPage - The page to return (used in conjunction with filterLimit).
 * @property {object} filterRepresentation - Determines how much information for a transaction to return.
 * @property {object} filters - Advanced filters to apply to the transactions. This is a JSON object that can include properties like `response.status` or `properties.prop`.
 */


/**
 * Make a request to OpenHIM to get transactions
 * @example <caption>Create a client</caption>
 * @example <caption>Get all transactions</caption>
 * http.request('GET','/transactions')
 * @function
 * @public
 * @param {OpenHIMGetTransactionsOptions} options - Optional request options
 * @returns {Operation}
 * @state {HttpState}
 */
export function getTransaction(options = {}) {
  return async state => {
    const [ resolvedoptions] =
      expandReferences(state,options);

    const {transactionId} = resolvedoptions;

    const response = await util.request(
      state.configuration,
      'GET',
      transactionId ? `/transactions/${transactionId}` : '/transactions',
      {
        query:{
          ...resolvedoptions,
        }
      }
    );

    return util.prepareNextState(state, response);
  };
}



export {
  fnIf,
  dataPath,
  dataValue,
  dateFns,
  cursor,
  each,
  field,
  fields,
  fn,
  lastReferenceValue,
  merge,
  sourceValue,
  as,
  map,
} from '@openfn/language-common';

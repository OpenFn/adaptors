/** @module Adaptor */
import {
  execute as commonExecute,
  expandReferences,
  composeNextState,
} from '@openfn/language-common';
import Nexmo from 'nexmo';

/**
 * Execute a sequence of operations.
 * Wraps `@openfn/language-common/execute`, and prepends initial state for http.
 * @example
 * execute(
 *   create('foo'),
 *   delete('bar')
 * )(state)
 * @constructor
 * @param {Operations} operations - Operations to be performed.
 * @returns {Operation}
 */
export function execute(...operations) {
  const initialState = {
    references: [],
    data: null,
  };

  return state => {
    return commonExecute(...operations)({
      ...initialState,
      ...state,
    });
  };
}

/**
 * Sends an SMS message to a specific phone number
 * @public
 * @example
 * sendSMS("OpenFn", "phoneNumber", "Hello World!")
 * @function
 * @param {String} from - Name or number the message should be sent from.
 * @param {String} toNumber - Destination phone number.
 * @param {String} message - Text message
 * @returns {Operation}
 */
export function sendSMS(from, toNumber, message) {
  return state => {
    const { apiKey, apiSecret } = state.configuration;

    const nexmo = new Nexmo({
      apiKey: apiKey,
      apiSecret: apiSecret,
    });

    return new Promise((resolve, reject) => {
      nexmo.message.sendSms(from, toNumber, message, (error, response) => {
        if (error) {
          console.error(error);
          reject(error);
        } else if (response.messages[0].status != '0') {
          console.error('Nexmo Error:');
          console.error(response);
          reject(response);
        } else {
          console.log(response);
          resolve(response);
        }
      });
    }).then(response => {
      const nextState = composeNextState(state, response);
      return nextState;
    });
  };
}

export {
  field,
  fields,
  sourceValue,
  fn,
  alterState,
  each,
  merge,
  dataPath,
  dataValue,
  lastReferenceValue,
} from '@openfn/language-common';

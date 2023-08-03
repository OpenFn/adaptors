import {
  execute as commonExecute,
  composeNextState,
} from '@openfn/language-common';
import { expandReferences } from '@openfn/language-common/util';
import { Auth } from '@vonage/auth';
import { Vonage } from '@vonage/server-sdk';

/**
 * Execute a sequence of operations.
 * Wraps `@openfn/language-common/execute`, and prepends initial state for http.
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
    return commonExecute(
      createClient,
      ...operations,
      cleanupState
    )({
      ...initialState,
      ...state,
    });
  };
}

function createClient(state) {
  const { apiKey, apiSecret } = state.configuration;
  // TODO: throws an error if apiKey not specified in configuration
  // TODO: should we set a default server if server not defined?
  const options = {};
  const credentials = new Auth({
    apiKey: apiKey,
    apiSecret: apiSecret,
  });

  const vonage = new Vonage(credentials, options);

  return { ...state, client: vonage };
}

function cleanupState(state) {
  delete state.client;
  return state;
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
    const [resolvedFrom, resolvedToNumber, resolvedMessage] = expandReferences(
      state,
      from,
      toNumber,
      message
    );

    return state.client.sms
      .send({ resolvedToNumber, resolvedFrom, resolvedMessage })
      .then(resp => {
        console.log('Message sent successfully');
        const nextState = composeNextState(state, resp);
        return nextState;
      })
      .catch(err => {
        console.log('There was an error sending the messages.');
        console.error(err);
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

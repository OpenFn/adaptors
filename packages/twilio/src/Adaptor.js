import { execute as commonExecute, composeNextState } from '@openfn/language-common';
import { expandReferences } from '@openfn/language-common/util';

/**
 * Execute a sequence of operations.
 * Wraps `language-common/execute`, and prepends initial state for http.
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
 * sendSMS({
 *  body: dataValue('sampleText'),
 *  from: dataValue('myFromNumber'),
 *  to: dataValue('ukMobile'),
 * });
 * @function
 * @param {Object} params - an object containing 'body', 'from', and 'to' keys.
 * @returns {Operation}
 */
export function sendSMS(params) {
  return state => {
    const { accountSid, authToken } = state.configuration;
    const [resolvedParams] = expandReferences(state, params);
    const { body, from, to } = resolvedParams;

    const client = require('twilio')(accountSid, authToken);

    return client.messages
      .create({ body, from, to })
      .then(response => {
        console.log(response);
        if (response.errorCode) {
          throw response.errorCode;
        }
        return composeNextState(state, response);
      });
  };
}

// TODO: write a bulkSms function that takes an array.
// export function bulkSMS(params) {}

export {
  field,
  fields,
  sourceValue,
  alterState,
  fn,
  fnIf,
  each,
  merge,
  dataPath,
  dataValue,
  lastReferenceValue,
} from '@openfn/language-common';

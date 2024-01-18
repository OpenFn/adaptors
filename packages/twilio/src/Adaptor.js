import {
  execute as commonExecute,
  expandReferences,
} from '@openfn/language-common';

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
    const { body, from, to } = expandReferences(params)(state);

    const client = require('twilio')(accountSid, authToken);

    return new Promise((resolve, reject) => {
      client.messages
        .create({ body, from, to })
        .then(response => {
          if (response.errorCode) {
            console.log(response);
            reject(response.errorCode);
          }
          console.log(response);
          return response;
        })
        .done();
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
  http,
  each,
  merge,
  dataPath,
  dataValue,
  lastReferenceValue,
} from '@openfn/language-common';

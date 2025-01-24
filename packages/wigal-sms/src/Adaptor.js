import { execute as commonExecute } from '@openfn/language-common';
import * as util from './util';
import { createServer } from './mock';

/**
 * Executes an operation.
 * @function
 * @private
 * @param {Operation} operations - Operations
 * @returns {State}
 */
export function execute(...operations) {
  const initialState = {
    references: [],
    data: null,
    configuration: {},
  };

  return state => {
    if (!state.configuration.baseUrl) {
      const client = createServer();
      util.setMockClient(client);
    }
    return commonExecute(...operations)({ ...initialState, ...state });
  };
}

/**
 * Send SMS using Wigal SMS Gateway API
 * 
 * @example
 * {"senderid":"Stevkky","destinations":[{"destination":"0552825710"}],"message":"This is a sample message for SMS sending via Wigal FROG API.","smstype":"text"}
 * @param {object} data  - SMS payload to push to Wigal. This includes the message, phone number, etc
 * @param {*} options  - any other options
 * @returns  {Operation}
 * @state {HttpState}
 */
export function sendSms(data, options = {}) {
  return util.request('/api/v3/sms/send', {
    method: 'POST',
    data,
    ...options,
  });
}

export {
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
} from '@openfn/language-common';

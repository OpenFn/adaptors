import { execute as commonExecute } from '@openfn/language-common';
import * as util from './util';
import { createServer } from './mock';

/**
 * SMS Request Object
 * @typedef {Object} SMSRequestObject
 * @public
 * @property {string} senderid - The senderID used for sending message. Approved SenderIDs only
 * @property {array} destinations - An array of objects containing the destination phone number and message to be sent
 * @property {string} message - The message to be sent to the destinations
 * @property {string} smstype - The type of message to be sent. Default is 'text'
 */
/**
 * State object
 * @typedef {Object} SendSMSState
 * @property data - the parsed response body. containt status and message response
 * @property response - the response from the Wigal SMS server, including headers, statusCode etc
 * @property references - an array of all previous data objects used in the Job
 * @private
 **/
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
 * @example <caption>Send General SMS message</caption>
 * sendSms({
 *   senderid: "Stevkky",
 *   destinations: [{ destination: "0552825710" }],
 *   message: "This is a sample message for SMS sending via Wigal FROG API.",
 *   smstype: "text",
 * });
 * @example <caption>Send Personalized SMS message</caption>
 * sendSms({
 *   senderid: "Stevkky",
 *   destinations: [
 *     {
 *       destination: "0542709440",
 *       message: "Hello Joe your order is ready",
 *       msgid: "MGS1010101",
 *       smstype: "text",
 *     },
 *   ],
 * });
 * @function
 * @public
 * @param {SMSRequestObject} data  - SMS payload to push to Wigal. This includes the message, phone number, etc
 * @returns {Operation}
 * @state {SendSMSState}
 */
export function sendSms(data) {
  return util.request('/api/v3/sms/send', {
    method: 'POST',
    data,
  });
}

export {
  fn,
  fnIf,
  each,
  merge,
  field,
  fields,
  cursor,
  dateFns,
  dataPath,
  dataValue,
  sourceValue,
  lastReferenceValue,
} from '@openfn/language-common';

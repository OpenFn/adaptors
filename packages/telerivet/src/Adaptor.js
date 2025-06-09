import { execute as commonExecute } from '@openfn/language-common';
import { expandReferences } from '@openfn/language-common/util';
import { post } from './Client';

/**
 * Execute a sequence of operations.
 * Wraps `@openfn/language-common/execute`, and prepends initial state for telerivet.
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
 * Send a message
 * @example <caption>Send a message</caption>
 * send({
 *   to_number: "+1234567890",
 *   content: "Hello from Telerivet",
 *   route_id: "PN123",
 * });
 * @function
 * @param {object} sendData - Payload data for the message
 * @returns {Operation}
 */
export function send(sendData) {
  return state => {
    const [body] = expandReferences(state, sendData);

    const { projectId, apiKey } = state.configuration;

    const url = 'https://api.telerivet.com/v1/projects/'.concat(
      projectId,
      '/messages/send'
    );

    console.log(url);
    console.log('Posting message to send:');
    console.log(body);

    return post({ apiKey, body, url }).then(result => {
      console.log('Success:', result);
      return { ...state, references: [result, ...state.references] };
    });
  };
}

export {
  fn,
  fnIf,
  alterState,
  field,
  fields,
  sourceValue,
  merge,
  dataPath,
  dataValue,
  lastReferenceValue,
} from '@openfn/language-common';

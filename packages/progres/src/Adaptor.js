import {
  execute as commonExecute,
  composeNextState,
} from '@openfn/language-common';
import { expandReferences, request } from '@openfn/language-common/util';

/**
 * Execute a sequence of operations.
 * Wraps `language-common/execute`, and prepends initial state for http.
 * @example
 * execute(
 *   create('foo'),
 *   delete('bar')
 * )
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
 * Make a POST request with a certificate
 * @public
 * @example
 * postData({
 *  url: urlDTP,
 *  body: obj,
 *  headers: {
 *    'Ocp-Apim-Subscription-Key': configuration['Ocp-Apim-Subscription-Key'],
 *  },
 *  agentOptions: {
 *    key,
 *    cert,
 *  },
 * }, callback)
 * @function
 * @param {object} params - Url, Headers and Body parameters
 * @param {function} callback - (Optional) A callback function
 * @returns {Operation}
 */
export function postData(params, callback = s => s) {
  return async state => {
    const [resolvedParams] = expandReferences(state, params);
    const { url, body, headers, agentOptions } = resolvedParams;

    const result = await request('POST', url, {
      body,
      headers,
      agentOptions,
    });
    console.log('POST succeeded.');

    const { body: responseBody, ...responseWithoutBody } = result;

    return callback({
      ...composeNextState(state, responseBody),
      response: responseWithoutBody,
    });
  };
}

export {
  fn,
  fnIf,
  alterState,
  dataPath,
  dataValue,
  each,
  field,
  fields,
  lastReferenceValue,
  merge,
  sourceValue,
} from '@openfn/language-common';

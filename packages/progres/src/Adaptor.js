import {
  execute as commonExecute,
  composeNextState,
  expandReferences,
  http, // Important: this is the OLD axios-based http
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
 * }, callback)(state)
 * @function
 * @param {object} params - Url, Headers and Body parameters
 * @param {function} callback - (Optional) A callback function
 * @returns {Operation}
 */
export function postData(params, callback) {
  return state => {
    const { url, body, headers, agentOptions } =
      expandReferences(params)(state);

    return http
      .post({
        method: 'post',
        url,
        data: body,
        headers,
        agentOptions,
      })(state)
      .then(response => {
        console.log('POST succeeded.');

        const nextState = composeNextState(state, response);
        if (callback) return callback(nextState);
        return nextState;
      })
      .catch(error => {
        console.log(error);
        return error;
      });
  };
}

// What functions do you want from the common adaptor?
export {
  fn,
  fnIf,
  alterState,
  dataPath,
  dataValue,
  each,
  field,
  fields,
  http, // Important: this is the OLD axios-based http. Public docs will be incorrect.
  lastReferenceValue,
  merge,
  sourceValue,
} from '@openfn/language-common';

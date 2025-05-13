import {
  execute as commonExecute,
  composeNextState,
} from '@openfn/language-common';
import {
  normalizeOauthConfig,
  expandReferences,
} from '@openfn/language-common/util';
import request from 'request';

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
    return commonExecute(...operations)({
      ...initialState,
      ...state,
      configuration: normalizeOauthConfig(state.configuration),
    });
  };
}

/**
 * Post a message
 * @public
 * @example
 * postMessage({
 *  "recipient": {
 *     "id": "your-psid"
 *   },
 *   "message": {
 *     "text": "your-message"
 *   }
 * })
 * @function
 * @param {object} params - data to make the fetch
 * @returns {Operation}
 */
export function postMessage(params) {
  return state => {
    function assembleError({ response, error }) {
      if (response && [200, 201, 202, 204].indexOf(response.statusCode) > -1)
        return false;
      if (error) return error;
      return new Error(`Server responded with ${response.statusCode}`);
    }

    const { accessToken } = state.configuration;

    const url = `https://graph.facebook.com/v2.6/me/messages?access_token=${accessToken}`;

    const [resolvedParams] = expandReferences(state, params);
    const { headers, message, recipient } = resolvedParams;

    const body = {
      messaging_type: 'UPDATE',
      recipient: recipient,
      message: message,
    };

    return new Promise((resolve, reject) => {
      console.log('Request body:');
      console.log('\n' + JSON.stringify(body, null, 4) + '\n');
      request.post(
        {
          url,
          headers,
          json: body,
        },
        function (err, response, body) {
          const error = assembleError({ error: err, response });
          if (error) {
            reject(error);
            console.log(response);
          } else {
            console.log('Printing response...\n');
            console.log(JSON.stringify(response, null, 4) + '\n');
            console.log('Post Message succeeded.');
            resolve(body);
          }
        }
      );
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
  fnIf,
  alterState,
  each,
  merge,
  dataPath,
  dataValue,
  lastReferenceValue,
} from '@openfn/language-common';

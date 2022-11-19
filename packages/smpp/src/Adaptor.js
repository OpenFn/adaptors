import {
  execute as commonExecute,
  expandReferences,
} from '@openfn/language-common';
import request from 'request';

/**
 * Execute a sequence of operations.
 * Wraps `@openfn/language-common/execute`, and prepends initial state for http.
 * @example
 * execute(
 *   create('foo'),
 *   delete('bar')
 * )(state)
 * @function
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

export function send(params) {
  return state => {
    const { recipient, sender, text, smsId } = expandReferences(params)(state);

    const { systemId, password, clientHost, inboxId } = state.configuration;

    const url = `${clientHost}/smpp/${inboxId}/send`;

    const body = { recipient, sender, text, smsId };

    const auth = {
      username: systemId,
      password: password,
    };

    function assembleError({ response, error }) {
      if (response && [200, 201, 202, 204].indexOf(response.statusCode) > -1)
        return false;
      if (error) return error;
      return new Error(`Server responded with ${response.statusCode}`);
    }

    console.log('Sending message... ' + url);
    console.log('With body: ' + JSON.stringify(body, null, 2));

    return new Promise((resolve, reject) => {
      request.post(
        {
          url: url,
          json: body,
          auth,
        },
        function (error, response, body) {
          error = assembleError({ response, error });
          if (error) {
            reject(error);
          } else {
            console.log(
              'Message sent to SMPP server: ' +
                response.statusCode +
                '/' +
                response.statusMessage
            );
            resolve(response);
          }
        }
      );
    }).then(data => {
      const nextState = { ...state, response: { body: data } };
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

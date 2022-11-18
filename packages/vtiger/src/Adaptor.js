import {
  execute as commonExecute,
  expandReferences,
} from '@openfn/language-common';
import request from 'request';
import md5 from 'md5';

import pkg from 'lodash-fp';
const { flatten } = pkg;

function assembleError({ response, error }) {
  if (response && [200, 201, 202, 204].indexOf(response.statusCode) > -1)
    return false;
  if (error) return error;
  return new Error(`Server responded with ${response.statusCode}`);
}

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
    return commonExecute(
      challenge,
      login,
      ...flatten(operations)
    )({ ...initialState, ...state });
  };
}

function challenge(state) {
  const { hostUrl, username, accessToken } = state.configuration;

  console.info(`Challenging as ${username}...`);

  return new Promise((resolve, reject) => {
    request.get(
      `${hostUrl}/webservice.php?operation=getchallenge&username=${username}`,
      function (error, response, body) {
        error = assembleError({ response, error });
        if (error) {
          reject(error);
        } else {
          console.log('Challenge succeeded.');
          // console.log(body)
          body = JSON.parse(body);
          resolve(body.result.token);
        }
      }
    );
  }).then(value => {
    return { ...state, token: value };
  });
}

export function login(state) {
  const { hostUrl, username, accessToken } = state.configuration;

  const { token } = state;

  console.info(`Logging in...`);

  return new Promise((resolve, reject) => {
    request.post(
      {
        url: `${hostUrl}/webservice.php`,
        form: {
          operation: 'login',
          username: username,
          accessKey: md5(token + accessToken),
        },
      },
      function (error, response, body) {
        error = assembleError({ response, error });
        if (error) {
          console.log(response);
          reject(error);
        } else {
          console.log('Login succeeded.');
          // console.log(body)
          body = JSON.parse(body);
          resolve(body);
        }
      }
    );
  }).then(result => {
    return { ...state, session: result };
  });
}

export function listTypes() {
  return state => {
    const { hostUrl } = state.configuration;
    const { sessionName } = state.session.result;

    return new Promise((resolve, reject) => {
      request.post(
        {
          url: `${hostUrl}/webservice.php`,
          form: { operation: 'listTypes', sessionName },
        },
        function (error, response, body) {
          error = assembleError({ response, error });
          if (error) {
            reject(error);
          } else {
            console.log(body);
            resolve(body);
          }
        }
      );
    }).then(data => {
      const nextState = { ...state, response: { body: data } };
      return nextState;
    });
  };
}

export function postElement(params) {
  return state => {
    const { hostUrl } = state.configuration;
    const { sessionName } = state.session.result;

    const { elementType, element, operation } = expandReferences(params)(state);

    const url = `${hostUrl}/webservice.php`;
    // const url = 'https://requestb.in/1irtrgz1';

    console.log(`Performing a(n) ${operation} on ${elementType}.`);

    const body = {
      sessionName,
      operation,
      elementType,
      element: JSON.stringify(element),
    };

    return new Promise((resolve, reject) => {
      request.post(
        {
          url: url,
          form: body,
        },
        function (error, response, body) {
          error = assembleError({ response, error });
          if (error) {
            console.log(response);
            reject(error);
          } else {
            console.log(body);
            resolve(body);
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
  alterState,
  fn,
  each,
  merge,
  dataPath,
  dataValue,
  lastReferenceValue,
} from '@openfn/language-common';

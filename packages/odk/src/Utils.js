import { composeNextState } from '@openfn/language-common';
import {
  request as commonRequest,
  logResponse,
} from '@openfn/language-common/util';

export const authorize = state => {
  const { baseUrl, access_token, email, password } = state.configuration;

  if (access_token) {
    return state;
  }

  if (email && password) {
    const options = {
      body: JSON.stringify({ email, password }),
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
      baseUrl,
      parseAs: 'json',
      maxRedirections: 1,
    };
    return commonRequest('POST', '/v1/sessions', options)
      .then(response => {
        return {
          ...state,
          configuration: {
            ...state.configuration,
            access_token: response.body.token,
          },
        };
      })
      .catch(err => {
        console.log('Error authenticating with ODK.');
        throw err;
      });
  }

  // warn if no auth found
  console.warn(`WARNING: no authentication properties found on congfiguration schema!
    
Make sure to either set an access_token or email & password`);
};

export const prepareNextState = (state, response, callback = s => s) => {
  const { body, ...responseWithoutBody } = response;

  if (!state.references) {
    state.references = [];
  }

  const nextState = {
    ...composeNextState(state, body),
    response: responseWithoutBody,
  };

  return callback(nextState);
};

export const request = (
  configuration = {},
  method,
  path,
  data,
  headers = {}
) => {
  const { baseUrl, access_token } = configuration;

  const options = {
    body: data,

    headers: {
      ...headers,
      'content-type': 'application/json',
      Authorization: `Bearer ${access_token}`,
    },
    baseUrl,
    parseAs: 'json',
  };

  return commonRequest(method, path, options).then(logResponse);
};

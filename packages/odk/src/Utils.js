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
        console.error('Error authenticating with ODK');
        console.log(err.body);
        throw err;
      });
  }

  // warn if no auth found
  console.warn(`WARNING: no authentication properties found on configuration schema!
    
Make sure to either set an access_token or email & password`);
};

export const prepareNextState = (state, response) => {
  const { body, ...responseWithoutBody } = response;

  return {
    ...composeNextState(state, body),
    response: responseWithoutBody,
  };
};

export const request = (
  configuration = {},
  method,
  path,
  body,
  options = {}
) => {
  const { baseUrl, access_token } = configuration;
  const { headers = {}, ...otherOptions } = options;
  const opts = {
    body,

    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${access_token}`,
      ...headers,
    },
    baseUrl,
    parseAs: 'json',
    ...otherOptions,
  };

  return commonRequest(method, path, opts).then(logResponse);
};

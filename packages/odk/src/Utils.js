import { composeNextState } from '@openfn/language-common';
import {
  request as commonRequest,
  logResponse,
} from '@openfn/language-common/util';

export const authorize = state => {
  const auth = state.configuration;
  if (auth.access_token) {
    return state;
  }

  const email = auth.username;
  const password = auth.password;

  if (email && password) {
    const options = {
      body: JSON.stringify({ email, password }),
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
      baseUrl: auth.baseUrl,
      parseAs: 'json',
      maxRedirections: 1,
    };
    return commonRequest('POST', '/v1/sessions', options).then(response => {
      return {
        ...state,
        configuration: {
          ...state.configuration,
          access_token: response.body.token,
        },
      };
    });
  }
};
export const prepareNextState = (state, response, callback = s => s) => {
  const { body, ...responseWithoutBody } = response;

  if (!state.references) {
    state.references = [];
  }

  const nextState = {
    ...composeNextState(state, response.body),
    response: responseWithoutBody,
  };

  return callback(nextState);
};

function removeLeadingSlash(url) {
  if (url.startsWith('/')) {
    return url.substring(1);
  }
  return url;
}

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

    parseAs: 'json',
  };

  const url = `${baseUrl}/${removeLeadingSlash(path)}`;

  return commonRequest(method, url, options).then(logResponse);
};

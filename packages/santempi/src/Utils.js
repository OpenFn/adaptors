import { composeNextState } from '@openfn/language-common';
import {
  request as commonRequest,
  logResponse,
} from '@openfn/language-common/util';
import nodepath from 'node:path';

export const prepareNextState = (state, response) => {
  const { body, ...responseWithoutBody } = response;

  if (!state.references) {
    state.references = [];
  }

  return {
    ...composeNextState(state, response.body),
    response: responseWithoutBody,
  };
};

export const authorize = state => {
  const { baseUrl, access_token, username, password, clientId, clientSecret } =
    state.configuration;

  if (access_token) {
    console.log('Logging in with access token');
    return state;
  }
  if (clientId && clientSecret && username && password && baseUrl) {
    const formBody = new URLSearchParams();
    formBody.append('username', username);
    formBody.append('password', password);
    formBody.append('grant_type', 'password');
    formBody.append('client_id', clientId);
    formBody.append('client_secret', clientSecret);

    const options = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      method: 'POST',
      parseAs: 'json',
      body: formBody.toString(),
      baseUrl,
    };
    return commonRequest('POST', '/empi/auth/oauth2_token', options).then(
      response => ({
        ...state,
        configuration: {
          ...state.configuration,
          access_token: response.body.access_token,
        },
      }),
    );
  } else {
    throw new Error(
      'Invalid authorization credentials. Include clientId, username, and password in state.configuration',
    );
  }
};

export const request = (configuration = {}, method, path, options) => {
  const { baseUrl, access_token } = configuration;
    if (options.query) console.log(`with params: `, options.query);

    const {headers, ...rest} = options;

  const opts = {
    parseAs: 'json',
    baseUrl,

    ...rest,
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${access_token}`,
      ...headers,
    },
  };

  const safePath = nodepath.join('/empi', path);
  return commonRequest(method, safePath, opts).then(logResponse);
};
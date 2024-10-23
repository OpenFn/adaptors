import { composeNextState } from '@openfn/language-common';
import {
  request as commonRequest,
  assertRelativeUrl,
  logResponse,
} from '@openfn/language-common/util';
import nodepath from 'node:path';

export const authorize = state => {
  const auth = state.configuration ?? {};
  if (auth.access_token) {
    return state;
  }

  const { clientId: client_id, password } = auth;

  const headers = {};

  if (client_id && password) {
    Object.assign(headers, {
      'Content-Type': 'application/json',
    });

    const body = {
      client_id,
      password,
    };
    const options = {
      body,
      headers,
      method: 'POST',
      parseAs: 'json',
      baseUrl: auth.baseUrl,
    };

    return commonRequest('POST', '/api/v1/auth/clientLogin', options).then(
      response => {
        return {
          ...state,
          configuration: {
            ...state.configuration,
            access_token: response.body.access_token,
          },
        };
      }
    );
  } else {
    throw new Error(
      'Invalid authorization credentials. Include clientId and password in state.configuration'
    );
  }
};

export const prepareNextState = (state, response, callback = s => s) => {
  const { body, ...responseWithoutBody } = response;

  const nextState = {
    ...composeNextState(state, response.body),
    response: responseWithoutBody,
  };

  return callback(nextState);
};

export const request = (configuration, method, path, options) => {
  const { baseUrl, access_token } = configuration ?? {};

  const { data, params = {} } = options;

  const headers = {
    Authorization: `Bearer ${access_token}`,
    'content-type': 'application/json',
  };

  assertRelativeUrl(path);

  const opts = {
    parseAs: 'json',
    body: data,
    query: params,
    baseUrl,
    headers,
  };

  const safePath = nodepath.join('/api/v1', path);

  return commonRequest(method, safePath, opts).then(logResponse);
};

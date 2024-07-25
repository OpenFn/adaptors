import nodepath from 'node:path';
import { composeNextState } from '@openfn/language-common';
import {
  assertRelativeUrl,
  request as commonRequest,
  makeBasicAuthHeader,
} from '@openfn/language-common/util';

export const authorize = state => {
  const { baseUrl, access_token, username, password, clientId, clientSecret } =
    state.configuration;

  if (access_token) {
    console.log('Logging in with access token');
    return state;
  }
  if (!clientId) {
    console.warn('WARNING: Client ID is required');
  }
  if (!clientSecret) {
    console.warn('WARNING: Client Secret is required');
  }

  const headers = makeBasicAuthHeader(clientId, clientSecret);

  if (username && password) {
    console.log('Logging in with user-based client credentials');
    const options = {
      query: { grant_type: 'password', username, password },
      headers: {
        'Content-Type': 'application/json',
        ...headers,
      },
      baseUrl,
      parseAs: 'json',
      maxRedirections: 1,
    };
    return commonRequest('POST', '/api/oauth/token', options).then(
      response => ({
        ...state,
        configuration: {
          ...state.configuration,
          access_token: response.body.access_token,
        },
      })
    );
  }

  // warn if no auth found
  console.warn(
    `WARNING: no authentication properties found on configuration schema!`
  );
  console.warn(
    'Make sure to either set an access_token or username, password, clientId, and clientSecret'
  );
};

export const prepareNextState = (state, response, callback = s => s) => {
  const { body, ...responseWithoutBody } = response;

  const nextState = {
    ...composeNextState(state, response.body),
    response: responseWithoutBody,
  };

  return callback(nextState);
};

export const request = (configuration = {}, method, path, options) => {
  const safepath = nodepath.join('api', path);
  const { baseUrl, access_token } = configuration;
  const { headers = {}, ...otherOptions } = options;

  assertRelativeUrl(path);

  const opts = {
    parseAs: 'json',
    baseUrl,
    headers: {
      ...headers,
      'content-type': 'application/json',
      Authorization: `Bearer ${access_token}`,
    },
    ...otherOptions,
  };

  return commonRequest(method, safepath, opts);
};

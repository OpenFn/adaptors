import { composeNextState } from '@openfn/language-common';
import {
  request as commonRequest,
  logResponse,
  makeBasicAuthHeader,
} from '@openfn/language-common/util';

export const authorize = state => {
  const { baseUrl, access_token, username, password, clientId, clientSecret } =
    state.configuration;

  const headers = makeBasicAuthHeader(clientId, clientSecret);

  if (access_token) return state;

  if (username && password) {
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
    return commonRequest('POST', '/api/oauth/token', options)
      .then(response => {
        return {
          ...state,
          configuration: {
            ...state.configuration,
            access_token: response.body.access_token,
          },
        };
      })
      .catch(err => {
        console.error('Error authenticating with OpenLMIS');
        console.log(err.body);
        throw err;
      });
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
  const { baseUrl, access_token } = configuration;
  const { headers = {}, ...otherOptions } = options;

  urlMatchesBase(path, baseUrl);

  const opts = {
    parseAs: 'json',
    baseUrl: `${baseUrl}/api`,
    headers: {
      ...headers,
      'content-type': 'application/json',
      Authorization: `Bearer ${access_token}`,
    },
    ...otherOptions,
  };

  return commonRequest(method, path, opts);
};

function urlMatchesBase(path, baseUrl) {
  const base = new URL(baseUrl);
  const url = new URL(path, baseUrl);

  if (url.origin !== base.origin) {
    throw new Error(`The URL ${path} does not match the base URL ${baseUrl}`);
  }

  return true;
}

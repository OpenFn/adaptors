import { composeNextState } from '@openfn/language-common';
import {
  request as commonRequest,
  logResponse,
  assertRelativeUrl,
} from '@openfn/language-common/util';

export const authorize = async state => {
  const auth = state.configuration;
  if (auth.access_token) {
    return state;
  }

  const clientId = auth.clientId;
  const clientSecret = auth.clientSecret;
  const headers = {
    Accept: '*/*',
    'Content-type': 'application/json',
  };

  if (clientId && clientSecret) {
    const options = {
      headers,
      method: 'POST',
      parseAs: 'json',
      baseUrl: `https://auth.${auth.domain}`,
      query: {
        grant_type: 'client_credentials',
        client_secret: clientSecret,
        client_id: clientId,
      },
    };

    return commonRequest('POST', '/token', options).then(response => {
      return {
        ...state,
        configuration: {
          ...state.configuration,
          access_token: response.body.access_token,
        },
      };
    });
  } else {
    throw new Error(
      'Invalid authorization credentials. Include clientId and clientSecret in state.configuration'
    );
  }
};

export const prepareNextState = (state, response, callback = s => s) => {
  const { body, ...responseWithoutBody } = response;
  const nextState = {
    ...composeNextState(state, body),
    response: responseWithoutBody,
  };

  return callback(nextState);
};

export async function request(configuration, method, path, opts) {
  const { domain, access_token } = configuration;

  const { body = {}, params = {}, parseAs = 'json' } = opts;

  assertRelativeUrl(path);

  const options = {
    body,
    headers: {
      Authorization: `Bearer ${access_token}`,
      'Content-type': 'application/json',
    },
    query: params,
    parseAs,
    baseUrl: `https://gateway.${domain}`,
  };

  return commonRequest(method, path, options).then(logResponse);
}

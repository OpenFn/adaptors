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

export const authorize = async state => {
  const {
    clientId,
    tokenUrl = 'https://primespingb2cuat.b2clogin.com',
    scope = 'https://primespingb2cuat.onmicrosoft.com/apimurls/API.Read',
    username,
    password,
    access_token,
  } = state.configuration;

  if (access_token) {
    return state;
  }

  if (clientId && scope && tokenUrl && username && password) {

    const formBody = new URLSearchParams();
    formBody.append('username', username);
    formBody.append('password', password);
    formBody.append('grant_type', 'password');
    formBody.append('scope', scope);
    formBody.append('client_id', clientId);
    formBody.append('response_type', 'token');

    const options = {
      headers: {
        Cookie: "x-ms-cpim-geo=EU",
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      method: 'POST',
      parseAs: 'json',
      body: formBody.toString(),
      baseUrl: tokenUrl,
    };

    return commonRequest('POST', '/primespingb2cuat.onmicrosoft.com/b2c_1_msawe-primes-ping-test-apim-rpocuf/oauth2/v2.0/token', options).then(response => {
      return {
        ...state,
        configuration: {
          ...state.configuration,
          access_token: response.body.access_token,
          token_type: response.body.token_type,
          expires_in: response.body.expires_in,
        },
      };
    });
  } else {
    throw new Error(
      'Invalid authorization credentials. Include clientId, username, and password in state.configuration',
    );
  }
};

export const request = (configuration = {}, method, path, options) => {
  const { baseUrl, access_token, subscriptionKey } = configuration;



  const opts = {
    parseAs: 'json',
    baseUrl,

    ...options,
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${access_token}`,
      'Ocp-Apim-Subscription-Key': subscriptionKey,
      ...options?.headers,
    },
  };

  const safePath = nodepath.join(path);

  return commonRequest(method, safePath, opts).then(logResponse);
};

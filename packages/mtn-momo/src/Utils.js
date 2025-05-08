import { composeNextState } from '@openfn/language-common';
import {
  request as commonRequest,
  makeBasicAuthHeader,
  logResponse
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

export const getAccessToken = async (configuration) => {

  const { api_user, api_key, subscription_key, baseUrl } = configuration;

  const auth_header = makeBasicAuthHeader(api_user, api_key);

  const { body: { access_token } } = await commonRequest('POST', '/collection/token/', {
    headers: {
      ...auth_header,
      'Cache-Control': 'no-cache',
      'Ocp-Apim-Subscription-Key': subscription_key,
      'Content-Type': 'application/json'
    },
    baseUrl,
  });

  return access_token;
}

export const request = async (state, method, path, options) => {

  const { baseUrl, subscription_key, access_token: savedToken } = state.configuration;

  const errors = {
    404: 'Page not found',
  };
  //reuse token if already saved in state.configuration
  let token = savedToken;

  if (!token && (!options.headers?.Authorization)) {
    token = await getAccessToken(state.configuration);
    state.configuration.access_token = token; // persiste for next call
  }

  let opts = {
    parseAs: 'json',
    errors,
    baseUrl,
    ...options,
    headers: {
      'Cache-Control': 'no-cache',
      'Ocp-Apim-Subscription-Key': subscription_key,
      'Authorization': `Bearer ${token}`,
      ...options.headers,
    },
  };

  const safePath = nodepath.join(path);

  return commonRequest(method, safePath, opts).then(logResponse);
};

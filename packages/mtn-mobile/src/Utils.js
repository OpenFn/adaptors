import { composeNextState } from '@openfn/language-common';
import {
  request as commonRequest,
  makeBasicAuthHeader,
  logResponse
} from '@openfn/language-common/util';
import nodepath from 'node:path';


let access_token;

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

  const { baseUrl, subscription_key } = state.configuration;

  const errors = {
    404: 'Page not found',
  };

  if (!access_token && (!options.headers?.Authorization)) {
    access_token = await getAccessToken(state.configuration);
  }

  let opts = {
    parseAs: 'json',
    errors,
    baseUrl,
    ...options,
    headers: {
      'Cache-Control': 'no-cache',
      'Ocp-Apim-Subscription-Key': subscription_key,
      'Authorization': `Bearer ${access_token}`,
      ...options.headers,
    },
  };

  const safePath = nodepath.join(path);

  return commonRequest(method, safePath, opts).then(logResponse);
};

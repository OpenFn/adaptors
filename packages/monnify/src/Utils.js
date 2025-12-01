import { composeNextState } from '@openfn/language-common';
import {
  request as commonRequest,
  logResponse,
  makeBasicAuthHeader
} from '@openfn/language-common/util';
import nodepath from 'node:path';


export const prepareNextState = (state, response) => {
  const { body, ...responseWithoutBody } = response;

  if (!state.references) {
    state.references = [];
  }

  return {
    ...composeNextState(state, body),
    response: responseWithoutBody,
  };
};

export const getAccessToken = async (configuration, headers) => {
  const { apiKey, secretKey, baseUrl } = configuration;

  const { body } = await commonRequest('POST', 'api/v1/auth/login', {
    headers: {
      ...headers,
      ...makeBasicAuthHeader(apiKey, secretKey)
    },
    baseUrl,
    parseAs: 'json'
  });

  return { ...configuration, access_token: body.responseBody.accessToken }
};

export const request = async (configuration = {}, method, path, options) => {
  // local variable for storing configuration. Using let due to reasssignment ops downstream.
  let config = configuration

  const { baseUrl, access_token } = config;

  if (!access_token)
    config = await getAccessToken(config, options.headers)

  const { query = {}, body = {} } = options;

  const opts = {
    parseAs: 'json',
    baseUrl,
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${config.access_token}`,
      ...options.headers,
    },
    body,
    query,
    ...options,
  };

  const safePath = nodepath.join(path);

  return commonRequest(method, safePath, opts).then(logResponse);
};

import { composeNextState } from '@openfn/language-common';
import {
  request as commonRequest,
  logResponse,
} from '@openfn/language-common/util';
import nodepath from 'node:path';

const defaultBaseUrl = 'https://pay.pesapal.com';

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

export const getAccessToken = async configuration => {
  const {
    consumer_key,
    consumer_secret,
    access_token,
    baseUrl = defaultBaseUrl,
    apiVersion = 'v3',
  } = configuration;

  if (access_token) {
    return access_token;
  }

  const {
    body: { token },
  } = await commonRequest('POST', `/${apiVersion}/api/Auth/RequestToken`, {
    headers: {
      'Content-Type': 'application/json',
    },
    baseUrl,
    body: {
      consumer_key,
      consumer_secret,
    },
  });

  return token;
};

export const request = async (
  configuration = {},
  method,
  path,
  options = {}
) => {
  const { baseUrl = defaultBaseUrl, apiVersion = 'pesapalv3' } = configuration;
  const access_token = await getAccessToken(configuration);

  const { query = {}, body = {}, headers = {} } = options;

  const opts = {
    parseAs: 'json',
    baseUrl: `${baseUrl}/${apiVersion}/api`,
    body,
    query,
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${access_token}`,
      ...headers,
    },
    ...options,
  };

  const safePath = nodepath.join(path);

  return commonRequest(method, safePath, opts).then(logResponse);
};

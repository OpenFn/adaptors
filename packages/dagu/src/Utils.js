import { composeNextState } from '@openfn/language-common';
import {
  request as commonRequest,
  logResponse,
} from '@openfn/language-common/util';
import nodepath from 'node:path';


let access_token;

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
  const { username, password, baseUrl } = configuration;

  const { body } = await commonRequest('POST', '/account/login', {
    headers: {
      'content-type': 'application/json',
      ...headers
    },
    baseUrl,
    parseAs: 'json',
    body: {
      username,
      password,
    },
  });

  return body.token.access_token;
};

export const request = async (configuration = {}, method, path, options) => {
  const { baseUrl  } = configuration;

  if(!access_token)
      access_token = await getAccessToken(configuration, options.headers)

  const { query = {}, body = {} } = options;

  const opts = {
    parseAs: 'json',
    baseUrl,
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${access_token}`,
      ...options.headers,
    },
    body,
    query,
    ...options,
  };

  const safePath = nodepath.join(path);

  return commonRequest(method, safePath, opts).then(logResponse);
};

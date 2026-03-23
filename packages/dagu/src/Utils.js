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

function encodeFormBody(data) {
  const params = new URLSearchParams();
  for (const [key, value] of Object.entries(data)) {
    params.append(
      key,
      typeof value === 'object' && value !== null ? JSON.stringify(value) : String(value)
    );
  }
  return params.toString();
}

export const request = async (configuration = {}, method, path, options) => {
  const { baseUrl } = configuration;

  if (!access_token)
    access_token = await getAccessToken(configuration, options.headers);

  const { query = {}, body = {}, contentType, headers = {} } = options;

  let requestBody = body;
  let requestHeaders = { ...headers };

  if (contentType === 'form') {
    requestHeaders['content-type'] = 'application/x-www-form-urlencoded';
    requestBody = encodeFormBody(body);
  } else {
    requestHeaders['content-type'] = 'application/json';
  }

  requestHeaders['Authorization'] = `Bearer ${access_token}`;

  const opts = {
    ...options,
    parseAs: 'json',
    baseUrl,
    headers: requestHeaders,
    body: requestBody,
    query,
  };

  const safePath = nodepath.join(path);

  return commonRequest(method, safePath, opts).then(logResponse);
};

import { composeNextState } from '@openfn/language-common';
import {
  request as commonRequest,
  logResponse,
} from '@openfn/language-common/util';
import nodepath from 'node:path';

// Cached auth promise — concurrent requests share one login call.
let cookiePromise;
export const _resetAuth = () => { cookiePromise = undefined; };

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

export const authorize = async configuration => {
  const { username, password, baseUrl } = configuration;

  const options = {
    body: JSON.stringify({ username, password }),
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'POST',
    baseUrl,
    parseAs: 'json',
  };

  try {
    const response = await commonRequest('POST', '/auth/login', options);

    if (response.headers['set-cookie']) {
      return response.headers['set-cookie'].split(';')[0];
    }

    throw new Error('No authentication cookie received from server');
  } catch (err) {
    console.error('Error authenticating with iHRIS');
    console.log(err.body);
    throw err;
  }
};

export const request = async (
  configuration = {},
  method,
  path,
  options = {},
) => {
  const { baseUrl, username, password } = configuration;
  const { headers = {}, parseAs = 'json', ...otherOptions } = options;

  if (!cookiePromise && username && password) {
    cookiePromise = authorize(configuration).catch(err => {
      cookiePromise = undefined; // clear on failure so next request retries
      throw err;
    });
  }

  const cookie = cookiePromise ? await cookiePromise : undefined;

  const opts = {
    parseAs,
    baseUrl,
    ...otherOptions,
    headers: {
      'content-type': 'application/fhir+json',
      ...(cookie && { Cookie: cookie }),
      ...headers,
    },
  };

  const safePath = nodepath.join(path);
  return commonRequest(method, safePath, opts).then(logResponse);
};

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

export async function authorize(state) {
  const { configuration } = state;
  const { baseUrl, username, password } = configuration;

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
    const response = await commonRequest('POST', '/authenticate', options);
    state.configuration.access_token = response.body.Token;
    return state;
  } catch (error) {
    console.error('Error authenticating SIUBEN');
    throw new Error(error);
  }
}

export const request = async (state, method, path, options) => {
  const { configuration } = state;
  const { baseUrl, access_token } = configuration;

  const headers = {
    Authorization: `Bearer ${access_token}`,
    'content-type': 'application/json',
  };

  const opts = {
    parseAs: 'json',
    baseUrl,
    ...options,
    headers,
  };

  const safePath = nodepath.join(path);

  // Make the actual request
  return commonRequest(method, safePath, opts).then(logResponse);
};

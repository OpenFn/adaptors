import { composeNextState } from '@openfn/language-common';
import {
  request as commonRequest,
  makeBasicAuthHeader,
  assertRelativeUrl,
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

export const request = (configuration = {}, method, path, options) => {
  const { baseUrl, secretKey } = configuration;
  const headers = { Authorization: `Bearer ${secretKey}` };

  const errors = {
    404: 'Page not found',
  };

  const opts = {
    parseAs: 'json',
    errors,
    baseUrl,

    ...options,
    headers: {
      'content-type': 'application/json',
      ...headers,
    },
  };

  const url = new URL(path, baseUrl).toString();
  // Debug logging to help mock matching failures
  try {
    console.log('HTTP Request ->', method, url);
    console.log('Headers ->', opts.headers);
    if (opts.body) console.log('Body ->', opts.body);
  } catch (e) {
    // ignore logging errors
  }
  return commonRequest(method, url, opts);
};

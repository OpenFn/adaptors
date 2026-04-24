import { composeNextState } from '@openfn/language-common';
import {
  request as commonRequest,
  expandReferences,
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

export const request = async (configuration, method, path, params) => {
  const { baseUrl, apiKey, apiPath = 'api/v1' } = configuration;
  let { body, headers = {}, errors, ...otherOptions } = params || {};

  const requestHeaders = {
    ...headers,
    Authorization: `Bearer ${apiKey}`,
    'content-type': 'application/x-www-form-urlencoded',
    accept: 'application/json',
  };

  body = new URLSearchParams(body).toString();
  const opts = {
    parseAs: 'json', // Default response to be parsed as JSON
    errors,
    baseUrl,
    body,
    headers: requestHeaders,
    ...otherOptions,
  };

  const safePath = nodepath.join(`${apiPath}/${path}`);

  // Make the actual request
  return commonRequest(method, safePath, opts)
    .then(response => {
      logResponse(response);
      return response;
    })
    .catch(err => {
      logResponse(err);
      throw err;
    });
};

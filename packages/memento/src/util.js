import nodepath from 'node:path';
import { composeNextState } from '@openfn/language-common';
import {
  request as commonRequest,
  logResponse,
  assertRelativeUrl,
  expandReferences,
} from '@openfn/language-common/util';

export const prepareNextState = (state, response) => {
  const { body, ...responseWithoutBody } = response;

  delete responseWithoutBody.query.token;
  if (!state.references) {
    state.references = [];
  }

  return {
    ...composeNextState(state, response.body),
    response: responseWithoutBody,
  };
};

/**
 * Request helper function
 * @function
 * @private
 */
export function request(state, method, path, params = {}) {
  assertRelativeUrl(path);
  let { body = null, query, headers = {}, parseAs, ...restOfOptions } = params;

  const {
    token,
    apiVersion = 'v1',
    baseUrl = 'https://api.mementodatabase.com',
  } = state.configuration;

  const safePath = nodepath.join(apiVersion, path);

  const options = {
    ...restOfOptions,
    headers: {
      'content-type': 'application/json',
      ...headers,
    },
    query: {
      token,
      ...query,
    },
    baseUrl,
    body,
    parseAs,
  };

  return commonRequest(method, safePath, options)
    .then(response => {
      logResponse(response);
      return prepareNextState(state, response);
    })
    .catch(error => {
      logResponse(error);
      throw error;
    });
}

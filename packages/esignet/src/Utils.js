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

/**
 * INVARIANT: Must export function named `request`
 * - Infrastructure/helpers ONLY
 * - NO operational functions
 */
export const request = (configuration = {}, method, path, options) => {
  const { baseUrl, access_token } = configuration;

  const errors = {
    401: 'Unauthorized — invalid or expired access token',
    403: 'Forbidden — insufficient permissions or consent',
    404: 'Resource not found',
  };

  const opts = {
    parseAs: 'json',
    baseUrl,
    errors,
    ...options,
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${access_token}`,
      ...options?.headers,
    },
  };

  const safePath = nodepath.join(path);

  return commonRequest(method, safePath, opts).then(logResponse);
};

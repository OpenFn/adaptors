import { composeNextState } from '@openfn/language-common';
import {
  request as commonRequest,
  assertRelativeUrl,
} from '@openfn/language-common/util';

export const DEFAULT_BASE_URL = 'https://api.copper.com/developer_api/v1';

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

export const request = (configuration = {}, method, path, options = {}) => {
  assertRelativeUrl(path);

  const { baseUrl, accessToken, userEmail } = configuration;

  const opts = {
    parseAs: 'json',
    baseUrl: baseUrl || DEFAULT_BASE_URL,
    ...options,
    headers: {
      'content-type': 'application/json',
      ...options.headers,
      'X-PW-AccessToken': accessToken,
      'X-PW-Application': 'developer_api',
      'X-PW-UserEmail': userEmail,
    },
  };

  return commonRequest(method, path, opts);
};

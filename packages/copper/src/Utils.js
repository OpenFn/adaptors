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

// Copper API key auth requires the token plus the email of the user who generated it
// See https://developer.copper.com/introduction/authentication.html
export const request = (configuration = {}, method, path, options = {}) => {
  assertRelativeUrl(path);

  const { baseUrl = DEFAULT_BASE_URL, accessToken, userEmail } = configuration;

  const errors = {
    401: 'Unauthorized: check your Copper access token and user email',
    404: 'Not found',
    422: 'Unprocessable entity: the request matched multiple records or was invalid',
  };

  const opts = {
    parseAs: 'json',
    errors,
    baseUrl,
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

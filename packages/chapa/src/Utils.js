import { composeNextState } from '@openfn/language-common';
import { request as commonRequest } from '@openfn/language-common/util';
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

// This helper function will call out to the backend service
// and add authorisation headers
// Refer to the common request function for options and details
export const request = (configuration = {}, method, path, options) => {
  const { secretKey, apiVersion = 'v1' } = configuration;
  const baseUrl = `https://api.chapa.co/${apiVersion}`;
  const errors = {
    404: 'Page not found',
  };
  const { headers } = { options };

  const opts = {
    // Force the response to be parsed as JSON
    parseAs: 'json',

    // Include the error map
    errors,

    // Set the baseUrl from the config object
    baseUrl,

    ...options,

    // You can add extra headers here if you want to
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${secretKey}`,
      ...headers,
    },
  };

  // TODO you may want to add a prefix to the path
  // use path.join to build the path safely
  const safePath = nodepath.join(path);

  // Make the actual request
  return commonRequest(method, safePath, opts);
};

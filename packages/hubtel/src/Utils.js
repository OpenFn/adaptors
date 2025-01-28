import { composeNextState } from '@openfn/language-common';
import {
  request as commonRequest,
  makeBasicAuthHeader,
  assertRelativeUrl,
} from '@openfn/language-common/util';
import nodepath from 'node:path';

export const prepareNextState = (state, response, callback = s => s) => {
  const { body, ...responseWithoutBody } = response;

  if (!state.references) {
    state.references = [];
  }

  const nextState = {
    ...composeNextState(state, response.body),
    response: responseWithoutBody,
  };

  return callback(nextState);
};

// This helper function will call out to the backend service
// and add authorisation headers
// Refer to the common request function for options and details
export const request = (configuration = {}, method, path, options) => {
  // You might want to check that the path is not an absolute URL before
  // appending credentials commonRequest will do this for you if you
  // pass a baseURL to it and you don't need to build a path here
  // assertRelativeUrl(path);

  // TODO This example adds basic auth from config data
  //       you may need to support other auth strategies
  const { baseUrl, clientId, clientSecret } = configuration;

  const headers = makeBasicAuthHeader(clientId, clientSecret);

  // TODO You can define custom error messages here
  //      The request function will throw if it receives
  //      an error code (<=400), terminating the workflow
  const errors = {
    404: 'Page not found',
  };

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
      'Content-Type': 'application/json',
      ...headers,
    },
  };

  // opts.data = JSON.stringify(opts.data);

  // TODO you may want to add a prefix to the path
  // use path.join to build the path safely
  const safePath = nodepath.join(path);

  // Make the actual request

  return commonRequest(method, safePath, opts);
};

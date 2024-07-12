import { composeNextState } from '@openfn/language-common';
import {
  request as commonRequest,
  makeBasicAuthHeader,
} from '@openfn/language-common/util';

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
  const {
    baseUrl,
    username,
    password,
    clientId = 'user-client',
    clientSecrete = 'changeme',
    apiPath = 'api',
  } = configuration;

  const url = `${baseUrl}/${apiPath}`;
  const headers = makeBasicAuthHeader(clientId, clientSecrete);
  const { query = {} } = options;

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
    baseUrl: url,

    query: {
      grant_type: 'password',
      username,
      password,
      ...query,
    },
    // You can add extra headers here if you want to
    headers: {
      'content-type': 'application/json',
      ...headers,
    },
  };

  // TODO you may want to add a prefix to the path

  // Make the actual request
  return commonRequest(method, path, opts);
};

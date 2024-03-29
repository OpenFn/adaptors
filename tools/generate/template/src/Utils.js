/**
 * If you have any helper functions which are NOT operations,
 * you should add them here
 */

import {
  request as commonRequest,
  makeBasicAuthHeader,
} from '@openfn/language-common/util';

// This helper function will call out to the backend service
// And add authorisation headers
export const request = (state, method, path, data) => {
  // TODO This example adds basic auth from config data
  //       you may need to support other auth strategies
  const { baseUrl, username, password } = state.configuration;
  const headers = makeBasicAuthHeader(username, password);

  // TODO You can define custom error messages here
  //      The request function will throw if it receives
  //      an error code (<=400), terminating the workflow
  const errors = {
    404: 'Page not found',
  };

  const options = {
    // Append data to the request body
    body: data,

    // You can dd extra headers here if yout want to
    headers: {
      ...headers,
      'content-type': 'application/json',
    },

    // Force the response to be parsed as JSON
    parseAs: 'json',

    // Include the error map
    errors,
  };

  // Build the url base on the baseUrl in config and the path provided
  const url = `${baseUrl}/api/${path}`;
  // Make the actual request
  return commonRequest(method, url, options);
};

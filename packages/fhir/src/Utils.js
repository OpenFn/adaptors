import { fetch } from 'undici';
import { composeNextState } from '@openfn/language-common';

export function handleResponse(response, data, state, callback = s => s) {
  const nextState = {
    ...composeNextState(state, data),
    response,
  };
  return callback(nextState);
}

export function handleResponseError(response, data, method) {
  const { status, statusText, url } = response;

  if (!response.ok) {
    const errorString = [
      `Message: ${statusText}`,
      `Request: ${method} ${url}`,
      `Status: ${status}`,
      `Body: ${JSON.stringify(data, null, 2).replace(/\n/g, '\n\t  ')}`,
    ].join('\n\t∟ ');
    throw new Error(errorString);
  }
}

/**
 * This is an asynchronous function that sends a request to a specified URL with optional parameters
 * and headers, and returns the response data in JSON format.
 * If there is an error in the response, the function will throw an error unless `params.throwOnError` is false.
 * @param {string} url - The URL of the API endpoint that the request is being made to.
 * @param {object} [params] - An object containing any additional parameters to be sent with the request, such
 * as query parameters or request body data. It is an optional parameter and defaults to an empty
 * object if not provided.
 * @param {string} [method=GET] - The HTTP method to be used for the request. It defaults to 'GET' if not
 * specified.
 * @returns The `request` function returns a {{ data, response }} object, where the parsed JSON body
 * is written to `data`, and the raw http response to `response`.
 */

export const request = async (urlString, params = {}, method = 'GET') => {
  let url = urlString;
  const defaultHeaders = { 'Content-Type': 'application/fhir+json' };
  const { headers, parseAs } = params;
  const setHeaders = { ...defaultHeaders, ...headers };
  const setParseAs = parseAs

  delete params.headers;
  delete params.parseAs;

  const throwOnError = 'throwOnError' in params ? params.throwOnError : true;

  delete params.throwOnError;

  let options = {
    method,
    headers: setHeaders, // Add nonce for WP REST API
  };

  if ('GET' === method) {
    url = `${urlString}?${new URLSearchParams(params).toString()}`;
  } else {
    options.body = JSON.stringify(params);
  }

  const response = await fetch(url, options);
  const contentType = response.headers.get('Content-Type');

  let data;
  switch (setParseAs) {
    case 'json':
      data = await response.json();
      break;
    case 'text':
      data = await response.text();
      break;
    case 'stream':
      data = response.body;
      break;
    default:
      if (contentType?.match(/application\/(fhir\+json|json)/)) {
        data = await response.json();
      } else {
        data = await response.text();
      }
  }

  if (throwOnError) {
    handleResponseError(response, data, method);
  }

  return { data, response };
};

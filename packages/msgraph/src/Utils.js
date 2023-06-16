import { composeNextState } from '@openfn/language-common';

export function setUrl(urlParams) {
  const { apiVersion, resolvePath } = urlParams;

  if (isValidHttpUrl(resolvePath)) return resolvePath;

  const pathSuffix = apiVersion
    ? `${apiVersion}/${resolvePath}`
    : `v1.0/${resolvePath}`;
  return `https://graph.microsoft.com/${pathSuffix}`;
}

function isValidHttpUrl(string) {
  let url;

  try {
    url = new URL(string);
  } catch (_) {
    return false;
  }

  return url.protocol === 'http:' || url.protocol === 'https:';
}

export function setAuth(token) {
  return token ? { headers: { Authorization: `Bearer ${token}` } } : null;
}

export function handleResponse(response, state, callback) {
  const nextState = {
    ...composeNextState(state, response),
    response,
  };
  if (callback) return callback(nextState);
  return nextState;
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
 * @param {string} url - The URL of the API endpoint that the request is being made to.
 * @param {object} [params] - An object containing any additional parameters to be sent with the request, such
 * as query parameters or request body data. It is an optional parameter and defaults to an empty
 * object if not provided.
 * @param {string} [method=GET] - The HTTP method to be used for the request. It defaults to 'GET' if not
 * specified.
 * @returns The `request` function is returning the parsed JSON data from the response of the HTTP
 * request made to the specified `url` with the given `params` and `method`. If there is an error in
 * the response, the function will throw an error.
 */
export const request = async (url, params = {}, method = 'GET') => {
  const defaultHeaders = { 'Content-Type': 'application/json' };
  const { headers } = params;
  const setHeaders = { ...headers, ...defaultHeaders };

  delete params.headers;

  let options = {
    method,
    headers: setHeaders, // Add nonce for WP REST API
  };

  if ('GET' === method) {
    url += '?' + new URLSearchParams(params).toString();
  } else {
    options.body = JSON.stringify(params);
  }

  const response = await fetch(url, options);
  const contentType = response.headers.get('Content-Type');
  const data =
    contentType && contentType.includes('application/json')
      ? await response.json()
      : await response.text();

  handleResponseError(response, data, method);

  return data;
};

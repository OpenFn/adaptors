import { fetch } from 'undici';
import { Readable, Writable } from 'node:stream';
import { composeNextState } from '@openfn/language-common';

export function assertDrive(state, driveName) {
  if (!state.drives[driveName]) {
    const errorString = [
      `Drive is not defined.`,
      `At the top of your job you should define all the drives you want to use.`,
      `eg: getDrive({ id: "openfn.sharepoint.com", owner: "sites"})`,
    ].join('\n\t∟ ');

    throw new Error(errorString);
  }
}

export function setUrl(resource, apiVersion) {
  if (isValidHttpUrl(resource)) return resource;

  const pathSuffix = apiVersion
    ? `${apiVersion}/${resource}`
    : `v1.0/${resource}`;
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

const isStream = value => {
  if (value && typeof value == 'object') {
    if (value instanceof Readable || value instanceof Writable) {
      return true;
    }
    // This should catch streams returned by fetch (which for some reason aren't proper streams?)
    if (value.pipeTo || value.pipe) {
      return true;
    }
  }
  return false;
};

export function handleResponse(response, state, callback) {
  let nextState;
  // Don't compose state if response is a stream
  if (isStream(response)) {
    nextState = {
      ...state,
      data: response,
    };
  } else {
    nextState = {
      ...composeNextState(state, response),
      response,
    };
  }
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

const defaultOptions = {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
  },
  accessToken: '',
};
/**
 * This is an asynchronous function that sends a request to a specified URL with optional parameters
 * and headers, and returns the response data in JSON format.
 * @param {string} url - The URL of the API endpoint that the request is being made to.
 * @param {object} [options] - An object containing any additional parameters to be sent with the request, such
 * as query parameters or request body data. It is an optional parameter and defaults to an empty
 * object if not provided.
 * @returns The `request` function is returning the parsed JSON data from the response of the HTTP
 * request made to the specified `url` with the given `params` and `method`. If there is an error in
 * the response, the function will throw an error.
 */
export const request = async (path, params) => {
  let url = path;
  const options = { ...defaultOptions, ...params };
  const { parseAs, query, method, accessToken } = options;
  delete options.parseAs;
  delete options.accessToken;

  options.headers['Authorization'] = makeAuthHeader(accessToken);

  if (method === 'GET' && query) {
    url = `${path}?${new URLSearchParams(query).toString()}`;
  }

  const response = await fetch(url, options);
  const contentType = response.headers.get('Content-Type');

  // If not json then return a stream
  let data;
  if (parseAs) {
    if (parseAs === 'json') data = await response.json();
    if (parseAs === 'text') data = await response.text();
  } else {
    data = contentType?.includes('application/json')
      ? await response.json()
      : response.body;
  }

  handleResponseError(response, data, method);

  return data;
};

function makeAuthHeader(accessToken) {
  return accessToken ? `Bearer ${accessToken}` : null;
}

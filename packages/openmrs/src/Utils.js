import { composeNextState } from '@openfn/language-common';
import {
  request as commonRequest,
  makeBasicAuthHeader,
} from '@openfn/language-common/util';

export const prepareNextState = (state, response, callback = s => s) => {
  const { body, ...responseWithoutBody } = response;
  const nextState = {
    ...composeNextState(state, body),
    response: responseWithoutBody,
  };

  return callback(nextState);
};

export async function fetchAndLog(method, url, opts = {}) {
  const response = await commonRequest(method, url, opts);
  const { statusCode, duration } = response;

  const urlWithQuery = Object.keys(opts.query || {}).length
    ? `${url}?${new URLSearchParams(opts.query).toString()}`
    : url;

  const message = `${method} ${urlWithQuery} - ${statusCode} in ${duration}ms`;
  if (response instanceof Error) {
    console.error(message);
  } else {
    console.log(message);
  }
  response.url = urlWithQuery;

  // For test and debug
  opts._onrequest?.({
    url: urlWithQuery,
    query: opts.query,
    method,
  });

  return response;
}

export async function requestWithPagination(state, path, options = {}) {
  const results = [];

  // the maximum number of items to download
  const { limit: maxResults = 1e4, pageSize } = options;
  let { startIndex } = options;

  // Declare a variable that takes in all the options. We can then modify this variable to fetch the next page
  let requestOptions = { ...options };

  let hasMoreContent = true;
  do {
    requestOptions.query ??= {};

    // include startIndex if relevant
    if (!isNaN(startIndex)) {
      requestOptions.query.startIndex = startIndex;
    }

    if (!isNaN(pageSize) || !isNaN(maxResults)) {
      // If there's a limit or page size, fetch
      // a page of items (the limit or the page size, whichever is smaller)
      requestOptions.query.limit = Math.min(
        pageSize || maxResults,
        maxResults - results.length
      );
    }

    // Fetch a page of data
    const response = await request(state, 'GET', path, requestOptions);

    // If a search, the data will be in the form { results }
    // otherwise just return the data verbatim (in an array)
    if (response.body.results) {
      results.push(...response.body.results);

      // If there is data, save it
      if (!startIndex) {
        startIndex = 0;
      }
      startIndex += response.body.results.length;
    } else {
      results.push(response.body);
    }

    // Decide whether to request another page
    hasMoreContent =
      results.length < maxResults &&
      response.body.links?.find(link => link?.rel === 'next');
  } while (hasMoreContent);

  return results;
}

export async function request(state, method, path, options = {}) {
  const { username, password, instanceUrl: baseUrl } = state.configuration;

  const {
    query = {},
    data = {},
    headers = { 'content-type': 'application/json' },
    parseAs = 'json',
    _onrequest,
  } = options; // secret option for debug & test

  if (baseUrl.length <= 0) {
    throw new Error(
      'Invalid instanceUrl. Include instanceUrl in state.configuration'
    );
  }

  const isAbsoluteUrl = /^(https?:|\/\/)/i.test(path);
  if (isAbsoluteUrl) {
    throw new Error(
      `Invalid path argument: "${path}" appears to be an absolute URL. Please provide a relative path`
    );
  }

  const authHeaders = makeBasicAuthHeader(username, password);

  const requestOptions = {
    body: data,
    headers: {
      ...authHeaders,
      ...headers,
    },
    query,
    parseAs,
    baseUrl,
    _onrequest,
  };

  return fetchAndLog(method, path, requestOptions);
}

export function cleanPath(path) {
  return path
    .replace(/([^:]\/)\/+/g, '$1') //remove double slashes while also preserving http:// or https://
    .replace(/\/$/, ''); // remove trailing slash
}

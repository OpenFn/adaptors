import { composeNextState, util } from '@openfn/language-common';
import {
  request as commonRequest,
  makeBasicAuthHeader,
} from '@openfn/language-common/util';

export const prepareNextState = (state, response) => {
  const { body, ...responseWithoutBody } = response;
  return {
    ...composeNextState(state, body),
    response: responseWithoutBody,
  };
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

export function validateCredentials(state) {
  const config = state.configuration || {};

  for (const key of ['instanceUrl']) {
    if (!config[key]) {
      util.throwError('INVALID_CREDENTIALS', {
        description: `configuration.${key}`,
        fix: 'Ensure that all required credentials are set on state.configuration',
      });
    }
  }
}

export async function requestWithPagination(state, path, options = {}) {
  const results = [];

  let { pageSize, startIndex, limit, max } = options;

  const maxResults = max ?? limit ?? 1e4;

  // Declare a variable that takes in all the options. We can then modify this variable to fetch the next page
  let requestOptions = { ...options };

  let hasMoreContent = true;
  let isFirstRequest = true;
  const didUserPassLimit = Boolean(max || limit);
  do {
    requestOptions.query ??= {};

    // include startIndex if relevant
    if (!isNaN(startIndex)) {
      requestOptions.query.startIndex = startIndex;
    }

    if (limit) {
      requestOptions.query.limit = limit;
    } else if (didUserPassLimit || !isFirstRequest) {
      // If there's an explicit limit or page size,
      // or this is not the first request,
      // set the limit in the URL
      requestOptions.query.limit = Math.min(
        pageSize || maxResults,
        maxResults - results.length
      );
    } else if (!isNaN(pageSize)) {
      requestOptions.query.limit = pageSize;
    }

    // Fetch a page of data
    const response = await request(state, 'GET', path, requestOptions);

    // If a search, the data will be in the form { results }
    // otherwise just return the data verbatim (in an array)
    if (response.body.results) {
      results.push(...response.body.results);

      // If there is data, save it
      if (!startIndex) {
        startIndex = 1;
      }
      startIndex += response.body.results.length;
    } else {
      results.push(response.body);
    }
    if (isFirstRequest && !pageSize) {
      pageSize = results.length;
    }

    isFirstRequest = false;
    // Decide whether to request another page
    hasMoreContent =
      !limit &&
      results.length < maxResults &&
      response.body.links?.find(link => link?.rel === 'next');
  } while (hasMoreContent);

  return results;
}

export async function request(state, method, path, options = {}) {
  validateCredentials(state);

  const { username, password, instanceUrl: baseUrl } = state.configuration;

  const {
    query = {},
    data = {},
    headers = { 'content-type': 'application/json' },
    parseAs = 'json',
    _onrequest,
    errors,
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
    errors,
    _onrequest,
  };

  return fetchAndLog(method, path, requestOptions);
}

export function cleanPath(path) {
  return path
    .replace(/([^:]\/)\/+/g, '$1') //remove double slashes while also preserving http:// or https://
    .replace(/\/$/, ''); // remove trailing slash
}

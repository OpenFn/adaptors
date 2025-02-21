import { composeNextState } from '@openfn/language-common';
import {
  request as commonRequest,
  makeBasicAuthHeader,
  logResponse,
} from '@openfn/language-common/util';

export const prepareNextState = (state, response, callback = s => s) => {
  const { body, ...responseWithoutBody } = response;
  const nextState = {
    ...composeNextState(state, body),
    response: responseWithoutBody,
  };

  return callback(nextState);
};

export async function request(state, method, path, options = {}) {
  const {
    baseUrl = state.configuration.instanceUrl,
    query = {},
    data = {},
    headers = { 'content-type': 'application/json' },
    parseAs = 'json',
  } = options;

  if (baseUrl.length <= 0) {
    throw new Error(
      'Invalid instanceUrl. Include instanceUrl in state.configuration'
    );
  }

  const isAbsoluteUrl = /^(https?:|\/\/)/i.test(path);
  if (isAbsoluteUrl) {
    throw new Error(
      `Invalid path argument: "${path}" appears to be an absolute URL. Please provide a relative path.`
    );
  }

  const { username, password } = state.configuration;
  const authHeaders = makeBasicAuthHeader(username, password);

  const opts = {
    ...options,
    baseUrl,
    body: data,
    headers: {
      ...authHeaders,
      ...headers,
    },
    query,
    parseAs,
  };

  let allResponses;
  let queryParams = opts?.query;
  let allowPagination = isNaN(queryParams?.startIndex);

  do {
    const requestOptions = queryParams ? { ...opts, query: queryParams } : opts;

    const response = await commonRequest(method, path, requestOptions);
    logResponse(response);

    if (allResponses) {
      allResponses.body.results.push(...response.body.results);
    } else {
      allResponses = response;
    }
    const nextUrl = response?.body?.links?.find(
      link => link.rel === 'next'
    )?.uri;

    if (nextUrl) {
      console.log(`Fetched ${response.body.results.length} results`);
      console.log(`Fetching next page from ${nextUrl}`);
      const urlObj = new URL(nextUrl);
      const params = new URLSearchParams(urlObj.search);
      const startIndex = params.get('startIndex');

      queryParams = { ...queryParams, startIndex };
    } else {
      delete allResponses.body.links;
      break;
    }
  } while (allowPagination);

  return allResponses;
}

export function cleanPath(path) {
  return path
    .replace(/([^:]\/)\/+/g, '$1') //remove double slashes while also preserving http:// or https://
    .replace(/\/$/, ''); // remove trailing slash
}

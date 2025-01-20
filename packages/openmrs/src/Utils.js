import { composeNextState } from '@openfn/language-common';
import {
  request as commonRequest,
  makeBasicAuthHeader,
  logResponse,
} from '@openfn/language-common/util';

/**
 * Options object
 * @global
 * @typedef {Object} OpenMRSOptions
 * @property {object} query - An object of query parameters to be encoded into the URL
 * @property {object} headers - An object of all request headers
 * @property {object} body - The request body (as JSON)
 * @property {string} baseUrl - The base url for the request
 * @property {string} [parseAs='json'] - The response format to parse (e.g., 'json', 'text', or 'stream')
 */

export const prepareNextState = (state, response, callback) => {
  const { body, ...responseWithoutBody } = response;
  const nextState = {
    ...composeNextState(state, response.body),
    response: responseWithoutBody,
  };

  return callback(nextState);
};

export async function request(state, method, path, options = {}) {
  const {
    baseUrl = 'https://demo.openmrs.org/openmrs',
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
    body: data,
    headers: {
      ...authHeaders,
      ...headers,
    },
    query,
    parseAs,
  };

  const url = `${baseUrl}${path}`;

  let allResponses;
  let queryParams = opts?.query;
  let allowPagination = isNaN(queryParams?.startIndex);

  do {
    const requestOptions = queryParams ? { ...opts, queryParams } : opts;

    const response = await commonRequest(method, url, requestOptions);
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

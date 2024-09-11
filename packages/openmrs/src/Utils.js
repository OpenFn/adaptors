import { composeNextState } from '@openfn/language-common';
import {
  request as commonRequest,
  makeBasicAuthHeader,
  logResponse,
} from '@openfn/language-common/util';

export const prepareNextState = (state, response, callback) => {
  const { body, ...responseWithoutBody } = response;
  const nextState = {
    ...composeNextState(state, response.body),
    response: responseWithoutBody,
  };

  return callback(nextState);
};

export async function request(state, method, path, data, params) {
  const { instanceUrl, username, password } = state.configuration;
  const headers = makeBasicAuthHeader(username, password);

  const options = {
    body: data,
    headers: {
      ...headers,
      'content-type': 'application/json',
    },
    query: params,
    parseAs: 'json',
  };

  const url = `${instanceUrl}${path}`;

  let allResponses;
  let query = options?.query;
  let allowPagination = isNaN(query?.startIndex);

  do {
    const requestOptions = query ? { ...options, query } : options;
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

      query = { ...query, startIndex };
    } else {
      delete allResponses.body.links;
      break;
    }
  } while (allowPagination);

  return allResponses;
}

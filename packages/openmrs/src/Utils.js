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

export function request(state, method, path, data, params) {
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

  return autoFetchRequest(method, url, options);
}

const autoFetchRequest = async (method, url, options) => {
  let allResponses;
  let reqQuery = options?.query;
  let allowPagination = isNaN(reqQuery?.startIndex);

  do {
    const response = await commonRequest(method, url, {
      ...options,
      query: reqQuery ?? {},
    });
    logResponse(response);

    allResponses
      ? allResponses.body.results.push(...response.body.results)
      : (allResponses = response);

    const nextUrl = response?.body?.links?.find(
      link => link.rel === 'next'
    )?.uri;

    if (nextUrl) {
      console.log(`Fetched ${response.body.results.length} results`);
      console.log(`Fetching next page from ${nextUrl}`);
      const urlObj = new URL(nextUrl);
      const params = new URLSearchParams(urlObj.search);
      const startIndex = params.get('startIndex');

      reqQuery = { ...reqQuery, startIndex };
    } else {
      delete allResponses.body.links;
      break;
    }
  } while (allowPagination);

  return allResponses;
};

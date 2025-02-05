import { composeNextState } from '@openfn/language-common';
import {
  request as commonRequest,
  makeBasicAuthHeader,
  logResponse,
} from '@openfn/language-common/util';

export const prepareNextState = (state, response) => {
  const { body, ...responseWithoutBody } = response;

  return {
    ...composeNextState(state, response.body),
    response: responseWithoutBody,
  };
};

export async function request(state, method, path, opts, paginate = false) {
  const { baseURL, apiVersion, username, password } = state.configuration;

  const { data = {}, query = {}, headers = {}, parseAs = 'json' } = opts;

  const authHeaders = makeBasicAuthHeader(username, password);

  let start, limit;

  const options = {
    body: data,
    headers: {
      'Content-Type': 'application/json',
      ...authHeaders,
      ...headers,
    },
    query: {
      format: 'json',
      ...query,
    },
    parseAs,
    baseUrl: `${baseURL}/api/${apiVersion}`,
  };

  if (paginate) {
    const results = [];

    do {
      const response = await commonRequest(method, path, options).then(
        logResponse
      );
      results.push(...response.body.results);
      if (response.body.next) {
        const nextUrl = new URL(response.body.next);
        start = nextUrl.searchParams.get('start');
        limit = nextUrl.searchParams.get('limit');

        options.query = {
          ...options.query,
          start,
          limit,
        };
      } else {
        break;
      }
    } while (true);
    return { results };
  } else {
    return commonRequest(method, path, options).then(logResponse);
  }
}

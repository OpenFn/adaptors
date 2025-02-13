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

export async function request(state, method, path, opts) {
  const { baseURL, apiVersion, username, password } = state.configuration;

  let baseUrl;

  if (!state.configuration.baseUrl && baseURL) {
    baseUrl = baseURL;
    console.warn(
      'No baseUrl found in state.configuration. baseURL will be used instead, but this will be deprecated in the future.'
    );
  } else {
    baseUrl = state.configuration.baseUrl;
  }

  const {
    data = {},
    query = {},
    headers = {},
    parseAs = 'json',
    paginate = false,
  } = opts;

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
    baseUrl: `${baseUrl}/api/${apiVersion}`,
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

        const startDigit =
          nextUrl.searchParams.get('start') !== null
            ? nextUrl.searchParams.get('start')
            : 0;

        start = Number(startDigit);
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

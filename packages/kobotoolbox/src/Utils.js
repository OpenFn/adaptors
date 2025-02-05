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

  let start, limit, result;

  let nextState = state;
  let response;

  try {
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

    do {
      response = await commonRequest(method, path, options);

      if (response.body.next) {
        if (!result) {
          result = [];
        }
        const nextUrl = new URL(response.body.next);
        start = nextUrl.searchParams.get('start');
        limit = nextUrl.searchParams.get('limit');

        options.query = {
          ...options.query,
          start,
          limit,
        };
        result.push(...response.body.results);
      } else {
        if (result) {
          result.push(...response.body.results);
        } else {
          result = response.body.results;
        }
        break;
      }
    } while (paginate);

    return logResponse({
      ...response,
      body: {
        ...response.body,
        results: result,
      },
    });
  } catch (e) {
    return logResponse(e);
  }
}

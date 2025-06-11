import { composeNextState } from '@openfn/language-common';
import {
  request as commonRequest,
  logResponse,
} from '@openfn/language-common/util';

export function addAuth(headers, configuration = {}) {
  const { token } = configuration;
  if (token) {
    Object.assign(headers, { Authorization: `Bearer ${token}` });
  }
}

export function request(state, path, params, callback = s => s) {
  let { body, headers = {}, method = 'GET', ...rest } = params;

  const baseUrl = `https://app.asana.com/api/${state.configuration?.apiVersion}`;

  addAuth(headers, state.configuration);

  const options = {
    ...rest,
    headers,
    baseUrl,
    body,
  };

  return commonRequest(method, path, options)
    .then(response => {
      logResponse(response);
      const { body, ...responseWithoutBody } = response;
      return {
        ...composeNextState(state, body?.data),
        response: responseWithoutBody,
      };
    })
    .then(callback)
    .catch(err => {
      if (err.code !== 'BASE_URL_MISMATCH') {
        console.log('Asana says:');
        logResponse(err);
      }
      throw err;
    });
}

export async function requestWithPagination(state, path, params) {
  let { body, headers = {}, method = 'GET', ...rest } = params;

  const options = {
    ...rest,
    headers,
    baseUrl,
    body,
  };
  const results = [];
  let shouldFetchMoreContent = false;

  do {
    const response = await request(state, path, options);

    const hasMoreContent = response.body?.data?.next_page;

    results.push(...result(response.body, 'data', []));
    if (hasMoreContent) {
      options.query = options.query || {};
      options.query.offset = response.body.data.next_page.offset;
      options.query.limit = response.body.data.next_page.limit;
    }
    shouldFetchMoreContent = !limit && hasMoreContent;
  } while (shouldFetchMoreContent);

  return results;
}

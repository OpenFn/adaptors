import { composeNextState } from '@openfn/language-common';
import {
  request as commonRequest,
  makeBasicAuthHeader,
  logResponse,
} from '@openfn/language-common/util';

export const buildUrl = (url, domain) => {
  let finalUrl = '';

  const absoluteUrl = url.startsWith('/');
  if (absoluteUrl) {
    finalUrl = url;
  } else {
    finalUrl = `/a/${domain}/api/${url}`;
  }

  return finalUrl;
};

export const configureAuth = (auth, headers = {}) => {
  if ('apiKey' in auth) {
    Object.assign(headers, {
      Authorization: `ApiKey ${auth.username}:${auth.apiKey}`,
    });
  } else if ('password' in auth) {
    Object.assign(headers, makeBasicAuthHeader(auth.username, auth.password));
  } else {
    throw new Error(
      'Invalid authorization credentials. Include an apiKey or password in state.configuration',
    );
  }

  return headers;
};

export const prepareNextState = (state, response, callback = s => s) => {
  const { body, ...responseWithoutBody } = response;
  const nextState = {
    ...composeNextState(state, body?.objects ?? body),
    response: { ...responseWithoutBody, ...{ meta: body?.meta } },
  };

  return callback(nextState);
};

export async function request(configuration, path, opts) {
  const { hostUrl } = configuration;

  const {
    method,
    data,
    params = {},
    headers: customHeaders = {},
    contentType,
    parseAs = 'json',
  } = opts;

  const headers = configureAuth(configuration, customHeaders);
  if (contentType) {
    headers['content-type'] = contentType;
  }

  const options = {
    body: data,
    headers,
    query: params,
    parseAs,
    maxRedirections: 1,
    baseUrl: hostUrl,
  };

  return commonRequest(method, path, options).then(logResponse);
}

export async function requestWithPagination(configuration, path, options = {}) {
  const { domain, apiVersion = 'v2' } = configuration;
  const { resultsKey } = options;
  const targetUrl = `/a/${domain}/api/${path}/v2`;

  if (configuration.apiVersion && configuration.apiVersion !== 'v2') {
    console.warn(
      `Cursor pagination requires v2; ignoring configured apiVersion "${configuration.apiVersion}".`
    );
  }

  const params = { ...(options.params ?? {}) };
  const results = [];

  while (true) {
    const { body = {} } = await request(configuration, targetUrl, {
      method: 'GET',
      params
    });

    const key = resultsKey ?? Object.keys(body).find(key => Array.isArray(body[key]));
    if (key) results.push(...body[key]);

    if (params.limit && results.length >= params.limit) break;
    if (!body.next) break;

    params.cursor = new URL(body.next).searchParams.get('cursor');
  }

  return params.limit ? results.slice(0, params.limit) : results;
};
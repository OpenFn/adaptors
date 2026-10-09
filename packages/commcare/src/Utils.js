import { composeNextState } from '@openfn/language-common';
import {
  request as commonRequest,
  makeBasicAuthHeader,
  logResponse,
} from '@openfn/language-common/util';

export const buildUrl = (resource, domain, apiVersion, resourceId) => {
  if (resource.startsWith('/')) return resource;

  const base = `/a/${domain}/api/${resource}`;
  if (!apiVersion) return base;
  return resourceId ? `${base}/${apiVersion}/${resourceId}` : `${base}/${apiVersion}`;
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
  const { domain } = configuration;
  const { resultsKey, apiVersion = 'v2' } = options;
  const url = buildUrl(path, domain, apiVersion);

  const requestParams = { ...(options.params ?? {}) };
  let currentParams = { ...requestParams };
  const results = [];

  while (true) {
    const { body = {} } = await request(configuration, url, {
      method: 'GET',
      params: currentParams
    });

    const key = resultsKey ?? Object.keys(body).find(key => Array.isArray(body[key]));
    if (key) results.push(...body[key]);

    if (requestParams.limit && results.length >= requestParams.limit) break;

    if (body?.next) {
      const cursor = new URL(body.next).searchParams.get('cursor');
      currentParams = { ...request, cursor };
    } else if (body?.meta?.next) {
      currentParams = {
        ...requestParams,
        offset: body.meta.offset + body.meta.limit,
        limit: body.meta.limit
      }
    } else {
      break;
    }
  }

  return requestParams.limit ? results.slice(0, requestParams.limit) : results;
};
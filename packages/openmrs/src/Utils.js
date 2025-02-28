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
    const requestOptions = queryParams ? { ...opts, query: queryParams } : opts;

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

export async function requestWithPagination(state, method, path, options = {}) {
  const {
    baseUrl = state.configuration.instanceUrl,
    query = {},
    data = {},
    headers = { 'content-type': 'application/json' },
    parseAs = 'json'
  } = options;

  if (baseUrl.length <= 0) {
    throw new Error('Invalid instanceUrl. Include instanceUrl in state.configuration');
  }

  const isAbsoluteUrl = /^(https?:|\/\/)/i.test(path);

  if (isAbsoluteUrl) {
    throw new Error(`Invalid path argument: "${path}" appears to be an absolute URL. Please provide a relative path.`);
  }

  const { username, password } = state.configuration;
  const authHeaders = makeBasicAuthHeader(username, password);

  const opts = {
    body: data,
    headers: {
      ...authHeaders,
      ...headers
    },
    query,
    parseAs
  };

  const url = `${baseUrl}${path}`;

  let allResponses;
  let fetchedCount = 0;

  const pageSize = query.pageSize ? parseInt(query.pageSize) : null;
  const limit = query.limit ? parseInt(query.limit) : null;
  const hasPaginationParams = pageSize || limit || query.startIndex;

  let queryParams = { ...opts.query }

  if(hasPaginationParams && !queryParams.startIndex) {
    queryParams.limit = pageSize || 100;
  }


  if (pageSize) {
    // OpenMRS doesn't natively handle pageSIze so we handle it ourselves.
    queryParams.limit = pageSize;
    delete queryParams.pageSize; //  prevent pageSize from leaking into the OpenMRS request
  } else if (hasPaginationParams && !queryParams.startIndex) {
    queryParams.limit = 100; // fallback if no pageSize is given
  }


  do {
    const requestOptions = queryParams ? { ...opts, query: queryParams } : opts;

    const response = await commonRequest(method, url, requestOptions)
    logResponse(response);

    if (allResponses) {
      allResponses.body.results.push(...response.body.results);
    } else {
      allResponses = response;
    }

    fetchedCount += response.body.results.length;

    if(limit && fetchedCount >= limit) {
      allResponses.body.results = allResponses.body.results.slice(0, limit);
      delete allResponses.body.links
      break;
    }

    if(!hasPaginationParams || !shouldAllowPagination({ queryParams, response, fetchedCount,  limit })) {
      delete allResponses.body.links;
      break;
    }

    const nextUrl = response?.body?.links?.find(link => link.rel === 'next')?.uri;

    if (nextUrl) {
      console.log(`Fetched ${response.body.results.length} results`);
      console.log(`Fetching next page from ${nextUrl}`);
      const urlObj = new URL(nextUrl);
      const params = new URLSearchParams(urlObj.search);
      const startIndex = params.get('startIndex');

      queryParams = { ...queryParams, startIndex };
    }

  } while(true)

  return allResponses;
}

function shouldAllowPagination({ queryParams, response, fetchedCount, limit }){
  const hasNextLink = response?.body?.links?.some(link => link.rel === 'next');
  const hasStartIndex = queryParams?.startIndex !== undefined && !isNaN(queryParams?.startIndex);
  const underGlobalLimit = limit ? fetchedCount < limit : true;

  return (hasNextLink && underGlobalLimit) || hasStartIndex;
}

export function cleanPath(path) {
  return path
    .replace(/([^:]\/)\/+/g, '$1') //remove double slashes while also preserving http:// or https://
    .replace(/\/$/, ''); // remove trailing slash
}

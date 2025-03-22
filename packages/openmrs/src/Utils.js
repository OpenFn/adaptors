import { composeNextState } from '@openfn/language-common';
import {
  request as commonRequest,
  makeBasicAuthHeader,
} from '@openfn/language-common/util';

export const prepareNextState = (state, response, callback = s => s) => {
  const { body, ...responseWithoutBody } = response;
  const nextState = {
    ...composeNextState(state, body),
    response: responseWithoutBody,
  };

  return callback(nextState);
};

export async function fetchAndLog(method, url, opts) {
  try {
    const response = await commonRequest(method, url, opts);
    const { statusCode, duration } = response;

    const urlWithQuery = Object.keys(opts.query || {}).length
      ? `${url}?${new URLSearchParams(opts.query).toString()}`
      : url;

    const message = `${method} ${urlWithQuery} - ${statusCode} in ${duration}ms`;
    if (response instanceof Error) {
      console.error(message);
    } else {
      console.log(message);
    }
    response.url = urlWithQuery;
    return response;
  } catch (err) {
    return err;
  }
}

// TODO get() should pass autopage true and options
// TODO http.*() functions should all pass autopage false (at least for now)
// TODO this currently returns { result, response }. Is that right? It'll break everything!!
export async function request(state, method, path, options = {}) {
  const { username, password, instanceUrl: baseUrl } = state.configuration;

  const {
    // baseUrl = instanceUrl, // TODO should not be able to override baseUrl on config
    query = {},
    data = {},
    headers = { 'content-type': 'application/json' },
    parseAs = 'json',

    // autopage control flag
    autopage = false,

    // autopage options
    limit,
    pageSize, // TODO what is openmrs default?
    startIndex,
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

  const authHeaders = makeBasicAuthHeader(username, password);

  const opts = {
    body: data,
    headers: {
      ...authHeaders,
      ...headers,
    },
    query,
    parseAs,

    limit,
    pageSize,
    startIndex,
  };

  const url = `${baseUrl}${path}`;

  if (autopage && method === 'GET') {
    return paginate(method, url, opts);
  }

  // Map limit and startIndex to the query
  if (!isNaN(opts.limit)) {
    opts.query.limit = opts.limit;
  }
  if (!isNaN(opts.startIndex)) {
    opts.query.startIndex = opts.startIndex;
  }

  const response = await fetchAndLog(method, url, opts);
  const { body, ...responseWithoutBody } = response;
  return { response: responseWithoutBody, data: body };
}

// TODO: work out page size (if startIndex AND limit are set, this is the page size I think)
export async function paginate(method, url, opts) {
  const results = [];
  const responses = [];

  // the maximum number of items to download
  const { limit: maxResults = Infinity, pageSize = 1000 } = opts;
  let { startIndex = 1 } = opts;

  // Declare a variable that takes in all the options. We can then modify this variable to fetch the next page
  let paginatedRequestOptions = { ...opts };

  do {
    // Calculate the page size for this request
    paginatedRequestOptions.query = Object.assign({}, opts.query, {
      limit: Math.min(pageSize, maxResults - results.length),
      startIndex,
    });

    // Fetch a page of data
    const response = await fetchAndLog(method, url, paginatedRequestOptions);
    const { body, ...responseWithoutBody } = response;
    responses.push(responseWithoutBody);
    // Stop iteration if there are no more objects
    if (!response.body) {
      break;
    }

    // If there is data, save it
    results.push(...response.body.results);

    // Decide whether to request another page
    const hasNext = response.body.links.find(link => link?.rel === 'next');

    if (!hasNext || results.length === maxResults) {
      break;
    }
    startIndex += results.length;
  } while (true);

  // Note that paginated request does not include all the responses
  // TODO this result is quite contrived
  // should we return responses plural?
  // Should we nest results in { results } to pretend like this is a normal request?
  return { response: responses, data: { results } };
}

export function cleanPath(path) {
  return path
    .replace(/([^:]\/)\/+/g, '$1') //remove double slashes while also preserving http:// or https://
    .replace(/\/$/, ''); // remove trailing slash
}

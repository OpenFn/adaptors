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

export async function fetchAndLog(method, url, opts) {
  try {
    const response = await commonRequest(method, url, opts);
    logResponse(response);
    return response;
  } catch (err) {
    return err;
  }
}

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
  let queryParams = opts?.query;
  const requestOptions = queryParams ? { ...opts, query: queryParams } : opts;

  if (shouldPaginate({ underGlobalLimit: true, hasPageSize: query.pageSize })) {
    return paginate(method, url, requestOptions);
  } else {
    return fetchAndLog(method, url, requestOptions);
  }
}

export async function paginate(method, url, opts) {

  let allResponses;
  let fetchedCount = 0;


  // global limit variable that is a source of truth incase there is a pageSize variable
  const globalLimit = opts.query.limit;

  // Declare a variable that takes in all the options. We can then modify this variable to fetch the next page
  let paginatedRequestOptions = { ...opts }


  // if page size variable exists use that as limit. Delete pageSize from params since OpenMRS does recognize it.
  if (opts.query.pageSize) {
    paginatedRequestOptions.query.limit = opts.query.pageSize;
    delete paginatedRequestOptions.query.pageSize;
  }

  do {
    const response = await fetchAndLog(method, url, paginatedRequestOptions);

    // Stop itereation if there are no more objects
    if(!response.body){
      break;
    }


    fetchedCount += response.body.results.length;

    if (allResponses) {
      allResponses.body.results.push(...response.body.results);
    } else {
      allResponses = response;
    }

    // Stop iteration when global limit is reached
    if (fetchedCount >= globalLimit) {
      allResponses.body.results = allResponses.body.results.slice(0, globalLimit);
      delete allResponses.body.links;
      break;
    }

    const nextUrl = response?.body?.links?.find(link => link?.rel === 'next')?.uri;


    if (nextUrl) {
      console.log(`Fetched ${response.body.results.length} results`);
      console.log(`Fetching next page from ${nextUrl}`);
      const urlObj = new URL(nextUrl);
      const params = new URLSearchParams(urlObj.search);
      const startIndex = params.get('startIndex');
      // update request options with a new startIndex for the next page
      paginatedRequestOptions = { ...paginatedRequestOptions, startIndex };

    } else {
      delete allResponses.body.links;
      break;
    }
  } while (true);

  return allResponses;
}



function shouldPaginate({ underGlobalLimit, hasPageSize }) {
  return underGlobalLimit && hasPageSize;
}

export function cleanPath(path) {
  return path
    .replace(/([^:]\/)\/+/g, '$1') //remove double slashes while also preserving http:// or https://
    .replace(/\/$/, ''); // remove trailing slash
}

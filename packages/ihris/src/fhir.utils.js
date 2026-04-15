import {
  request as commonRequest,
  logResponse,
} from '@openfn/language-common/util';

import { authorize } from './Utils.js';

// Cached auth promise — concurrent requests share one login call.
let cookiePromise;
export const _resetAuth = () => {
  cookiePromise = undefined;
};

export async function request(state, method, path, data, params) {
  const { baseUrl, username, password } = state.configuration;
  const { headers = {}, parseAs = 'json', ...queryOpts } = params;

  if (!cookiePromise && username && password) {
    cookiePromise = authorize({ baseUrl, username, password }).catch(err => {
      cookiePromise = undefined; // clear on failure so next request retries
      throw err;
    });
  }

  const cookie = cookiePromise ? await cookiePromise : undefined;

  const queryParams = mapParams(queryOpts);

  const options = {
    body: data,
    headers: {
      'content-type': 'application/fhir+json',
      ...(cookie && { Cookie: cookie }),
      ...headers,
    },
    query: queryParams,
    parseAs,
  };

  let currentUrl = `${baseUrl}/fhir/${path}`;

  let allResponses;
  let currentQuery = options?.query;
  let allowPagination = isNaN(currentQuery?._getpagesoffset);

  do {
    const requestOptions = currentQuery
      ? { ...options, query: currentQuery }
      : options;

    const response = await commonRequest(method, currentUrl, requestOptions);
    logResponse(response);

    if (allResponses) {
      allResponses.body.entry.push(...response.body.entry);
    } else {
      allResponses = response;
    }
    const nextUrl = response?.body?.link?.find(l => l.relation === 'next')?.url;
    if (nextUrl) {
      console.log(`Fetched ${response.body.entry.length} results`);
      console.log(`Fetching next page from ${nextUrl}`);
      // iHRIS pagination changes the path (e.g. /fhir/Practitioner → /fhir),
      // so extract both the path and query params from the next link.
      const urlObj = new URL(nextUrl);
      currentUrl = `${urlObj.origin}${urlObj.pathname}`;
      currentQuery = Object.fromEntries(new URLSearchParams(urlObj.search));
    } else {
      delete allResponses.body.link;
      break;
    }
  } while (allowPagination);

  return allResponses;
}

const paramsForAllResources = {
  id: '_id',
  lastUpdated: '_lastUpdated',
  tag: '_tag',
  profile: '_profile',
  security: '_security',
  text: '_text',
  content: '_content',
  list: '_list',
  has: '_has',
  type: '_type',
};

const searchParams = {
  sort: '_sort',
  count: '_count',
  include: '_include',
  revinclude: '_revinclude',
  summary: '_summary',
  total: '_total',
  elements: '_elements',
  contained: '_contained',
  containedType: '_containedType',
};

const fhirPaginationParams = {
  getPagesOffset: '_getpagesoffset',
  getPages: '_getpages',
  bundleType: '_bundletype',
};

// Function to map user-friendly params to FHIR params
function mapParams(passedParams) {
  const mappedParams = {};
  const allParams = {
    ...paramsForAllResources,
    ...searchParams,
    ...fhirPaginationParams,
  };

  for (const key in passedParams) {
    if (allParams[key]) {
      mappedParams[allParams[key]] = passedParams[key];
    } else {
      mappedParams[key] = passedParams[key];
    }
  }

  return mappedParams;
}

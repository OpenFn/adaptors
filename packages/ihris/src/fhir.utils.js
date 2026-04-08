import {
  request as commonRequest,
  logResponse,
} from '@openfn/language-common/util';

export { authorize } from './Utils.js';

let cookie;
export async function request(state, method, path, data, params) {
  const { baseUrl, username, password } = state.configuration;
  const { headers = {}, parseAs = 'json', ...otherOptions } = params;

  const cookieHeader = { Cookie: headers?.Cookie || cookie };

  const queryParams = mapParams(otherOptions?.query);

  const options = {
    body: data,
    headers: {
      'content-type': 'application/fhir+json',
      ...cookieHeader,
      ...headers,
    },
    query: queryParams,
    parseAs: 'json',
  };

  if (!options.headers.Cookie && !cookie && username && password) {
    cookie = await authorize({ baseUrl, username, password });
    options.headers.Cookie = cookie;
  }
  const url = `${baseUrl}/fhir/${path}`;

  let allResponses;
  let query = options?.query;
  let allowPagination = isNaN(query?._getpagesoffset);

  do {
    const requestOptions = query ? { ...options, query } : options;
    const response = await commonRequest(method, url, requestOptions);
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
      const urlObj = new URL(nextUrl);
      const params = new URLSearchParams(urlObj.search);
      const paramsObject = Object.fromEntries(params.entries());
      query = { ...query, ...paramsObject };
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
  budleType: '_bundletype',
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

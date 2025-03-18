import { composeNextState } from '@openfn/language-common';
import {
  request as commonRequest,
  makeBasicAuthHeader,
  logResponse,
} from '@openfn/language-common/util';

export function shouldUseNewTracker(resourceType) {
  return /^(enrollments|relationships|events|trackedEntities)$/.test(
    resourceType
  );
}

export const CONTENT_TYPES = {
  xml: 'application/xml',
  json: 'application/json',
  pdf: 'application/pdf',
  csv: 'application/csv',
  xls: 'application/vnd.ms-excel',
};

/**
 * Determines the attribute name for a DHIS2 system ID given a resource type.
 * @param {string} resourceType
 * @returns {string}
 */
export function selectId(resourceType) {
  switch (resourceType) {
    case 'trackedEntityInstances':
      return 'trackedEntityInstance';

    // We can extend here if we find other special kinds of resourceType
    // case 'other-special-case':
    //   return 'other-special-id';

    default:
      return 'id';
  }
}

// Write a unit test for this one
export function handleResponse(result, state, callback) {
  const { body, ...responseWithoutBody } = result;

  const nextState = {
    ...composeNextState(state, body),
    response: responseWithoutBody,
  };
  return callback(nextState);
}

export function prettyJson(data) {
  return JSON.stringify(data, null, 2);
}

export function ensureArray(data, key) {
  return Array.isArray(data) ? { [key]: data } : { [key]: [data] };
}

export function prefixVersionToPath(
  configuration,
  options,
  resourceType,
  path = null
) {
  let { apiVersion } = configuration;
  const urlString = '/' + resourceType;

  // Note that users can override the apiVersion from configuration with args
  if (options?.apiVersion) apiVersion = options.apiVersion;

  const apiMessage = apiVersion
    ? `Using DHIS2 api version ${apiVersion}`
    : 'Using latest available version of the DHIS2 api on this server.';

  console.log(apiMessage);

  const pathSuffix = apiVersion ? `/${apiVersion}${urlString}` : `${urlString}`;

  const urlPath = '/api' + pathSuffix;
  if (path) return `${urlPath}/${path}`;
  return urlPath;
}
export const configureAuth = (auth, headers = {}) => {
  if ('pat' in auth) {
    Object.assign(headers, {
      Authorization: `ApiToken ${auth.pat}`,
    });
  } else if ('password' in auth) {
    Object.assign(headers, makeBasicAuthHeader(auth.username, auth.password));
  } else {
    throw new Error(
      'Invalid authorization credentials. Include an pat, username or password in state.configuration'
    );
  }

  return headers;
};

export async function request(configuration, requestData) {
  const { hostUrl } = configuration;
  const { method, path, options = {}, data = {} } = requestData;

  const {
    headers = { 'content-type': 'application/json' },
    query = {},
    parseAs = 'json',
  } = options;

  console.log(`Sending ${method} request to ${path}`);
  if (options) console.log(`with params: `, query);

  const authHeaders = configureAuth(configuration, headers);

  const opts = {
    headers: {
      ...authHeaders,
      ...headers,
    },
    query,
    parseAs,
    body: data,
    baseUrl: hostUrl,
  };

  return commonRequest(method, path, opts).then(logResponse);
}

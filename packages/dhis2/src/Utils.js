import { composeNextState } from '@openfn/language-common';

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

export function buildUrl(urlString, hostUrl, apiVersion) {
  const pathSuffix = apiVersion ? `/${apiVersion}${urlString}` : `${urlString}`;
  return hostUrl + '/api' + pathSuffix;
}

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
  const { data } = result;
  if (callback) return callback(composeNextState(state, data));
  return composeNextState(state, data);
}

export function prettyJson(data) {
  return JSON.stringify(data, null, 2);
}

export function ensureArray(data, key) {
  return Array.isArray(data) ? { [key]: data } : { [key]: [data] };
}

export function generateUrl(configuration, options, resourceType, path = null) {
  let { hostUrl, apiVersion } = configuration;
  const urlString = '/' + resourceType;

  // Note that users can override the apiVersion from configuration with args
  if (options?.apiVersion) apiVersion = options.apiVersion;

  const apiMessage = apiVersion
    ? `Using DHIS2 api version ${apiVersion}`
    : 'Using latest available version of the DHIS2 api on this server.';

  console.log(apiMessage);

  const url = buildUrl(urlString, hostUrl, apiVersion);

  if (path) return `${url}/${path}`;
  return url;
}

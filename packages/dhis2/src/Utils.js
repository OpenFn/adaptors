import { composeNextState } from '@openfn/language-common';
import { encode, decode, uuid } from '@openfn/language-common/util';

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

export {
  /**
   * Encodes a given string into Base64 format.
   * @function
   * @public
   * @param {string} data - The string to be encoded.
   * @returns {string} - The Base64 encoded string.
   * @example <caption>Encode a string</caption>
   * const encoded = util.encode('Hello World');
   * console.log(encoded); // Output: SGVsbG8gV29ybGQ=
   */
  encode,
  /**
   * Decodes a Base64 encoded string back to its original format.
   * @function
   * @public
   * @param {string} base64Data - The Base64 encoded string.
   * @returns {string} - The decoded string.
   * @example <caption>Decode a Base64 string</caption>
   * const decoded = util.decode('SGVsbG8gV29ybGQ=');
   * console.log(decoded); // Output: Hello World
   */
  decode,
  /**
   * Generates a UUID (Universally Unique Identifier).
   * @function
   * @public
   * @returns {string} - A newly generated UUID.
   * @example <caption>Generate a UUID</caption>
   * const id = util.uuid();
   * console.log(id); // Output:'3f4e254e-8f6f-4f8b-9651-1c1c262cc83f'
   */
  uuid,
};

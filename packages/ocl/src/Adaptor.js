import { execute as commonExecute } from '@openfn/language-common';
import { expandReferences } from '@openfn/language-common/util';
import { buildMappingsUrl, handleResponse, request } from './Util';

/**
 * Execute a sequence of operations.
 * Wraps `language-common/execute`, and prepends initial state for http.
 * @example
 * execute(
 *   create('foo'),
 *   delete('bar')
 * )(state)
 * @private
 * @param {Operations} operations - Operations to be performed.
 * @returns {Operation}
 */
export function execute(...operations) {
  const initialState = {
    references: [],
    data: null,
  };

  return state => {
    return commonExecute(...operations)({
      ...initialState,
      ...state,
    });
  };
}

/**
 * Get a source repository in OCL
 * @public
 * @example
 * getMappings(
 *   "MSFOCG",
 *   "lime-demo",
 *   { page: 1, exact_match: "off", verbose: false },
 *   (state) => {
 *     // Add state oclMappings
 *     const oclMappings = state.data;
 *     return { ...state, data: {}, references: [], response: {}, oclMappings };
 *   }
 * );
 * @function
 * @param {string} ownerId - An OCL user or organization
 * @param {string} repositoryId - An OCL collection id or source id
 * @param {{ownerType: string,repository: string,version: string, page: string }} [options] - Optional. `options`  which can be passed to  See more {@link https://api.openconceptlab.org/swagger/ on OCL swagger docs}
 * @param {function} callback - (Optional) callback function
 * @returns {Operation}
 */
export function getMappings(ownerId, repositoryId, options, callback = false) {
  return state => {
    const [resolvedOwnerId] = expandReferences(state, ownerId);
    const [resolvedRepositoryId] = expandReferences(state, repositoryId);
    const [resolvedOptions] = expandReferences(state, options);

    const { baseUrl } = state.configuration;

    const defaultOptions = {
      ownerType: 'orgs', // Default to orgs | orgs or users
      ownerId: resolvedOwnerId,
      repository: 'collections', // Default to collections, collections or sources
      repositoryId: resolvedRepositoryId,
      version: 'HEAD', // Default to HEAD, Eg: HEAD, 0.04
      content: 'mappings',
    };

    const urlParams = { ...defaultOptions, ...resolvedOptions };
    const { url, query } = buildMappingsUrl({
      baseUrl: baseUrl,
      ...urlParams,
    });

    return request(url, query).then(response =>
      handleResponse(response, state, callback)
    );
  };
}

/**
 * Get a resource in OCL
 * @public
 * @example
 *  get(
 *   "orgs/MSFOCG/collections/lime-demo/HEAD/mappings",
 *   {
 *     page: 1,
 *     exact_match: "off",
 *     limit: 200,
 *     verbose: false,
 *     sortDesc: "_score",
 *   },
 *   (state) => {
 *     // Add state oclMappings
 *     const oclMappings = state.data;
 *     return { ...state, data: {}, references: [], response: {}, oclMappings };
 *   }
 * );
 * @function
 * @param {string} path - Path to resource
 * @param {object} query - A query object that will limit what resources are retrieved when converted into request params.
 * @param {function} callback - (Optional) callback function
 * @returns {Operation}
 */
export function get(path, query, callback = false) {
  return state => {
    const [resolvedPath] = expandReferences(state, path);
    const [resolvedQuery] = expandReferences(state, query);
    const { baseUrl } = state.configuration;

    const url = `${baseUrl}/${resolvedPath}`;

    return request(url, resolvedQuery).then(response =>
      handleResponse(response, state, callback)
    );
  };
}

export {
  fn,
  fnIf,
  alterState,
  dataPath,
  dataValue,
  each,
  field,
  fields,
  lastReferenceValue,
  merge,
  sourceValue,
} from '@openfn/language-common';

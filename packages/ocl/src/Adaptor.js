import {
  execute as commonExecute,
  expandReferences,
} from '@openfn/language-common';
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
 * Replaces source keys(data elements) to destination keys(data elements) with out changing state.data structure
 * @public
 * @example
 * map(state, state)
 * @private
 * @param {Object}  state - Json object containing keys and data values;
 * @param {Object} [params] - E.g. `{users:"haftamuk", sources: "eCHIS-CODES", concepts: "fp_new_at_10_to_14" }
 * @returns {Operation}
 */
export function map(state, params) {
  /**
   * In order to minimize web trafic, already accessed mapping
   * information is put into this variable to
   * reuse values for the consucutive keys.
   */
  const retrievedMapping = {};

  /****
       - Iterate over current object concepts/keys
          - check if current concept information is already requested
             [True]
                 -Resolve source concept from history
                 Replace key of the json oobject ???
             [false]
                - Resolve source concepts
                - add resolved source- destination concept pair to history collection
                Replace key of the json oobject ???
   */

  dataString = JSON.stringify(state.data);

  Object.keys(state.data).forEach(function (key) {
    // TO-DO Check if key exists in retrievedMapping before requesting OCL API
    getMappingInfo(key);
    // TO-DO use string replace for dataString
  });
}

/**
 * @private
 */
function getMappingInfo(params) {
  const headers = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    'User-Agent': 'Request',
    'X-platform': 'Node',
  };

  return axios
    .request({
      method: 'GET',
      url: 'https://app.openconceptlab.org/',

      /**
       * Do we have a mechanism to retrieve those from configuration
       */
      auth: {
        username: ' ',
        password: ' ',
      },
      /**
       * Specify query parameters that may include OCL Data Source, MappingType, includion and exclusion values
       */
      params: '',
      headers,
    })
    .then(result => {
      const mapped_concepts = [];
      const responseBody = JSON.parse(result.body);
      for (concept in responseBody) {
        mapped_concepts.push(concept.to_concept_code);
      }
      return mapped_concepts;
    });
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
    ownerId = expandReferences(ownerId)(state);
    repositoryId = expandReferences(repositoryId)(state);
    options = expandReferences(options)(state);

    const { baseUrl } = state.configuration;

    const defaultOptions = {
      ownerId: ownerId,
      repositoryId: repositoryId,
      ownerType: 'orgs', // Default to orgs | orgs or users
      repository: 'collections', // Default to collections, collections or sources
      version: 'HEAD', // Default to HEAD, Eg: HEAD, 0.04
      expansions: 'expansions',
      expansionId: 'autoexpand-HEAD',
      content: 'mappings',
    };

    const urlParams = { ...defaultOptions, ...options };
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
    path = expandReferences(path)(state);
    query = expandReferences(query)(state);
    const { baseUrl } = state.configuration;

    const url = `${baseUrl}/${path}`;

    return request(url, query).then(response =>
      handleResponse(response, state, callback)
    );
  };
}

export {
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

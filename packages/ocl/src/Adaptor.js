
import {
  execute as commonExecute,
  composeNextState,
  expandReferences,
  http,
} from '@openfn/language-common';

const { axios } = http;
export { axios };

/**
 * Execute a sequence of operations.
 * Wraps `language-common/execute`, and prepends initial state for http.
 * @example
 * execute(
 *   create('foo'),
 *   delete('bar')
 * )(state)
 * @function
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
 * mapp(state, state)
 * @function
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

// /**
//  * Creates a fictional resource in a fictional destination system using a POST request
//  * @public
//  * @example
//  * create("/endpoint", {"foo": "bar"})
//  * @function
//  * @param {string} path - Path to resource
//  * @param {object} params - data to create the new resource
//  * @param {function} callback - (Optional) callback function
//  * @returns {Operation}
//  */
// export function create (path, params, callback) {
//   return state => {
//     path = expandReferences(path)(state)
//     params = expandReferences(params)(state)

//     const { baseUrl, username, password } = state.configuration

//     const url = `${baseUrl}/${path}`
//     const auth = { username, password }

//     const config = {
//       url,
//       body: params
//     }

//     return http
//       .post(config)(state)
//       .then(response => {
//         const nextState = {
//           ...composeNextState(state, response.data),
//           response
//         }
//         if (callback) return callback(nextState)
//         return nextState
//       })
//   }
// }

// /**
//  * Create a fictional patient in a fictional universe with a fictional REST api
//  * @public
//  * @example
//  * createPatient({"foo": "bar"})
//  * @function
//  * @param {object} params - data to create the new resource
//  * @param {function} callback - (Optional) callback function
//  * @returns {Operation}
//  */
// export function createPatient (params, callback) {
//   return state => {
//     params = expandReferences(params)(state)

//     const { baseUrl, username, password } = state.configuration

//     const url = `${baseUrl}/patient`
//     const auth = { username, password }

//     const config = {
//       url,
//       body: params,
//       auth
//     }

//     return http
//       .post(config)(state)
//       .then(response => {
//         const nextState = {
//           ...composeNextState(state, response.data),
//           response
//         }
//         if (callback) return callback(nextState)
//         return nextState
//       })
//   }
// }

// What functions do you want from the common adaptor?
export {
  alterState,
  dataPath,
  dataValue,
  each,
  field,
  fields,
  http,
  lastReferenceValue,
  merge,
  sourceValue,
} from '@openfn/language-common';

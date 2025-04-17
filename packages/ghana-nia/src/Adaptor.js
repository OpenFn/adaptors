import { execute as commonExecute } from '@openfn/language-common';
import * as util from './util';
import { createServer } from './mock';

/**
 * Executes an operation.
 * @function
 * @private
 * @param {Operation} operations - Operations
 * @returns {State}
 */
export function execute(...operations) {
  const initialState = {
    references: [],
    data: null,
    configuration: {},
  };

  return state => {
    if (!state.configuration.baseUrl) {
      const client = createServer();
      util.setMockClient(client);
    }
    return commonExecute(...operations)({ ...initialState, ...state });
  };
}

/**
/**
 * State object
 * @typedef {Object} HttpState
 * @property data - the parsed response body
 * @property response - the response from the HTTP server, including headers, statusCode, body, etc
 * @property references - an array of all previous data objects used in the Job
 * @private
 **/

/**
 * Make a GET request
 * @example
 * get("patient");
 * @function
 * @public
 * @param {string} path - Path to resource
 * @param {object} query - An object of query parameters to be encoded into the URL.
 * @returns {Operation}
 * @state {HttpState}
 */
export function get(path, query) {
  return util.request(path, { query, method: 'GET' });
}

/**
 * Make a POST request
 * @example
 * post("patient", { "name":"Bukayo" });
 * @function
 * @public
 * @param {string} path - Path to resource
 * @param {object} data - body data to append to the request. JSON will be converted to a string (but a content-type header will not be attached to the request).
 * @returns {Operation}
 * @state {HttpState}
 */
export function post(path, data) {
  return util.request(path, { data, method: 'POST' });
}

/**
 * Generate a national ID
 * @example
 * registerChild({
 *   babyData: {
 *     dateOfBirth: "string",
 *     fatherName: "string",
 *     forenames: "string",
 *     gender: "string",
 *     lightwaveETrackerID: "string",
 *     motherName: "string",
 *     noSiblingsInDelivery: "string",
 *     placeOfBirth: "string",
 *     surname: "string",
 *     timeOfbirth: "string",
 *     weightAtBirth: "string",
 *     babyPicture: "string"
 *   },
 *   personVouching: {
 *     etrackerLightwaveID: "string",
 *     ghanaCardPIN: "string",
 *     relationToBaby: "string",
 *     relativePhone: "string",
 *     relativePicture: "string"
 *   }
 * })
 * @function
 * @public
 * @param {object} data - body data to append to the request. JSON will be converted to a string (but a content-type header will not be attached to the request).
 * @returns {Operation}
 * @state {HttpState}
 */
export function registerChild(data) {
  return util.request('/awopa/api/v1/baby/registration', {
    method: 'POST',
    data,
  });
}

export {
  fn,
  fnIf,
  each,
  merge,
  field,
  fields,
  cursor,
  dateFns,
  dataPath,
  dataValue,
  sourceValue,
  lastReferenceValue,
} from '@openfn/language-common';

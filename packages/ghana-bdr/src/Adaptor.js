import { execute as commonExecute } from '@openfn/language-common';
import * as util from './Utils.js';

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
      throw new Error(
        'Missing configuration.baseUrl. Provide the BDR API base URL (e.g. https://bdr.npontu.com).'
      );
    }
    return commonExecute(...operations)({ ...initialState, ...state });
  };
}

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
 * Make a general HTTP request to the BDR API
 * @example
 * request("POST", "/api/v1/UserManagementService/integrations/utility", {
 *   type: "regions",
 * });
 * @function
 * @public
 * @param {string} method - HTTP method to use
 * @param {string} path - Path to resource
 * @param {object} [body] - Object which will be attached to the request body
 * @param {object} [options] - Optional request options, e.g. query and headers
 * @returns {Operation}
 * @state {HttpState}
 */
export function request(method, path, body, options = {}) {
  return util.request(path, { method, data: body, ...options });
}

/**
 * Create a birth record. `child_file_birth_evidence_data` takes an array of
 * base64-encoded data URIs (truncated in the example below).
 * @example <caption>Create a birth record from data on state</caption>
 * createBirthRecord($.data);
 * @example <caption>Create a birth record with a full payload</caption>
 * createBirthRecord({
 *   status: "COMPLETE",
 *   region_id: 4348,
 *   district_id: 338,
 *   type_of_birth: "SINGLETON",
 *   informant_type: "MOTHER",
 *   informant_national_id_type: "GHANA CARD",
 *   informant_national_id_number: "34454344",
 *   informant_first_name: "David",
 *   informant_middle_name: "",
 *   informant_last_name: "Godson",
 *   informant_region_id: 4348,
 *   informant_district_id: 338,
 *   informant_residential_address: "Dansoman",
 *   informant_phone_number: "2335648498309",
 *   child_first_name: "Francis",
 *   child_middle_name: "",
 *   child_last_name: "Benzoic",
 *   child_gender: "MALE",
 *   child_dob: "2025-06-26",
 *   child_place_of_birth: "HOSPITAL",
 *   child_birth_attendant: "MID-WIFE",
 *   child_birth_institution: "Ludra Hospital",
 *   child_town: "Ashaiman",
 *   child_house_no: "H/F286",
 *   child_street_name: "Ashaiman Newtown",
 *   mother_national_id_type: "GHANA CARD",
 *   mother_national_id_number: "32432423433",
 *   mother_phone_number: "2335456823893",
 *   mother_first_name: "Adwoa",
 *   mother_middle_name: "",
 *   mother_last_name: "Godson",
 *   mother_age: 30,
 *   mother_marital_status: "MARRIED",
 *   mother_previous_birth_no: 50,
 *   mother_occupation: "teacher",
 *   mother_educational_level: "DIPLOMA",
 *   mother_region_id: 4348,
 *   mother_district_id: 338,
 *   mother_town: "Accra",
 *   mother_religion: "CHRISTIAN",
 *   mother_residence: "Tamale",
 *   mother_nationality: "GHANA",
 *   doubtful_maternity: 0,
 *   father_national_id_type: "GHANA CARD",
 *   father_national_id_number: "32432423433",
 *   father_phone_number: "233548791223",
 *   father_first_name: "David",
 *   father_middle_name: "",
 *   father_last_name: "Godson",
 *   father_age: 33,
 *   father_marital_status: "MARRIED",
 *   father_children_no: 5,
 *   father_occupation: "Doctor",
 *   father_educational_level: "DIPLOMA",
 *   father_region_id: 4348,
 *   father_district_id: 338,
 *   father_town: "Tema",
 *   father_residence: "Tema",
 *   father_nationality: "GHANA",
 *   father_religion: "CHRISTIAN",
 *   doubtful_paternity: 0,
 *   child_file_birth_evidence_name: ["Physics.jpg"],
 *   child_file_birth_evidence_data: ["data:image/jpeg;base64,/9j/4QAYRXhpZg..."]
 * })
 * @function
 * @public
 * @param {object} data - body data to append to the request. JSON will be converted to a string.
 * @returns {Operation}
 * @state {HttpState}
 */
export function createBirthRecord(data) {
  return util.request('/api/v1/UserManagementService/integrations/registrations/birth', {
    method: 'POST',
    data,
  });
}

export {
  combine,
  cursor,
  dataPath,
  dataValue,
  dateFns,
  each,
  field,
  fields,
  fn,
  fnIf,
  lastReferenceValue,
  log,
  merge,
  sourceValue,
} from '@openfn/language-common';


import { expandReferences } from '@openfn/language-common/util';
import * as util from './Utils.js';

/**
 * State object
 * @typedef {Object} HttpState
 * @property data - the parsed response body
 * @property response - the response from the HTTP server, including headers, statusCode, body, etc
 * @property references - an array of all previous data objects used in the Job
 **/

/**
 * Options provided to the HTTP request
 * @typedef {Object} RequestOptions
 * @public
 * @property {object|string} body - body data to append to the request. JSON will be converted to a string (but a content-type header will not be attached to the request).
 * @property {object} query - An object of query parameters to be encoded into the URL.
 * @property {object} headers - An object of headers to append to the request.
 * @property {string} parseAs - Parse the response body as json, text or stream. By default will use the response headers.
 */

/**
 * Make a GET request to an OpenELIS instance
 * @example <caption>Get all orders in progress</caption>
 * get('OpenELIS-Global/rest/home-dashboard/ORDERS_IN_PROGRESS');
 * @example <caption>Get all orders ready for validation</caption>
 * get('openELIS-Global/rest/home-dashboard/ORDERS_READY_FOR_VALIDATION');
 * @example <caption>Get all the reasons why a lab order could be referred</caption>
 * get('OpenELIS-Global/rest/referral-reasons');
 * @function
 * @public
 * @param {string} path - Path to resource
 * @param {RequestOptions} options - Optional request options
 * @returns {Operation}
 * @state {HttpState}
 */
export function get(path, options) {
  return async state => {
    const [resolvedPath, resolvedOptions] = expandReferences(state, path, options);

    const response = await util.request(
      state.configuration,
      'GET',
      resolvedPath,
      {
        ...resolvedOptions,
        body: {}
      }
    );

    return util.prepareNextState(state, response)
  }
}

/**
 * Make a POST request to an OpenELIS instance
 * @example <caption>Validate results for a lab order</caption>
 * post('OpenELIS-Global/rest/AccessionValidation', {
    "formName": "ResultValidationForm",
    "formMethod": "POST",
    "cancelAction": "Home",
    "submitOnCancel": false,
    "cancelMethod": "POST",
    "searchFinished": true,
    "paging": {
        "totalPages": "1",
        "currentPage": "1",
        "searchTermToPage": [
            {
                "id": "25RSH00005L",
                "value": "1"
            }
        ]
    },
    "currentDate": "",
    "resultList": [
        {
            "id": 4,
            <more details>
        }
    ],
    "testSection": "",
    "accessionNumber": "25RSH00005L",
    "testDate": "",
    "testName": "",
    "testSections": [
        {
            "id": "56",
            "value": "Biochemistry"
        }
    ],
    "testSectionsByName": [
        {
            "id": "56",
            "value": "Biochemistry"
        }
    ],
    "displayTestSections": true
});
 * @example <caption>Add results to an order</caption>
 * post('OpenELIS-Global/rest/LogbookResults', {
    "formName": "LogbookResultsForm",
    "formMethod": "POST",
    "cancelAction": "Home",
    "submitOnCancel": false,
    "cancelMethod": "POST",
    "paging": {
        "totalPages": "1",
        "currentPage": "1",
        "searchTermToPage": [
            {
                "id": "DEV01260000000000003",
                "value": "1"
            }
        ]
    },
    "accessionNumber": "DEV01260000000000003",
    "singlePatient": false,
    "currentDate": "09/02/2026",
    "displayTestMethod": true,
    "displayTestKit": false,
    "testResult": [
        {
            "id": "0",
            <more details>
        }
    ],
    "inventoryItems": [],
    "hivKits": [],
    "syphilisKits": [],
    "type": "",
    "displayMethods": true,
    "testSectionId": "",
    "displayTestSections": true,
    "searchByRange": false,
    "searchFinished": true
});
 * @function
 * @public
 * @param {string} path - Path to resource
 * @param {object} body - Object which will be attached to the POST body
 * @param {RequestOptions} options - Optional request options
 * @returns {Operation}
 * @state {HttpState}
 */
export function post(path, body, options) {
  return async state => {
    const [resolvedPath, resolvedBody, resolvedOptions] = expandReferences(
      state,
      path,
      body,
      options
    );
    const response = await util.request(
      state.configuration,
      'POST',
      resolvedPath,
      {
        body: resolvedBody,
        ...resolvedOptions
      });

    return util.prepareNextState(state, response);
  }
}

/**
 * Make a general HTTP request
 * @example <caption>Edit an existing patient's information</caption>
 * request('POST', 'OpenELIS-Global/rest/PatientManagement', {
    "patientUpdateStatus": "UPDATE",
    "nationalId": "1234567892",
    "subjectNumber": "1234567892",
    "lastName": "Lazic",
    "firstName": "Aleksa",
    "streetAddress": "",
    "city": "",
    "primaryPhone": "+255-45-89-63-21",
    "gender": "F",
    "birthDateForDisplay": "13/08/2000",
    "commune": "",
    "education": "",
    "maritialStatus": "",
    "nationality": "",
    "healthDistrict": "",
    "healthRegion": "",
    "otherNationality": "",
    "patientContact": {
        "person": {
            "firstName": "",
            "lastName": "",
            "primaryPhone": "",
            "email": "",
            "lastupdated": 1764586121386,
            "id": "409"
        },
        "lastupdated": 1764536400000,
        "id": "200",
        "patientId": "202"
    },
    "patientPK": "202",
    "guid": "c7e48932-2ed8-440a-9312-b68112e3873f",
    "aka": "",
    "mothersName": "",
    "mothersInitial": "",
    "addressDepartment": "",
    "insuranceNumber": "",
    "occupation": "",
    "readOnly": false,
    "stnumber": ""
});
 * @function
 * @public
 * @param {string} method - HTTP method to use
 * @param {string} path - Path to resource
 * @param {object} body - Object which will be attached to the POST body
 * @param {RequestOptions} options - Optional request options
 * @returns {Operation}
 * @state {HttpState}
 */
export function request(method, path, body, options = {}) {
  return async state => {
    const [resolvedMethod, resolvedPath, resolvedBody, resolvedoptions] =
      expandReferences(state, method, path, body, options);

    const response = await util.request(
      state.configuration,
      resolvedMethod,
      resolvedPath,
      {
        body: resolvedBody,
        ...resolvedoptions,
      }
    );

    return util.prepareNextState(state, response);
  };
}
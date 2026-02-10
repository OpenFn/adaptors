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
            "units": "g/l ( 1.50-2.60 )",
            "testName": "Total cholesterol(Serum)",
            "accessionNumber": "25RSH00005L",
            "patientName": "",
            "result": "3.30",
            "isAccepted": false,
            "isRejected": false,
            "sampleIsAccepted": false,
            "sampleIsRejected": false,
            "analysisId": "296",
            "testId": "7",
            "resultId": "267",
            "lowerCritical": 0,
            "higherCritical": 0,
            "normalRange": "1.50 - 2.60",
            "resultType": "N",
            "isHighlighted": false,
            "sampleGroupingNumber": 2,
            "testSortNumber": "11",
            "displayResultAsLog": false,
            "showAcceptReject": true,
            "dictionaryResults": [],
            "multiSelectResultValues": "{}",
            "readOnly": false,
            "nonconforming": false,
            "pastNotes": "Internal 01/12/2025 14:13 : povišene vrijednosti<br/>Internal 01/12/2025 14:15 : normalan<br/>Internal 01/12/2025 14:17 : visok<br/>Internal 01/12/2025 14:17 : normalno",
            "qualifiedResultValue": "",
            "hasQualifiedResult": false,
            "significantDigits": 2,
            "valid": true,
            "normal": false,
            "manual": false,
            "reflexGroup": false,
            "childReflex": false,
            "multipleResultForSample": true,
            "positive": false,
            "id": 4
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
            "accessionNumber": "DEV01260000000000003",
            "sequenceNumber": "1",
            "showSampleDetails": true,
            "isGroupSeparator": false,
            "sampleGroupingNumber": 2,
            "testDate": "03/02/2026",
            "receivedDate": "12/01/2026",
            "testMethod": "52",
            "analysisMethod": "MANUAL",
            "testName": "COVID-19 PCR(Respiratory Swab)",
            "testId": "300",
            "testKitInactive": false,
            "upperNormalRange": 0,
            "lowerNormalRange": 0,
            "upperAbnormalRange": 0,
            "lowerAbnormalRange": 0,
            "normalRange": "Any value",
            "lowerCritical": 0,
            "higherCritical": 0,
            "significantDigits": 0,
            "shadowResultValue": "1335",
            "resultValue": "1336",
            "technician": "",
            "reportable": false,
            "patientName": "cray, cray",
            "patientInfo": "12121212, M, 10/11/2025",
            "nationalId": "",
            "unitsOfMeasure": "",
            "resultType": "D",
            "resultDisplayType": "TEXT",
            "isModified": "true",
            "analysisId": "368",
            "analysisStatusId": "15",
            "resultId": "383",
            "technicianSignatureId": "",
            "resultLimitId": "113",
            "dictionaryResults": [
                {
                    "id": "823",
                    "value": "Invalid"
                },
                {
                    "id": "1336",
                    "value": "RETEST - INCONCLUSIVE"
                },
                {
                    "id": "1335",
                    "value": "SARS-CoV-2 RNA DETECTED"
                },
                {
                    "id": "1334",
                    "value": "SARS-COV-2 RNA NOT DETECTED"
                }
            ],
            "methods": [],
            "remove": "no",
            "valid": true,
            "normal": true,
            "notIncludedInWorkplan": false,
            "readOnly": false,
            "referredOut": false,
            "referralCanceled": false,
            "shadowReferredOut": false,
            "shadowRejected": false,
            "multiSelectResultValues": "{}",
            "sampleType": "",
            "failedValidation": false,
            "nonconforming": false,
            "testSortOrder": "1",
            "reflexParentGroup": 0,
            "displayResultAsLog": false,
            "qualifiedResultValue": "",
            "hasQualifiedResult": false,
            "rejected": false,
            "refer": false,
            "defaultResultValue": "1334",
            "userChoiceReflex": false,
            "reflexGroup": false,
            "childReflex": false,
            "servingAsTestGroupIdentifier": false,
            "resultValueLog": "3.13",
            "id": "0",
            "forceTechApproval": "on",
            "referralItem": {
                "referredTestId": "",
                "referredSendDate": ""
            },
            "note": "here are the notes"
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

export {
  as,
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
  group,
  lastReferenceValue,
  map,
  merge,
  scrubEmojis,
  sourceValue,
  util,
} from '@openfn/language-common';

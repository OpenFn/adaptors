import { expandReferences } from '@openfn/language-common/util';
import * as util from './Utils';
import { execute as commonExecute } from '@openfn/language-common';

/**
 * State object
 * @typedef {Object} OpenCRVSState
 * @property data - the parsed response body
 * @property response - the response from the HTTP server, including headers, statusCode, body, etc
 * @property references - an array of all previous data objects used in the Job
 **/

/**
 * Options provided to the HTTP request
 * @typedef {Object} RequestOptions
 * @public
 * @property {object} errors - Map of errorCodes -> error messages, ie, `{ 404: 'Resource not found;' }`. Pass `false` to suppress errors for this code.
 * @property {object} query - An object of query parameters to be encoded into the URL.
 */

/**
 * Execute a sequence of operations.
 * Wraps `language-common/execute` to make working with this API easier.
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
    return commonExecute(
      util.authorize,
      ...operations
    )({
      ...initialState,
      ...state,
    });
  };
}

/**
 * Create a Birth Notification
 * @example
 * createBirthNotification($.data)
 * @function
 * @public
 * @param {object} body - Birth Notification object to be created in FHIR bundle format
 * @returns {Operation}
 * @state {OpenCRVSState}
 */
export function createBirthNotification(body) {
  return request('POST', '/notification', body);
}

/**
 * Search for a record
 * @example
 * searchRecord({
  operationName: 'searchEvents',
  query:
    'query searchEvents($advancedSearchParameters: AdvancedSearchParametersInput!, $sort: String, $count: Int, $skip: Int) {\nsearchEvents(\n  advancedSearchParameters: $advancedSearchParameters\n  sort: $sort\n  count: $count\n  skip: $skip\n) {\n  totalItems\n  results {\n    id\n    type\n    registration {\n      status\n      contactNumber\n      trackingId\n      registrationNumber\n      registeredLocationId\n      duplicates\n      assignment {\n        practitionerId\n        firstName\n        lastName\n        officeName\n        __typename\n      }\n      createdAt\n      modifiedAt\n      __typename\n    }\n    operationHistories {\n      operationType\n      operatedOn\n      operatorRole\n      operatorName {\n        firstNames\n        familyName\n        use\n        __typename\n      }\n      operatorOfficeName\n      operatorOfficeAlias\n      notificationFacilityName\n      notificationFacilityAlias\n      rejectReason\n      rejectComment\n      __typename\n    }\n    ... on BirthEventSearchSet {\n      dateOfBirth\n      childName {\n        firstNames\n        familyName\n        use\n        __typename\n      }\n      __typename\n    }\n    ... on DeathEventSearchSet {\n      dateOfDeath\n      deceasedName {\n        firstNames\n        familyName\n        use\n        __typename\n      }\n      __typename\n    }\n    __typename\n  }\n  __typename\n}}',
  variables: {
    advancedSearchParameters: {
      event: 'birth',
      registrationStatuses: ['REGISTERED'],
      childGender: 'male',
      dateOfRegistrationEnd: '2022-12-31T23:59:59.999Z',
      dateOfRegistrationStart: '2021-11-01T00:00:00.000Z',
      declarationJurisdictionId: '',
      eventLocationId: '704b9706-d729-4834-8656-05b562065deb',
      fatherFirstNames: 'Dad',
      motherFirstNames: 'Mom',
    },
    count: 10,
    skip: 0,
  },
});
 * @function
 * @public
 * @param {object} body - GraphQL query object to search for records
 * @returns {Operation}
 * @state {OpenCRVSState}
 */
export function searchRecord(body) {
  return request('POST', '/graphql', body);
}

/**
 * Make a POST request
 * @example
 * post("/location", {
  "statisticalID": "TEST_LOCATION",
  "name": "My name",
  "alias": "My alias",
  "partOf": "Location/0",
  "code": "ADMIN_STRUCTURE",
  "jurisdictionType": "STATE",
  "statistics": [
    {
      "year": 0,
      "male_population": 0,
      "female_population": 0,
      "population": 0,
      "crude_birth_rate": 0
    }
  ]
});
 * @function
 * @public
 * @param {string} path - Path to resource
 * @param {object} body - Object which will be attached to the POST body
 * @param {RequestOptions} options - Optional request options
 * @returns {Operation}
 * @state {OpenCRVSState}
 */
export function post(path, body, options) {
  return request('POST', path, body, options);
}

/**
 * Make a general HTTP request
 * @example <caption>Create a new administrative location</caption>
 * request("POST", "/location", {
  "statisticalID": "TEST_LOCATION",
  "name": "My name",
  "alias": "My alias",
  "partOf": "Location/0",
  "code": "ADMIN_STRUCTURE",
  "jurisdictionType": "STATE",
  "statistics": [
    {
      "year": 0,
      "male_population": 0,
      "female_population": 0,
      "population": 0,
      "crude_birth_rate": 0
    }
  ]
});
 * @function
 * @public
 * @param {string} method - HTTP method to use
 * @param {string} path - Path to resource
 * @param {object} body - Object which will be attached to the POST body
 * @param {RequestOptions} options - Optional request options
 * @returns {Operation}
 * @state {OpenCRVSState}
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
  merge,
  scrubEmojis,
  sourceValue,
  util,
} from '@openfn/language-common';

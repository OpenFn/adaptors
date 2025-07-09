import { expandReferences } from '@openfn/language-common/util';
import * as util from './Utils';
import { execute as commonExecute } from '@openfn/language-common';
import { searchEventsQuery } from './query';

/**
 * State object
 * @typedef {Object} OpenCRVSState
 * @property data - the parsed response body
 * @property response - the response from the HTTP server, including headers, statusCode, body, etc
 * @property references - an array of all previous data objects used in the Job
 **/

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
 * createBirthNotification([
  {
    fullUrl: 'urn:uuid:eee21c26-67a2-40af-8cf7-5f4bc969153f',
    resource: {
      resourceType: 'QuestionnaireResponse',
      extension: [],
      status: 'completed',
      subject: {
        reference: 'urn:uuid:7cb1d9cc-ea4b-4046-bea0-38bdf3082f56',
      },
      item: [
        {
          text: 'birth.mother.mother-view-group.motherIdType',
          linkId: '',
          answer: [
            {
              valueString: 'NATIONAL_ID',
            },
          ],
        },
        {
          text: 'birth.father.father-view-group.fatherIdType',
          linkId: '',
          answer: [
            {
              valueString: 'NATIONAL_ID',
            },
          ],
        },
      ],
    },
  },
]);

 * @function
 * @public
 * @param {Array} body - An array of Birth Notification FHIR resources
 * @returns {Operation}
 * @state {OpenCRVSState}
 */
export function createBirthNotification(body) {
  return async state => {
    const [resolvedBody] = expandReferences(state, body);

    const response = await util.request(
      state.configuration,
      'POST',
      '/notification',
      {
        body: {
          resourceType: 'Bundle',
          type: 'document',
          meta: {
            lastUpdated: new Date().toISOString(),
          },
          entry: resolvedBody,
        },
      }
    );

    return util.prepareNextState(state, response);
  };
}

/**
 * Make an events search query against the OpenCRVS GraphQL API.
 * @example <caption>Search for events with specific parameters</caption>
 * query(
  {
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
);
 * @example <caption>Search for events with options</caption>
 * query(
  {
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
  { count: 10, skip: 0 }
);
 * @function
 * @public
 * @param {Object} variables - GraphQl advanced search parameters
 * @param {Object} options - Options to control the request, such as `count` and `skip`. Count defaults to 10.
 * @returns {Operation}
 * @state {OpenCRVSState}
 */
export function queryEvents(variables, options = {}) {
  return async state => {
    const [resolvedVariables, resolvedOptions] = expandReferences(
      state,
      variables,
      options
    );

    const response = await util.request(
      state.configuration,
      'POST',
      '/graphql',
      {
        body: {
          operationName: 'searchEvents',
          query: searchEventsQuery,
          variables: { advancedSearchParameters: resolvedVariables },
          count: resolvedOptions.count || 10,
          skip: resolvedOptions.skip,
          ...resolvedOptions,
        },
      }
    );

    const body = response.body.data.searchEvents.results;

    return util.prepareNextState(state, {
      ...response,
      body,
    });
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

export { builders } from '@openfn/language-fhir-4';

import {
  execute as commonExecute,
  composeNextState,
} from '@openfn/language-common';
import { expandReferences } from '@openfn/language-common/util';

import { buildUrl, request } from './Utils';

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
    return commonExecute(...operations)({
      ...initialState,
      ...state,
    });
  };
}

/**
 * Create some resource in Google Cloud Healthcare
 * @public
 * @example
 * createFhirResource({
 *   name: [{ use: "official", family: "Smith", given: ["Darcy"] }],
 *   gender: "female",
 *   birthDate: "1970-01-01",
 *   resourceType: "Patient",
 * });
 * @example
 * createFhirResource(state => ({
 *  resourceType: 'Encounter',
 *  status: 'finished',
 *  class: {
 *    system: 'http://hl7.org/fhir/v3/ActCode',
 *    code: 'IMP',
 *    display: 'inpatient encounter',
 *  },
 *  reasonCode: [
 *    {
 *      text: 'The patient had an abnormal heart rate. She was concerned about this.',
 *    },
 *  ],
 *  subject: {
 *    reference: `Patient/${state.data.id}`,
 *  },
 * }));
 * @function
 * @param {object} resource - The data to create the new resource
 * @param {function} callback - An optional callback function
 * @returns {Operation}
 */
export function createFhirResource(resource, callback) {
  return async state => {
    const {
      cloudRegion,
      projectId,
      datasetId,
      fhirStoreId,
      apiVersion,
      accessToken,
    } = state.configuration;

    const [resolvedResource] = expandReferences(state, resource);
    const { resourceType } = resolvedResource;

    const url = buildUrl({
      apiVersion,
      projectId,
      cloudRegion,
      datasetId,
      fhirStoreId,
      resourceType,
    });

    const payload = {
      auth: {
        accessToken: accessToken,
      },
      ...resolvedResource,
    };

    return request(url, payload, 'POST').then(response => {
      console.log(
        `Created FHIR ${resourceType} resource with ID ${response.id}`
      );
      const nextState = {
        ...composeNextState(state, response),
        response,
      };
      if (callback) return callback(nextState);
      return nextState;
    });
  };
}

export { request } from './Utils';

export {
  dataPath,
  dataValue,
  dateFns,
  each,
  field,
  fields,
  fn,
  lastReferenceValue,
  merge,
  sourceValue,
} from '@openfn/language-common';

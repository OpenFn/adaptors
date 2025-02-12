import {
  execute as commonExecute,
  composeNextState,
} from '@openfn/language-common';
import {
  expandReferences,
  normalizeOauthConfig,
} from '@openfn/language-common/util';

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
      configuration: normalizeOauthConfig(state.configuration),
    });
  };
}

/**
 * Create some resource in Google Cloud Healthcare
 * @public
 * @example
 * createFhirResource(
 *   {
 *     cloudRegion: "us-central1",
 *     projectId: "adjective-noun-123",
 *     datasetId: "my-dataset",
 *     fhirStoreId: "my-fhir-store",
 *   },
 *   {
 *     resourceType: "Patient",
 *     name: [{ use: "official", family: "Smith", given: ["Darcy"] }],
 *     gender: "female",
 *     birthDate: "1970-01-01",
 *   }
 * );
 * @example
 * createFhirResource(
 *   {
 *     cloudRegion: "us-central1",
 *     projectId: "adjective-noun-123",
 *     datasetId: "my-dataset",
 *     fhirStoreId: "my-fhir-store",
 *   },
 *   (state) => ({
 *     resourceType: "Encounter",
 *     status: "finished",
 *     class: {
 *       system: "http://hl7.org/fhir/v3/ActCode",
 *       code: "IMP",
 *       display: "inpatient encounter",
 *     },
 *     reasonCode: [
 *       {
 *         text: "The patient had an abnormal heart rate. She was concerned about this.",
 *       },
 *     ],
 *     subject: {
 *       reference: `Patient/${state.data.id}`,
 *     },
 *   })
 * );
 *
 * @function
 * @param {{cloudRegion: string, projectId: string, datasetId: string, fhirStoreId: string}} [fhirStore] - The FHIR store information.
 *    - `cloudRegion` (string): The cloud region where the FHIR store is located.
 *    - `projectId` (string): The ID of the project that contains the FHIR store.
 *    - `datasetId` (string): The ID of the dataset that contains the FHIR store.
 *    - `fhirStoreId` (string): The ID of the FHIR store.
 * @param {object} resource - The FHIR resource data to be created
 * @param {function} callback - An optional callback function
 * @returns {Operation}
 */
export function createFhirResource(fhirStore, resource, callback) {
  return async state => {
    const { apiVersion, accessToken } = state.configuration;

    const [resolvedFhirStore, resolvedResource] = expandReferences(
      state,
      fhirStore,
      resource
    );
    const { resourceType } = resolvedResource;
    const { cloudRegion, projectId, datasetId, fhirStoreId } =
      resolvedFhirStore;

    const requiredKeys = [
      'cloudRegion',
      'projectId',
      'datasetId',
      'fhirStoreId',
    ];

    const missingKeys = requiredKeys.filter(key => !(key in resolvedFhirStore));

    if (missingKeys.length > 0) {
      throw new Error(`Missing key(s) in fhirStore: ${missingKeys.join(', ')}`);
    }

    const url = buildUrl({
      apiVersion,
      projectId,
      cloudRegion,
      datasetId,
      fhirStoreId,
      resourceType,
    });

    const payload = {
      auth: { accessToken },
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
  fnIf,
  lastReferenceValue,
  merge,
  sourceValue,
} from '@openfn/language-common';

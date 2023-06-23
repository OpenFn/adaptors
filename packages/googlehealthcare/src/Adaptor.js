import {
  execute as commonExecute,
  composeNextState,
} from '@openfn/language-common';
import { expandReferences } from '@openfn/language-common/util';
import google from '@googleapis/healthcare';

const healthcare = google.healthcare({
  version: 'v1',
  auth: new google.auth.GoogleAuth({
    scopes: ['https://www.googleapis.com/auth/cloud-platform'],
  }),
  headers: { 'Content-Type': 'application/fhir+json' },
});

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

  // TODO: Add session-based authentication here if your API needs it.
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
 * createFhirResource("Patient", {
 *   name: [{ use: "official", family: "Smith", given: ["Darcy"] }],
 *   gender: "female",
 *   birthDate: "1970-01-01",
 *   resourceType: "Patient",
 * });
 * @function
 * @param {string} resourceType - The type of entity that will be created
 * @param {object} body - The data to create the new resource
 * @param {function} callback - An optional callback function
 * @returns {Operation}
 */
export function createFhirResource(resourceType, body, callback) {
  return async state => {
    const { cloudRegion, projectId, datasetId, fhirStoreId } =
      state.configuration;

    const [resolvedResourceType, resolvedBody] = expandReferences(
      state,
      resourceType,
      body
    );
    const parent = `projects/${projectId}/locations/${cloudRegion}/datasets/${datasetId}/fhirStores/${fhirStoreId}`;

    const request = {
      parent,
      type: resolvedResourceType,
      requestBody: resolvedBody,
    };

    const resource =
      await healthcare.projects.locations.datasets.fhirStores.fhir.create(
        request
      );

    console.log(`Created FHIR resource with ID ${resource.data.id}`);

    const nextState = {
      ...composeNextState(state, resource.data),
      resource,
    };
    if (callback) return callback(nextState);
    return nextState;
  };
}

export { request } from './Utils';

// TODO: Decide which functions to publish from @openfn/language-common
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

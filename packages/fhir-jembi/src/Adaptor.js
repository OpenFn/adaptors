import { util } from '@openfn/language-fhir';

// This is only available at after build
import { builders } from './builders';

// TODO this is a lightweight wrapper around fhir create which uses the builder function
// and typings
/**
 * Creates a new resource with a server assigned resourceType.
 * The resource object doesn't need resourceType or id
 * @public
 * @function
 * @example <caption>Create a new patient</caption>
 * create('Patient', {
 *   name: [
 *     {
 *       use: 'official',
 *       family: 'La Paradisio',
 *       given: ['Josephine', 'Nessa'],
 *     },
 *   ],
 * });
 * @param {FhirResourceTypes} resourceType - The resource type to create
 * @param {FhirResource} resource - The resource to create
 * @param {object} params - (Optional) FHIR parameters to control and configure resource creation. You can specify a version ie r4 here.
 * @param {function} callback - (Optional) callback function
 * @returns {Operation}
 * @state {FHIRHttpState}
 */
export const create = (resourceType, resource, params, callback = s => s) => {
  return async state => {
    const [resolvedResourceType, resolvedResource, resolvedParams = {}] =
      expandReferences(state, resourceType, resource, params);

    // TODO warn if unsupported type
    const r = builders[resolvedResourceType](resource);

    const { version, ...paramsWithoutVersion } = resolvedParams;

    const opts = {
      ...paramsWithoutVersion,
      body: r,
    };

    const response = await util.request(
      state.configuration,
      'POST',
      resolvedResourceType,
      opts
    );
    return util.prepareNextState(state, response, callback);
  };
};

export {
  dataPath,
  dataValue,
  dateFns,
  cursor,
  each,
  field,
  fields,
  fn,
  lastReferenceValue,
  merge,
  sourceValue,
} from '@openfn/language-common';

import { expandReferences } from '@openfn/language-common/util';
import * as util from './utils';

// This is only available at after build
// @ts-ignore
import * as builders from './builders';

const getBuilderName = resourceName =>
  resourceName[0].toLowerCase() + resourceName.slice(1);

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

    console.log(builders);

    // TODO warn if unsupported type
    const r = builders[getBuilderName(resolvedResourceType)](resource);
    console.log('CREATE: here is the jembi-fhir resource we generated:');
    console.log(r);
    console.log('This object has NOT been posted to fhir');

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
  cursor,
  each,
  field,
  fields,
  fn,
  lastReferenceValue,
  merge,
  sourceValue,
} from '@openfn/language-common';

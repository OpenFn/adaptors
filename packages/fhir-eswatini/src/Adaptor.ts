import { expandReferences } from '@openfn/language-common/util';

export { createBundle, uploadBundle } from '@openfn/language-fhir-4';

/**
 * Add a resource to a bundle on state, using the `name` as the key (or `bundle` by default).
 * The resource will be upserted (via PUT).
 * A new bundle will be generated if one does not already exist.
 * @public
 * @function
 * @param {object/array} resources - A resource or array of resources to add to the bundle
 * @param {string} [name] - A name (key) for this bundle on state (defaults to `bundle`)
 * @state bundle - the updated bundle
 * @example <caption>Add a new patient resource to the default bundle</caption>
 * addToBundle(b.patient($.patientDetails))
 * @returns Operation
 */

// TODO would like a smarter way to track this
const BASE_URL = 'http://172.209.216.154';

export function addToBundle(resources: any | any[], name: string = 'bundle') {
  return state => {
    let [$resources, $name] = expandReferences(state, resources, name);

    if (!state[$name]) {
      state[$name] = {
        resourceType: 'Bundle',
        type: 'transaction',
        entry: [],
      };
    }

    if (!Array.isArray($resources)) {
      $resources = [$resources];
    }

    state[$name].entry.push(
      ...$resources.map(r => ({
        fullUrl: new URL(`fhir/${r.resourceType}/${r.id}`, BASE_URL).toString(),
        resource: r,
        request: {
          method: 'PUT', // upsert
          url: `${r.resourceType}/${r.id}`,
        },
      })),
    );

    return state;
  };
}

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

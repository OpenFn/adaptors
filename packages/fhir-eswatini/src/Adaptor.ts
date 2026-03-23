import { expandReferences } from '@openfn/language-common/util';
import * as builders from './builders';

export {
  read,
  search,
  update,
  delete,
  create,
  createBundle,
  uploadBundle,
} from '@openfn/language-fhir-4';

// TODO would like a smarter way to track this
export const BASE_URL = 'https://hapifhir.eswatinihie.com';

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

/**
 * Set value mappings against a value-set.
 * Pass the URL of the valueset you want to provide mappings for.
 * For each mapping, the key is the input string, and the  value is either
 * a code string or a full object value to map
 * @public
 * @function
 * @param {string} url - The URL of the value set you are providing mappings for
 * @param {object} [mappings] - object of mappings
 * @example <caption>Create a custom mapping for Patient.inkhundla</caption>
 * mapValues('http://172.209.216.154:3447/fhir/ValueSet/SzTinkhundlaVS', {
 *  // Maps input value "lobamba" to mapping code "3"
 *  lobamba: '3',
 * });
 * @returns Operation
 */
export function mapValues(url: string, mappings: string) {
  return state => {
    builders.setValues(url, mappings);

    return state;
  };
}

export {
  combine,
  dataPath,
  dataValue,
  dateFns,
  cursor,
  log,
  each,
  field,
  fields,
  fn,
  lastReferenceValue,
  merge,
  sourceValue,
} from '@openfn/language-common';

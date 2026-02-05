import _ from 'lodash';

import type * as FHIR from './fhir';
export type * from './fhir';

let systemMap = {};

// https://hl7.org/fhir/R4/datatypes.html#dateTime
const datetimeregex =
  /^([0-9]([0-9]([0-9][1-9]|[1-9]0)|[1-9]00)|[1-9]000)(-(0[1-9]|1[0-2])(-(0[1-9]|[1-2][0-9]|3[0-1])(T([01][0-9]|2[0-3]):[0-5][0-9]:([0-5][0-9]|60)(\.[0-9]+)?(Z|(\+|-)((0[0-9]|1[0-3]):[0-5][0-9]|14:00)))?)?)?$/;

export const mapSystems = obj => {
  if (Array.isArray(obj)) {
    return obj.map(mapSystems);
  }

  if (obj.system in systemMap) {
    return {
      ...obj,
      system: systemMap[obj.system],
    };
  }
  return obj;
};

/**
 * Define a set of mapped system values.
 *
 * Builder functions will use this mappings when they encounter them in system keys. Useful for setting shortcuts.
 * @public
 * @function
 * @example <caption>Set shortcut system mappings</caption>
 * b.setSystemMap({
 *   SmartCareID: 'http://moh.gov.et/fhir/hiv/identifier/SmartCareID'
 * });
 * create(builders.patient({ identifier: b.identifier('xyz', 'SmartCareId') }))
 */
export const setSystemMap = newMappings => state => {
  systemMap = newMappings;
  return state;
};

export const extendSystemMap = newMappings => {
  Object.assign(systemMap, newMappings);
};

/**
 * Create an Identifier. Systems will be mapped against the system map. Pass extensions as extra arguments.
 * @public
 * @function
 * @param id - A string identifier, a FHIR identifier object, or an array of either.
 * @param ext - Any other arguments will be treated as extensions
 * @param {string} [system] - the string system to use by default if
 */
export const identifier = (id: string | FHIR.Identifier, ...ext) => {
  // If an array of inputs is passed in, map each element of the array
  // because it's very common to support a set of identifiers, rather than just one
  // Note that in this mode, each argument should be an object
  if (Array.isArray(id)) {
    return id.map(i => identifier(i));
  }

  const i: FHIR.Identifier = {};
  if (typeof id === 'string') {
    i.value = id;
  } else {
    if (id.type) {
      id.type = concept(id.type);
    }
    Object.assign(i, id);
    // TODO can we default the system anyhow?
  }

  // TODO warn for unexpected keys?

  ext.forEach(e => {
    addExtension(i, e.url, e.value);
  });

  return mapSystems(i);
};

/**
 * Alias for b.identifier()
 * @public
 * @function
 */
export const id = identifier;

/**
 * Add an extension to a resource (or object).
 * An object will be created and added to an `extension` array on the provided resource.
 * The extension array will be set if it does not exist on the resource.
 * The value will be smartly written to the object, ie, valueDateTime or valueReference or valueString
 * @public
 * @function
 * @param resource - a FHIR resource object to add an extension too
 * @param {string} url - the URL to set for the extension
 * @param value - the value that the extension should contain
 */
export const addExtension = (resource, url, value) => {
  const obj = {
    url: url,
  };

  composite(obj, 'value', value);

  resource.extension ??= [];
  resource.extension.push(obj);
};

/**
 * Create an extension with a system and value
 * Values will be typemapped (ie, `value` -> `valueString`)
 * Optionally pass extra keys on the third argument
 * @public
 * @function
 * @param {string} url - the URL to set for the extension
 * @param value - the value that the extension should contain
 * @param props - extra props to add to the extension
 */
export const extension = (
  url: string,
  value: any,
  props: Omit<FHIR.Extension, 'url'> = {},
) => {
  const ext = {
    url: url,
  };

  composite(ext, 'value', value);
  return { extension: [Object.assign(ext, props)] };
};

/**
 * Alias for b.extension()
 * @public
 * @function
 */
export const ext = extension;

/**
 * Find an extension with a given url in some array
 * @public
 * @function
 * @param obj - a fhir resource
 * @param {string} targetUrl - the extension URL you want to find
 * @param {string} [path] - a path to extract from the resource. Optional.
 */
export const findExtension = (obj, targetUrl, path) => {
  const result = obj.extension?.find(ext => ext.url === targetUrl);
  if (result && path) {
    return _.get(result, path);
  }
  return result;
};

/**
 * Create a coding object { code, system }. Systems will be mapped using the system map.
 * @public
 * @function
 * @param {string} code - the code value
 * @param {string} system - URL to the system. Will be mapped using the system map.
 */
export const coding = (
  code: string,
  system: string,
  extra: Omit<FHIR.Coding, 'code' | 'system'> = {},
) =>
  mapSystems({
    code,
    system,
    ...extra,
  });

export const c = coding;

/**
 * Create a value object { code, system } with optional system. Systems will be mapped.
 * @function
 * @param {string} value - the value
 * @param {string} system - URL to the system. Well be mapped using the system map.
 */
// TODO drop this? What is it for?
export const value = (value, system, ...extra) =>
  mapSystems({
    value,
    system,
    ...extra,
  });

/**
 * Create a CodeableConcept. Codings can be coding objects or
 * [code, system, extra] tuples (such as passed to b.coding())
 * Systems will be mapped with the system map
 * @public
 * @function
 * @param {string} value - the value
 * @param {object} extra - Extra properties to write to the coding
 * @example <caption>Create a codeableConcept</caption>
 * const myConcept = util.concept(['abc', 'http://moh.gov.et/fhir/hiv/identifier/SmartCareID'])
 * @example <caption>Create a codeableConcept with text</caption>
 * const myConcept = util.concept('smart care id', ['abc', 'http://moh.gov.et/fhir/hiv/identifier/SmartCareID'])
 */
type ConceptCoding =
  | FHIR.Coding
  | [string, string, Omit<FHIR.Coding, 'code' | 'system'>?];

export const concept = (
  codings: ConceptCoding | ConceptCoding[],
  extra: Omit<FHIR.CodeableConcept, 'coding'> = {},
): FHIR.CodeableConcept => {
  // This looks like a valid concept - just return it
  if ((codings as any).coding) {
    return codings as unknown as FHIR.CodeableConcept;
  }
  // Work out if we've been passed one or many codings
  if (
    // This looks like a single coding object
    !Array.isArray(codings) ||
    // This looks like a single tuple
    typeof codings[0] === 'string'
  ) {
    // @ts-ignore
    codings = [codings];
  }

  return {
    ...extra,
    coding: codings.map(c => {
      if (Array.isArray(c)) {
        return coding(...c);
      } else {
        return c;
      }
    }),
  };
};

/**
 * Alias for b.concept()
 * @public
 * @function
 */
export const cc = concept;

/**
 * Create a reference object of the form { reference }
 * If ref is an array, each item will be mapped and an array returned.
 * If ref is a FHIR resource, a reference to it will be generated
 * If ref is a string, it'll be treated as a reference id and returned as an object
 * If ref is a valid FHIR reference, it'll just be returned.
 * @public
 * @function
 * @param ref - the thing to generate a reference from
 */
export const reference = (ref, opts = {}) => {
  if (Array.isArray(ref)) {
    return ref.map(reference, opts);
  }
  // If passed a resource, generate a reference to this resource
  if (ref.resourceType && ref.id) {
    // TODO is this right? Or just the id?
    return { reference: `${ref.resourceType}/${ref.id}` };
  }
  // if passed an existing reference object, just return it
  if (ref.reference) {
    return ref;
  }

  const result = {};

  if (typeof ref === 'string') {
    result.reference = ref;
  }

  if (opts) {
    Object.assign(result, opts);
  }

  return result;
};

/**
 * Alias for b.reference()
 * @public
 * @function
 */
export const ref = reference;

/**
 * Write a value to the target object using a typed key
 * Ie, if key is `value` and the value is a date time string,
 * this function will write `valueDateTime` to the object.
 *
 * This function is poorly named.
 * @public
 * @function
 * @param object - the object to write the composite key to
 * @param {string} key - the base key to use to write the value
 * @param value - some value to write to the object
 */
export const composite = (object, key, value) => {
  const k = [key];

  // TODO identify date time and period
  // is there a better way we can do this?
  // like how would we tell date time from a string?

  if (value.coding) {
    k.push('CodeableConcept');
  } else if (value.reference) {
    k.push('Reference');
  }
  // if the incoming value is a reference or another resource, make it a reference
  // TODO Is this a bit cheeky? A bit presumptuous?
  else if (value.id && value.meta && value.resourceType) {
    k.push('Reference');
    // eslint-disable-next-line no-param-reassign
    value = reference(value);
  } else if (value.start || value.end) {
    // TODO maybe we should test that start/end are datetimes using that fancy regex?
    k.push('Period');
  } else if (value.dateTime) {
    k.push('DateTime');
  } else if (typeof value === 'string') {
    if (datetimeregex.test(value)) {
      k.push('DateTime');
    } else {
      k.push('String');
    }
  } else if (typeof value === 'boolean') {
    k.push('Boolean');
  } else if (typeof value === 'number') {
    k.push('Integer');
  }
  // TODO: other data types need mapping

  if (k.length === 2) {
    const finalKey = k.join('');
    object[finalKey] = value;
  } else {
    console.warn(
      `WARNING: Failed to map ${key}: unrecognised data type (see utils.composite)`,
    );
  }
};

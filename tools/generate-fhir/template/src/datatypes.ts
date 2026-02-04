import _ from 'lodash';

// TODO need to generate this export properly
// For base adaptors, we do this:
import type * as FHIR from './fhir';
export type * from './fhir';

// But if there's a base, we import those core types from it
// (note that we actually only want to import datatypes)
// import type { builders as FHIR } from '@openfn/language-fhir-4';

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
 * util.setSystemMap({
 *   SmartCareID: 'http://moh.gov.et/fhir/hiv/identifier/SmartCareID'
 * });
 * builders.patient('patient', { identifier: util.identifier('xyz', 'SmartCareId') })
 * };
 */
export const setSystemMap = newMappings => {
  systemMap = newMappings;
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
export const identifier = (id: string | Identifier, ...ext) => {
  // If an array of inputs is passed in, map each element of the array
  // because it's very common to support a set of identifiers, rather than just one
  // Note that in this mode, each argument should be an object
  if (Array.isArray(id)) {
    return id.map(i => identifier(i));
  }

  const i: Identifier = {};
  if (typeof id === 'string') {
    i.value = id;
  } else {
    Object.assign(i, id);
    // TODO can we default the system anyhow?
  }

  // TODO warn for unexpected keys?

  if (ext.length) {
    i.extension ??= [];
    i.extension.push(...ext);
  }

  return mapSystems(i);
};

// TODO identifier takes many many things!
// This API is insufficent really, and not well typed
// technically all identifier fields are optional
// but really there will usually be a value, and the value should usually have a system
// everything else is optional
// TODO how do we handle extensions?
// export const identifier = (input, system) => {
//   // If an array of inputs is passed in, map each element of the array
//   // because it's very common to support a set of identifiers, rather than just one
//   if (Array.isArray(input)) {
//     return input.map(i => identifier(i, system));
//   }

//   if (input) {
//     if (typeof input === 'string') {
//       return mapSystems({
//         value: input,
//         system,
//       });
//     } else if (system) {
//       return mapSystems({
//         // Is system a default or override?
//         // Probably a default?
//         system,
//         ...input,
//       });
//     } else {
//       return mapSystems(input);
//     }
//   }
// };

/**
 * Alias for util.identifier()
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

// TODO should this also take display text?

/**
 * Create a coding object { code, system }. Systems will be mapped using the system map.
 * @public
 * @function
 * @param {string} code - the code value
 * @param {string} system - URL to the system. Well be mapped using the system map.
 */
export const coding = (code, system) => ({ code, system: mapSystems(system) });

export const c = coding;

/**
 * Create a value object { code, system } with optional system. Systems will be mapped.
 * @public
 * @function
 * @param {string} value - the value
 * @param {string} system - URL to the system. Well be mapped using the system map.
 */
export const value = (value, system, ...extra) =>
  mapSystems({
    value,
    system,
    ...extra,
  });

/**
 * Create a codeableConcept. Codings can be coding objects or
 * [code, system] tuples
 * if the first argument is a string, it will be set as the text.
 * Systems will be mapped with the system map
 * @public
 * @function
 * @example <caption>Create a codeableConcept</caption>
 * const myConcept = util.concept(['abc', 'http://moh.gov.et/fhir/hiv/identifier/SmartCareID'])
 * @example <caption>Create a codeableConcept with text</caption>
 * const myConcept = util.concept('smart care id', ['abc', 'http://moh.gov.et/fhir/hiv/identifier/SmartCareID'])
 */
export const concept = (text, ...codings) => {
  const result = {};
  let incomingCodings = codings;
  if (typeof text === 'string') {
    result.text = text;
  } else {
    incomingCodings = [text].concat(codings);
  }

  const c = [];
  for (const item of incomingCodings) {
    if (Array.isArray(item)) {
      c.push(coding(item[0], item[1]));
    } else {
      c.push(item);
    }
  }
  result.coding = c;

  return result;
};

/**
 * Alias for util.concept()
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
export const reference = (ref, opts) => {
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
 * Alias for util.reference()
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

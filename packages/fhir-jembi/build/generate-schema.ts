import { writeFile } from 'node:fs/promises';
/**
 * This file will generate a simple schema representation of a FHIR spec
 */

// here's a lookup of common type defs we can reuse
const typeDefs = {
  'http://hl7.org/fhirpath/System.String': 'string',
  // TODO some types, like `status`, have an enum. Can we use it for validation?
  // For now, count all codes as strings
  code: 'string',

  // TODO should I capture this like a generic type, or is a name easier to map to?
  // because with a name I can probably do more
  Coding: { system: 'string', coding: 'string ' },
};

const typeMappings = {
  'http://hl7.org/fhirpath/System.String': 'string',
  // TODO some types, like `status`, have an enum. Can we use it for validation?
  // For now, count all codes as strings
  code: 'string',
  uri: 'string',
};

const generate = async types => {
  const fullSpec = await import('../spec/spec.json', {
    assert: { type: 'json ' },
  });
  const result = {};
  for (const resourceType in fullSpec) {
    if (types.includes(resourceType)) {
      const spec = fullSpec[resourceType];

      const props = {};

      const schema = {
        type: resourceType,
        url: spec.url,
        props,
      };

      for (const prop of spec.snapshot.element) {
        if (prop.path === resourceType) {
          continue;
        }
        const path = prop.path.replace(`${resourceType}\.`, '');

        if (path.includes('.')) {
          console.log('skipping', path);
          continue;
        }

        const defaults: Record<string, any> = {};
        const type = getSimpleType(prop);

        const isArray = prop.base.max === '*';

        if (type === 'Identifier') {
          // TODO this isn't robust because it assumes a particular slicing
          // It's the schema's job to unpick this slicing
          // This is a quick fix - let's see how well it stands up!
          const slicedValue = spec.snapshot.element.find(
            e => e.path === `${prop.path}.system`
          );
          if (slicedValue && slicedValue.patternUri) {
            defaults.system = slicedValue.patternUri;
          }
        }

        props[path] = {
          type,
          isArray,
          defaults,
        };
      }

      result[resourceType] = schema;
      // TODO maybe write the schema for debug?
      await writeFile(
        `./spec/${resourceType}.json`,
        JSON.stringify(schema, null, 2)
      );
    }
  }
  return result;
};

/**
 * Work out a simple js type from the prop definition
 * This will feed type docs and auto mappings
 * will return a simple string type or an object type def
 */
function getSimpleType(prop: any) {
  if (prop.type.length > 1) {
    console.log('WARNING: multiple types found on ', prop.path);
  }
  for (const type of prop.type) {
    if (type.code in typeMappings) {
      return typeMappings[type.code];
    }
    return type.code;
  }
}

export default generate;

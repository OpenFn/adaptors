import path from 'node:path';
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
  const fullSpec = await import(path.resolve('./spec/spec.json'), {
    assert: { type: 'json ' },
  });
  const result: Record<string, Schema[]> = {};

  const counts = {};
  const codes = {};

  for (const id in fullSpec) {
    const resourceType = fullSpec[id].type;

    counts[resourceType] = (counts[resourceType] ?? 0) + 1;

    // attempt to track observations
    // if (resourceType === 'Observation') {
    //   const code = fullSpec[id].differential.element.find(
    //     d => d.path === 'Observation.code'
    //   );
    //   try {
    //     const c = code.patternCodeableConcept?.coding[0].code;
    //     console.log(c);
    //     codes[c] = (codes[c] ?? 0) + 1;
    //     await writeFile(
    //       `./spec/${id}.json`,
    //       JSON.stringify(fullSpec[id], null, 2)
    //     );
    //   } catch (e) {
    //     console.log(code);
    //   }
    // }
    // if (resourceType === 'Patient') {
    //   await writeFile(
    //     `./spec/${id}.json`,
    //     JSON.stringify(fullSpec[id], null, 2)
    //   );
    // }

    if (types.includes(resourceType)) {
      const spec = fullSpec[id];

      // // For now, ignore this resource type variant
      // if (id === 'entry-from-outside-target-facility-encounter') {
      //   console.log('IGNORING ', id);
      //   continue;
      // }

      const props = {};

      const schema = {
        id,
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
      result[resourceType] ??= [];
      result[resourceType].push(schema);
    }
  }

  for (const resourceType in result) {
    await writeFile(
      `./spec/${resourceType}.json`,
      JSON.stringify(result[resourceType], null, 2)
    );
  }

  console.log({ counts });
  console.log({ codes });
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

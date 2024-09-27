import path from 'node:path';
import { writeFile } from 'node:fs/promises';

export type PropDef = {
  /** Typescript name of the type */
  type?: string;

  /** Human readable description */
  desc?: string;

  /** list of allowed values */
  values?: string[];

  /** Indicates that this property maps to an extension */
  extension?: {
    url: string;
    // maybe a system too?
    defaultSystem?: string;
  };

  /** A default value which will be used if none is provided  */
  default?: any;

  /** This is a composite resource type (joe's words), like value[x] */
  isComposite: boolean;
};

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
  //Coding: { system: 'string', coding: 'string ' },
  Coding: 'Coding',

  positiveInt: 'number',
};

const typeMappings = {
  'http://hl7.org/fhirpath/System.String': 'string',
  // TODO some types, like `status`, have an enum. Can we use it for validation?
  // For now, count all codes as strings
  code: 'string',
  uri: 'string',
  positiveInt: 'number',
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
    // if (id === 'art-followup-status-observation') {
    //   await writeFile(
    //     `./spec/${id}.spec.json`,
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
        let isComposite = false;

        // if (prop.path.endsWith('[x]')) {
        //   isComposite = true;
        //   prop.path = prop.path.substring(0, prop.path.length - 3);
        // } else if (/\[x\]/.test(prop.path)) {
        //   // TODO this isn't great
        //   // because we won't build a typedef for the composite value
        //   // Maybe later I can work it out
        //   continue;
        // }
        // Actually I think this works?
        if (/\[x\]/.test(prop.path)) {
          isComposite = true;

          prop.path = prop.path.replace('[x]', '');
        }

        if (prop.path === resourceType) {
          continue;
        }
        const path = prop.path.replace(`${resourceType}\.`, '');

        if (path.includes('.')) {
          parseProp(fullSpec, schema, path, prop);
          continue;
        }

        let defaults: Record<string, any> = {};
        const type = getSimpleType(prop);

        const isArray = prop.base.max === '*';

        // TODO may need to map other pattern types
        // TODO how do we know if a pattern is mandatory? Is this OK to do?
        if (prop.patternCodeableConcept) {
          defaults = isArray ? [prop.patternCodeableConcept] : prop.patternCodeableConcept;
        }

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
          // TODO type may only be useful if it uses a vanilla fhir type
          type,
          isArray,
          desc: prop.short || prop.definition,
          isComposite,
        };

        if (Object.keys(defaults).length) {
          props[path].defaults = defaults;
        }

        if (path.endsWith('.system')) {
          props[path].hasSystem = true;
        }
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

// Parse a property of a resource, like address or id
function parseProp(fullSpec, schema, path: string, data) {
  let [parent, prop] = path.split('.');
  // TODO skip if multiple dots

  if (/\[x\]/.test(prop)) {
    // TODO warn?
    return;
  }

  if (prop === 'extension') {
    if (data.sliceName) {
      prop = data.sliceName[0].toLowerCase() + data.sliceName.substring(1);
    } else {
      // extensions are bit different - we map each to a prop
      return;
    }
  }

  // TODO
  if (schema.props[parent]) {
    const def: PropDef = {};

    if (!data.type) {
      return;
    }

    // Now work out the type of the prop
    if (data?.type?.length > 1) {
      console.log('WARNING: MULTIPLE TYPES DETECTED FOR', path);
    }
    let [type] = data.type;

    let simpleType;
    if (
      type.code === 'Extension' &&
      type.profile &&
      type.profile.length &&
      type.profile[0].match(/\/StructureDefinition/)
    ) {
      const typeId = type.profile[0].split('/').at(-1);
      const spec = fullSpec[typeId];

      if (spec) {
        // this tells us we need to map the incoming
        // prop to an extension
        def.extension = {
          url: spec.url,
          // TODO later we may be able to pull out code mappings
          // look for extension.value[x] in the spec
        };
      } else {
        console.log('WARNING: spec not found for ', typeId);
      }
    } else {
      simpleType = typeDefs[type.code] || type.code;
    }

    def.type = simpleType;
    def.desc = data.short || data.definition;

    // TODO is there a better formalism for this?
    if (prop === 'system') {
      schema.props[parent].hasSystem = true;
    }

    // TODO: maybe lookup enum values. Not priority right now
    // if (data.binding?.valueSet) {
    //   /// see if we can look up the values
    //   let [url, version] = def.valueSet.spit('|');
    //   // we know that we want v4, so hard code the URL
    //   if (url.startsWith('http://hl7.org/fhir/')) {
    //     url = url.replace('http://hl7.org/fhir/', 'http://hl7.org/fhir/R4');
    //   }
    //   fetch;
    //   def.values = [];
    // }

    if (Object.keys(def).length) {
      schema.props[parent].typeDef ??= {};
      schema.props[parent].typeDef[prop] = def;
    }
  }
}

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

const valueSetCache = {};

// This fucnction will let us fetch a valueset by URL and return the result
// Useful for settig enums in types
// async function fetchValueSet(url) {
//   if (valueSetCache[url])

//   let [url, version] = def.valueSet.spit('|')
//   // we know that we want v4, so hard code the URL
//   if (url.startsWith('http://hl7.org/fhir/')) {
//     url = url.replace('http://hl7.org/fhir/', 'http://hl7.org/fhir/R4')
//   }
//   fetch
// }

export default generate;

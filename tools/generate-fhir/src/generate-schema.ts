import path from 'node:path';
import { mkdir, writeFile } from 'node:fs/promises';
import { rimraf } from 'rimraf';
import type { MappingSpec } from './types';

// TODO should this go on disk?
const valueSetCache: Record<string, any> = {};

/**
 * This file will generate a simple schema representation of a FHIR spec
 */

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

const generate = async (specPath: string, mappings: MappingSpec = {}) => {
  console.log('Generating schemas from ', specPath);

  const outputDir = path.resolve(path.dirname(specPath), '../schema');

  console.log('Cleaning output dir: ', outputDir);
  await rimraf(outputDir);
  await mkdir(outputDir, { recursive: true });

  const fullSpec = (await import(path.resolve(specPath), {
    assert: { type: 'json' },
  })) as SpecJSON;
  const result: Record<string, Schema[]> = {};

  const counts = {};
  const codes = {};

  for (const profileId in fullSpec) {
    const profile = fullSpec[profileId];

    // TODO is it useful to output this or not?
    if (mappings.exclude?.includes(profile.type)) {
      console.log('ignoring excluded ', profileId);
      continue;
    }
    if (mappings.include?.length && !mappings.include.includes(profile.type)) {
      console.log('ignoring not included ', profileId);
      continue;
    }

    if (profile.resourceType !== 'StructureDefinition') {
      continue;
    }

    const resourceType = profile.type;

    counts[resourceType] = (counts[resourceType] ?? 0) + 1;

    const spec = profile;

    const props = {};

    const schema = {
      id: profileId,
      type: resourceType,
      url: spec.url,
      props,
    };
    for (const el of spec.snapshot.element) {
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
      if (/\[x\]/.test(el.path)) {
        isComposite = true;

        el.path = el.path.replace('[x]', '');
      }

      if (el.path === resourceType) {
        continue;
      }
      const path = el.path.replace(`${resourceType}\.`, '');

      if (path.includes('.')) {
        await parseProp(fullSpec, schema, path, el);
        continue;
      }

      let defaults: Record<string, any> = {};
      const type = getSimpleType(el);

      const isArray = el.base.max === '*';

      // TODO may need to map other pattern types
      // TODO how do we know if a pattern is mandatory? Is this OK to do?
      if (el.patternCodeableConcept) {
        defaults = isArray
          ? [el.patternCodeableConcept]
          : el.patternCodeableConcept;
      }

      if (type === 'Identifier') {
        // TODO this isn't robust because it assumes a particular slicing
        // It's the schema's job to unpick this slicing
        // This is a quick fix - let's see how well it stands up!
        const slicedValue = spec.snapshot.element.find(
          e => e.path === `${el.path}.system`
        );
        if (slicedValue && slicedValue.patternUri) {
          defaults.system = slicedValue.patternUri;
        }
      }

      const values = await extractValueSet(el);

      props[path] = {
        // TODO type may only be useful if it uses a vanilla fhir type
        type,
        isArray,
        desc: el.short || el.definition,
        isComposite,
      };

      if (values) {
        props[path].values = values;
      }

      if (Object.keys(defaults).length) {
        props[path].defaults = defaults;
      }

      if (path.endsWith('.system')) {
        props[path].hasSystem = true;
      }
    }

    result[resourceType] ??= [];
    result[resourceType].push(schema);

    // Output for debug
    // TODO maybe make optional?
    await writeFile(
      path.resolve(outputDir, `${resourceType}_${profileId}.json`),
      JSON.stringify(result[resourceType], null, 2)
    );
  }

  console.log({ counts });
  console.log({ codes });
  return result;
};

// // This function will let us fetch a valueset by URL and return the result
// // Useful for setting enums in types
// async function fetchValueSet(url) {
//   if (/^https?:\/\//.test(url)) {
//     const [safeUrl, ...version] = url.split('|');
//     if (!valueSetCache[safeUrl]) {
//       // Try to download the json representation
//       let nextUrl = safeUrl;
//       let response;

//       // Follow redirects until we get the main page
//       // this might just be for fhir-fr?
//       while (nextUrl) {
//         console.log('fetching ', nextUrl);
//         response = await fetch(nextUrl, {
//           redirect: 'manual',
//         });
//         if (response.headers.has('Location')) {
//           nextUrl = response.headers.get('Location');
//         } else {
//           break;
//         }
//       }
//       // Ugly munging of the URL to try and find the json representation
//       let finalUrl = nextUrl
//         .replace(/\/$/, '')
//         .replace('.xml', '.json')
//         .replace('.html', '.json');
//       if (!finalUrl.endsWith('.json')) {
//         finalUrl += '.json';
//       }
//       console.log('fetching ', finalUrl);
//       response = await fetch(finalUrl);

//       try {
//         const json = await response.json();
//         valueSetCache[safeUrl] = json;
//       } catch (e) {
//         console.log(e);
//       }
//     }

//     return valueSetCache[safeUrl];
//   }
// }

// // TOOD this really needs to move into spec parsing
// async function extractValueSet(element) {
//   if (element.binding?.valueSet) {
//     const results = new Set<string>();

//     const process = async (url: string) => {
//       const data = await fetchValueSet(url);
//       if (data) {
//         // If this valueset extends another, loads its values
//         if (data.compose?.include) {
//           for (const { system } of data.compose.include) {
//             await process(system);
//           }
//         }

//         // Now save each value defined in the set
//         // For now we're not storing any metadata
//         if (data.concept) {
//           for (const v of data.concept) {
//             results.add(v.code);
//           }
//         }
//       }
//     };

//     await process(element.binding.valueSet);
//     return Array.from(results);
//   }
// }

//
async function loadValueSet() {}

// Parse a property of a resource, like address or id
async function parseProp(fullSpec, schema: ElementSpec, path: string, data) {
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
    // if (data?.type?.length > 1) {
    // TODO maybe restore this
    //   console.log('WARNING: MULTIPLE TYPES DETECTED FOR', path);
    // }
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

    const values = await extractValueSet(data);
    if (values) {
      def.values = values;
    }

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
  // TODO maybe restore this
  // if (prop.type.length > 1) {
  //   console.log('WARNING: multiple types found on ', prop.path);
  // }
  for (const type of prop.type) {
    if (type.code in typeMappings) {
      return typeMappings[type.code];
    }
    return type.code;
  }
}

export default generate;

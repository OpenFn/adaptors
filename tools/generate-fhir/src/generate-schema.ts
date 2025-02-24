import path from 'node:path';
import { mkdir, writeFile } from 'node:fs/promises';
import { rimraf } from 'rimraf';
import type { MappingSpec, Schema, SpecJSON } from './types';
import { ValueSetDef } from './fetch-spec';

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

const generate = async (
  specPath: string,
  mappings: MappingSpec = {},
  options: { clean?: false; debugOutput?: false } = {}
) => {
  console.log('Generating schemas from ', specPath);

  const outputDir = path.resolve(path.dirname(specPath), '../schema');

  if (options.clean) {
    console.log('Cleaning output dir: ', outputDir);
    await rimraf(outputDir);
    await mkdir(outputDir, { recursive: true });
  }

  const fullSpec = (await import(path.resolve(specPath), {
    assert: { type: 'json' },
  })) as SpecJSON;
  const result: Record<string, Schema[]> = {};

  const rawValuesets: any = await import(
    path.resolve(path.dirname(specPath), 'valuesets.json'),
    {
      assert: { type: 'json' },
    }
  );
  const regexes = mappings.valueSets?.map(e => new RegExp(e)) ?? [];
  // remove all valueSets that don't match the mapping criteria
  const valuesets = Object.keys(rawValuesets)
    .filter(url => regexes.find(re => re.test(url)))
    .reduce((obj, url) => {
      obj[url] = rawValuesets[url];
      return obj;
    }, {});

  const counts = {};
  const codes = {};

  for (const profileId in fullSpec) {
    const profile = fullSpec[profileId];

    // Ignore inactive profiles
    if (profile.active === false) {
      console.log('ignoring inactive profile', profileId);
      continue;
    }

    // TODO is it useful to output this or not?
    if (mappings.exclude?.includes(profile.type)) {
      console.log('ignoring excluded profile', profileId);
      continue;
    }
    if (mappings.include?.length && !mappings.include.includes(profile.type)) {
      // console.log('ignoring not included profile', profileId);
      continue;
    }

    if (profile.resourceType !== 'StructureDefinition') {
      continue;
    }

    const category = profile.extension?.find(
      e =>
        e.url ===
        'http://hl7.org/fhir/StructureDefinition/structuredefinition-category'
    );
    if (category?.valueString?.startsWith('Foundation.')) {
      console.log('ignoring Foundation profile', profileId);
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
        await parseProp(fullSpec, valuesets, schema, path, el);
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

      if (type.includes('Identifier')) {
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

      const values = await extractValueSet(valuesets, el);

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
    if (options.debugOutput) {
      await writeFile(
        path.resolve(outputDir, `${resourceType}_${profileId}.json`),
        JSON.stringify(result[resourceType], null, 2)
      );
    }
  }

  console.log({ counts });
  console.log({ codes });
  return result;
};

async function extractValueSet(valuesets: any, element) {
  if (element.binding?.valueSet) {
    const results = new Set<string>();

    const urls = [element.binding?.valueSet];
    while (urls.length) {
      const url = urls.shift();
      const vs = (valuesets[url] as ValueSetDef) ?? { values: [], extends: [] };
      for (const v of vs.values) {
        results.add(v);
      }
      for (const e of vs.extends) {
        urls.push(e);
      }
    }

    return Array.from(results);
  }
}

//
async function loadValueSet() {}

// Parse a property of a resource, like address or id
async function parseProp(
  fullSpec,
  valuesets,
  schema: ElementSpec,
  path: string,
  data
) {
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

    const values = await extractValueSet(valuesets, data);
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
function getSimpleType(prop: any): string[] {
  return (
    prop.type?.map((t: any) => {
      if (t.code in typeMappings) {
        return typeMappings[t.code];
      }
      return t.code;
    }) ?? ['any']
  );

  // // TODO maybe restore this
  // if (prop.type.length > 1) {
  //   console.log('WARNING: multiple types found on ', prop.path);
  //   // return prop.type.map((t: any) => {
  //   //   getSimpleType(t)[0];
  //   // });
  // }
  // if (prop.type) {
  //   try {
  //     for (const type of prop.type) {
  //       if (type.code in typeMappings) {
  //         return [typeMappings[type.code]];
  //       }
  //       return [type.code];
  //     }
  //   } catch (e) {
  //     console.log('ERROR extracting type for prop ', prop.path);
  //     console.log(prop);
  //     throw e;
  //   }
  // }
}

export default generate;

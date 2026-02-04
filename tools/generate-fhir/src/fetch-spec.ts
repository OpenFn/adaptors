/**
 * Util function to fetch a spec from some source
 *
 * Right now it'll only load a zip froma URL  (like fhir jembi does)
 * But later this should be a really powerful, flexible utility
 * to load basically any valid fhir representation and output
 * a standard spec.json that our tooling can use
 *
 * TODO:
 *  - handle raw spec source (use firely to convert to json)
 *  - handle http and https
 *  - handle a github repo
 *  - handle tarballs and gzipped stuff
 */
import path, { dirname } from 'node:path';
import { createWriteStream, createReadStream } from 'node:fs';
import { mkdir, writeFile } from 'node:fs/promises';
import { Readable } from 'node:stream';
import yauzl from 'yauzl';
import gunzip from 'gunzip-maybe';
import parser from 'stream-json';
import { chain } from 'stream-chain';
import Pick from 'stream-json/filters/Pick';
import StreamArray from 'stream-json/streamers/StreamArray';

import { type MappingSpec, SpecJSON } from './types';

const valueSetCache: Record<string, any> = {};

export type Meta = {
  igVersion?: string;
  webUrl?: string;
  specDate?: string;
  name?: string;
  adaptorGeneratedDate?: string;
  generatorVersion?: string;
  options?: {
    simpleBuilders?: boolean;
  };
};

// download and parse the spec file
// todo: option to use a local spec and just regenerate?
export default async function (
  baseDir: string,
  specPath: string,
  mappings: MappingSpec,
  download: boolean = true, // for now, don't redownload
) {
  return new Promise<Meta>(async (resolve, reject) => {
    await mkdir(path.resolve(baseDir, 'spec'), { recursive: true });
    const outputDir = path.resolve(baseDir, 'spec');
    const specOutputPath = `${outputDir}/spec.zip`;

    try {
      const onDownloadComplete = async () => {
        let meta;
        let specs;
        try {
          console.log('Parsing spec.zip');
          ({ meta, specs } = await parseIGZip(specOutputPath));
          meta.specUrl = specPath;
        } catch (e) {
          console.log('Error processing zip stream');
          console.log(e);
          reject(e);
        }
        try {
          let valueSets = {};
          if (mappings.valueSets?.length) {
            valueSets = await downloadValueSets(specs, mappings);
          } else {
            console.log('No valuesets mappings provided!');
            console.log('Skipping all valueset downloads');
          }

          await writeFile(
            `${outputDir}/valuesets.json`,
            JSON.stringify(valueSets ?? {}),
          );
        } catch (e) {
          console.log('Error downloading valuesets');
          console.log(e);
          reject(e);
        }

        resolve(meta);
      };
      const filestream = createWriteStream(specOutputPath);
      if (download) {
        console.log(`Downloading spec from ${specPath}...`);
        const response = await fetch(specPath);

        Readable.from(response.body)
          .pipe(gunzip())
          .pipe(filestream)
          .on('close', async () => {
            console.log('... downloaded!');
            onDownloadComplete();
          })
          .on('error', e => {
            console.log('Error processing zip stream');
            console.log(e);
            reject(e);
          });
      } else {
        console.log(
          `Skipping download. Reading spec.json from  ${outputDir}...`,
        );
        onDownloadComplete();
      }
    } catch (e) {
      console.log('Error downloading spec:');
      console.log(e);
      reject(e);
    }
  });
}

async function fetchValueSet(url) {
  if (/^https?:\/\//.test(url)) {
    const [safeUrl, ...version] = url.split('|');
    if (!valueSetCache[safeUrl]) {
      // Try to download the json representation
      let nextUrl = safeUrl;
      let response;

      // Follow redirects until we get the main page
      // this might just be for fhir-fr?
      while (nextUrl) {
        console.log('fetching ', nextUrl);
        response = await fetch(nextUrl, {
          redirect: 'manual',
        });
        if (response.headers.has('Location')) {
          nextUrl = response.headers.get('Location');
        } else {
          break;
        }
      }
      // Ugly munging of the URL to try and find the json representation
      let finalUrl = nextUrl
        .replace(/\/$/, '')
        .replace('.xml', '.json')
        .replace('.html', '.json');
      if (!finalUrl.endsWith('.json')) {
        finalUrl += '.json';
      }
      console.log('fetching ', finalUrl);
      response = await fetch(finalUrl);

      try {
        const json = await response.json();
        valueSetCache[safeUrl] = json;
      } catch (e) {
        console.log(e);
      }
    }

    return valueSetCache[safeUrl];
  }
}

export type ValueSetDef = {
  extends: string[]; // the VS, if any, that this extends
  values: string[]; // the VS's declared for this valueset (excluding inherited)
};

// Go through the spec, find value sets matching the mapping, and download them
async function downloadValueSets(spec, mappings) {
  const valueSets: Record<string, ValueSetDef> = {};

  const regexes = mappings.valueSets?.map(e => new RegExp(e)) ?? [];

  const processCache = {};

  const process = async (url: string) => {
    if (processCache[url]) {
      // do nothing if we've processed this url
      return;
    }
    processCache[url] = true;

    if (regexes.find(re => re.test(url))) {
      const data = await fetchValueSet(url);
      if (data) {
        const values = new Set<string>();
        const ex = new Set<string>();
        if (data.concept) {
          for (const v of data.concept) {
            values.add(v.code);
          }
        }
        if (data.compose?.include) {
          for (const { system } of data.compose.include) {
            if (system) {
              ex.add(system);
              // we also have to download each system
              await process(system);
            }
          }
        }
        valueSets[url] = {
          extends: Array.from(ex),
          values: Array.from(values),
        };
      } else {
        // console.log some error if we failed to load data
      }
    } else {
      console.log('ignoring valueset ', url);
    }
  };

  for (const profileId in spec) {
    const schema = spec[profileId];

    for (const element of schema.snapshot.element) {
      if (element.binding?.valueSet) {
        await process(element.binding?.valueSet);
      }
    }
  }

  return valueSets;
}

function parseIGZip(inputDir: string) {
  return new Promise<{ meta: Meta; specs: SpecJSON }>((resolve, reject) => {
    yauzl.open(inputDir, { lazyEntries: true }, function (err, zipfile) {
      if (err) {
        reject(err);
      }
      console.log('OPENED!');
      // these are all the main resources for which we create builders
      const resources: SpecJSON = {};
      // These are datatypes for which we'll generate typings
      const types: SpecJSON = {};
      const meta: Meta = {};

      const outputDir = path.resolve(dirname(inputDir));

      // If we're parsing a core fhir bundle,
      // which are packaged a bit differently, this will be true
      let coreMode = false;

      const onComplete = async () => {
        console.log('\n\nDone!');
        console.log(Object.keys(resources));
        console.log('Writing resources to spec.json');
        await writeFile(
          path.resolve(outputDir, 'spec.json'),
          JSON.stringify(resources),
        );
        if (Object.keys(types).length) {
          console.log('Writing types to spec-types.json');
          await writeFile(
            path.resolve(outputDir, 'spec-types.json'),
            JSON.stringify(types),
          );
        }

        zipfile.close();
        resolve({ meta, specs: resources });
      };

      const onEntry = async entry => {
        console.log(`Reading ${entry.fileName}...`);
        if (entry.fileName.endsWith('definitions.json/')) {
          zipfile.readEntry(); // this will read the folder
          coreMode = true;
        } else if (
          coreMode &&
          entry.fileName.endsWith('profiles-resources.json')
        ) {
          extractDefinitionsFromBundle(entry);
        } else if (coreMode && entry.fileName.endsWith('profiles-types.json')) {
          // TODO this is something else now:
          // we neeed to extract typedefs into a types.json something
          extractDefinitionsFromBundle(entry, true);
        } else if (
          !coreMode &&
          entry.fileName.endsWith('.json') &&
          !entry.fileName.match('MACOSX')
        ) {
          extractDefinitionsFromFile(entry);
        } else {
          zipfile.readEntry();
        }
      };

      /**
       * This file contains a fhir bundle of definitions
       * it's probably big - we should really stream it
       */
      const extractDefinitionsFromBundle = (entry: any, asTypes = false) => {
        console.log('Parsing definitions from bundle', entry.fileName);
        zipfile.openReadStream(entry, function (err, readStream) {
          // stream the bundle contents

          // @ts-ignore chain typing is wrong?
          const pipeline = chain([
            readStream,
            parser(),
            new Pick({ filter: 'entry' }),
            new StreamArray(),
            ({ value }) => {
              // console.log(value.fullUrl);
              const { resource } = value;
              processResource(resource, `${resource.id}.json`, asTypes);
            },
          ]);

          readStream.on('end', async () => {
            setTimeout(() => {
              zipfile.readEntry();
            }, 1);
          });
        });
      };

      /**
       * Extract a profile definition from a single JSON file
       * This file contains one object which IS the resource definition
       */
      const extractDefinitionsFromFile = (entry: any) => {
        zipfile.openReadStream(entry, function (err, readStream) {
          try {
            if (err) throw err;
            readStream.on('end', async () => {
              const json = JSON.parse(text);

              processResource(json, entry.fileName);
              if (entry.fileName === 'spec.internals') {
                meta.name = json['npm-name'];
                meta.igVersion = json['ig-version'];
                meta.webUrl = json['webUrl'];
                meta.specDate = json.date;
              }

              setTimeout(() => {
                zipfile.readEntry();
              }, 1);
            });

            let text = '';
            readStream.on('data', data => {
              text += data.toString();
            });
          } catch (e) {
            console.log(e);
            zipfile.readEntry();
          }
        });
      };

      // Process a single JSON object that represents a fhir resource
      const processResource = async (
        json: any,
        fileName: string,
        asType?: boolean,
      ) => {
        if (json.resourceType === 'StructureDefinition') {
          // TODO maybe only do this if a flag is passed
          await writeFile(
            path.resolve(outputDir, fileName),
            JSON.stringify(json, null, 2),
          );

          delete json.text;
          if (asType) {
            types[json.id] = json;
          } else {
            resources[json.id] = json;
          }
        }
      };

      if (err) throw err;
      zipfile.once('end', onComplete);
      zipfile.on('entry', onEntry);

      zipfile.readEntry();
    });
  });
}

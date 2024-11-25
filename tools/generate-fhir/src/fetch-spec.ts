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
import { createWriteStream } from 'node:fs';
import { mkdir, writeFile } from 'node:fs/promises';
import { Readable } from 'node:stream';
import yauzl from 'yauzl';
import gunzip from 'gunzip-maybe';
import { SpecJSON } from './types';

const valueSetCache: Record<string, any> = {};

export type Meta = {
  specVersion?: string;
  specDate?: string;
  name?: string;
};

export default async function (baseDir: string, specPath: string) {
  return new Promise<Meta>(async (resolve, reject) => {
    await mkdir(path.resolve(baseDir, 'spec'), { recursive: true });

    console.log(`Downloading spec from ${specPath}...`);

    try {
      const response = await fetch(specPath);

      const outputDir = path.resolve(baseDir, 'spec');
      const specOutputPath = `${outputDir}/spec.zip`;
      const filestream = createWriteStream(specOutputPath);

      const readableStream = Readable.from(response.body);
      readableStream
        .pipe(gunzip())
        .pipe(filestream)
        .on('close', async () => {
          console.log(' ****************** CLOSE *************');
          let meta;
          let specs;
          try {
            ({ meta, specs } = await parseIGZip(specOutputPath));
            console.log('... downloaded!');
          } catch (e) {
            console.log('Error processing zip stream');
            console.log(e);
            reject(e);
          }
          try {
            const valueSets = await downloadValueSets(specs, {
              // TMP: hard-code value sets
              valueSets: ['http://hl7.org/fhir'],
            });

            await writeFile(
              `${outputDir}/valuesets.json`,
              JSON.stringify(valueSets ?? {})
            );
          } catch (e) {
            console.log('Error downloading valuesets');
            console.log(e);
            reject(e);
          }

          resolve(meta);
        })
        .on('error', e => {
          console.log('Error processing zip stream');
          console.log(e);
          reject(e);
        });
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

  const regexes = mappings.valueSets.map(e => new RegExp(e));

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
      const result: SpecJSON = {};
      const meta: Meta = {};

      const outputDir = path.resolve(dirname(inputDir));

      const onComplete = async () => {
        console.log('\n\nDone!');
        console.log(Object.keys(result));
        await writeFile(
          path.resolve(outputDir, 'spec.json'),
          JSON.stringify(result)
        );

        zipfile.close();
        resolve({ meta, specs: result });
      };

      const onEntry = async entry => {
        console.log(`Reading ${entry.fileName}...`);

        zipfile.openReadStream(entry, function (err, readStream) {
          try {
            if (err) throw err;
            readStream.on('end', async () => {
              const json = JSON.parse(text);

              if (json.resourceType === 'StructureDefinition') {
                // TODO maybe only do this if a flag is passed
                await writeFile(
                  path.resolve(outputDir, entry.fileName),
                  JSON.stringify(json, null, 2)
                );

                delete json.text;
                result[json.id] = json;
              }

              if (entry.fileName === 'spec.internals') {
                meta.name = json['npm-name'];
                meta.specVersion = json['ig-version'];
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
          }
        });
      };

      if (err) throw err;
      zipfile.once('end', onComplete);
      zipfile.on('entry', onEntry);

      zipfile.readEntry();
    });
  });
}

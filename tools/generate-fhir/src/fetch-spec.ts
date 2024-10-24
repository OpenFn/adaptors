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

export type Meta = {
  specVersion?: string;
  specDate?: string;
  name?: string;
};

export default async function (baseDir: string, specPath: string) {
  return new Promise<Meta>(async resolve => {
    await mkdir(path.resolve(baseDir, 'spec'), { recursive: true });

    console.log(`Downloading spec from ${specPath}...`);

    const response = await fetch(specPath);

    const outputDir = path.resolve(baseDir, 'spec', 'spec.zip');

    const filestream = createWriteStream(outputDir);

    const readableStream = Readable.from(response.body);
    readableStream?.pipe(filestream).on('close', async () => {
      const meta = await parseIGZip(outputDir);
      console.log('... downloaded!');
      resolve(meta);
    });
  });
}

function parseIGZip(inputDir: string) {
  return new Promise<void>(resolve => {
    yauzl.open(inputDir, { lazyEntries: true }, function (err, zipfile) {
      const result = {};
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
        resolve(meta);
      };

      const onEntry = async entry => {
        console.log(`Reading ${entry.fileName}...`);

        zipfile.openReadStream(entry, function (err, readStream) {
          try {
            if (err) throw err;
            readStream.on('end', async () => {
              const json = JSON.parse(text);

              // TODO maybe only do this is a flag is passed
              await writeFile(
                path.resolve(outputDir, entry.fileName),
                JSON.stringify(json, null, 2)
              );

              if (json.resourceType === 'StructureDefinition') {
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

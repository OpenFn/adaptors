import { createWriteStream } from 'node:fs';
import { mkdir, writeFile } from 'node:fs/promises';
import { Readable } from 'node:stream';
import yauzl from 'yauzl';

const url =
  'https://build.fhir.org/ig/jembi/ethiopia-hiv/branches/master/definitions.json.zip';

export async function fetchSchema(redownload = true) {
  if (redownload) {
    return new Promise<void>(async resolve => {
      await mkdir('./spec', { recursive: true });

      console.log(`Downloading spec from ${url}...`);

      const response = await fetch(url);

      const filestream = createWriteStream('./spec/spec.zip');

      const readableStream = Readable.from(response.body);
      readableStream?.pipe(filestream).on('close', async () => {
        await parseZip();
        console.log('... downloaded!');
        resolve();
      });
    });
  } else {
    return parseZip();
  }
}

function parseZip() {
  return new Promise<void>(resolve => {
    yauzl.open(
      './spec/spec.zip',
      { lazyEntries: true },
      function (err, zipfile) {
        const result = {};

        const onComplete = async () => {
          console.log('Done!');
          console.log(Object.keys(result));
          await writeFile('./spec/spec.json', JSON.stringify(result));

          zipfile.close();
          resolve();
        };

        const onEntry = async entry => {
          console.log(`Reading ${entry.fileName}...`);

          zipfile.openReadStream(entry, function (err, readStream) {
            try {
              if (err) throw err;
              readStream.on('end', async () => {
                const json = JSON.parse(text);

                if (json.resourceType === 'StructureDefinition') {
                  delete json.text;
                  result[json.id] = json;

                  // if (json.type === 'Encounter') {
                  //   await writeFile(
                  //     `./spec/${entry.fileName}`,
                  //     JSON.stringify(json, null, 2)
                  //   );
                  // }
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
      }
    );
  });
}

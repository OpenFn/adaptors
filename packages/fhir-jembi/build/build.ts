import { readFile, writeFile, mkdir } from 'node:fs/promises';
import generateSchema from './generate-schema';
import generateDTS from './generate-dts';
import generateCode from './generate-code';

import mappings from './mappings';

const withDisclaimer = (src: string) => `
// THIS FILE WAS AUTO-GENERATED
// DO NOT MODIFY OR YOU WILL BE FIRED

${src}`;

const generate = async () => {
  const schema = await generateSchema(Object.keys(mappings));

  const dts = generateDTS(schema, mappings);
  const src = generateCode(schema, mappings);

  await mkdir('dist', { recursive: true });
  await mkdir('types', { recursive: true });

  await writeFile('src/builders.d.ts', withDisclaimer(dts));
  // maybe this needs to be in types actually?
  // we're generaying these types manually, typescript won't do it
  await writeFile('types/builders.d.ts', withDisclaimer(dts));

  await writeFile('src/builders.js', withDisclaimer(src));

  // tbh this code is on the wrong place - just need to get this working!
  const globals = await readFile('src/globals.d.ts', 'utf8');
  await writeFile('types/globals.d.ts', withDisclaimer(globals));
};
generate();

import path from 'node:path';
import { access, readFile, writeFile, mkdir } from 'node:fs/promises';
import { exec } from 'node:child_process';

import generateSchema from './generate-schema';
import generateDTS from './generate-dts';
import generateCode from './generate-code';

import mappings from './mappings';
import { fetchSchema } from './fetch-schema';

const withDisclaimer = (src: string) => `
// THIS FILE WAS AUTO-GENERATED
// DO NOT MAKE CHANGES MANUALLY OR THEY WILL BE LOST
// SEE THE README FILE FOR DETAILS

${src}`;

const generate = async () => {
  try {
    await access('./spec/spec.json');
  } catch (e) {
    await fetchSchema();
  }

  const schema = await generateSchema(Object.keys(mappings));
  const dts = generateDTS(schema, mappings);
  const src = generateCode(schema, mappings);

  await mkdir('dist', { recursive: true });
  await mkdir('types', { recursive: true });

  
  await writeFile('src/builders.js', withDisclaimer(src));
  
  const args = [
    '--allowJs',
    '--declaration',
    '--emitDeclarationOnly',
    '--lib es2020',
    `--declarationDir ${path.resolve('types')}`,
  ];
  
  // Now build typings for index and utils
  exec(`pnpm exec tsc ${args.join(' ')} src/index.ts`, {}, () => {
    setTimeout(async () => {
      // Overwrite builders.d.ts because typescript makes a mess of it
      await writeFile('types/builders.d.ts', withDisclaimer(dts));
    }, 500)
  });

};
generate();

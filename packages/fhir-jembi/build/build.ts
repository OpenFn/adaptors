import { writeFile, mkdir } from 'node:fs/promises';
import generateSchema from './generate-schema';
import generateDTS from './generate-dts';
import generateCode from './generate-code';

import mappings from './mappings';

const generate = async () => {
  const schema = await generateSchema(Object.keys(mappings));

  const dts = generateDTS(schema, mappings);
  const src = generateCode(schema, mappings);

  await mkdir('dist', { recursive: true });

  await writeFile('src/index.d.ts', dts);
  await writeFile('src/builders.js', src);
};
generate();

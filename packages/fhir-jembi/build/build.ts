import { writeFile, mkdir } from 'node:fs/promises';
import generateSchema from './generate-schema';
import generateDTS from './generate-dts';
import generateCode from './generate-code';

const generate = async () => {
  // TODO This is still hard-coded to Encounter...
  const schema = generateSchema();

  const mappings = {
    // simple mapping of the id field to start
    id: true,
  };

  const dts = generateDTS(schema, mappings);
  const src = generateCode(schema, mappings);

  await mkdir('dist', { recursive: true });

  await writeFile('dist/index.d.ts', dts);
  await writeFile('dist/builders.js', src);
};

generate();

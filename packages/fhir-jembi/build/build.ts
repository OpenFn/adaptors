import { writeFile, mkdir } from 'node:fs/promises';
import generateSchema from './generate-schema';
import generateDTS from './generate-dts';
import generateCode from './generate-code';

const mappings = {
  Encounter: {
    // simple mapping of the id field to start
    // TODO: we should map fields we know how to to by default unless its explicitly false
    id: true,
  },
  Patient: {
    id: true,
  },
  Observation: {
    id: true,
  },
};

const generate = async () => {
  const schema = await generateSchema(Object.keys(mappings));

  const dts = generateDTS(schema, mappings);
  const src = generateCode(schema, mappings);

  await mkdir('dist', { recursive: true });

  await writeFile('dist/index.d.ts', dts);
  await writeFile('dist/builders.js', src);
};
generate();

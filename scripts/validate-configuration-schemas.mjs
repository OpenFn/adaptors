#!/usr/bin/env node
import fs from 'node:fs/promises';
import { createRequire } from 'node:module';
import path from 'node:path';
import process from 'node:process';
import { fileURLToPath } from 'node:url';

import Ajv from 'ajv';

const require = createRequire(import.meta.url);
const draft07MetaSchema = require('ajv/dist/refs/json-schema-draft-07.json');
const rootDir = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  '..'
);
const packagesDir = path.join(rootDir, 'packages');
const args = new Set(process.argv.slice(2));
const markdown = args.has('--markdown');
const help = args.has('--help') || args.has('-h');

const pointerFor = ({ instancePath }) =>
  instancePath ? `#${instancePath}` : '#';

const relativePath = file =>
  path.relative(rootDir, file).split(path.sep).join('/');

const escapeMarkdown = value =>
  String(value)
    .replace(/\\/g, '\\\\')
    .replace(/\|/g, '\\|')
    .replace(/\n/g, ' ');

const formatReason = error => {
  if (!error) return 'Schema validation failed.';

  const details = [];
  if (error.keyword === 'additionalProperties') {
    details.push(`additional property "${error.params.additionalProperty}"`);
  }
  if (error.keyword === 'enum' && error.params?.allowedValues) {
    details.push(`allowed values: ${error.params.allowedValues.join(', ')}`);
  }

  const message = error.message ?? 'Schema validation failed.';
  return details.length ? `${message} (${details.join('; ')})` : message;
};

const getUsefulErrors = errors =>
  errors.filter(error => {
    const samePointerErrors = errors.filter(
      other => other.instancePath === error.instancePath
    );

    if (
      ['anyOf', 'oneOf', 'allOf'].includes(error.keyword) &&
      samePointerErrors.length > 1
    ) {
      return false;
    }

    if (
      error.keyword === 'type' &&
      samePointerErrors.some(other => other.keyword === 'enum')
    ) {
      return false;
    }

    return true;
  });

const findSchemaFiles = async () => {
  const adaptors = await fs.readdir(packagesDir, { withFileTypes: true });
  const schemaFiles = [];

  for (const adaptor of adaptors) {
    if (!adaptor.isDirectory()) continue;

    const adaptorDir = path.join(packagesDir, adaptor.name);
    const files = await fs.readdir(adaptorDir, { withFileTypes: true });
    for (const file of files) {
      if (file.isFile() && file.name.endsWith('configuration-schema.json')) {
        schemaFiles.push(path.join(adaptorDir, file.name));
      }
    }
  }

  return schemaFiles.sort((a, b) =>
    relativePath(a).localeCompare(relativePath(b))
  );
};

const validateSchemaFile = async (file, ajv) => {
  const adaptor = path.basename(path.dirname(file));
  const filePath = relativePath(file);
  let schema;

  try {
    schema = JSON.parse(await fs.readFile(file, 'utf8'));
  } catch (error) {
    return [
      {
        adaptor,
        filePath,
        pointer: '#',
        reason: `Invalid JSON: ${error.message}`,
      },
    ];
  }

  try {
    if (ajv.validateSchema(schema)) return [];
  } catch (error) {
    return [
      {
        adaptor,
        filePath,
        pointer: '#',
        reason: error.message,
      },
    ];
  }

  return getUsefulErrors(ajv.errors ?? []).map(error => ({
    adaptor,
    filePath,
    pointer: pointerFor(error),
    reason: formatReason(error),
  }));
};

const printMarkdown = (failures, checked) => {
  console.log('| Adaptor | File | JSON pointer | Failure reason |');
  console.log('| --- | --- | --- | --- |');

  if (!failures.length) {
    console.log(
      `| - | - | - | No schema validation failures (${checked} files checked). |`
    );
    return;
  }

  for (const failure of failures) {
    console.log(
      `| ${escapeMarkdown(failure.adaptor)} | ${escapeMarkdown(
        failure.filePath
      )} | \`${escapeMarkdown(failure.pointer)}\` | ${escapeMarkdown(
        failure.reason
      )} |`
    );
  }
};

const printText = (failures, checked) => {
  if (!failures.length) {
    console.log(`Validated ${checked} configuration schema files.`);
    return;
  }

  console.error('Configuration schema validation failed:');
  console.error();

  for (const failure of failures) {
    console.error(`- ${failure.filePath}`);
    console.error(`  adaptor: ${failure.adaptor}`);
    console.error(`  pointer: ${failure.pointer}`);
    console.error(`  reason: ${failure.reason}`);
  }
};

const main = async () => {
  if (help) {
    console.log(`Usage: pnpm validate:schemas [-- --markdown]

Validates every packages/*/*configuration-schema.json file against the JSON
Schema draft-07 meta-schema. Use --markdown to print the one-shot audit table.`);
    return;
  }

  const ajv = new Ajv({
    allErrors: true,
    strict: false,
    validateSchema: true,
  });
  ajv.addMetaSchema(
    draft07MetaSchema,
    'https://json-schema.org/draft-07/schema#'
  );

  const schemaFiles = await findSchemaFiles();

  if (!schemaFiles.length) {
    console.error('No configuration schema files found.');
    process.exitCode = 1;
    return;
  }

  const failures = (
    await Promise.all(schemaFiles.map(file => validateSchemaFile(file, ajv)))
  ).flat();

  if (markdown) {
    printMarkdown(failures, schemaFiles.length);
  } else {
    printText(failures, schemaFiles.length);
  }

  if (failures.length) {
    process.exitCode = 1;
  }
};

main().catch(error => {
  console.error(error);
  process.exitCode = 1;
});

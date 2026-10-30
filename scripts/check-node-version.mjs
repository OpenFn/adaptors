#!/usr/bin/env node
import { readFileSync } from 'node:fs';

const root = new URL('../', import.meta.url);

const nvmrc = readFileSync(new URL('.nvmrc', root), 'utf8').trim();
const toolVersions = readFileSync(new URL('.tool-versions', root), 'utf8')
  .split('\n')
  .map(line => line.trim().split(/\s+/))
  .find(([tool]) => tool === 'nodejs')?.[1];

if (nvmrc !== toolVersions) {
  console.error(
    `Node version mismatch: .nvmrc is ${nvmrc}, .tool-versions nodejs is ${toolVersions}`
  );
  process.exit(1);
}

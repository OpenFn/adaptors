import fs from 'fs';
import path from 'path';
import process from 'node:process';

const packageDir = '../../packages';

function stripSuffix(s: string) {
  return String(s)
    .replace(/\s*\((Core|Community)\)\s*$/i, '')
    .trim();
}

function resolveJsonPath(adaptor: string) {
  const file = path.resolve(
    process.cwd(),
    packageDir,
    adaptor,
    'docs',
    `${adaptor}.json`
  );
  return file;
}

export function updateBadgeInName(opts: {
  name: string;
  tier: 'core' | 'community';
}) {
  const filePath = resolveJsonPath(opts.name);
  const raw = fs.readFileSync(filePath, 'utf8');
  const json = JSON.parse(raw);

  if (typeof json.name !== 'string' || !json.name.trim()) {
    throw new Error(`'name' is missing or not a string in ${filePath}`);
  }

  const base = stripSuffix(json.name);
  const suffix = opts.tier === 'core' ? ' (Core)' : ' (Community)';
  const next = `${base}${suffix}`;

  if (json.name === next) {
    console.log(`No change: ${filePath} already "${next}"`);
    return;
  }

  json.name = next;
  const out = JSON.stringify(json, null, 2) + '\n';

  fs.writeFileSync(filePath, out, 'utf8');
  console.log(`√ Updated ${filePath} -> name="${json.name}"`);
}

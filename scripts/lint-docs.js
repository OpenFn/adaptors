import { readFile, readdir } from 'fs/promises';
import { join } from 'path';
import { compile } from '@mdx-js/mdx';

async function lintFile(filePath) {
  try {
    const source = await readFile(filePath, 'utf8');
    await compile(source);
    console.log(`✅ ${filePath}`);
  } catch (err) {
    console.error(`❌ Error in ${filePath}:\n${err.message}`);
    process.exitCode = 1;
  }
}

async function lintAllMarkdownFiles(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = join(dir, entry.name);
    if (entry.isDirectory()) {
      await lintAllMarkdownFiles(fullPath);
    } else if (entry.isFile() && entry.name.endsWith('.md')) {
      await lintFile(fullPath);
    }
  }
}

const targetDir = process.argv[2] || 'tmp'; // default to tmp/
lintAllMarkdownFiles(targetDir);

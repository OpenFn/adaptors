import { readFileSync, writeFileSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

export function toBase64Str(filename) {
  return readFileSync(join(__dirname, 'images', filename)).toString('base64');
}

export function toBuf(filename) {
  return readFileSync(join(__dirname, 'images', filename));
}

export function saveBase64Image(base64String, outputPath) {
  const base64Data = base64String.replace(/^data:image\/\w+;base64,/, '');
  const buffer = Buffer.from(base64Data, 'base64');
  writeFileSync(join(__dirname, 'images', outputPath), buffer);
  console.log(`Image saved to ${outputPath}`);
}

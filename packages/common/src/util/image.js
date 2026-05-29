import sharp from 'sharp';

import { ExifTool } from 'exiftool-vendored';
import { writeFile, unlink, readFile } from 'fs/promises';
import { join } from 'path';
import os from 'os';

export async function metadata(imageBuffer) {
  console.log('Getting image metadata...');
  const meta = await sharp(imageBuffer).metadata();
  return meta;
}

export async function resize(imageBuffer, options) {
  const { width, height, fit = 'cover' } = options;
  const resized = await sharp(imageBuffer)
    .resize(width, height)
    .jpeg()
    .toBuffer();
  return resized;
}

export async function compress(imageBuffer, quality) {
  const compressed = await sharp(imageBuffer).jpeg({ quality }).toBuffer();
  return compressed;
}

export async function strip(imageBuffer) {
  const stripped = await sharp(imageBuffer).withMetadata().toBuffer();
  return stripped;
}

export async function exifRead(imageBuffer) {
  const exiftool = new ExifTool();
  const tmpFile = join(os.tmpdir(), `read_${Date.now()}.jpg`);

  try {
    await writeFile(tmpFile, imageBuffer);
    const tags = await exiftool.read(tmpFile);
    return tags;
  } finally {
    await unlink(tmpFile).catch(() => {}); // always clean up
    await exiftool.end();
  }
}

export async function exifWrite(imageBuffer, fields) {
  const exiftool = new ExifTool();
  const tmpFile = join(os.tmpdir(), `write_${Date.now()}.jpg`);

  try {
    await writeFile(tmpFile, imageBuffer);
    await exiftool.write(tmpFile, fields, ['-overwrite_original']);
    const buffer = await readFile(tmpFile);
    return buffer;
  } finally {
    await unlink(tmpFile).catch(() => {}); // always clean up
    await exiftool.end();
  }
}

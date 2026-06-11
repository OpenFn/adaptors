import { Jimp } from 'jimp';
import piexif from 'piexifjs';

export function decodeBase64Image(base64ImgStr) {
  const raw = base64ImgStr.includes(',')
    ? base64ImgStr.split(',')[1]
    : base64ImgStr;
  return Buffer.from(raw, 'base64');
}

const TAG_MAP = {};
for (const [ifd, tags] of Object.entries({
  '0th': piexif.ImageIFD,
  Exif: piexif.ExifIFD,
  GPS: piexif.GPSIFD,
})) {
  for (const [name, tagId] of Object.entries(tags)) {
    TAG_MAP[name] = { ifd, tag: tagId };
  }
}

function buildExifBytes(kvPairs) {
  const ifdData = {};
  for (const [key, value] of Object.entries(kvPairs)) {
    const entry = TAG_MAP[key];
    if (!entry) throw new Error(`Unknown EXIF tag: "${key}"`);
    ifdData[entry.ifd] ??= {};
    ifdData[entry.ifd][entry.tag] =
      key === 'UserComment' ? `ASCII\0\0\0${value}` : value;
  }
  return piexif.dump(ifdData);
}

export function injectExif(jpegBuffer, kvPairs) {
  const exifBytes = buildExifBytes(kvPairs);
  const withExif = piexif.insert(exifBytes, jpegBuffer.toString('binary'));
  return Buffer.from(withExif, 'binary');
}

export async function resizeImage(inputBuffer, options = {}) {
  const { width, height } = options;
  const kb = n => `${(n / 1024).toFixed(1)}KB`;

  console.log(`→ input ${kb(inputBuffer.length)}, target ${width}×${height}px`);

  const image = await Jimp.read(inputBuffer);
  const orientation =
    image.width > image.height
      ? 'landscape'
      : image.width < image.height
        ? 'portrait'
        : 'square';
  console.log(
    `→ source ${image.width}×${image.height}px | ${kb(inputBuffer.length)} | ${orientation}`,
  );

  image.resize({ w: width, h: height });
  console.log(`→ resized to ${width}×${height}px`);

  const buffer = await image.getBuffer('image/jpeg', { quality: 100 });
  return { buffer, width, height };
}

export function embedImageMetadata(inputBuffer, kvPairs) {
  return { buffer: injectExif(inputBuffer, kvPairs) };
}

export async function compressImage(inputBuffer, options = {}) {
  const { maxBytes = 700 * 1024, minQuality = 20 } = options;
  const kb = n => `${(n / 1024).toFixed(1)}KB`;

  const image = await Jimp.read(inputBuffer);
  let quality = 80;
  let outBuffer;

  while (true) {
    outBuffer = await image.getBuffer('image/jpeg', { quality });
    console.log(`→ quality=${quality} → ${kb(outBuffer.length)}`);
    if (outBuffer.length <= maxBytes || quality <= minQuality) break;
    quality -= 5;
  }

  const targetMet = outBuffer.length <= maxBytes;
  console.log(
    `→ done — quality=${quality}, size=${kb(outBuffer.length)}` +
      (targetMet
        ? ''
        : ` (min quality reached, target ${kb(maxBytes)} not met)`),
  );

  return { buffer: outBuffer, size: outBuffer.length, quality };
}

export async function stripImage(inputBuffer) {
  const image = await Jimp.read(inputBuffer);
  const buffer = await image.getBuffer('image/jpeg', { quality: 100 });
  return { buffer };
}

export async function getImageMetadata(inputBuffer) {
  const image = await Jimp.read(inputBuffer);
  const orientation =
    image.width > image.height
      ? 'landscape'
      : image.width < image.height
        ? 'portrait'
        : 'square';
  return {
    width: image.width,
    height: image.height,
    orientation,
    size: inputBuffer.length,
  };
}

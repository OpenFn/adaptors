import { readFileSync } from 'fs';
import { createRequire } from 'module';
import { Jimp } from 'jimp';
import piexif from 'piexifjs';
import decode, { init as initDecode } from '@jsquash/jpeg/decode.js';
import encode, { init as initEncode } from '@jsquash/jpeg/encode.js';
import resize, { initResize } from '@jsquash/resize';

const _require = createRequire(import.meta.url);

// Lazy singleton — resolves WASM binaries from node_modules on first call.
// Using a Promise means concurrent first-callers all await the same init.
let _jsquashReady = null;
function ensureJsquash() {
  if (!_jsquashReady) {
    _jsquashReady = (async () => {
      const loadWasm = pkgPath => {
        const buf = readFileSync(_require.resolve(pkgPath));
        // slice() produces a clean ArrayBuffer with no byteOffset (required by Emscripten)
        return buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength);
      };
      await initDecode({ wasmBinary: loadWasm('@jsquash/jpeg/codec/dec/mozjpeg_dec.wasm') });
      await initEncode({ wasmBinary: loadWasm('@jsquash/jpeg/codec/enc/mozjpeg_enc.wasm') });
      await initResize(loadWasm('@jsquash/resize/lib/resize/pkg/squoosh_resize_bg.wasm'));
    })();
  }
  return _jsquashReady;
}

function toArrayBuffer(buf) {
  return buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength);
}

function buildExifBytes(comment) {
  return piexif.dump({
    Exif: { [piexif.ExifIFD.UserComment]: `ASCII\0\0\0${comment}` },
  });
}

export function injectExifComment(jpegBuffer, comment) {
  const exifBytes = buildExifBytes(comment);
  const withExif = piexif.insert(exifBytes, jpegBuffer.toString('binary'));
  return Buffer.from(withExif, 'binary');
}

export async function processImage(inputBuffer, options = {}) {
  const {
    width = 1200,
    height = 1600,
    maxBytes = 700 * 1024,
    minQuality = 20,
    comment,
  } = options;

  const kb = n => `${(n / 1024).toFixed(1)}KB`;

  console.log(
    `→ input ${kb(inputBuffer.length)}, target ${width}×${height}px, max ${kb(maxBytes)}`,
  );

  const image = await Jimp.read(inputBuffer);
  const orientation =
    image.width > image.height ? 'landscape' : image.width < image.height ? 'portrait' : 'square';
  console.log(
    `→ source ${image.width}×${image.height}px | ${kb(inputBuffer.length)} | ${orientation}`,
  );

  image.resize({ w: width, h: height });
  console.log(`→ resized to ${width}×${height}px`);

  let quality = 80;
  let outBuffer;

  while (true) {
    outBuffer = await image.getBuffer('image/jpeg', { quality });
    if (comment) outBuffer = injectExifComment(outBuffer, comment);
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

/**
 * @jsquash/jpeg variant of processImage.
 * Uses MozJPEG (WebAssembly) for decode/encode and squoosh_resize for resizing.
 * Produces smaller files than jimp at the same quality number.
 * Input must be a JPEG buffer — PNG and other formats are not supported.
 */
export async function processImageJsquash(inputBuffer, options = {}) {
  const {
    width = 1200,
    height = 1600,
    maxBytes = 700 * 1024,
    minQuality = 20,
    comment,
  } = options;

  const kb = n => `${(n / 1024).toFixed(1)}KB`;

  await ensureJsquash();

  console.log(
    `→ input ${kb(inputBuffer.length)}, target ${width}×${height}px, max ${kb(maxBytes)}`,
  );

  const imageData = await decode(toArrayBuffer(inputBuffer));
  const orientation =
    imageData.width > imageData.height
      ? 'landscape'
      : imageData.width < imageData.height
        ? 'portrait'
        : 'square';
  console.log(
    `→ source ${imageData.width}×${imageData.height}px | ${kb(inputBuffer.length)} | ${orientation}`,
  );

  const resized = await resize(imageData, { width, height });
  console.log(`→ resized to ${width}×${height}px`);

  let quality = 80;
  let outBuffer;

  while (true) {
    outBuffer = Buffer.from(await encode(resized, { quality }));
    if (comment) outBuffer = injectExifComment(outBuffer, comment);
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

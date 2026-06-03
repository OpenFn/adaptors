import { Jimp } from 'jimp';
import piexif from 'piexifjs';

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

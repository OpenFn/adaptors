import { readFileSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { expect } from 'chai';
import { Jimp } from 'jimp';
import piexif from 'piexifjs';

import { process, resize, compress } from '../src/Adaptor.js';
import { resizeImage } from '../src/Utils.js';

const __dirname = dirname(fileURLToPath(import.meta.url));

const state = { configuration: {}, data: {} };

// Fixtures — see test/images/ for full details
// landscape-large.jpg   4000×2667  4.1MB  landscape
// portrait-large.jpg    1643×2408  2.9MB  portrait
// portrait-small.jpg     780×1040   74KB  portrait  (below 1200×1600 minimum)
// portrait-medium.jpg   1080×1920  190KB  portrait
// portrait-3-4.jpg       960×1280  115KB  portrait  (exact 3:4 ratio, below minimum)
// grayscale.jpg         4000×6000  4.4MB  portrait  (grayscale source)
// heavy-noise.jpg       3200×4000  2.6MB  portrait  (high-entropy, compresses poorly)
// landscape-with-gps.JPG 4032×3024 3.1MB landscape  (carries GPS EXIF)
// portrait-exact.jpg    1200×1600  411KB  portrait  (already at target dimensions)
// square.jpg            3024×3014  1.2MB  ~square
// tiny.jpg               960×1548   80KB  portrait  (non-3:4 ratio, below minimum)
// with-gps.JPG          3024×4032  3.3MB  portrait  (carries GPS EXIF)

function toBase64(filename) {
  return readFileSync(join(__dirname, 'images', filename)).toString('base64');
}

function toBuf(filename) {
  return readFileSync(join(__dirname, 'images', filename));
}

const DEFAULT_OPTS = { width: 1200, height: 1600, maxBytes: 700 * 1024 };
const DEFAULT_RESIZE_OPTS = { width: 1200, height: 1600 };
const DEFAULT_COMPRESS_OPTS = { maxBytes: 700 * 1024 };

async function getResizedBuffer(filename, opts = DEFAULT_RESIZE_OPTS) {
  const { buffer } = await resizeImage(toBuf(filename), opts);
  return buffer;
}

describe('process', () => {
  describe('output dimensions', () => {
    it('keeps exact 1200×1600 when source is already at target dimensions', async () => {
      // portrait-exact.jpg: 1200×1600 — no resize should occur
      const finalState = await process(
        toBase64('portrait-exact.jpg'),
        DEFAULT_OPTS,
      )(state);

      const out = await Jimp.read(finalState.data.buffer);
      expect(out.width).to.equal(1200);
      expect(out.height).to.equal(1600);
    });

    it('stretches a near-square image to the requested portrait dimensions', async () => {
      // square.jpg: 3024×3014 — aspect ratio changes from ~1:1 to 3:4
      const finalState = await process(
        toBase64('square.jpg'),
        DEFAULT_OPTS,
      )(state);

      const out = await Jimp.read(finalState.data.buffer);
      expect(out.width).to.equal(1200);
      expect(out.height).to.equal(1600);
    });

    it('upscales a small non-3:4 portrait to the requested dimensions', async () => {
      // tiny.jpg: 960×1548 — non-standard ratio, below minimum on both axes
      const finalState = await process(
        toBase64('tiny.jpg'),
        DEFAULT_OPTS,
      )(state);

      const out = await Jimp.read(finalState.data.buffer);
      expect(out.width).to.equal(1200);
      expect(out.height).to.equal(1600);
    });
    it('resizes a large landscape image to the requested portrait dimensions', async () => {
      // 1.jpg: 4000×2667 landscape — needs heavy downscale + orientation change
      const finalState = await process(
        toBase64('landscape-large.jpg'),
        DEFAULT_OPTS,
      )(state);

      const out = await Jimp.read(finalState.data.buffer);
      expect(out.width).to.equal(1200);
      expect(out.height).to.equal(1600);
      expect(finalState.data.size).to.be.at.most(DEFAULT_OPTS.maxBytes);
    });

    it('resizes a portrait image with exact 3:4 ratio cleanly', async () => {
      // 7.jpg: 960×1280 — already 3:4, just needs upscaling
      const finalState = await process(
        toBase64('portrait-3-4.jpg'),
        DEFAULT_OPTS,
      )(state);

      const out = await Jimp.read(finalState.data.buffer);
      expect(out.width).to.equal(1200);
      expect(out.height).to.equal(1600);
    });
  });

  describe('compression', () => {
    it('compresses a large portrait image under maxBytes', async () => {
      // 4.jpg: 1643×2408  2.9MB — needs significant compression to hit 700KB
      const finalState = await process(
        toBase64('portrait-large.jpg'),
        DEFAULT_OPTS,
      )(state);

      expect(finalState.data.size).to.be.at.most(DEFAULT_OPTS.maxBytes);
    });

    it('does not reduce quality when source already fits under maxBytes at default quality', async () => {
      // portrait-exact.jpg: 411KB source — after resize to 1200×1600 should still be under 700KB
      const finalState = await process(
        toBase64('portrait-exact.jpg'),
        DEFAULT_OPTS,
      )(state);

      expect(finalState.data.quality).to.equal(80);
      expect(finalState.data.size).to.be.at.most(DEFAULT_OPTS.maxBytes);
    });

    it('reduces quality on a high-entropy noisy image to meet the size target', async () => {
      // heavy-noise.jpg: 3200×4000 — noise compresses poorly, quality loop must step down
      const maxBytes = 150 * 1024; // tight enough to force quality reduction on noisy content
      const finalState = await process(toBase64('heavy-noise.jpg'), {
        ...DEFAULT_OPTS,
        maxBytes,
      })(state);

      expect(finalState.data.size).to.be.at.most(maxBytes);
      expect(finalState.data.quality).to.be.below(80);
    });

    it('stops at minQuality when the size target cannot be reached', async () => {
      // 7.jpg: 115KB — 1KB target is unreachable, must floor at minQuality
      const minQuality = 60;
      const finalState = await process(toBase64('portrait-3-4.jpg'), {
        ...DEFAULT_OPTS,
        maxBytes: 1 * 1024,
        minQuality,
      })(state);

      expect(finalState.data.quality).to.equal(minQuality);
    });
  });

  describe('GPS stripping', () => {
    it('removes GPS tags from a landscape image that carries GPS EXIF', async () => {
      // Confirm the source actually has GPS data before asserting it's stripped
      const srcExif = piexif.load(
        toBuf('landscape-with-gps.JPG').toString('binary'),
      );
      expect(Object.keys(srcExif.GPS ?? {})).to.not.be.empty;

      const finalState = await process(
        toBase64('landscape-with-gps.JPG'),
        DEFAULT_OPTS,
      )(state);

      let outExif;
      try {
        outExif = piexif.load(finalState.data.buffer.toString('binary'));
      } catch {
        outExif = {};
      }
      expect(outExif.GPS ?? {}).to.be.empty;
    });

    it('removes GPS tags from a portrait image that carries GPS EXIF', async () => {
      const srcExif = piexif.load(toBuf('with-gps.JPG').toString('binary'));
      expect(Object.keys(srcExif.GPS ?? {})).to.not.be.empty;

      const finalState = await process(
        toBase64('with-gps.JPG'),
        DEFAULT_OPTS,
      )(state);

      let outExif;
      try {
        outExif = piexif.load(finalState.data.buffer.toString('binary'));
      } catch {
        outExif = {};
      }
      expect(outExif.GPS ?? {}).to.be.empty;
    });
  });

  describe('output validity', () => {
    it('always produces a valid JPEG buffer', async () => {
      // 6.jpg: 1080×1920 portrait — verify output is readable JPEG
      const finalState = await process(
        toBase64('portrait-medium.jpg'),
        DEFAULT_OPTS,
      )(state);

      const buf = finalState.data.buffer;
      // JPEG magic bytes: FF D8
      expect(buf[0]).to.equal(0xff);
      expect(buf[1]).to.equal(0xd8);
      // Jimp can re-read it without throwing
      let readOk = true;
      try {
        await Jimp.read(buf);
      } catch {
        readOk = false;
      }
      expect(readOk).to.be.true;
    });

    it('converts a grayscale source to a valid RGB JPEG', async () => {
      // grayscale.jpg: 4000×6000 grayscale — jimp outputs RGB JPEG regardless of source colour space
      const finalState = await process(
        toBase64('grayscale.jpg'),
        DEFAULT_OPTS,
      )(state);

      const buf = finalState.data.buffer;
      expect(buf[0]).to.equal(0xff);
      expect(buf[1]).to.equal(0xd8);
      let readOk = true;
      try {
        await Jimp.read(buf);
      } catch {
        readOk = false;
      }
      expect(readOk).to.be.true;
    });
  });

  describe('EXIF UserComment', () => {
    it('embeds a comment string in the EXIF UserComment field', async () => {
      const comment = 'patient-id=42';
      const finalState = await process(toBase64('portrait-3-4.jpg'), {
        ...DEFAULT_OPTS,
        comment,
      })(state);

      const exifObj = piexif.load(finalState.data.buffer.toString('binary'));
      const userComment = exifObj?.Exif?.[piexif.ExifIFD.UserComment] ?? '';
      expect(userComment).to.include(comment);
    });

    it('produces a valid JPEG when no comment is provided', async () => {
      const finalState = await process(
        toBase64('portrait-3-4.jpg'),
        DEFAULT_OPTS,
      )(state);

      const buf = finalState.data.buffer;
      expect(buf[0]).to.equal(0xff);
      expect(buf[1]).to.equal(0xd8);
    });
  });

  describe('input format', () => {
    it('accepts a raw base64 string', async () => {
      const finalState = await process(
        toBase64('portrait-small.jpg'),
        DEFAULT_OPTS,
      )(state);
      expect(finalState.data.buffer).to.be.instanceOf(Buffer);
    });

    it('accepts a data URL (data:image/jpeg;base64,...) and strips the prefix', async () => {
      const dataUrl = `data:image/jpeg;base64,${toBase64('portrait-small.jpg')}`;
      const finalState = await process(dataUrl, DEFAULT_OPTS)(state);
      expect(finalState.data.buffer).to.be.instanceOf(Buffer);

      const out = await Jimp.read(finalState.data.buffer);
      expect(out.width).to.equal(1200);
      expect(out.height).to.equal(1600);
    });
  });

  describe('state composition', () => {
    it('writes buffer, size, and quality to state.data', async () => {
      const finalState = await process(
        toBase64('portrait-3-4.jpg'),
        DEFAULT_OPTS,
      )(state);

      expect(finalState.data).to.have.keys(['buffer', 'size', 'quality']);
      expect(finalState.data.buffer).to.be.instanceOf(Buffer);
      expect(finalState.data.size).to.be.a('number').and.greaterThan(0);
      expect(finalState.data.quality).to.be.within(20, 80);
    });

    it('moves the previous state.data into references on each call', async () => {
      const seed = {
        configuration: {},
        data: { existingField: 'hello' },
        references: [],
      };
      const finalState = await process(
        toBase64('portrait-small.jpg'),
        DEFAULT_OPTS,
      )(seed);

      // The seed's data should now be the first (and only) reference
      expect(finalState.references).to.have.length(1);
      expect(finalState.references[0]).to.deep.equal(seed.data);
    });
  });

  describe('non-JPEG input formats', () => {
    it('converts sample-1.png to a valid 1200×1600 JPEG', async () => {
      const finalState = await process(
        toBase64('sample-1.png'),
        DEFAULT_OPTS,
      )(state);

      const buf = finalState.data.buffer;
      expect(buf[0]).to.equal(0xff);
      expect(buf[1]).to.equal(0xd8);
      const out = await Jimp.read(buf);
      expect(out.width).to.equal(1200);
      expect(out.height).to.equal(1600);
    });

    it('converts sample-2.png to a valid 1200×1600 JPEG', async () => {
      const finalState = await process(
        toBase64('sample-2.png'),
        DEFAULT_OPTS,
      )(state);

      const buf = finalState.data.buffer;
      expect(buf[0]).to.equal(0xff);
      expect(buf[1]).to.equal(0xd8);
      const out = await Jimp.read(buf);
      expect(out.width).to.equal(1200);
      expect(out.height).to.equal(1600);
    });

    it('accepts a PNG data URL (data:image/png;base64,...) and strips the prefix', async () => {
      const dataUrl = `data:image/png;base64,${toBase64('sample-1.png')}`;
      const finalState = await process(dataUrl, DEFAULT_OPTS)(state);

      expect(finalState.data.buffer).to.be.instanceOf(Buffer);
      const out = await Jimp.read(finalState.data.buffer);
      expect(out.width).to.equal(1200);
      expect(out.height).to.equal(1600);
    });

    it('converts blue-and-bingo.gif to a valid JPEG', async () => {
      const finalState = await process(
        toBase64('blue-and-bingo.gif'),
        DEFAULT_OPTS,
      )(state);

      const buf = finalState.data.buffer;
      expect(buf[0]).to.equal(0xff);
      expect(buf[1]).to.equal(0xd8);
      expect(finalState.data.size).to.be.at.most(DEFAULT_OPTS.maxBytes);
    });

    it('converts bugs-bunny-hold-up-doc.gif (animated) to a valid JPEG using the first frame', async () => {
      const finalState = await process(
        toBase64('bugs-bunny-hold-up-doc.gif'),
        DEFAULT_OPTS,
      )(state);

      const buf = finalState.data.buffer;
      expect(buf[0]).to.equal(0xff);
      expect(buf[1]).to.equal(0xd8);
      let readOk = true;
      try {
        await Jimp.read(buf);
      } catch {
        readOk = false;
      }
      expect(readOk).to.be.true;
    });

    it('converts a 16-bit BMP to a valid JPEG', async () => {
      const finalState = await process(
        toBase64('blue-bmp-16-bit.bmp'),
        DEFAULT_OPTS,
      )(state);

      const buf = finalState.data.buffer;
      expect(buf[0]).to.equal(0xff);
      expect(buf[1]).to.equal(0xd8);
      let readOk = true;
      try {
        await Jimp.read(buf);
      } catch {
        readOk = false;
      }
      expect(readOk).to.be.true;
    });

    it('rejects an AVIF input (no Jimp AVIF plugin installed)', async () => {
      let threw = false;
      try {
        await process(
          toBase64('animated-avif-12-frames-hq-lossy.avif'),
          DEFAULT_OPTS,
        )(state);
      } catch {
        threw = true;
      }
      expect(threw).to.be.true;
    });

    it('rejects an SVG input (no Jimp SVG plugin installed)', async () => {
      let threw = false;
      try {
        await process(
          toBase64('svg-sample-transparent-large.svg'),
          DEFAULT_OPTS,
        )(state);
      } catch {
        threw = true;
      }
      expect(threw).to.be.true;
    });
  });
});

// ─── resize ──────────────────────────────────────────────────────────────────

describe('resize', () => {
  describe('output dimensions', () => {
    it('downscales a large portrait to target dimensions', async () => {
      const finalState = await resize(
        toBase64('portrait-large.jpg'),
        DEFAULT_RESIZE_OPTS,
      )(state);

      const out = await Jimp.read(finalState.data.buffer);
      expect(out.width).to.equal(1200);
      expect(out.height).to.equal(1600);
    });

    it('downscales a landscape image to target portrait dimensions', async () => {
      const finalState = await resize(
        toBase64('landscape-large.jpg'),
        DEFAULT_RESIZE_OPTS,
      )(state);

      const out = await Jimp.read(finalState.data.buffer);
      expect(out.width).to.equal(1200);
      expect(out.height).to.equal(1600);
    });

    it('upscales a small portrait to target dimensions', async () => {
      const finalState = await resize(
        toBase64('portrait-small.jpg'),
        DEFAULT_RESIZE_OPTS,
      )(state);

      const out = await Jimp.read(finalState.data.buffer);
      expect(out.width).to.equal(1200);
      expect(out.height).to.equal(1600);
    });

    it('stretches a square image to the requested portrait dimensions', async () => {
      const finalState = await resize(
        toBase64('square.jpg'),
        DEFAULT_RESIZE_OPTS,
      )(state);

      const out = await Jimp.read(finalState.data.buffer);
      expect(out.width).to.equal(1200);
      expect(out.height).to.equal(1600);
    });
  });

  describe('output format', () => {
    it('converts PNG to a valid JPEG buffer', async () => {
      const finalState = await resize(
        toBase64('sample-1.png'),
        DEFAULT_RESIZE_OPTS,
      )(state);

      const buf = finalState.data.buffer;
      expect(buf[0]).to.equal(0xff);
      expect(buf[1]).to.equal(0xd8);
    });

    it('converts GIF to a valid JPEG buffer', async () => {
      const finalState = await resize(
        toBase64('blue-and-bingo.gif'),
        DEFAULT_RESIZE_OPTS,
      )(state);

      const buf = finalState.data.buffer;
      expect(buf[0]).to.equal(0xff);
      expect(buf[1]).to.equal(0xd8);
    });

    it('converts BMP to a valid JPEG buffer', async () => {
      const finalState = await resize(
        toBase64('blue-bmp-16-bit.bmp'),
        DEFAULT_RESIZE_OPTS,
      )(state);

      const buf = finalState.data.buffer;
      expect(buf[0]).to.equal(0xff);
      expect(buf[1]).to.equal(0xd8);
    });

    it('rejects an AVIF input', async () => {
      let threw = false;
      try {
        await resize(
          toBase64('animated-avif-12-frames-hq-lossy.avif'),
          DEFAULT_RESIZE_OPTS,
        )(state);
      } catch {
        threw = true;
      }
      expect(threw).to.be.true;
    });

    it('rejects an SVG input', async () => {
      let threw = false;
      try {
        await resize(
          toBase64('svg-sample-transparent-large.svg'),
          DEFAULT_RESIZE_OPTS,
        )(state);
      } catch {
        threw = true;
      }
      expect(threw).to.be.true;
    });
  });

  describe('input handling', () => {
    it('accepts a data URL and strips the prefix', async () => {
      const dataUrl = `data:image/jpeg;base64,${toBase64('portrait-small.jpg')}`;
      const finalState = await resize(dataUrl, DEFAULT_RESIZE_OPTS)(state);

      const out = await Jimp.read(finalState.data.buffer);
      expect(out.width).to.equal(1200);
      expect(out.height).to.equal(1600);
    });

  });

  describe('state composition', () => {
    it('writes buffer, width, and height to state.data', async () => {
      const finalState = await resize(
        toBase64('portrait-3-4.jpg'),
        DEFAULT_RESIZE_OPTS,
      )(state);

      expect(finalState.data).to.have.keys(['buffer', 'width', 'height']);
      expect(finalState.data.buffer).to.be.instanceOf(Buffer);
      expect(finalState.data.width).to.equal(1200);
      expect(finalState.data.height).to.equal(1600);
    });

    it('moves the previous state.data into references', async () => {
      const seed = {
        configuration: {},
        data: { existingField: 'hello' },
        references: [],
      };
      const finalState = await resize(
        toBase64('portrait-small.jpg'),
        DEFAULT_RESIZE_OPTS,
      )(seed);

      expect(finalState.references).to.have.length(1);
      expect(finalState.references[0]).to.deep.equal(seed.data);
    });
  });
});

// ─── compress ────────────────────────────────────────────────────────────────

describe('compress', () => {
  describe('compression behaviour', () => {
    it('compresses a large portrait image under maxBytes', async () => {
      const inputBuffer = await getResizedBuffer('portrait-large.jpg');
      const finalState = await compress(
        inputBuffer,
        DEFAULT_COMPRESS_OPTS,
      )(state);

      expect(finalState.data.size).to.be.at.most(DEFAULT_COMPRESS_OPTS.maxBytes);
    });

    it('does not reduce quality when image already fits under maxBytes', async () => {
      const inputBuffer = await getResizedBuffer('portrait-exact.jpg');
      const finalState = await compress(
        inputBuffer,
        DEFAULT_COMPRESS_OPTS,
      )(state);

      expect(finalState.data.quality).to.equal(80);
      expect(finalState.data.size).to.be.at.most(DEFAULT_COMPRESS_OPTS.maxBytes);
    });

    it('steps quality down for high-entropy content to meet the size target', async () => {
      const maxBytes = 150 * 1024;
      const inputBuffer = await getResizedBuffer('heavy-noise.jpg');
      const finalState = await compress(inputBuffer, { maxBytes })(state);

      expect(finalState.data.size).to.be.at.most(maxBytes);
      expect(finalState.data.quality).to.be.below(80);
    });

    it('stops at minQuality when the size target cannot be reached', async () => {
      const minQuality = 60;
      const inputBuffer = await getResizedBuffer('portrait-3-4.jpg');
      const finalState = await compress(inputBuffer, {
        maxBytes: 1 * 1024,
        minQuality,
      })(state);

      expect(finalState.data.quality).to.equal(minQuality);
    });
  });

  describe('EXIF handling', () => {
    it('embeds a comment string in the EXIF UserComment field', async () => {
      const comment = 'patient-id=42';
      const inputBuffer = await getResizedBuffer('portrait-3-4.jpg');
      const finalState = await compress(inputBuffer, {
        ...DEFAULT_COMPRESS_OPTS,
        comment,
      })(state);

      const exifObj = piexif.load(finalState.data.buffer.toString('binary'));
      const userComment = exifObj?.Exif?.[piexif.ExifIFD.UserComment] ?? '';
      expect(userComment).to.include(comment);
    });

    it('strips GPS tags from a portrait image that carries GPS EXIF', async () => {
      const srcExif = piexif.load(toBuf('with-gps.JPG').toString('binary'));
      expect(Object.keys(srcExif.GPS ?? {})).to.not.be.empty;

      const inputBuffer = await getResizedBuffer('with-gps.JPG');
      const finalState = await compress(inputBuffer, DEFAULT_COMPRESS_OPTS)(state);

      let outExif;
      try {
        outExif = piexif.load(finalState.data.buffer.toString('binary'));
      } catch {
        outExif = {};
      }
      expect(outExif.GPS ?? {}).to.be.empty;
    });
  });

  describe('output validity', () => {
    it('produces a valid JPEG buffer', async () => {
      const inputBuffer = await getResizedBuffer('portrait-medium.jpg');
      const finalState = await compress(inputBuffer, DEFAULT_COMPRESS_OPTS)(state);

      const buf = finalState.data.buffer;
      expect(buf[0]).to.equal(0xff);
      expect(buf[1]).to.equal(0xd8);
      let readOk = true;
      try {
        await Jimp.read(buf);
      } catch {
        readOk = false;
      }
      expect(readOk).to.be.true;
    });
  });

  describe('input handling', () => {
    it('accepts a Buffer (e.g. output of resizeImage)', async () => {
      const inputBuffer = await getResizedBuffer('portrait-large.jpg');
      const finalState = await compress(inputBuffer, DEFAULT_COMPRESS_OPTS)(state);

      expect(finalState.data.size).to.be.at.most(DEFAULT_COMPRESS_OPTS.maxBytes);
      expect(finalState.data.buffer).to.be.instanceOf(Buffer);
    });

    it('accepts a base64 string', async () => {
      const finalState = await compress(
        toBase64('portrait-exact.jpg'),
        DEFAULT_COMPRESS_OPTS,
      )(state);

      expect(finalState.data.buffer).to.be.instanceOf(Buffer);
      expect(finalState.data.size).to.be.a('number').and.greaterThan(0);
    });
  });

  describe('state composition', () => {
    it('writes buffer, size, and quality to state.data', async () => {
      const inputBuffer = await getResizedBuffer('portrait-3-4.jpg');
      const finalState = await compress(inputBuffer, DEFAULT_COMPRESS_OPTS)(state);

      expect(finalState.data).to.have.keys(['buffer', 'size', 'quality']);
      expect(finalState.data.buffer).to.be.instanceOf(Buffer);
      expect(finalState.data.size).to.be.a('number').and.greaterThan(0);
      expect(finalState.data.quality).to.be.within(20, 80);
    });

    it('moves the previous state.data into references', async () => {
      const seed = {
        configuration: {},
        data: { existingField: 'hello' },
        references: [],
      };
      const inputBuffer = await getResizedBuffer('portrait-small.jpg');
      const finalState = await compress(inputBuffer, DEFAULT_COMPRESS_OPTS)(seed);

      expect(finalState.references).to.have.length(1);
      expect(finalState.references[0]).to.deep.equal(seed.data);
    });
  });
});

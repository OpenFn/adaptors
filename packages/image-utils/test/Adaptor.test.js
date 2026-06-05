import { readFileSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { expect } from 'chai';
import { Jimp } from 'jimp';
import piexif from 'piexifjs';

import { resize, compress, strip, metadata, toBase64, toBuffer } from '../src/Adaptor.js';
import { resizeImage } from '../src/Utils.js';

const __dirname = dirname(fileURLToPath(import.meta.url));

const state = { configuration: {}, data: {} };

// Fixtures — see test/images/ for full details
// landscape-large.jpg    4000×2667  4.1MB  landscape
// portrait-large.jpg     1643×2408  2.9MB  portrait
// portrait-small.jpg      780×1040   74KB  portrait  (below 1200×1600 minimum)
// portrait-medium.jpg    1080×1920  190KB  portrait
// portrait-3-4.jpg        960×1280  115KB  portrait  (exact 3:4 ratio, below minimum)
// grayscale.jpg          4000×6000  4.4MB  portrait  (grayscale source)
// heavy-noise.jpg        3200×4000  2.6MB  portrait  (high-entropy, compresses poorly)
// landscape-with-gps.JPG 4032×3024  3.1MB landscape  (carries GPS EXIF)
// portrait-exact.jpg     1200×1600  411KB  portrait  (already at target dimensions)
// square.jpg             3024×3014  1.2MB  ~square
// tiny.jpg                960×1548   80KB  portrait  (non-3:4 ratio, below minimum)
// with-gps.JPG           3024×4032  3.3MB  portrait  (carries GPS EXIF)
// sample-1.png           4096×4096   13MB  square
// sample-2.png           1920×1280  2.5MB  landscape
// blue-bmp-16-bit.bmp     512×512   768KB  square
// svg-sample-transparent-large.svg

function toBase64Str(filename) {
  return readFileSync(join(__dirname, 'images', filename)).toString('base64');
}

function toBuf(filename) {
  return readFileSync(join(__dirname, 'images', filename));
}

const DEFAULT_RESIZE_OPTS = { width: 1200, height: 1600 };
const DEFAULT_COMPRESS_OPTS = { maxBytes: 700 * 1024 };

async function getResizedBuffer(filename, opts = DEFAULT_RESIZE_OPTS) {
  const { buffer } = await resizeImage(toBuf(filename), opts);
  return buffer;
}

// ─── resize ──────────────────────────────────────────────────────────────────

describe('resize', () => {
  describe('output dimensions', () => {
    it('downscales a large portrait to target dimensions', async () => {
      const finalState = await resize(toBase64Str('portrait-large.jpg'), DEFAULT_RESIZE_OPTS)(state);

      const out = await Jimp.read(finalState.data.buffer);
      expect(out.width).to.equal(1200);
      expect(out.height).to.equal(1600);
    });

    it('downscales a landscape image to target portrait dimensions', async () => {
      const finalState = await resize(toBase64Str('landscape-large.jpg'), DEFAULT_RESIZE_OPTS)(state);

      const out = await Jimp.read(finalState.data.buffer);
      expect(out.width).to.equal(1200);
      expect(out.height).to.equal(1600);
    });

    it('upscales a small portrait to target dimensions', async () => {
      const finalState = await resize(toBase64Str('portrait-small.jpg'), DEFAULT_RESIZE_OPTS)(state);

      const out = await Jimp.read(finalState.data.buffer);
      expect(out.width).to.equal(1200);
      expect(out.height).to.equal(1600);
    });

    it('stretches a square image to the requested portrait dimensions', async () => {
      const finalState = await resize(toBase64Str('square.jpg'), DEFAULT_RESIZE_OPTS)(state);

      const out = await Jimp.read(finalState.data.buffer);
      expect(out.width).to.equal(1200);
      expect(out.height).to.equal(1600);
    });
  });

  describe('output format', () => {
    it('converts PNG to a valid JPEG buffer', async () => {
      const finalState = await resize(toBase64Str('sample-1.png'), DEFAULT_RESIZE_OPTS)(state);

      const buf = finalState.data.buffer;
      expect(buf[0]).to.equal(0xff);
      expect(buf[1]).to.equal(0xd8);
    });

    it('converts BMP to a valid JPEG buffer', async () => {
      const finalState = await resize(toBase64Str('blue-bmp-16-bit.bmp'), DEFAULT_RESIZE_OPTS)(state);

      const buf = finalState.data.buffer;
      expect(buf[0]).to.equal(0xff);
      expect(buf[1]).to.equal(0xd8);
    });

    it('rejects an SVG input', async () => {
      let threw = false;
      try {
        await resize(toBase64Str('svg-sample-transparent-large.svg'), DEFAULT_RESIZE_OPTS)(state);
      } catch {
        threw = true;
      }
      expect(threw).to.be.true;
    });
  });

  describe('input handling', () => {
    it('accepts a data URL and strips the prefix', async () => {
      const dataUrl = `data:image/jpeg;base64,${toBase64Str('portrait-small.jpg')}`;
      const finalState = await resize(dataUrl, DEFAULT_RESIZE_OPTS)(state);

      const out = await Jimp.read(finalState.data.buffer);
      expect(out.width).to.equal(1200);
      expect(out.height).to.equal(1600);
    });

    it('accepts a Buffer directly', async () => {
      const finalState = await resize(toBuf('portrait-small.jpg'), DEFAULT_RESIZE_OPTS)(state);

      const out = await Jimp.read(finalState.data.buffer);
      expect(out.width).to.equal(1200);
      expect(out.height).to.equal(1600);
    });
  });

  describe('state composition', () => {
    it('writes buffer, width, and height to state.data', async () => {
      const finalState = await resize(toBase64Str('portrait-3-4.jpg'), DEFAULT_RESIZE_OPTS)(state);

      expect(finalState.data).to.have.keys(['buffer', 'width', 'height']);
      expect(finalState.data.buffer).to.be.instanceOf(Buffer);
      expect(finalState.data.width).to.equal(1200);
      expect(finalState.data.height).to.equal(1600);
    });

    it('moves the previous state.data into references', async () => {
      const seed = { configuration: {}, data: { existingField: 'hello' }, references: [] };
      const finalState = await resize(toBase64Str('portrait-small.jpg'), DEFAULT_RESIZE_OPTS)(seed);

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
      const finalState = await compress(inputBuffer, DEFAULT_COMPRESS_OPTS)(state);

      expect(finalState.data.size).to.be.at.most(DEFAULT_COMPRESS_OPTS.maxBytes);
    });

    it('does not reduce quality when image already fits under maxBytes', async () => {
      const inputBuffer = await getResizedBuffer('portrait-exact.jpg');
      const finalState = await compress(inputBuffer, DEFAULT_COMPRESS_OPTS)(state);

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
      const finalState = await compress(inputBuffer, { maxBytes: 1 * 1024, minQuality })(state);

      expect(finalState.data.quality).to.equal(minQuality);
    });
  });

  describe('EXIF handling', () => {
    it('embeds a comment string in the EXIF UserComment field', async () => {
      const comment = 'patient-id=42';
      const inputBuffer = await getResizedBuffer('portrait-3-4.jpg');
      const finalState = await compress(inputBuffer, { ...DEFAULT_COMPRESS_OPTS, comment })(state);

      const exifObj = piexif.load(finalState.data.buffer.toString('binary'));
      const userComment = exifObj?.Exif?.[piexif.ExifIFD.UserComment] ?? '';
      expect(userComment).to.include(comment);
    });

    it('strips GPS tags from an image that carries GPS EXIF', async () => {
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
    it('accepts a Buffer', async () => {
      const inputBuffer = await getResizedBuffer('portrait-large.jpg');
      const finalState = await compress(inputBuffer, DEFAULT_COMPRESS_OPTS)(state);

      expect(finalState.data.size).to.be.at.most(DEFAULT_COMPRESS_OPTS.maxBytes);
    });

    it('accepts a base64 string', async () => {
      const finalState = await compress(
        toBase64Str('portrait-exact.jpg'),
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
      const seed = { configuration: {}, data: { existingField: 'hello' }, references: [] };
      const inputBuffer = await getResizedBuffer('portrait-small.jpg');
      const finalState = await compress(inputBuffer, DEFAULT_COMPRESS_OPTS)(seed);

      expect(finalState.references).to.have.length(1);
      expect(finalState.references[0]).to.deep.equal(seed.data);
    });
  });
});

// ─── strip ───────────────────────────────────────────────────────────────────

describe('strip', () => {
  it('removes GPS EXIF from a portrait image', async () => {
    const srcExif = piexif.load(toBuf('with-gps.JPG').toString('binary'));
    expect(Object.keys(srcExif.GPS ?? {})).to.not.be.empty;

    const finalState = await strip(toBase64Str('with-gps.JPG'))(state);

    let outExif;
    try {
      outExif = piexif.load(finalState.data.buffer.toString('binary'));
    } catch {
      outExif = {};
    }
    expect(outExif.GPS ?? {}).to.be.empty;
  });

  it('removes GPS EXIF from a landscape image', async () => {
    const srcExif = piexif.load(toBuf('landscape-with-gps.JPG').toString('binary'));
    expect(Object.keys(srcExif.GPS ?? {})).to.not.be.empty;

    const finalState = await strip(toBase64Str('landscape-with-gps.JPG'))(state);

    let outExif;
    try {
      outExif = piexif.load(finalState.data.buffer.toString('binary'));
    } catch {
      outExif = {};
    }
    expect(outExif.GPS ?? {}).to.be.empty;
  });

  it('produces a valid JPEG buffer', async () => {
    const finalState = await strip(toBase64Str('portrait-large.jpg'))(state);

    const buf = finalState.data.buffer;
    expect(buf[0]).to.equal(0xff);
    expect(buf[1]).to.equal(0xd8);
  });

  it('accepts a Buffer input', async () => {
    const finalState = await strip(toBuf('portrait-medium.jpg'))(state);

    expect(finalState.data.buffer).to.be.instanceOf(Buffer);
    expect(finalState.data.buffer[0]).to.equal(0xff);
    expect(finalState.data.buffer[1]).to.equal(0xd8);
  });

  it('writes { buffer } to state.data', async () => {
    const finalState = await strip(toBase64Str('portrait-small.jpg'))(state);

    expect(finalState.data).to.have.keys(['buffer']);
    expect(finalState.data.buffer).to.be.instanceOf(Buffer);
  });
});

// ─── metadata ────────────────────────────────────────────────────────────────

describe('metadata', () => {
  it('returns correct dimensions for a portrait image', async () => {
    const finalState = await metadata(toBase64Str('portrait-large.jpg'))(state);

    expect(finalState.data.width).to.equal(1643);
    expect(finalState.data.height).to.equal(2408);
  });

  it('returns correct dimensions for a landscape image', async () => {
    const finalState = await metadata(toBase64Str('landscape-large.jpg'))(state);

    expect(finalState.data.width).to.equal(4000);
    expect(finalState.data.height).to.equal(2667);
  });

  it('returns orientation=portrait for a portrait image', async () => {
    const finalState = await metadata(toBase64Str('portrait-large.jpg'))(state);
    expect(finalState.data.orientation).to.equal('portrait');
  });

  it('returns orientation=landscape for a landscape image', async () => {
    const finalState = await metadata(toBase64Str('landscape-large.jpg'))(state);
    expect(finalState.data.orientation).to.equal('landscape');
  });

  it('returns orientation=square for a square image', async () => {
    // blue-bmp-16-bit.bmp is 512×512 — a truly square image
    const finalState = await metadata(toBase64Str('blue-bmp-16-bit.bmp'))(state);
    expect(finalState.data.orientation).to.equal('square');
  });

  it('returns the file size in bytes', async () => {
    const buf = toBuf('portrait-large.jpg');
    const finalState = await metadata(buf)(state);
    expect(finalState.data.size).to.equal(buf.length);
  });

  it('writes { width, height, orientation, size } to state.data', async () => {
    const finalState = await metadata(toBase64Str('portrait-small.jpg'))(state);

    expect(finalState.data).to.have.keys(['width', 'height', 'orientation', 'size']);
  });

  it('allows job code to branch on orientation', async () => {
    const finalState = await metadata(toBase64Str('landscape-large.jpg'))(state);

    const needsResize = finalState.data.orientation !== 'portrait';
    expect(needsResize).to.be.true;
  });
});

// ─── toBase64 / toBuffer ─────────────────────────────────────────────────────

describe('toBase64', () => {
  it('converts a Buffer to a base64 string', async () => {
    const buf = toBuf('portrait-small.jpg');
    const finalState = await toBase64(buf)(state);

    expect(finalState.data).to.be.a('string');
    expect(finalState.data).to.equal(buf.toString('base64'));
  });

  it('writes the base64 string to state.data', async () => {
    const buf = toBuf('portrait-small.jpg');
    const finalState = await toBase64(buf)(state);

    expect(finalState.data).to.be.a('string');
    expect(finalState.data.length).to.be.greaterThan(0);
  });

  it('is a no-op when given a string (already base64)', async () => {
    const b64 = toBase64Str('portrait-small.jpg');
    const finalState = await toBase64(b64)(state);

    expect(finalState.data).to.equal(b64);
  });
});

describe('toBuffer', () => {
  it('converts a base64 string to a Buffer', async () => {
    const b64 = toBase64Str('portrait-small.jpg');
    const finalState = await toBuffer(b64)(state);

    expect(finalState.data).to.be.instanceOf(Buffer);
    expect(finalState.data).to.deep.equal(toBuf('portrait-small.jpg'));
  });

  it('converts a data URL to a Buffer', async () => {
    const dataUrl = `data:image/jpeg;base64,${toBase64Str('portrait-small.jpg')}`;
    const finalState = await toBuffer(dataUrl)(state);

    expect(finalState.data).to.be.instanceOf(Buffer);
    expect(finalState.data).to.deep.equal(toBuf('portrait-small.jpg'));
  });

  it('is a no-op when given a Buffer', async () => {
    const buf = toBuf('portrait-small.jpg');
    const finalState = await toBuffer(buf)(state);

    expect(finalState.data).to.deep.equal(buf);
  });

  it('round-trips a buffer through base64 without data loss', async () => {
    const resizeState = await resize(toBase64Str('portrait-small.jpg'), DEFAULT_RESIZE_OPTS)(state);
    const originalBuffer = resizeState.data.buffer;

    const b64State = await toBase64(originalBuffer)(resizeState);
    expect(b64State.data).to.be.a('string');

    const bufState = await toBuffer(b64State.data)(b64State);
    expect(bufState.data).to.deep.equal(originalBuffer);
  });

  it('passes a buffer from resize() to compress() as an explicit argument', async () => {
    const resizeState = await resize(toBase64Str('portrait-large.jpg'), DEFAULT_RESIZE_OPTS)(state);
    const compressState = await compress(resizeState.data.buffer, DEFAULT_COMPRESS_OPTS)(resizeState);

    expect(compressState.data.size).to.be.at.most(DEFAULT_COMPRESS_OPTS.maxBytes);
    expect(compressState.data.buffer).to.be.instanceOf(Buffer);
  });
});

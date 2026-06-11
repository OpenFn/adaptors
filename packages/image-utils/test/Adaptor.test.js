import { readFileSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { expect } from 'chai';
import { Jimp } from 'jimp';
import piexif from 'piexifjs';

import {
  resize,
  compress,
  stripMetadata,
  embedMetadata,
  metadata,
} from '../src/Adaptor.js';
import { resizeImage } from '../src/Utils.js';

const __dirname = dirname(fileURLToPath(import.meta.url));

const state = { configuration: {}, data: {} };

// Fixtures — see test/images/ for full details
// portrait-large.jpg       3203×4271        portrait
// portrat-small.JPG         608×1080        portrait  (below 1200×1600 minimum)
// portrait-medium.jpg      2160×3240        portrait
// portrait-exact.jpg       1200×1600  411KB portrait  (already at target dimensions)
// grayscale.jpg            4000×6000        portrait  (grayscale source)
// heavy-noise.jpg          3200×4000        portrait  (high-entropy, compresses poorly)
// landscape-with-gps.JPG   4032×3024        landscape (carries GPS EXIF)
// with-gps.JPG             3024×4032        portrait  (carries GPS EXIF)
// Bot-Test.jpg              512×512         square
// square.jpg               3024×3014        ~square
// sample-1.png             4096×4096   13MB square
// sample-2.png             1920×1280        landscape
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
      const finalState = await resize(
        toBase64Str('portrait-large.jpg'),
        DEFAULT_RESIZE_OPTS,
      )(state);

      const out = await Jimp.read(finalState.data.buffer);
      expect(out.width).to.equal(1200);
      expect(out.height).to.equal(1600);
    });

    it('downscales a landscape image to target portrait dimensions', async () => {
      const finalState = await resize(
        toBase64Str('landscape-with-gps.JPG'),
        DEFAULT_RESIZE_OPTS,
      )(state);

      const out = await Jimp.read(finalState.data.buffer);
      expect(out.width).to.equal(1200);
      expect(out.height).to.equal(1600);
    });

    it('upscales a small portrait to target dimensions', async () => {
      const finalState = await resize(
        toBase64Str('portrat-small.JPG'),
        DEFAULT_RESIZE_OPTS,
      )(state);

      const out = await Jimp.read(finalState.data.buffer);
      expect(out.width).to.equal(1200);
      expect(out.height).to.equal(1600);
    });

    it('stretches a square image to the requested portrait dimensions', async () => {
      const finalState = await resize(
        toBase64Str('square.jpg'),
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
        toBase64Str('sample-1.png'),
        DEFAULT_RESIZE_OPTS,
      )(state);

      const buf = finalState.data.buffer;
      expect(buf[0]).to.equal(0xff);
      expect(buf[1]).to.equal(0xd8);
    });

    it('rejects an SVG input', async () => {
      let threw = false;
      try {
        await resize(
          toBase64Str('svg-sample-transparent-large.svg'),
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
      const dataUrl = `data:image/jpeg;base64,${toBase64Str('portrat-small.JPG')}`;
      const finalState = await resize(dataUrl, DEFAULT_RESIZE_OPTS)(state);

      const out = await Jimp.read(finalState.data.buffer);
      expect(out.width).to.equal(1200);
      expect(out.height).to.equal(1600);
    });

    it('accepts a Buffer directly', async () => {
      const finalState = await resize(
        toBuf('portrat-small.JPG'),
        DEFAULT_RESIZE_OPTS,
      )(state);

      const out = await Jimp.read(finalState.data.buffer);
      expect(out.width).to.equal(1200);
      expect(out.height).to.equal(1600);
    });
  });

  describe('state composition', () => {
    it('writes buffer, width, and height to state.data', async () => {
      const finalState = await resize(
        toBase64Str('portrat-small.JPG'),
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
        toBase64Str('portrat-small.JPG'),
        DEFAULT_RESIZE_OPTS,
      )(seed);

      expect(finalState.references).to.have.length(1);
      expect(finalState.references[0]).to.deep.equal(seed.data);
    });
  });

  describe('base64 option', () => {
    it("returns { base64, width, height } when parseAs: 'base64'", async () => {
      const finalState = await resize(toBase64Str('portrat-small.JPG'), {
        ...DEFAULT_RESIZE_OPTS,
        parseAs: 'base64',
      })(state);

      expect(finalState.data).to.have.keys(['base64', 'width', 'height']);
      expect(finalState.data.base64).to.be.a('string');
      expect(finalState.data.base64.length).to.be.greaterThan(0);
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

      expect(finalState.data.size).to.be.at.most(
        DEFAULT_COMPRESS_OPTS.maxBytes,
      );
    });

    it('does not reduce quality when image already fits under maxBytes', async () => {
      const inputBuffer = await getResizedBuffer('portrait-exact.jpg');
      const finalState = await compress(
        inputBuffer,
        DEFAULT_COMPRESS_OPTS,
      )(state);

      expect(finalState.data.quality).to.equal(80);
      expect(finalState.data.size).to.be.at.most(
        DEFAULT_COMPRESS_OPTS.maxBytes,
      );
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
      const inputBuffer = await getResizedBuffer('portrait-medium.jpg');
      const finalState = await compress(inputBuffer, {
        maxBytes: 1 * 1024,
        minQuality,
      })(state);

      expect(finalState.data.quality).to.equal(minQuality);
    });
  });

  describe('EXIF handling', () => {
    it('strips GPS tags from an image that carries GPS EXIF', async () => {
      const srcExif = piexif.load(toBuf('with-gps.JPG').toString('binary'));
      expect(Object.keys(srcExif.GPS ?? {})).to.not.be.empty;

      const inputBuffer = await getResizedBuffer('with-gps.JPG');
      const finalState = await compress(
        inputBuffer,
        DEFAULT_COMPRESS_OPTS,
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
    it('produces a valid JPEG buffer', async () => {
      const inputBuffer = await getResizedBuffer('portrait-medium.jpg');
      const finalState = await compress(
        inputBuffer,
        DEFAULT_COMPRESS_OPTS,
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

  describe('input handling', () => {
    it('accepts a Buffer', async () => {
      const inputBuffer = await getResizedBuffer('portrait-large.jpg');
      const finalState = await compress(
        inputBuffer,
        DEFAULT_COMPRESS_OPTS,
      )(state);

      expect(finalState.data.size).to.be.at.most(
        DEFAULT_COMPRESS_OPTS.maxBytes,
      );
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
      const inputBuffer = await getResizedBuffer('portrat-small.JPG');
      const finalState = await compress(
        inputBuffer,
        DEFAULT_COMPRESS_OPTS,
      )(state);

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
      const inputBuffer = await getResizedBuffer('portrat-small.JPG');
      const finalState = await compress(
        inputBuffer,
        DEFAULT_COMPRESS_OPTS,
      )(seed);

      expect(finalState.references).to.have.length(1);
      expect(finalState.references[0]).to.deep.equal(seed.data);
    });
  });

  describe('base64 option', () => {
    it("returns { base64, size, quality } when parseAs: 'base64'", async () => {
      const inputBuffer = await getResizedBuffer('portrat-small.JPG');
      const finalState = await compress(inputBuffer, {
        ...DEFAULT_COMPRESS_OPTS,
        parseAs: 'base64',
      })(state);

      expect(finalState.data).to.have.keys(['base64', 'size', 'quality']);
      expect(finalState.data.base64).to.be.a('string');
    });
  });
});

// ─── strip ───────────────────────────────────────────────────────────────────

describe('stripMetadata', () => {
  it('removes GPS EXIF from a portrait image', async () => {
    const srcExif = piexif.load(toBuf('with-gps.JPG').toString('binary'));
    expect(Object.keys(srcExif.GPS ?? {})).to.not.be.empty;

    const finalState = await stripMetadata(toBase64Str('with-gps.JPG'))(state);

    let outExif;
    try {
      outExif = piexif.load(finalState.data.buffer.toString('binary'));
    } catch {
      outExif = {};
    }
    expect(outExif.GPS ?? {}).to.be.empty;
  });

  it('removes GPS EXIF from a landscape image', async () => {
    const srcExif = piexif.load(
      toBuf('landscape-with-gps.JPG').toString('binary'),
    );
    expect(Object.keys(srcExif.GPS ?? {})).to.not.be.empty;

    const finalState = await stripMetadata(
      toBase64Str('landscape-with-gps.JPG'),
    )(state);

    let outExif;
    try {
      outExif = piexif.load(finalState.data.buffer.toString('binary'));
    } catch {
      outExif = {};
    }
    expect(outExif.GPS ?? {}).to.be.empty;
  });

  it('produces a valid JPEG buffer', async () => {
    const finalState = await stripMetadata(toBase64Str('portrait-large.jpg'))(
      state,
    );

    const buf = finalState.data.buffer;
    expect(buf[0]).to.equal(0xff);
    expect(buf[1]).to.equal(0xd8);
  });

  it('accepts a Buffer input', async () => {
    const finalState = await stripMetadata(toBuf('portrait-medium.jpg'))(state);

    expect(finalState.data.buffer).to.be.instanceOf(Buffer);
    expect(finalState.data.buffer[0]).to.equal(0xff);
    expect(finalState.data.buffer[1]).to.equal(0xd8);
  });

  it('writes { buffer } to state.data', async () => {
    const finalState = await stripMetadata(toBase64Str('portrat-small.JPG'))(
      state,
    );

    expect(finalState.data).to.have.keys(['buffer']);
    expect(finalState.data.buffer).to.be.instanceOf(Buffer);
  });

  it("returns { base64 } when parseAs: 'base64'", async () => {
    const finalState = await stripMetadata(toBase64Str('portrat-small.JPG'), {
      parseAs: 'base64',
    })(state);

    expect(finalState.data).to.have.keys(['base64']);
    expect(finalState.data.base64).to.be.a('string');
  });
});

// ─── embedMetadata ────────────────────────────────────────────────────────────────

describe('embedMetadata', () => {
  it('embeds a UserComment in the EXIF field', async () => {
    const inputBuffer = await getResizedBuffer('portrait-medium.jpg');
    const finalState = await embedMetadata(inputBuffer, {
      UserComment: 'patient-id=42',
    })(state);

    const exifObj = piexif.load(finalState.data.buffer.toString('binary'));
    expect(exifObj?.Exif?.[piexif.ExifIFD.UserComment]).to.include(
      'patient-id=42',
    );
  });

  it('embeds a non-UserComment field (Make)', async () => {
    const inputBuffer = await getResizedBuffer('portrait-medium.jpg');
    const finalState = await embedMetadata(inputBuffer, { Make: 'OpenFn' })(
      state,
    );

    const exifObj = piexif.load(finalState.data.buffer.toString('binary'));
    expect(exifObj['0th'][piexif.ImageIFD.Make]).to.equal('OpenFn');
  });

  it('embeds multiple EXIF fields in one call', async () => {
    const inputBuffer = await getResizedBuffer('portrait-medium.jpg');
    const finalState = await embedMetadata(inputBuffer, {
      UserComment: 'id=1',
      Make: 'OpenFn',
    })(state);

    const exifObj = piexif.load(finalState.data.buffer.toString('binary'));
    expect(exifObj?.Exif?.[piexif.ExifIFD.UserComment]).to.include('id=1');
    expect(exifObj['0th'][piexif.ImageIFD.Make]).to.equal('OpenFn');
  });

  it('throws on an unknown EXIF key', async () => {
    const inputBuffer = await getResizedBuffer('portrat-small.JPG');
    let err;
    try {
      await embedMetadata(inputBuffer, { NotARealTag: 'value' })(state);
    } catch (e) {
      err = e;
    }
    expect(err).to.be.instanceOf(Error);
    expect(err.message).to.include('NotARealTag');
  });

  it('produces a valid JPEG buffer', async () => {
    const inputBuffer = await getResizedBuffer('portrat-small.JPG');
    const finalState = await embedMetadata(inputBuffer, {
      UserComment: 'test',
    })(state);

    const buf = finalState.data.buffer;
    expect(buf[0]).to.equal(0xff);
    expect(buf[1]).to.equal(0xd8);
  });

  it('accepts a base64 string input', async () => {
    const finalState = await embedMetadata(toBase64Str('portrat-small.JPG'), {
      UserComment: 'patient-id=99',
    })(state);

    const exifObj = piexif.load(finalState.data.buffer.toString('binary'));
    expect(exifObj?.Exif?.[piexif.ExifIFD.UserComment]).to.include(
      'patient-id=99',
    );
  });

  it("returns { base64 } when parseAs: 'base64'", async () => {
    const inputBuffer = await getResizedBuffer('portrat-small.JPG');
    const finalState = await embedMetadata(
      inputBuffer,
      { UserComment: 'test' },
      { parseAs: 'base64' },
    )(state);

    expect(finalState.data).to.have.keys(['base64']);
    expect(finalState.data.base64).to.be.a('string');
  });

  it('writes { buffer } to state.data', async () => {
    const inputBuffer = await getResizedBuffer('portrat-small.JPG');
    const finalState = await embedMetadata(inputBuffer, {
      UserComment: 'test',
    })(state);

    expect(finalState.data).to.have.keys(['buffer']);
    expect(finalState.data.buffer).to.be.instanceOf(Buffer);
  });
});

// ─── metadata ────────────────────────────────────────────────────────────────

describe('metadata', () => {
  it('returns correct dimensions for a portrait image', async () => {
    const finalState = await metadata(toBase64Str('portrait-large.jpg'))(state);

    expect(finalState.data.width).to.equal(3203);
    expect(finalState.data.height).to.equal(4271);
  });

  it('returns correct dimensions for a landscape image', async () => {
    const finalState = await metadata(toBase64Str('landscape-with-gps.JPG'))(
      state,
    );

    expect(finalState.data.width).to.equal(4032);
    expect(finalState.data.height).to.equal(3024);
  });

  it('returns orientation=portrait for a portrait image', async () => {
    const finalState = await metadata(toBase64Str('portrait-large.jpg'))(state);
    expect(finalState.data.orientation).to.equal('portrait');
  });

  it('returns orientation=landscape for a landscape image', async () => {
    const finalState = await metadata(toBase64Str('landscape-with-gps.JPG'))(
      state,
    );
    expect(finalState.data.orientation).to.equal('landscape');
  });

  it('returns orientation=square for a square image', async () => {
    const finalState = await metadata(toBase64Str('Bot-Test.jpg'))(state);
    expect(finalState.data.orientation).to.equal('square');
  });

  it('returns the file size in bytes', async () => {
    const buf = toBuf('portrait-large.jpg');
    const finalState = await metadata(buf)(state);
    expect(finalState.data.size).to.equal(buf.length);
  });

  it('writes { width, height, orientation, size } to state.data', async () => {
    const finalState = await metadata(toBase64Str('portrat-small.JPG'))(state);

    expect(finalState.data).to.have.keys([
      'width',
      'height',
      'orientation',
      'size',
    ]);
  });

  it('allows job code to branch on orientation', async () => {
    const finalState = await metadata(toBase64Str('landscape-with-gps.JPG'))(
      state,
    );

    const needsResize = finalState.data.orientation !== 'portrait';
    expect(needsResize).to.be.true;
  });
});

// ─── buffer passing between steps ────────────────────────────────────────────

describe('buffer passing between steps', () => {
  it('passes buffer from resize() to compress() explicitly', async () => {
    const resizeState = await resize(
      toBase64Str('portrait-large.jpg'),
      DEFAULT_RESIZE_OPTS,
    )(state);
    const compressState = await compress(
      resizeState.data.buffer,
      DEFAULT_COMPRESS_OPTS,
    )(resizeState);

    expect(compressState.data.size).to.be.at.most(
      DEFAULT_COMPRESS_OPTS.maxBytes,
    );
    expect(compressState.data.buffer).to.be.instanceOf(Buffer);
  });

  it('passes buffer from resize() to stripMetadata() explicitly', async () => {
    const resizeState = await resize(
      toBase64Str('with-gps.JPG'),
      DEFAULT_RESIZE_OPTS,
    )(state);
    const stripState = await stripMetadata(resizeState.data.buffer)(
      resizeState,
    );

    expect(stripState.data.buffer).to.be.instanceOf(Buffer);
    expect(stripState.data.buffer[0]).to.equal(0xff);
    expect(stripState.data.buffer[1]).to.equal(0xd8);
  });

  it('base64 output from resize() can be fed directly into compress()', async () => {
    const resizeState = await resize(toBase64Str('portrait-large.jpg'), {
      ...DEFAULT_RESIZE_OPTS,
      parseAs: 'base64',
    })(state);
    expect(resizeState.data.base64).to.be.a('string');

    const compressState = await compress(
      resizeState.data.base64,
      DEFAULT_COMPRESS_OPTS,
    )(resizeState);
    expect(compressState.data.size).to.be.at.most(
      DEFAULT_COMPRESS_OPTS.maxBytes,
    );
  });
});
